import { Col, Label, Modal } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { toast } from 'react-toastify';
import { axiosMain } from 'http/axios/axios_main';

const ResetPassword = ({ isOpen, close, model, value }) => {
  const handelSubmit = async (event, values) => {
    console.log(event, values);
    try {
      const res = await axiosMain.post(`/user/send-password`, values);
      if (res?.status === 200) {
        toast.success('Email sent successfully.');
        close(false);
      }
    } catch (err) {
      toast.error('Something went wrong.');
      close(false);
    }
  };
  return (
    <>
      <div>
        <div>
          <Modal centered isOpen={!!isOpen}>
            <div className="modal-header">
              <h5 className="modal-title mt-0 text-center w-100" id="myModalLabel">
                Reset Password
              </h5>
              <button
                type="button"
                onClick={() => {
                  close(false);
                }}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <AvForm onValidSubmit={handelSubmit} model={model}>
                <div className="row mb-4">
                  <Label for="horizontal-comment-Input" className="col-sm-3 col-form-Label">
                    Email
                  </Label>
                  <Col sm={12}>
                    <AvField
                      name="email"
                      id="horizontal-comment-Input"
                      className="form-control"
                      placeholder="Enter user email"
                      type="email"
                      value={value}
                      disabled
                      validate={{
                        required: {
                          value: true,
                          errorMessage: 'Please enter user email',
                        },
                      }}
                    />
                  </Col>
                </div>

                <div className="modal-footer px-0">
                  <div className="row w-100">
                    <div className="col ps-0">
                      <button
                        type="button"
                        onClick={() => {
                          close(false);
                        }}
                        className="btn btn-danger waves-effect w-100"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                    <div className="col pe-0">
                      <button
                        type="submit"
                        className="btn btn-success waves-effect waves-light w-100"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </AvForm>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
