import { AvField, AvForm } from 'availity-reactstrap-validation';
import { useState } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';

const RejectTransaction = ({ isOpen, close, handleReject, title }) => {
  const [reason, setReason] = useState(null);
  function togClose() {
    close(false);
    window.location.reload();
  }

  const handleSubmit = () => {
    if (reason) {
      handleReject(reason);
      // dispatch(approvePendingTransaction({ id, status: 'Rejected', reason }));
      close(false);
    }
  };

  return (
    <>
      <Modal isOpen={!!isOpen} centered>
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
            <u>Reject {title}</u>
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
        <AvForm>
          <ModalBody>
            <AvForm className="form-horizontal">
              <div className="mb-3">
                <AvField
                  name="message"
                  label={`Reson For Reject ${title}`}
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="form-control h-25"
                  bsSize="lg"
                  type="textarea"
                  required
                  errorMessage="This is required field"
                />
              </div>
            </AvForm>
          </ModalBody>
          <ModalFooter>
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
                  className="btn waves-effect approve_btn w-100"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Reject
                </button>
              </div>
            </div>
          </ModalFooter>
        </AvForm>
      </Modal>
    </>
  );
};

export default RejectTransaction;
