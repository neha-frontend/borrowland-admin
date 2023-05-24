import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';

import '../viewcommon.css';

import { investorColumn } from 'constants/tableColumn';
import Breadcrumb from 'components/BreadCrumb';

import DatatableTables from 'components/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getEarlyInvestor } from 'store/actions';
import ButtonDropDown from 'components/Dropdowncomponent/DropdownButton';
import ActionCell from 'components/ActionButton';
import { useHistory } from 'react-router';
import WhiteListModal from 'components/useraction/WhiteListModal';
import BlackListModal from 'components/useraction/BlackListModal';

const InvestorManagement = () => {
  const [usersData, setUserData] = useState([]);
  const { userList, loading } = useSelector(state => state.user);
  const [isWhite, setWhite] = useState(false);
  const [isBlack, setBlack] = useState(false);
  const [filter, setFilter] = useState({ startIndex: 0, itemsPerPage: 100, kycStatus: '' });
  const history = useHistory();
  const dispatch = useDispatch();
  const handleView = item => history.push({ pathname: '/view-user', state: { data: item } });
  const hadleWhiteList = item => {
    setWhite(item?._id);
  };
  const handleBlackList = item => {
    setBlack(item?._id);
  };
  useEffect(() => {
    const detail = userList.map(item => ({
      name: `${item.firstName || ''} ${item.lastName || '-'}`,
      email: item.email,
      kyc: item.kycStatus,
      deposite: '-',
      date: item.lastLoggedIn ? new Date(item.lastLoggedIn).toLocaleString() : '-',
      action: (
        <ActionCell
          view={handleView}
          id={item}
          whitelist={
            item.blacklist === 'Investment' || item.blacklist === 'Complete'
              ? hadleWhiteList
              : false
          }
          blacklist={!item.blacklist || item.blacklist === 'None' ? handleBlackList : false}
        />
      ),
    }));
    setUserData(detail);
  }, [userList]);
  useEffect(() => {
    const query = Object.keys(filter)
      .filter(item => filter[item] !== undefined && filter[item] !== '')
      .map(item => `${item}=${filter[item]}`)
      .join('&');
    dispatch(getEarlyInvestor({ list: 'admin/getInvestorList', field: 'userList', query }));
  }, [JSON.stringify(filter)]);
  let timeout = '';
  const handleSearch = e => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setFilter(prev => ({ ...prev, search: e.target.value.trim() || undefined }));
    }, 700);
  };
  const handleFilter = (val, name) => {
    setFilter(prev => ({ ...prev, [name]: val }));
  };
  return (
    <div className="page-content">
      <Breadcrumb name="Investors" />

      <Container fluid>
        <div className="investor-background">
          <div className="investor-maincontainer">
            <ButtonDropDown
              title="Kyc Status"
              options={['passed', 'submitted', 'pending']}
              name="kycStatus"
              onClick={handleFilter}
              // noAll
            />
            <div className="d-flex">
              <div className="btn-group me-1 mt-2">
                <div className="search-box ml-2">
                  <div className="position-relative">
                    <input
                      className="form-control mr-sm-2"
                      type="text"
                      placeholder="Search admins"
                      onChange={handleSearch}
                    />
                    <i className="mdi mdi-magnify search-icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DatatableTables column={investorColumn} row={loading ? 'loading' : usersData} />
        </div>
        {isWhite && <WhiteListModal id={isWhite} close={hadleWhiteList} />}
        {isBlack && <BlackListModal id={isBlack} close={handleBlackList} />}
      </Container>
    </div>
  );
};

export default InvestorManagement;
