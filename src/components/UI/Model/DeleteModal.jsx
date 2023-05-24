import SweetAlert from 'react-bootstrap-sweetalert';
import './modal.css';

const DeleteModal = ({ close, text, title, confirm }) => (
  <SweetAlert
    title={title}
    warning
    showCancel
    className="alert-button"
    confirmButtonText="Delete Admin"
    confirmBtnBsStyle="success"
    cancelBtnBsStyle="danger"
    onConfirm={confirm || close}
    onCancel={close}
  >
    {text}
  </SweetAlert>
);

export default DeleteModal;
