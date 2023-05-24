import React from 'react';
import { Col, Card, CardBody } from 'reactstrap';
import CountUp from 'react-countup';
// import ReactApexChart from 'react-apexcharts';

const MiniWidget = props => (
  <>
    {props.reports.map((report, key) => (
      // eslint-disable-next-line react/no-array-index-key
      <Col md={6} xl={3} key={key} className="mb-10">
        {props?.isLoading ? (
          <div className="skeleton" />
        ) : (
          <Card>
            <CardBody>
              <>
                {/* <div className="float-end mt-2">
                  {report.charttype && (
                    <ReactApexChart
                      options={report.options}
                      series={report.series}
                      type={report.charttype}
                      height={report.chartheight}
                      width={report.chartwidth}
                    />
                  )}
                </div> */}
                <div>
                  <h4 className="mb-1 mt-1">
                    <span>
                      <CountUp
                        end={report.value}
                        separator=","
                        prefix={report.prefix}
                        suffix={report.suffix}
                        decimals={report.decimal}
                      />
                    </span>
                  </h4>
                  <p className="text-muted mb-0">{report.title}</p>
                </div>
                {report.desc && (
                  <p className="text-muted mt-3 mb-0">
                    <span className={`text-${report.color} me-1`}>
                      <i className={`${report.icon} me-1`} />
                      {report.badgeValue}
                    </span>{' '}
                    {report.desc}
                  </p>
                )}
              </>
            </CardBody>
          </Card>
        )}
      </Col>
    ))}
  </>
);

export default MiniWidget;
