import LogoLoader from 'components/UI/Spinner/LogoSpinner';
import Breadcrumb from 'components/BreadCrumb';
import RenderIf from 'components/RenderIf';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cmsManageList, uploadCms, removeCms, updateCms } from 'store/actions';
import './cms.css';
import { Card, CardBody } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import DeleteModal from 'components/UI/Model/DeleteModal';
import { toast } from 'react-toastify';

const CMS = () => {
  const dispatch = useDispatch();
  const { cmsList, isUploaded, isAdded, isRemoved, isUpdated, isUploadLoading, isLoading } =
    useSelector(state => state.cms);

  const [event, setEvent] = useState('');
  const [cmsId, setCmsId] = useState('');

  useEffect(() => {
    dispatch(cmsManageList());
  }, []);

  useEffect(() => {
    dispatch(cmsManageList());
  }, [isAdded, isRemoved, isUpdated, isUploaded]);

  const handleUpload = (e, id) => {
    if (e.target.files.length) {
      const imageFileList = {
        id: 2,
        file: e.target.files[0],
        size: e.target.files[0].size,
        type: e.target.files[0].type.includes('image') ? 'image' : 'video',
      };

      if (imageFileList.type !== 'image') {
        toast.error('Invalid Format');
      } else if (imageFileList.type === 'image') {
        const bodyFormData = new FormData();
        bodyFormData.append('image', imageFileList.file);
        if (id) {
          dispatch(updateCms({ id, data: bodyFormData }));
        } else {
          dispatch(uploadCms({ id: '', data: bodyFormData }));
        }
      }
    }
  };

  useEffect(() => {
    if (isUpdated === true) {
      setCmsId('');
    }
  }, [isUpdated]);

  // remove cms

  // const handleRemove = id => {
  //   setEvent('remove');
  //   setCmsId(id);
  // };

  const handleDeleteConfirm = () => {
    setEvent('');
    dispatch(removeCms({ id: cmsId }));
    setCmsId('');
  };

  return (
    <div className="page-content">
      <div className="d-flex align-items-baseline justify-content-between">
        <div className="d-flex">
          <div>
            <Breadcrumb name="CMS" />
          </div>
        </div>
        <div>
          {/* <AvForm className="position-relative">
            <AvField
              type="file"
              className="form-control file_input opacity-0"
              id="image-file"
              name="image"
              onChange={e => handleUpload(e)}
            />
            {isUploadLoading ? (
              <button
                className="btn btn-primary upload_label upload_loading_btn"
                type="button"
                disabled
              >
                Uploading...
                <span
                  className="spinner-border spinner-border-sm ms-2"
                  role="status"
                  aria-hidden="true"
                />
              </button>
            ) : (
              <label htmlFor="image-file" className="upload_label">
                Upload
              </label>
            )}
          </AvForm> */}
        </div>
      </div>

      <RenderIf>
        <LogoLoader />
      </RenderIf>
      <RenderIf render>
        <div className="container-fluid">
          <div className="row cms_row">
            {isLoading && !isUploadLoading ? (
              <div className="skel" />
            ) : Array.isArray(cmsList) && cmsList.length > 0 ? (
              cmsList.map(item => (
                <div className="col-md-12 col-xl-12 cms_col mb-5">
                  <Card className="h-100">
                    <CardBody className="p-0 h-100">
                      {isLoading && !isUploadLoading ? (
                        <div className="skel" />
                      ) : (
                        <div>
                          <img
                            key={item?._id}
                            src={item.image?.url}
                            alt="cms-images"
                            className="cms_img img-fluid img-thumbnail"
                          />
                          <div className="row cms_btn_container">
                            <div className="col-12">
                              <AvForm className="position-relative">
                                <AvField
                                  type="file"
                                  className="form-control file_input"
                                  id={`image-update-file-${item._id}`}
                                  name="image"
                                  onChange={e => handleUpload(e, item?._id)}
                                />

                                <label
                                  htmlFor={`image-update-file-${item._id}`}
                                  className="upload_label w-100 text-center"
                                >
                                  Update
                                </label>
                              </AvForm>
                            </div>
                            {/* <div className="col-6">
                              <Button
                                type="button"
                                className="button-color w-100"
                                onClick={() => handleRemove(item._id)}
                                disabled={cmsList?.length <= 2}
                              >
                                Remove
                              </Button>
                            </div> */}
                          </div>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </div>
              ))
            ) : Array.isArray(cmsList) && cmsList.length > 0 && isLoading ? (
              <div>...</div>
            ) : (
              <div className="no-data-found">No CMS Found</div>
            )}
          </div>
        </div>
        <RenderIf render={event === 'remove'}>
          <DeleteModal
            close={() => setEvent(false)}
            title="Are you sure you want to delete this Image?"
            confirm={handleDeleteConfirm}
          />
        </RenderIf>
      </RenderIf>
    </div>
  );
};

export default CMS;
