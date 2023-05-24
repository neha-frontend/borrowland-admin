import React from 'react';
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';
import avatar from 'assets/images/avatar.jpg';
import '../viewcommon.css';

import Breadcrumb from 'components/BreadCrumb';

import DatatableTables from 'components/Table/Table';
import ActionCell from 'components/ActionButton';
import { useHistory } from 'react-router';
import { AssetPortfolioColumn } from 'constants/tableColumn';
import PropertiesManagementCard from 'components/card/PropertiesManagementCard';
import ButtonDropDown from 'components/Dropdowncomponent/DropdownButton';

const AssetPortfolio = () => {
  const history = useHistory();
  const handleView = item => history.push({ pathname: '/rental-detail', state: { data: item } });
  const action = ind => <ActionCell view={handleView} id={ind} />;
  const reports = [
    // {
    //   id: 1,
    //   title: 'Rental Income',
    //   value: '$100.00',
    // },
    {
      id: 2,
      title: 'Appreciation',
      value: '$250.00',
    },
    {
      id: 3,
      title: 'Total Rental Income',
      value: '$350.00',
    },
    {
      id: 4,
      title: 'Next Payout',
      value: '28 Nov, 2022',
      icon: ' uil-clock-three fa-3x',
    },
  ];
  const viewProposals = () => history.push('/property-proposals');
  return (
    <div className="page-content">
      <Breadcrumb items={[{ name: 'My Portfolio', link: '/portfolio' }, { name: 'Property' }]} />

      <Container fluid>
        {/* <Row> */}
        <Card>
          <CardBody className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div>
                <img src={avatar} alt="" className="avatar-md rounded-circle img-thumbnail me-3" />
              </div>
              <div>
                <div>
                  <h5>Diamond Ridge</h5>
                  <i>City, State</i>
                </div>
              </div>
            </div>
            <div className="d-flex button-header">
              <Button className="button-color w-100">Sell</Button>
              <Button className="button-color ms-2 w-100">View Property</Button>

              <Button className="ms-2 button-color w-100" onClick={viewProposals}>
                View Proposals
              </Button>
            </div>
          </CardBody>
        </Card>
        {/* </Row> */}
        <Row>
          <Col xl={3}>
            <PropertiesManagementCard name="Asset Value" score="$10,000.00" />
          </Col>
          <Col xl={3}>
            <PropertiesManagementCard name="My Holdings" score="$1,000.00" />
          </Col>
          <Col xl={6}>
            <Card>
              <CardBody className="card-body-card">
                {reports.map(item => (
                  <div className="property-management-card">
                    <div className="property-management-card-details mright-1">
                      <h5 className="text-muted">{item.title}</h5>
                      <h4>{item.value}</h4>
                    </div>
                    <i className={item.icon || ' uil-usd-circle fa-3x'} />
                  </div>
                ))}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="investor-background">
          <div className="investor-maincontainer align-items-center">
            <div className="d-flex">
              <ButtonDropDown
                title="Txn Type"
                options={[]}
                name="kycStatus"
                className="mright-1"
                // noAll
              />
              <ButtonDropDown
                title="Duration"
                options={[]}
                name="kycStatus"
                // noAll
              />
            </div>
            <div className="d-flex justify-content-between">
              <div className="btn-group me-1 mt-2">
                <div className="search-box ml-2">
                  <div className="position-relative">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                    <i className="mdi mdi-magnify search-icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DatatableTables column={AssetPortfolioColumn} action={action} />
        </div>
      </Container>
    </div>
  );
};

export default AssetPortfolio;
