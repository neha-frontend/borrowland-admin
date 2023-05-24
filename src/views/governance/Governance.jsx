import React from 'react';
import { Container } from 'reactstrap';

import '../viewcommon.css';

import Breadcrumb from 'components/BreadCrumb';

import DatatableTables from 'components/Table/Table';
import ActionCell from 'components/ActionButton';
import { useHistory } from 'react-router';
import { governanceColumn } from 'constants/tableColumn';

const Governance = () => {
  const history = useHistory();
  const handleView = item => history.push({ pathname: '/view-proposal', state: { data: item,items:[{ name: 'Governance', link: '/governance' }] } });
  const action = ind => <ActionCell view={handleView} id={ind} />;
  return (
    <div className="page-content">
      <Breadcrumb name="Governance" />

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
                      placeholder="Search"
                    />
                    <i className="mdi mdi-magnify search-icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DatatableTables column={governanceColumn} action={action} />
        </div>
      </Container>
    </div>
  );
};

export default Governance;
