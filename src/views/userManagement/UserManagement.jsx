import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Col, Container, FormGroup, Label, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { userList, getUserDetails, updateUser, deleteUser } from 'store/actions';
// getAdminDetails

import '../viewcommon.css';
import RenderIf from 'components/RenderIf';
import { userColumn } from 'constants/tableColumn';
import Breadcrumb from 'components/BreadCrumb';
import EditUsers from 'components/UI/Model/userModals/EditUsers';
import LogoLoader from 'components/UI/Spinner/LogoSpinner';
import ActionCell from 'components/ActionButton';
import DeleteModal from 'components/UI/Model/DeleteModal';
// import ButtonDropDown from 'components/Dropdowncomponent/DropdownButton';
import MultipleSelctModal from 'components/UI/Model/multipleSelect/multipleSelectModal';
import DatatableTables from 'components/Table/Table';
// import SimpleToggleSwitch from 'components/Switch/SimpleToggleSwitch';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import UserWidget from 'components/UserWidget';
import SendGifts from 'components/UI/Model/userModals/sendGifts';
import moment from 'moment';
import { DateRange } from 'react-date-range';
import { useOutsideAlerter } from 'utils/useOutsideAlearter';
// import { addDays } from 'date-fns';

const UserManagement = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const dateInput = useRef(null);

  const {
    // adminsList,
    // isLoading,
    isUserAdded,
    // userDetails,
    isUserDeleted,
    isUserUpdated,
    errorMsg,
    isTempPWDGenerated,
  } = useSelector(state => state.user);
  const { topCardData, isCardLoading } = useSelector(state => state.admins);
  const {
    usersList,
    isLoading,
    isGiftSend,
    // isAdminAdded,
    // adminDetails,
    // isAdminDeleted,
    // isAdminUpdated,
    // errorMsg,
    // isTempPWDGenerated,
  } = useSelector(state => state.user);
  // const formRef = useRef(null);
  const [tempPassword, setTempPassword] = useState(false);
  const [event, setEvent] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState({});
  const [isActive, setIsActive] = useState('');
  const [isOpenRange, setIsOpenRange] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(10);
  const [walletAddress, setWalletAddress] = useState();
  const [paginationConfig, setPaginationConfig] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [filteredData, setFilteredData] = useState({});
  // const [key,setKey]=useState(1);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  useOutsideAlerter(dateInput, setIsOpenRange);

  // const handleCreate = () => setEvent('create');
  const handleView = id => {
    // setSelectedAdmin(id);
    // dispatch(getAdminDetails({id}));
    // const selectedAdminObj = adminsList?.items.find(ele => ele._id === id);
    // setSelectedAdmin(selectedAdminObj);
    history.push({
      pathname: `/user-management/user-detail/${id}`,
      state: id,
    });
  };

  const handleEdit = id => {
    setSelectedAdmin(id);

    dispatch(getUserDetails(`${id}?coin=eth`));
    // const selectedAdminObj = adminsList?.items.find(ele => ele._id === id);
    // setSelectedAdmin(selectedAdminObj);
    setEvent('edit');
  };

  const handleSendGift = (id, item) => {
    setWalletAddress(item);
    setEvent('send');
  };

  const handleDelete = id => {
    // const loggedInEmail = localStorage.getItem('email');
    // if (loggedInEmail === 'parth.gaggar@solulab.co') {
    setSelectedAdmin(id);
    setEvent('remove');
    // } else {
    //   toast.error(`Sorry! You don't have permission to delete Admin.`);
    // }
  };

  const handleDeleteConfirm = () => {
    setEvent('');
    dispatch(deleteUser({ id: selectedAdmin }));
  };

  const action = (id, item, isShowGift) => (
    <ActionCell
      view={handleView}
      edit={handleEdit}
      remove={handleDelete}
      gift={handleSendGift}
      id={id}
      item={item}
      isShowGift={isShowGift}
    />
  );

  const handleSendPassword = () => setTempPassword(prev => !prev);

  const onPageChange = page => {
    setCurrentPage(page);
    dispatch(userList({ query: `page=${page}&limit=${count}`, data: filteredData }));
    // setFilter(prev => ({ ...prev, startIndex: (page*10)+1 }));
  };

  const updateCurrentCountPage = page => {
    setCount(page);
  };

  useEffect(() => {
    if (usersList?.list) {
      usersList?.list?.forEach(ele => {
        const obj = ele;
        obj.fullName = _.startCase(_.toLower(ele?.fullName));
        obj.action = action(ele?._id, ele?.walletAddress?.saving, ele?.verification);
        obj.createdAt = ele.createdAt ? new Date(ele.createdAt).toLocaleString() : '-';
        // obj.role = ele.role || 'N/A';
        // obj.status = <SimpleToggleSwitch status={obj.status === 'Active'} key={ele._id} />;
        obj.country = ele?.country ? ele?.country : '-';
        obj.totalBalance = ele?.totalBalance ? ele?.totalBalance : '0';
        obj.kyc =
          ele?.verification.toLowerCase() === 'approved' ? (
            <span style={{ color: 'green' }}>{_.startCase(_.toLower(ele?.verification))}</span>
          ) : (
            <span style={{ color: 'red' }}>{_.startCase(_.toLower(ele?.verification))}</span> || '-'
          );
      });
      const paginationConfigTemp = {
        currentPage,
        pageCount: usersList?.totalPage,
        count,
        itemCount: usersList?.totalItem,
        onPageChange,
        updateCurrentCountPage,
      };
      setPaginationConfig(paginationConfigTemp);
    }
  }, [usersList]);

  useEffect(() => {
    dispatch(userList({ query: `page=${currentPage}&limit=${count}` }));
  }, [isGiftSend]);

  useEffect(() => {
    if (isUserAdded || isUserDeleted || isUserUpdated || isTempPWDGenerated) {
      setEvent(false);
      if (isTempPWDGenerated) {
        toast.success('Temporary Password Generated.');
        return;
      }
      dispatch(userList({ query: `page=${currentPage}&limit=${count}` }));

      if (isUserAdded) {
        toast.success('User added successfully');
      } else if (isUserUpdated) {
        toast.success('User updated successfully');
      } else if (isUserDeleted) {
        toast.success('User deleted successfully');
      }
    }
  }, [isUserAdded, isUserDeleted, isUserUpdated, errorMsg, isTempPWDGenerated]);

  // useEffect(() => {
  //   if (Object.keys(adminDetails).length) {
  //     setEvent('view');
  //   }
  // }, [adminDetails]);

  const onUpdate = data => {
    if (event === 'edit') {
      const obj = data;
      obj.id = selectedAdmin;
      dispatch(updateUser(obj));
    }
  };

  // eslint-disable-next-line no-unused-vars

  const submit = (e, values) => {
    // eslint-disable-next-line no-shadow, no-unused-vars
    const temp = Object.fromEntries(Object.entries(values).filter(([_, v]) => v !== ''));
    setFilteredData(temp);
    dispatch(userList({ query: `page=${currentPage}&limit=${count}`, data: temp }));
  };

  useEffect(() => {
    if (startDate) {
      dispatch(
        userList({
          query: `page=${currentPage}&limit=${count}&startDate=${startDate}&endDate=${endDate}`,
          data: filteredData,
        }),
      );
    }
  }, [startDate, endDate, filteredData]);

  const handleBtnFilter = (name, start, end) => {
    setStartDate(start);
    setEndDate(end);
    setIsActive(name);
    setIsOpenRange(false);
  };

  const handleClick = (idx, name) => {
    if (name === 'view') {
      history.push(`/user-management/user-detail/${idx}`);
      // handleView(idx);
    }
    if (name === 'edit') {
      handleEdit(idx);
    }
    if (name === 'delete') {
      handleDelete(idx);
    }
    if (name === 'send') {
      handleSendGift(idx);
    }
  };

  const handleDateChange = item => {
    setState([item.selection]);
    setStartDate(moment(item.selection?.startDate).format('YYYY-MM-DD'));
    setEndDate(moment(item.selection?.endDate).format('YYYY-MM-DD'));
  };

  const handleReset = () => {
    dispatch(userList({ query: `page=${currentPage}&limit=${count}` }));
    setIsActive('');
    // setIsActive('');
    // setStartDate('');
    // setEndDate('');
    window.location.reload();
  };
  return (
    <div className="page-content">
      <Breadcrumb name="Users" />
      <RenderIf>
        <LogoLoader />
      </RenderIf>
      <Row>
        <UserWidget reports={topCardData?.userManagement} loading={isCardLoading} />
      </Row>
      <Row>
        <AvForm onValidSubmit={submit}>
          <Row className="row mb-4">
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-firstname-Input" className="col-form-Label">
                Name
              </Label>
              <AvField
                type="text"
                className="form-control"
                id="horizontal-firstname-Input"
                name="fullName"
                // value={adminObj?.name}
                // required
                // validate={{
                //   pattern: {
                //     value: /^([a-zA-Z ]{1,})$/i,
                //     errorMessage: 'Enter User Name',
                //   },
                // }}
                // onChange={e => (adminObj.name = e?.target?.value)}
                placeholder="Username"
              />
            </Col>
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-email-Input" className="col-form-Label">
                Total Swap Above
              </Label>
              <AvField
                name="swapAbove"
                // value={adminObj?.email}
                className="form-control"
                placeholder="Total Swap above"
                // disabled={isOpen === 'edit' || isOpen === 'view'}
                type="number"
                validate={{
                  pattern: {
                    value: /^[0-9]+$/,
                    errorMessage: 'Swap must be a number',
                  },
                }}

                // onChange={e => (adminObj.email = e?.target?.value)}
              />
            </Col>
            {/* <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-firstname-Input" className="col-form-Label">
                Surname
              </Label>
              <AvField
                type="text"
                className="form-control"
                id="horizontal-sur-name-Input"
                name="surName"
                // value={adminObj?.name}

                // onChange={e => (adminObj.name = e?.target?.value)}
                placeholder="Surname"
              />
            </Col> */}
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-firstname-Input" className="col-form-Label">
                KYC Status
              </Label>

              <AvField
                name="kycStatus"
                type="select"
                className="form-select p-2"
                id="autoSizingSelect"
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </AvField>
              {/* <AvField
                type="text"
                className="form-control"
                id="horizontal-firstname-Input"
                name="kycStatus"
                // value={adminObj?.name}

                // onChange={e => (adminObj.name = e?.target?.value)}
                placeholder="KYC Status"
              /> */}
            </Col>
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-firstname-Input" className="col-form-Label">
                Country
              </Label>
              <AvField
                type="text"
                className="form-control"
                id="horizontal-firstname-Input"
                name="countryCode"
                // value={adminObj?.name}

                // onChange={e => (adminObj.name = e?.target?.value)}
                placeholder="Enter country name"
              />
            </Col>
          </Row>
          <Row className="row mb-4">
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-email-Input" className="col-form-Label">
                Total Balance
              </Label>
              <AvField
                name="totalBalance"
                // value={adminObj?.email}
                className="form-control"
                placeholder="Total balance"
                // disabled={isOpen === 'edit' || isOpen === 'view'}
                type="number"
                validate={{
                  pattern: {
                    value: /^[0-9]+$/,
                    errorMessage: 'Loan must be a number',
                  },
                }}

                // onChange={e => (adminObj.email = e?.target?.value)}
              />
            </Col>
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-email-Input" className="col-form-Label">
                Email
              </Label>
              <AvField
                name="email"
                // value={adminObj?.email}
                className="form-control"
                placeholder="Enter email"
                // disabled={isOpen === 'edit' || isOpen === 'view'}
                type="email"
                // required
                // errorMessage="Email is required"
                // validate={{
                //   required: { value: true },
                //   pattern: {
                //     value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                //     errorMessage: 'Enter valid email',
                //   },
                // }}
                // onChange={e => (adminObj.email = e?.target?.value)}
              />
            </Col>
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-email-Input" className="col-form-Label">
                Mobile Number
              </Label>
              <AvField
                name="mobile"
                // value={adminObj?.email}
                className="form-control"
                placeholder="Mobile Number"
                // disabled={isOpen === 'edit' || isOpen === 'view'}
                type="number"

                // onChange={e => (adminObj.email = e?.target?.value)}
              />
            </Col>
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-email-Input" className="col-form-Label">
                User ID
              </Label>
              <AvField
                name="userId"
                // value={adminObj?.email}
                className="form-control"
                placeholder="User ID "
                // disabled={isOpen === 'edit' || isOpen === 'view'}
                type="text"
                validate={{
                  pattern: {
                    value: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/,
                    errorMessage: 'User Id is not in correct format.',
                  },
                }}
                // onChange={e => (adminObj.email = e?.target?.value)}
              />
            </Col>
          </Row>
          <Row className="row mb-4">
            <Col sm={12} lg={3} md={4}>
              <Label for="horizontal-email-Input" className="col-form-Label">
                Total Loan Above
              </Label>
              <AvField
                name="loanAbove"
                className="form-control"
                placeholder="Total Loan Above"
                type="number"
                validate={{
                  pattern: {
                    value: /^[0-9]+$/,
                    errorMessage: 'Loan must be a number',
                  },
                }}
              />
            </Col>
          </Row>
          <Row>
            <FormGroup>
              <Button className="float-right mb-4 quick-stats-active">Submit</Button>
            </FormGroup>
          </Row>
        </AvForm>
      </Row>
      <RenderIf render>
        <Container fluid>
          <div style={{ background: 'white', borderRadius: '5px' }}>
            <div
              className="d-flex"
              style={{ padding: 20, justifyContent: 'space-between', alignItems: 'center' }}
            >
              <div>
                <Button
                  variant="outline-secondary"
                  className={`${
                    isActive === 'today' ? 'quick-stats-active' : ' '
                  } mright-1 quick-stats-btn`}
                  onClick={() =>
                    handleBtnFilter(
                      'today',
                      moment(new Date()).format('YYYY-MM-DD'),
                      moment(new Date()).format('YYYY-MM-DD'),
                    )
                  }
                >
                  Today
                </Button>
                <Button
                  variant="outline-secondary"
                  className={`${
                    isActive === 'yesterday' ? 'quick-stats-active' : ' '
                  } mright-1 quick-stats-btn`}
                  onClick={() =>
                    handleBtnFilter(
                      'yesterday',
                      moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD'),
                      moment(new Date()).subtract(1, 'day').format('YYYY-MM-DD'),
                    )
                  }
                >
                  Yesterday
                </Button>
                <Button
                  variant="outline-secondary"
                  className={`${
                    isActive === 'last_week' ? 'quick-stats-active' : ' '
                  } mright-1 quick-stats-btn`}
                  onClick={() =>
                    handleBtnFilter(
                      'last_week',
                      moment().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD'),
                      moment().subtract(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD'),
                    )
                  }
                >
                  Last Week
                </Button>
                <Button
                  variant="outline-secondary"
                  className={`${
                    isActive === 'this_month' ? 'quick-stats-active' : ' '
                  } mright-1 quick-stats-btn`}
                  onClick={() =>
                    handleBtnFilter(
                      'this_month',
                      moment().clone().startOf('month').format('YYYY-MM-DD'),
                      moment(new Date()).format('YYYY-MM-DD'),
                    )
                  }
                >
                  This Month
                </Button>
                <Button
                  variant="outline-secondary"
                  className={`${
                    isActive === 'last_month' ? 'quick-stats-active' : ' '
                  } mright-1 quick-stats-btn`}
                  onClick={() =>
                    handleBtnFilter(
                      'last_month',
                      moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'),
                      moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD'),
                    )
                  }
                >
                  Last Month
                </Button>
                <span ref={dateInput}>
                  <Button
                    variant="outline-secondary"
                    className={`${
                      isActive === 'c_data' ? 'quick-stats-active' : ' '
                    } mright-1 quick-stats-btn`}
                    onClick={() => {
                      setIsActive('c_data');
                      setIsOpenRange(!isOpenRange);
                    }}
                  >
                    <i className="fa fa-calendar-check-o" /> Custom Date
                    {/* <input type="date" placeholder="Custom Data" className="invisible" /> */}
                  </Button>

                  {isOpenRange && (
                    <DateRange
                      // editableDateInputs
                      // onChange={item => setState([item.selection])}
                      onChange={handleDateChange}
                      moveRangeOnFirstSelection={false}
                      ranges={state}
                      maxDate={new Date()}
                    />
                  )}
                </span>
                {/* <DateRangePicker
        date={new Date()}
        onChange={item => setState([item.selection])}
        ranges={state}
        editableDateInputs
        direction="horizontal"
      /> */}
              </div>
              <div>
                <a className="cursor-pointer fw-bold" onClick={handleReset}>
                  Reset
                </a>
              </div>
            </div>
            <DatatableTables
              column={userColumn}
              handleClick={handleClick}
              isSend
              isEdit
              isView
              isBlock
              isDelete
              row={isLoading ? 'loading' : usersList?.list}
              paginationConfig={paginationConfig}
              // row={isLoading ? 'loading' : adminsList?.items}
              hidePaging
              // action={action}
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
          />
        </RenderIf>
        <RenderIf render={event === 'edit' || event === 'view' || event === 'create'}>
          <EditUsers
            isOpen={event === 'remove' ? '' : event}
            close={() => setEvent(false)}
            disable={event === 'view' || event === 'edit'}
            onSubmit={onUpdate}
            adminDetails={selectedAdmin}
            // generateTempPassword={generateTempPasswordCB}
          />
        </RenderIf>
        <RenderIf render={event === 'remove'}>
          <DeleteModal
            close={() => setEvent(false)}
            text="If you delete the user all ongoing work will be lost and the user account cannot be recovered."
            title="Are you sure you want to delete the user?"
            confirm={handleDeleteConfirm}
          />
        </RenderIf>
        <RenderIf render={event === 'send'}>
          <SendGifts
            isOpen={event}
            close={() => setEvent(false)}
            disable={event === 'view' || event === 'edit'}
            onSubmit={onUpdate}
            walletAddress={walletAddress}
            // adminDetails={selectedAdmin}
          />
        </RenderIf>
      </RenderIf>
    </div>
  );
};

export default UserManagement;
