import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Button, Container, Row } from 'reactstrap';
import { toast } from 'react-toastify';

import {
  adminList,
  addAdmin,
  deleteAdmin,
  updateAdmin,
  getAdminDetails,
  generateTempPassword,
  updateStatusAdmin,
} from 'store/actions';
// getAdminDetails

import RenderIf from 'components/RenderIf';
import { adminColumn } from 'constants/tableColumn';
import Breadcrumb from 'components/BreadCrumb';
import CreateModal from 'components/UI/Model/adminModals/CreateAdmin';
import LogoLoader from 'components/UI/Spinner/LogoSpinner';
import ActionCell from 'components/ActionButton';
import DeleteModal from 'components/UI/Model/DeleteModal';
// import ButtonDropDown from 'components/Dropdowncomponent/DropdownButton';
import MultipleSelctModal from 'components/UI/Model/multipleSelect/multipleSelectModal';
import DatatableTables from 'components/Table/Table';
import SimpleToggleSwitch from 'components/Switch/SimpleToggleSwitch';
import Filter from 'components/Filters/Filters';
import UserWidget from 'components/UserWidget';
import '../viewcommon.css';

const AdminManagment = () => {
  const dispatch = useDispatch();
  const {
    adminsList,
    isLoading,
    isAdminAdded,
    topCardData,
    isCardLoading,
    // adminDetails,
    isAdminDeleted,
    isAdminUpdated,
    errorMsg,
    isTempPWDGenerated,
    isAdminStatusUpdated,
    adminStatusUpdatedSuccessMsg,
  } = useSelector(state => state.admins);

  const [tempPassword, setTempPassword] = useState(false);
  const [event, setEvent] = useState(false);
  const [isActive, setActive] = useState('');
  const [status, setStatus] = useState('');

  const [selectedAdmin, setSelectedAdmin] = useState({});

  // const [filter, setFilter] = useState({ startIndex: 0, itemsPerPage: 10, kycStatus: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(10);
  const [paginationConfig, setPaginationConfig] = useState({});

  const handleCreate = () => setEvent('create');

  const handleView = id => {
    setSelectedAdmin(id);
    dispatch(getAdminDetails({ id }));

    setEvent('view');
  };

  const handleEdit = id => {
    setSelectedAdmin(id);
    dispatch(getAdminDetails({ id }));

    setEvent('edit');
  };

  const handleDelete = id => {
    setSelectedAdmin(id);
    setEvent('remove');
  };

  const handleDeleteConfirm = () => {
    setEvent('');
    dispatch(deleteAdmin({ id: selectedAdmin }));
  };

  const handelUpdateAdminStatus = (currentAdminId, currentAdminStatus) => {
    if (currentAdminStatus === true) {
      dispatch(
        updateStatusAdmin({
          id: currentAdminId,
          status: false,
        }),
      );
    } else
      dispatch(
        updateStatusAdmin({
          id: currentAdminId,
          status: true,
        }),
      );
  };

  const action = id => (
    <ActionCell view={handleView} edit={handleEdit} remove={handleDelete} id={id} />
  );
  const handleSendPassword = () => setTempPassword(prev => !prev);

  useEffect(() => {
    dispatch(adminList(`page=${currentPage}&limit=${count}`));
  }, [isAdminStatusUpdated]);
  /* Pagination Config */
  const onPageChange = page => {
    setCurrentPage(page);
    if (isActive) {
      dispatch(
        adminList(`page=${currentPage}&limit=${count}&isActive=${isActive}&userRole=${status}`),
      );
    } else {
      dispatch(adminList(`page=${page}&limit=${count}`));
    }
  };

  const updateCurrentCountPage = page => {
    setCount(page);
  };
  /* Pagination Config */
  useEffect(() => {
    if (adminsList?.list) {
      adminsList?.list?.forEach(ele => {
        const obj = ele;
        obj.action = action(ele?._id);
        obj.name = ele?.fullName;
        obj.createdAt = ele?.lastLoginAt ? new Date(ele?.lastLoginAt).toLocaleString() : '-';
        obj.userRole = ele.userRole || 'N/A';
        obj.status = (
          <SimpleToggleSwitch
            status={obj.isActive === true}
            key={ele._id}
            updateAdminStatus={() => handelUpdateAdminStatus(ele._id, obj.isActive)}
          />
        );
      });
      const paginationConfigTemp = {
        currentPage,
        pageCount: adminsList?.totalPage,
        count,
        itemCount: adminsList?.totalItem,
        onPageChange,
        updateCurrentCountPage,
      };
      setPaginationConfig(paginationConfigTemp);
    }
  }, [adminsList]);

  useEffect(() => {
    if (
      isAdminAdded ||
      isAdminDeleted ||
      isAdminUpdated ||
      isTempPWDGenerated ||
      isAdminStatusUpdated
    ) {
      setEvent(false);
      if (isTempPWDGenerated) {
        toast.success('Temporary Password Generated.');
        return;
      }
      dispatch(adminList(`page=${currentPage}&limit=${count}`));

      if (isAdminAdded) {
        toast.success('Admin created successfully.');
      } else if (isAdminUpdated) {
        toast.success('Admin updated successfully.');
      } else if (isAdminDeleted) {
        toast.success('Admin deleted successfully.');
      } else if (isAdminStatusUpdated) {
        toast.success(adminStatusUpdatedSuccessMsg);
      }
    }
  }, [
    isAdminAdded,
    isAdminDeleted,
    isAdminUpdated,
    errorMsg,
    isTempPWDGenerated,
    isAdminStatusUpdated,
  ]);

  const onAddAdmin = data => {
    if (event === 'edit') {
      const obj = data;
      obj.id = selectedAdmin;
      dispatch(updateAdmin(obj));
    } else {
      dispatch(addAdmin(data));
    }
  };

  const handleDropdown = (isActive1, status1, name) => {
    const qp =
      name === 'submit'
        ? `page=${currentPage}&limit=${count}&isActive=${isActive1}&userRole=${status1}`
        : `page=${currentPage}&limit=${count}`;
    // const qp = `page=${currentPage}&limit=${count}&isActive=${isActive}&status=${status}`;
    setActive(isActive1);
    setStatus(status1);
    dispatch(adminList(qp));
  };

  let tempInterval = '';
  const onSearchCB = val => {
    const searchedKeywrod = val.target.value.trim();
    clearTimeout(tempInterval);
    tempInterval = setTimeout(() => {
      const qp =
        searchedKeywrod.length > 2
          ? `page=${currentPage}&limit=${count}&searchValue=${searchedKeywrod}`
          : `page=${currentPage}&limit=${count}`;
      dispatch(adminList(qp));
    }, 500);
  };

  const generateTempPasswordCB = () => {
    dispatch(generateTempPassword({ id: selectedAdmin._id }));
  };
  const handelSort = sortObj => {
    const sortValue = sortObj?.direction === 'asc' ? 1 : -1;
    if (sortObj?.column) {
      console.log('sortObj', sortValue);

      // dispatch(
      //   adminList(
      //     `page=${currentPage}&limit=${count}&sortBy=${sortObj?.column}&sortValue=${sortValue}`,
      //   ),
      // );
    }
  };
  return (
    <div className="page-content">
      <Breadcrumb name="Admins" />
      <RenderIf>
        <LogoLoader />
      </RenderIf>
      <Row>
        <UserWidget reports={topCardData?.adminManagement} loading={isCardLoading} />
      </Row>
      <RenderIf render>
        <Container fluid>
          <div style={{ background: 'white', borderRadius: '5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
              <div className="btn-group me-1 mt-2">
                <Filter title="Filter" onClick={handleDropdown} options={['Active', 'Deactive']} />
              </div>
              <div className="d-flex">
                <div className="btn-group me-1 mt-2">
                  <div className="search-box ml-2">
                    <div className="position-relative">
                      <input
                        className="form-control mr-sm-2"
                        type="text"
                        placeholder="Search admins"
                        onChange={onSearchCB}
                      />
                      <i className="mdi mdi-magnify search-icon" />
                    </div>
                  </div>
                </div>
                <div className="mt-2 mx-4">
                  <Button
                    type="button"
                    className="button-color"
                    data-toggle="modal"
                    data-target="#myModal"
                    onClick={handleCreate}
                  >
                    Create Admin
                  </Button>
                </div>
              </div>
            </div>
            <DatatableTables
              column={adminColumn}
              // handleClick={handleClick}
              row={isLoading ? 'loading' : adminsList?.list}
              hidePaging
              isDelete
              isEdit
              isView
              paginationConfig={paginationConfig}
              handle
              // action={action}
              handelSort={handelSort}
            />
          </div>
        </Container>
        <RenderIf render={tempPassword}>
          <MultipleSelctModal
            title="Send temporary password"
            search={false}
            showAll={false}
            endPoint="/admin/forgotPasswordList"
            close={handleSendPassword}
            handleSubmit={handleSendPassword}
            isOpen
            send
            hidePaging
          />
        </RenderIf>
        <RenderIf render={event === 'edit' || event === 'view' || event === 'create'}>
          <CreateModal
            isOpen={event === 'remove' ? '' : event}
            close={() => setEvent(false)}
            disable={event === 'view'}
            onSubmit={onAddAdmin}
            adminDetails={selectedAdmin}
            generateTempPassword={generateTempPasswordCB}
          />
        </RenderIf>
        <RenderIf render={event === 'remove'}>
          <DeleteModal
            close={() => setEvent(false)}
            text="If you delete the admin all ongoing work will be lost and the admin account cannot be recovered."
            title="Are you sure you want to delete the admin?"
            confirm={handleDeleteConfirm}
          />
        </RenderIf>
      </RenderIf>
    </div>
  );
};

export default AdminManagment;
