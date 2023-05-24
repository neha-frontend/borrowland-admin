import React, { useState } from 'react';
import { Modal } from 'reactstrap';


const WhiteListUserModel = () => {
  const [modalWhiteList, setWhiteList] = useState(false);
  function togWhiteList() {
    setWhiteList(!modalWhiteList);
  }
  
  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => {
            togWhiteList();
          }}
          className=""
          style={{ border: 'none', background: 'none' }}
          data-toggle="modal"
          data-target="#myModal"
        >
          <i className="fas fa-user-check mx-1"/>
        </button>

        <Modal
          isOpen={modalWhiteList}
          toggle={() => {
            togWhiteList();
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myModalLabel">
              Whitelist
            </h5>
            <button
              type="button"
              onClick={() => {
                setWhiteList(false);
              }}
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p> Are you sure you want to whitelist the user?</p>
            <div className="form-group">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Give Reason"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={() => {
                togWhiteList();
              }}
              className="btn btn-secondary waves-effect"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary waves-effect waves-light dropdownColor"
            >
              Confirm
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default WhiteListUserModel;
