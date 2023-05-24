import React from 'react';
import { Container } from 'reactstrap';

import '../viewcommon.css';

import Breadcrumb from 'components/BreadCrumb';

import DatatableTables from 'components/Table/Table';
import ActionCell from 'components/ActionButton';
import { useHistory } from 'react-router';
import { cashflowDetailColumn } from 'constants/tableColumn';

const CashflowDetail = () => {
  const history = useHistory();
  const handleView = item => history.push({ pathname: '/view-user', state: { data: item } });
  const action = ind => <ActionCell view={handleView} id={ind} />;
  return (
    <div className="page-content">
      <Breadcrumb items={[{ name: 'Cashflow', link: '/cashflow' }, { name: 'House' }]} />

      <Container fluid>
        <div className="investor-background">
          <div className="investor-maincontainer">
            <div />
            <div className="d-flex">
              <div className="btn-group me-1 mt-2">
                <div className="search-box ml-2">
                  <div className="position-relative">
                    <input
                      className="form-control mr-sm-2"
                      type="text"
                      placeholder="Search admins"
                    />
                    <i className="mdi mdi-magnify search-icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DatatableTables column={cashflowDetailColumn} action={action} />
        </div>
      </Container>
    </div>
  );
};

export default CashflowDetail;
