import { Form, Modal } from 'reactstrap';
import './transaction.css';

const ApproveTransaction = ({ isOpen, close, onConfirm, text, headerTitle }) => {
  function togClose() {
    close(false);
  }
  return (
    <>
      <div>
        <div>
          <Modal isOpen={!!isOpen} centered>
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="myModalLabel">
                <u>{headerTitle}</u>
              </h5>
              <button
                type="button"
                onClick={() => {
                  close(false);
                }}
                className="close p-0 position-relative"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form>
                <div className="row ">
                  <h5 className="text-center">{text}</h5>
                </div>
              </Form>
            </div>
            <div className="modal-footer d-flex justify-content-right pb-4">
              <div className="row w-100">
                <div className="col">
                  <button
                    type="button"
                    onClick={() => {
                      togClose();
                    }}
                    className="btn btn-danger waves-effect w-100"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
                <div className="col">
                  <button
                    type="button"
                    onClick={onConfirm}
                    className="btn approve_btn waves-effect dropdownColor w-100"
                    data-dismiss="modal"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ApproveTransaction;
