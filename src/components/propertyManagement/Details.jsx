import { AvField, AvForm } from 'availity-reactstrap-validation';
import RenderIf from 'components/RenderIf';
import * as Information from 'constants/DraftData';
import PDF from 'assets/images/PDF.png';
import DOC from 'assets/images/DOC.png';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, FormGroup, Label, Row } from 'reactstrap';
import { setSavedItem } from 'store/actions';
import { toast } from 'react-toastify';
import Switch from 'react-switch';
import Dropzone from 'react-dropzone';
import { axiosMain } from 'http/axios/axios_main';
import ProgressBar from 'components/ProgressBar';
import { AddVariable } from './AddVariable';

const Details = ({ data, info, view, heading, tab = 1, status }) => {
  const isDraft = status === 'Draft';
  const documentImage = { pdf: PDF, msword: DOC };
  const fieldInfo = Information[info];
  const [changed, setChanged] = useState(false);
  const [check, setCheck] = useState(false);
  const [uploading, setUploading] = useState(0);
  const [addVar, setAddVar] = useState('');
  const [rental, setRental] = useState(false);
  const [initialData] = useState(JSON.parse(JSON.stringify(data || {})));
  const dispatch = useDispatch();
  const handleChange = (e, type) => {
    let val = type === 'notrim' ? e?.target?.value : e.target.value.trim();
    if (type === 'number') {
      val = Number(val);
    }
    if (initialData[e.target.name] === undefined && !val) {
      val = undefined;
    }
    data[e.target.name] = val;
    const changedAgain = JSON.stringify(data) !== JSON.stringify(initialData);
    if (changedAgain !== changed) {
      // changed = changedAgain;
      setChanged(changedAgain);
      dispatch(setSavedItem({ tab, changed: changedAgain }));
    }
  };
  const handleSubmit = (err, val) => {
    // data[addVar] = val;
    handleChange(
      {
        target: {
          value: { ...val, value: Number(val.value), applicable: JSON.parse(val.applicable) },
          name: addVar?.item || addVar,
        },
      },
      'notrim',
    );
    setAddVar('');
  };
  const handleSwitch = (val, name, field) => {
    if (!data[name]) data[name] = {};
    data[name][field || 'applicable'] = val;
    handleChange({ target: { value: data[name], name } }, 'notrim');
    setCheck(!check);
  };
  const handleSwitchText = (val, name) => {
    if (!data[name]) data[name] = {};
    data[name].value = val;
    handleChange({ target: { value: data[name], name } }, 'notrim');
  };
  const handleAcceptedFiles = async files => {
    if (!files.length) return;
    const fd = new FormData();
    const docType = 'rentalDocument';
    try {
      files.forEach(item => fd.append(docType, item));
      const response = await axiosMain({
        method: 'post',
        url: '/property/file.upload',
        data: fd,
        onUploadProgress: progress => {
          const { total, loaded } = progress;
          const totalSizeInMB = total / 1000000;
          const loadedSizeInMB = loaded / 1000000;
          const uploadPercentage = Math.floor((loadedSizeInMB / totalSizeInMB) * 100);
          setUploading(uploadPercentage);
        },
      });
      data[docType] = response.data?.data?.[docType];
      setRental(data[docType]);
      setChanged(true);
      dispatch(setSavedItem({ tab, changed: true }));
    } catch (err) {
      const msg =
        err.response?.status === 413
          ? 'Request entity too large to upload'
          : err.response?.data?.msg || 'Something went wrong, server error!';
      toast.error(msg);
    }
  };
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
  };
  return (
    <>
      <ProgressBar uploadPercentage={uploading} setUploading={setUploading} />
      <RenderIf render={heading}>
        <div className="heading fw-bolder">{heading}</div>
      </RenderIf>
      <AvForm className="mt-5" disabled={view}>
        <Row>
          {Object.keys(fieldInfo).map(item =>
            item.startsWith('contingencyVar') ? (
              data[item].name ? (
                <>
                  <Col lg={view ? '6' : '5'}>
                    <div className="position-relative">
                      <Label>
                        {/* <a
                        className="cursor-pointer"
                        onClick={() => setAddVar({ ...data[item], item })}
                      > */}
                        {data[item].name}
                        {/* </a> */}
                      </Label>
                      <AvField
                        name={data[item].name}
                        className="form-control"
                        value={data[item].value}
                        type="number"
                        onChange={e => handleSwitchText(e.target.value.trim(), item)}
                      />
                      <Switch
                        // uncheckedIcon={<Offsymbol />}
                        // checkedIcon={<OnSymbol />}
                        disabled={view}
                        onColor="#00FF00"
                        onChange={e => handleSwitch(e, item)}
                        checked={data[item].applicable}
                        className="position-absolute switch-applicable"
                      />
                    </div>
                  </Col>
                  {!view && (
                    <Col lg="1">
                      <p className="mb-0 height216" />
                      <Button
                        className="button-color"
                        onClick={() => setAddVar({ ...data[item], item })}
                      >
                        <i className="fas fa-edit mx-2" role="button" />
                      </Button>
                    </Col>
                  )}
                </>
              ) : view ? null : (
                <Col lg="6" className="">
                  <p className="mb-0 height216" />
                  <Button className="w-100 button-color" onClick={() => setAddVar(item)}>
                    Add Field +
                  </Button>
                </Col>
              )
            ) : fieldInfo[item].switch ? (
              <Col lg="6">
                <div className="position-relative">
                  <AvField
                    name={item}
                    className="form-control"
                    value={data[item]?.value}
                    type="number"
                    label={fieldInfo[item].label}
                    disabled={view || (!fieldInfo[item].update && !isDraft)}
                    onChange={e => handleSwitchText(e.target.value.trim(), item)}
                  />
                  <Switch
                    onColor="#00FF00"
                    disabled={view || (!fieldInfo[item].update && !isDraft)}
                    onChange={e => handleSwitch(e, item, 'isEnabled')}
                    checked={data[item]?.isEnabled}
                    className="position-absolute switch-applicable"
                  />
                </div>
              </Col>
            ) : (
              <Col lg="6">
                <FormGroup className="mb-3">
                  <AvField
                    name={item}
                    className="form-control"
                    disabled={
                      view ||
                      (!fieldInfo[item].update && !isDraft) ||
                      (item === 'monthlyRent' && !rental)
                    }
                    {...fieldInfo[item]}
                    value={
                      fieldInfo[item].type === 'datetime-local'
                        ? data[item]
                          ? data[item].substring(0, 16)
                          : ''
                        : data?.[item]
                    }
                    onChange={e => handleChange(e, fieldInfo[item].type)}
                  />
                </FormGroup>
              </Col>
            ),
          )}
        </Row>
      </AvForm>
      {addVar && (
        <AddVariable
          handleSubmit={handleSubmit}
          close={() => setAddVar('')}
          model={typeof addVar === 'string' ? {} : addVar}
        />
      )}
      {heading === 'Cashflow' && !view && (
        <div className="mt-4">
          <Label>Rental Document</Label>
          {rental ? (
            <Row className="document-container">
              <Col>
                <a href={rental.location || rental.url} target="_blank" rel="noreferrer">
                  <img
                    src={documentImage[rental.contentType.split('/').pop()]}
                    alt={rental.key}
                    height="50"
                    width="50"
                  />
                </a>
              </Col>
              <Col>{rental.key}</Col>
              <Col>{formatBytes(rental.sizeInMegaByte || rental.size)}</Col>
              {!view && (
                <Col>
                  <div
                    className="cross"
                    onClick={() => {
                      data.rentalDocument = undefined;
                      setRental(false);
                    }}
                  >
                    X
                  </div>
                </Col>
              )}
            </Row>
          ) : (
            <Dropzone
              onDrop={acceptedFiles => {
                handleAcceptedFiles(acceptedFiles, 'main');
              }}
              accept=".pdf,.doc"
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="dropzone">
                  <div className="dz-message needsclick" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div className="mb-3">
                      <i className="display-4 text-muted uil uil-cloud-upload" />
                    </div>
                    <h4>Upload rental document</h4>
                    <h5>Drop files here or click to upload.</h5>
                  </div>
                </div>
              )}
            </Dropzone>
          )}
        </div>
      )}
    </>
  );
};

export default Details;
