import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Spinner } from 'reactstrap';
import { BlackWhiteList } from 'store/actions';

const WhiteListModal = ({ id, close, view }) => {
  const dispatch = useDispatch();
  const { blackListLoading } = useSelector(state => state.user);
  const whiteList = () => {
    dispatch(
      BlackWhiteList({
        userId: id,
        blacklistType: 'None',
        success: () => {
          if (view) localStorage.setItem('type', 'None');
          close();
        },
      }),
    );
  };
  return (
    <>
      <div>
        <Modal isOpen centered>
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myModalLabel">
              Whitelist
            </h5>
            <button
              type="button"
              onClick={close}
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body text-center">
            <h5> Are you sure you want to whitelist the user?</h5>
            {/* <div className="form-group">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Give Reason"
              />
            </div> */}
          </div>

          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-primary waves-effect waves-light dropdownColor w-50"
              onClick={whiteList}
            >
              {blackListLoading ? <Spinner size="sm" /> : 'Confirm'}
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default WhiteListModal;
