import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

import '../viewcommon.css';

import Breadcrumb from 'components/BreadCrumb';

import DatatableTables from 'components/Table/Table';
import ActionCell from 'components/ActionButton';
import { useHistory } from 'react-router';
import { portfolioColumn } from 'constants/tableColumn';
import PropertiesManagementCard from 'components/card/PropertiesManagementCard';

const Portfolio = () => {
  const history = useHistory();
  const handleView = item => history.push({ pathname: '/portfolio-property', state: { data: item } });
  const action = ind => <ActionCell view={handleView} buy sell vote id={ind} />;
  const reports = [
    {
      id: 1,
      title: 'Rental Income',
      value: '$100.00',
    },
    {
      id: 2,
      title: 'Appreciation',
      value: '$250.00',
    },
    {
      id: 3,
      title: 'Total Return',
      value: '$350.00',
    },
    {
      id: 4,
      title: 'Next Payout',
      value: '28 Nov, 2022',
      icon:' uil-clock-three fa-3x'
    },
  ];
  return (
    <div className="page-content">
      <Breadcrumb name="My Portfolio" />

      <Container fluid>
        <Row>
          <Col xl={3}>
            <PropertiesManagementCard name="Portfolio Value" score="$10,000.00" />
          </Col>
          <Col xl={9}>
              <Card >
                <CardBody className="card-body-card">
                  {reports.map(item => (
                    <div className="property-management-card">
                      <div className="property-management-card-details mright-1">
                        <h5 className="text-muted">{item.title}</h5>
                        <h4>{item.value}</h4>
                      </div>
                      <i className={item.icon || " uil-usd-circle fa-3x"} />
                    </div>
                  ))}
                </CardBody>
              </Card>
          </Col>
        </Row>
        <div className="investor-background">
          <div className="investor-maincontainer">
            <div />
            <div className="d-flex">
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
          <DatatableTables column={portfolioColumn} action={action} />
        </div>
      </Container>
    </div>
  );
};

export default Portfolio;
