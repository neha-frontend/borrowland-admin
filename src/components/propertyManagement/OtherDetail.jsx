import React, { useState } from 'react';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { otherDetailInfo } from 'constants/DraftData';
import { useDispatch, useSelector } from 'react-redux';
import { setSavedItem } from 'store/actions';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import Parser from 'html-react-parser';
import htmlToDraft from 'html-to-draftjs';
// import Loader from 'components/UI/Spinner/Spinner';

const OtherDetail = ({ data, view,status }) => {
  // Object.keys(otherDetailInfo).forEach(item => {
  //   data[item] = '';
  const isDraft = status==="Draft"
  const { marketList, loading } = useSelector(state => state.market);
  const { userList, loading: userLoading } = useSelector(state => state.user);
  // });
  const dropDownData = {
    _market: marketList.map(item => ({ name: item.marketName, id: item._id })),
    _owner: userList.map(item => ({ name: `${item.firstName} ${item.lastName}`, id: item._id })),
  };
  const load = {
    _market: loading,
    _owner: userLoading,
  };
  const content = htmlToDraft(data.description || '');
  const [changed, setChanged] = useState(false);
  const [initialData] = useState(JSON.parse(JSON.stringify(data)));
  const [descriptionState, setDescriptionState] = useState(
    EditorState.createWithContent(ContentState.createFromBlockArray(content.contentBlocks)),
  );
  const [tags, setTags] = useState(data?.tags || []);
  const dispatch = useDispatch();
  const handleChange = (e, type, bool) => {
    let val = e?.target?.value;
    let field = e?.target?.name;
    if (type === 'number') {
      val = Number(val);
    }
    if (type === 'tags') {
      field = type;
      val = e;
      setTags(e);
    }
    if (bool) {
      val = JSON.parse(val);
    }
    if (type === 'editor') {
      val = draftToHtml(convertToRaw(e.getCurrentContent()));
      data.description = val;
      field = 'description';
      setDescriptionState(e);
    }
    if (initialData[field] === undefined && !val) {
      val = undefined;
    }
    data[field] = val;
    const changedAgain = JSON.stringify(data) !== JSON.stringify(initialData);
    if (changedAgain !== changed) {
      // changed = changedAgain;
      setChanged(changedAgain);
      dispatch(setSavedItem({ tab: 9, changed: changedAgain }));
    }
  };
  return (
    <AvForm className="mt-5">
      <Row className="mb-3">
        {Object.keys(otherDetailInfo).map(item => (
          <Col lg="6" key={item}>
            <FormGroup className="mb-3">
              {otherDetailInfo[item].type === 'select' ? (
                <AvField
                  name={item}
                  className="form-control form-select"
                  disabled={view || (!otherDetailInfo[item].update && !isDraft)}
                  {...otherDetailInfo[item]}
                  value={String(data[item])}
                  onChange={e =>
                    handleChange(
                      e,
                      otherDetailInfo[item].type,
                      otherDetailInfo[item].bool ? 'bool' : '',
                    )
                  }
                >
                  {load[item] ? (
                    <option>Loading...</option>
                  ) : dropDownData[item] ? (
                    <>
                      <option value="">Select {otherDetailInfo[item].label}</option>
                      {dropDownData[item].map(opt => (
                        <option value={opt.id} key={opt.id}>
                          {opt.name}
                        </option>
                      ))}
                    </>
                  ) : (
                    <>
                      {' '}
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </>
                  )}
                </AvField>
              ) : (
                <AvField
                  name={item}
                  className="form-control"
                  disabled={view || (!otherDetailInfo[item].update && !isDraft)}
                  value={data[item]}
                  {...otherDetailInfo[item]}
                  onChange={e => handleChange(e, otherDetailInfo[item].type)}
                />
              )}
            </FormGroup>
          </Col>
        ))}
        <Col lg="6">
          <Label>Tags</Label>
          <TagsInput value={tags} onChange={tag => handleChange(tag, 'tags')} disabled={view} />
        </Col>
      </Row>
      <Label>Description</Label>
      <div>
        {!view && (
          <Editor
            toolbarClassName="toolbarClassName border border-dark"
            wrapperClassName="wrapperClassName "
            editorClassName="editorClassName min-height-input border border-dark p-2"
            editorState={descriptionState}
            onEditorStateChange={val => handleChange(val, 'editor')}
          />
        )}
        {view && (
          <div>{Parser(draftToHtml(convertToRaw(descriptionState.getCurrentContent())))}</div>
        )}
      </div>
    </AvForm>
  );
};

export default OtherDetail;
