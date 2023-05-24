import { AvField, AvForm } from 'availity-reactstrap-validation';
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';


const DeleteUserModel = ({ isOpen, onClose}) => {
  const toggle = () => {
    onClose(prev=>!prev);
  };
  
  return (  
    <>
      <Modal isOpen={isOpen} toggle={toggle} centered>
        <ModalHeader className="mx-auto" toggle={toggle}>Delete User</ModalHeader>
        <ModalBody>
        <AvForm className="form-horizontal" >
                      <div className="mb-3">
                        <AvField
                          name="reson_for_delete"
                          label="Reson For Delete"
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
          <Button color="primary w-50 mx-auto button-color" onClick={toggle}>
            Delete User
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default DeleteUserModel