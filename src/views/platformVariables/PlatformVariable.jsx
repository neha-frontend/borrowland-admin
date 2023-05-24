// import {  useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
// import { toast } from 'react-toastify';

// import { adminList, addAdmin, deleteAdmin, updateAdmin, generateTempPassword } from 'store/actions';
// getAdminDetails

import '../viewcommon.css';
import RenderIf from 'components/RenderIf';
import { PlatformVariablesColumn } from 'constants/tableColumn';
import Breadcrumb from 'components/BreadCrumb';
import LogoLoader from 'components/UI/Spinner/LogoSpinner';
import DatatableTables from 'components/Table/Table';

// import UserWidget from 'components/UserWidget';
import EditPlatformvariables from 'components/UI/Model/platformVariablesModal/EditPlatVariables';
import ActivityHistory from 'components/UI/Model/platformVariablesModal/ActivityHistory';
import { useDispatch, useSelector } from 'react-redux';
import ActionCell from 'components/ActionButton';
import {
  getPlatformActivityHistory,
  platVariableList,
  platVariableGetSingleData,
} from 'store/actions';
import { toast } from 'react-toastify';

const PlatformVariables = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(10);
  const [paginationConfig, setPaginationConfig] = useState({});

  const [selectedActivity, setSelectedActivity] = useState({});
  const { isLoading, platVariableListData, isPlatVariableUpdated } = useSelector(
    state => state.platformVariable,
  );
  // const { topCardData } = useSelector(state => state.admins);

  //   const [tempPassword, setTempPassword] = useState(false);
  const [event, setEvent] = useState(false);
  //   const [selectedAdmin, setSelectedAdmin] = useState({});

  //   const handleCreate = () => setEvent('create');

  const handleView = id => {
    setSelectedActivity(id);
    dispatch(getPlatformActivityHistory(`${id}?page=1&limit=10`));
    // const selectedAdminObj = adminsList?.items.find(ele => ele._id === id);
    // setSelectedAdmin(selectedAdminObj);
    setEvent('history');
  };

  const handleEdit = (id, name) => {
    setSelectedActivity(id);
    dispatch(platVariableGetSingleData(`?name=${name}`));
    // const selectedAdminObj = adminsList?.items.find(ele => ele._id === id);
    // setSelectedAdmin(selectedAdminObj);
    setEvent('edit');
  };

  //   const handleDelete = id => {
  //     const loggedInEmail = localStorage.getItem('email');
  //     if (loggedInEmail === 'parth.gaggar@solulab.co') {
  //       setSelectedAdmin(id);
  //       setEvent('remove');
  //     } else {
  //       toast.error(`Sorry! You don't have permission to delete Admin.`);
  //     }
  //   };

  const action = (id, item) => (
    <ActionCell history={handleView} edit={handleEdit} id={id} item={item} />
  );

  useEffect(() => {
    dispatch(platVariableList(`?page=${currentPage}&limit=${count}`));
  }, []);

  /* Pagination Config */
  const onPageChange = page => {
    setCurrentPage(page);
    dispatch(platVariableList(`?page=${page}&limit=${count}`));
  };
  const updateCurrentCountPage = page => {
    setCount(page);
  };

  useEffect(() => {
    if (platVariableListData?.list) {
      platVariableListData?.list?.forEach(ele => {
        const obj = ele;
        obj.variableName = ele?.displayName || '-';
        obj.action = action(ele?._id, ele.variableName);
        obj.values = ele?.values.map(item => (
          <>
            <p>
              Rate : {item?.rate}, Tenure : {item?.tenure || 'N/A'}
            </p>
          </>
        ));
        obj.createdAt = ele?.updatedAt ? new Date(ele.updatedAt).toLocaleString() : '-';
        // obj.userRole = ele.userRole || '-';
      });
      const paginationConfigTemp = {
        currentPage,
        pageCount: platVariableListData?.totalPage,
        count,
        itemCount: platVariableListData?.totalItem,
        onPageChange,
        updateCurrentCountPage,
      };
      setPaginationConfig(paginationConfigTemp);
    }
  }, [platVariableListData]);

  let tempInterval = '';
  const onSearchCB = val => {
    const searchedKeywrod = val.target.value.trim();
    clearTimeout(tempInterval);
    tempInterval = setTimeout(() => {
      const qp = `?page=${currentPage}&limit=${count}&searchValue=${searchedKeywrod}`;
      // searchedKeywrod.length > 1
      //   ? `?page=${currentPage}&limit=${count}&searchValue=${searchedKeywrod}`
      //   : `?page=${currentPage}&limit=${count}`;
      dispatch(platVariableList(qp));
    }, 500);
  };

  useEffect(() => {
    if (isPlatVariableUpdated) {
      toast.success('Updated successfully');
      dispatch(platVariableList(`?page=${currentPage}&limit=${count}`));
      setEvent(false);
    }
  }, [isPlatVariableUpdated]);
  return (
    <div className="page-content">
      <Breadcrumb name="Platform Variables" />
      <RenderIf>
        <LogoLoader />
      </RenderIf>
      {/* <Row>
        <UserWidget reports={topCardData?.plateformVariable} />
      </Row> */}
      <RenderIf render>
        <Container fluid>
          <div style={{ background: 'white', borderRadius: '5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
              <div className="btn-group me-1 mt-2">
                {/* <Filter title="Filter" onClick={handleDropdown} options={['Active', 'Deactive']} /> */}
              </div>
              <div className="d-flex">
                <div className="btn-group me-1 mt-2">
                  <div className="search-box ml-2">
                    <div className="position-relative">
                      <input
                        className="form-control mr-sm-2"
                        type="text"
                        placeholder="Search..."
                        onChange={onSearchCB}
                      />
                      <i className="mdi mdi-magnify search-icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DatatableTables
              column={PlatformVariablesColumn}
              // handleClick={handleClick}
              // isHistory
              // isEdit
              row={isLoading ? 'loading' : platVariableListData?.list}
              // hidePaging
              paginationConfig={paginationConfig}
              // action={action}
            />
          </div>
        </Container>

        <RenderIf render={event === 'edit'}>
          <EditPlatformvariables
            isOpen={event === 'remove' ? '' : event}
            close={() => setEvent(false)}
            disable={event === 'view' || event === 'edit'}
            activityHistory={selectedActivity}
            // onSubmit={onAddAdmin}
            // adminDetails={selectedAdmin}
            // generateTempPassword={generateTempPasswordCB}
          />
        </RenderIf>
        <RenderIf render={event === 'history'}>
          <ActivityHistory
            isOpen={event}
            close={() => setEvent(false)}
            // onSubmit={onAddAdmin}
            id={selectedActivity}
            // generateTempPassword={generateTempPasswordCB}
          />
        </RenderIf>
      </RenderIf>
    </div>
  );
};

export default PlatformVariables;
