import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

import '../viewcommon.css';

import avatar from 'assets/images/avatar.jpg';
import Breadcrumb from 'components/BreadCrumb';
import DatatableTables from 'components/Table/Table';
import ActionCell from 'components/ActionButton';
import { useHistory } from 'react-router';
import { ProposalsColumn } from 'constants/tableColumn';
import PropertiesManagementCard from 'components/card/PropertiesManagementCard';

const Proposals = () => {
  const history = useHistory();
  const handleView = item => history.push({ pathname: '/view-proposal', state: { data: item } });
  const action = ind => <ActionCell view={handleView} id={ind} />;
  const reports = [
    {
      id: 1,
      title: 'No. of Proposals',
      icon: 'uil-home-alt fa-3x',
      value: '20',
    },
    {
      id: 2,
      title: 'Current Live Proposals',
      icon: 'uil-home-alt fa-3x',
      value: '10',
    },
    {
      id: 3,
      title: 'Successful Proposals',
      icon: 'uil-home-alt fa-3x',
      value: '5',
    },
    {
      id: 4,
      title: 'Last Proposal Date',
      value: '28 Nov, 2022',
      icon: ' uil-calendar-alt fa-3x',
    },
  ];
  return (
    <div className="page-content">
      <Breadcrumb
        items={[
          { name: 'My Portfolio', link: '/portfolio' },
          { name: 'Property', link: '/portfolio-property' },
          { name: 'Proposals' },
        ]}
      />

      <Container fluid>
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
            {/* {reports.map(item => (
              <div className="property-management-card">
                <div className="property-management-card-details mright-1">
                  <h5 className="text-muted">{item.title}</h5>
                  <h4>{item.value}</h4>
                </div>
                <i className={item.icon || ' uil-usd-circle fa-3x'} />
              </div>
            ))} */}
          </CardBody>
        </Card>
        <Row>
          {reports.map(item => (
            <Col xl={3}>
              <PropertiesManagementCard name={item.title} score={item.value} icon={item.icon}/>
            </Col>
          ))}
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
          <DatatableTables column={ProposalsColumn} action={action} />
        </div>
      </Container>
    </div>
  );
};

export default Proposals;
