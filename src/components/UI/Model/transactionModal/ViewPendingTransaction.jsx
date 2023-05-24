/* eslint-disable no-underscore-dangle */
import { Modal } from 'reactstrap';

import RenderIf from 'components/RenderIf';
import 'react-phone-input-2/lib/style.css';
import './transaction.css';
import { useSelector } from 'react-redux';

const ViewPendingTransaction = ({
  isOpen,
  close,

  // adminDetails?.userData,
}) => {
  function togCreate() {
    close(false);
    window.location.reload();
  }

  const { pendingTransactionDetailsData } = useSelector(state => state.transactionManagement);

  const timeStamp = new Date(pendingTransactionDetailsData?.createdAt).toLocaleString();

  return (
    <>
      <div>
        <div>
          <Modal centered isOpen={!!isOpen} style={{ maxWidth: 620 }}>
            <div className="modal-header">
              <h5 className="modal-title mt-0 px-4" id="myModalLabel">
                <u>Pending Transactions Details</u>
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
            <div className="modal-body px-5 pending_transaction">
              <div className="d-flex align-items-center mb-3">
                <div className="title">TimeStamp:</div>
                <div className="value">{pendingTransactionDetailsData?.createdAt && timeStamp}</div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="title">Amount:</div>
                <div className="value">{pendingTransactionDetailsData.amount}</div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="title">Token:</div>
                <div className="value">{pendingTransactionDetailsData.coin}</div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="title">Type:</div>
                <div className="value">{pendingTransactionDetailsData._type}</div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="title">To:</div>
                <div className="value">{pendingTransactionDetailsData.toAddress}</div>
              </div>
              <div className="d-flex align-items-center mb-3">
                <div className="title">From:</div>
                <div className="value">{pendingTransactionDetailsData.fromWalletId}</div>
              </div>
            </div>

            <RenderIf render={isOpen === 'view'}>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => {
                    togCreate();
                  }}
                  className="btn btn-primary waves-effect"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </RenderIf>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ViewPendingTransaction;
