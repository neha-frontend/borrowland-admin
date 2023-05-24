import { useEffect } from 'react';
import { Col, Label, Modal, Spinner } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import { sendEmailToUser } from 'store/actions';
import { toast } from 'react-toastify';

const SendEmail = ({ isOpen, close, model, userID }) => {
  const dispatch = useDispatch();
  const { isEmailSend, isSubmitted } = useSelector(state => state.user);
  //   const [number, setNumber] = useState('');
  //   const [phone, setPhone] = useState('');
  //   const [error, setError] = useState('');
  //   const [, setCountryCode] = useState('1');
  // const [adminObj, setAdminObj] = useState({
  //   subject: '',
  //   message: '',
  // });

  const submit = (event, values) => {
    console.log(event, values);
    const objToPost = {
      message: values.message,
      subject: values.subject,
      id: userID,
    };

    dispatch(sendEmailToUser(objToPost));
  };
  useEffect(() => {
    if (isEmailSend) {
      toast.success('Email sent successfully.');
      close(false);
    }
  }, [isEmailSend]);
  return (
    <>
      <div>
        <div>
          <Modal centered isOpen={!!isOpen}>
            <div className="modal-header">
              <h5 className="modal-title mt-0 text-center w-100" id="myModalLabel">
                Send Email
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
              <AvForm onValidSubmit={submit} model={model}>
                <div className="row mb-4">
                  <Label for="horizontal-comment-Input" className="col-sm-3 col-form-Label">
                    Subject
                  </Label>
                  <Col sm={12}>
                    <AvField
                      name="subject"
                      id="horizontal-comment-Input"
                      // value={adminObj?.comment}
                      className="form-control"
                      placeholder="Enter subject here"
                      type="text"
                      //   onChange={e => (adminObj.email = e?.target?.value)}
                      validate={{
                        required: {
                          value: true,
                          errorMessage: 'Please enter subject',
                        },
                        minLength: {
                          value: 6,
                          errorMessage: 'Subject should be minimum 6 character',
                        },
                      }}
                    />
                  </Col>
                </div>

                <div className="row mb-4">
                  <Label for="horizontal-comment-Input" className="col-sm-3 col-form-Label">
                    Message
                  </Label>
                  <Col sm={12}>
                    <AvField
                      name="message"
                      id="horizontal-comment-Input"
                      // value={adminObj?.comment}
                      className="form-control"
                      placeholder="Enter message here"
                      type="textarea"
                      //   onChange={e => (adminObj.email = e?.target?.value)}
                      validate={{
                        required: {
                          value: true,
                          errorMessage: 'Please enter message',
                        },
                        minLength: {
                          value: 15,
                          errorMessage: 'Message should be minimum 15 character',
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
                        // onClick={() => {
                        //   onSubmit();
                        // }}
                        // disabled={generatingTempPass}
                        className="btn btn-success waves-effect waves-light w-100"
                        disabled={isSubmitted}
                      >
                        {/* {generatingTempPass ? <Spinner size="sm" /> : 'Update'} */}
                        {/* Send */}
                        {isSubmitted ? (
                          <Spinner className="" style={{ height: 20, width: 20 }} />
                        ) : (
                          'Send'
                        )}
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

export default SendEmail;
