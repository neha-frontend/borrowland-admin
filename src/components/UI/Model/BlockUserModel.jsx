import { AvField, AvForm } from 'availity-reactstrap-validation';
import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';


const BlockUserModel = () => {
  const [modalBlackList, setBlackList] = useState(false);
  const togBlackList = () => {
    setBlackList(!modalBlackList);
  }
  
  return (
    <>
    <button
          type="button"
          onClick={() => {
            togBlackList();
          }}
          className=""
          style={{ border: 'none', background: 'none' }}
          data-toggle="modal"
          data-target="#myModal"
        >
          <i className="fas fa-user-slash mx-1"/>
        </button>
      <Modal isOpen={modalBlackList} toggle={togBlackList} centered>
        <ModalHeader className="mx-auto" toggle={togBlackList}>Block User</ModalHeader>
        <ModalBody>
        <AvForm className="form-horizontal" >
                      <div className="mb-3">
                        <AvField
                          name="reson_for_block"
                          label="Reson For Block"
                          value=""
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
          <Button color="primary w-50 mx-auto button-color" onClick={togBlackList}>
            Block User
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default BlockUserModel