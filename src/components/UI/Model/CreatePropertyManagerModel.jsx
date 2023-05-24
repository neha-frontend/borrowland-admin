import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';


const CreatePropertyManagerModel = ({ isOpen, onClose}) => {
  
  
  const toggle = () => {
    onClose(prev=>!prev);
  };
  
  
  return (
    
    <>
      <Modal isOpen={isOpen} centered>
        <ModalHeader className="mx-auto" toggle={toggle}>
          Add New Property Managers
        </ModalHeader>
        <ModalBody>
        <AvForm className="form-horizontal" >
                      <div className="mb-3">
                        <AvField
                          name="company_name"
                          label="Company Name"
                          value=""
                          className="form-control"
                          placeholder=""
                          type=""
                          required
                          errorMessage="Company Name is required"
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="contact_person"
                          label="Contact Person"
                          value=""
                          className="form-control"
                          placeholder=""
                          type=""
                          required
                          errorMessage="Contact Person is required"
                        />
                      </div>
                      <div>
                        <AvField
                          name="email"
                          label="Enter Email Id"
                          value=""
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                          errorMessage="Email is required"
                        />
                      </div>

                      <div className="note">
                        <span>Note - A temporary password will be sent on the user email id.</span>
                      </div>
        </AvForm>
        </ModalBody>
        <ModalFooter className="footer2famethod">
          <Button className='w-50 mx-auto button-color' color="primary">
            Send Password
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default CreatePropertyManagerModel