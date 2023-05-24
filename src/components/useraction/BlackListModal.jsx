import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Spinner } from 'reactstrap';
import { BlackWhiteList } from 'store/actions';

const BlackListModal = ({ id, close,view }) => {
  const dispatch = useDispatch();
  const [type, setType] = useState('Complete');
  const { blackListLoading } = useSelector(state => state.user);
  const blacklistuser = () => {
    dispatch(BlackWhiteList({ userId: id, blacklistType: type, success: ()=>{
        if(view) localStorage.setItem("type",type)
        close()
    } }));
  };
  const handleChange = e => setType(e.target.value);
  return (
    <>
      <div>
        <Modal isOpen centered>
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myModalLabel">
              BlackList User
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
          <div className="modal-body">
            <p> Are you sure you want to blacklist the user?</p>
            <div className="col-sm-auto mb-4">
              <label className="" htmlFor="autoSizingSelect">
                Blacklist From
              </label>
              <select className="form-select" id="autoSizingSelect" onChange={handleChange}>
                <option value="Complete">Completely BlackList</option>
                <option value="Investment">From Investments</option>
              </select>
            </div>
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
              onClick={blacklistuser}
            >
              {blackListLoading ? <Spinner size="sm" /> : 'Confirm'}
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default BlackListModal;
