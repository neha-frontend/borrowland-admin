import React from 'react';
import { Col, Card, CardBody } from 'reactstrap';

const ProfiteWidget = props => (
  <>
    {props.profite.map((report, key) => (
      // eslint-disable-next-line react/no-array-index-key
      <Col md={4} xl={4} key={key}>
        <Card>
          <CardBody>
            <div className="d-flex align-items-center justify-content-between">
              <div>{report.coin}</div>
              <div>
                <img className="mr-5" src={report.icon} alt="currency" height="20" width="20" />
                {+report?.price?.toFixed(8)}
              </div>
            </div>
            {/* {report.desc && (
              <p className="text-muted mt-3 mb-0">
                <span className={`text-${report.color} me-1`}>
                  <i className={`${report.icon} me-1`} />
                  {report.badgeValue}
                </span>{' '}
                {report.desc}
              </p>
            )} */}
          </CardBody>
        </Card>
      </Col>
    ))}
  </>
);

export default ProfiteWidget;
