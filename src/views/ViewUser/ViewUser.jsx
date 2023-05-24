import React, { useEffect, useState } from 'react';

import { Card, CardBody, Col, Container, Media, Row } from 'reactstrap';

import { currentManagedPropertyColumn } from 'constants/columnUtility';
import Breadcrumb from 'components/UI/Common/Breadcrumb';
import { currentPropertiesData } from 'constants/currentManagedPropertyData';
import { useLocation } from 'react-router';
import DatatableTables from 'components/Table/Table';
import { axiosMain } from 'http/axios/axios_main';

import './ViewUser.css';
import WhiteListModal from 'components/useraction/WhiteListModal';
import BlackListModal from 'components/useraction/BlackListModal';
import avatar from '../../assets/images/avatar.jpg';

const UserProfile = () => {
  const { state } = useLocation();
  const [isWhite, setWhite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isBlack, setBlack] = useState(false);
  useEffect(() => {
    axiosMain.get(`admin/getPropertyList/${state?.data?._id}`);
    // localStorage.setItem('type', state?.data?.blacklist);
    return () => localStorage.removeItem('type');
  }, []);
  const {
    email,
    city,
    state: location,
    countryCode,
    dob,
    mobileNumber,
    lastLoggedIn,
    blockchainAddress,
    firstName,
    lastName,
    _id,
  } = state.data;
  const hadleWhiteList = id => {
    setWhite(id);
  };
  const handleBlackList = id => {
    setBlack(id);
  };
  function copyToCLipBoard(value) {
    try {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
      // toaster(`Address Copied`, {
      //   type: 'success',
      //   className: 'toaster-success',
      // });
    } catch (err) {
      // toaster(`Something went wrong`, {
      //   type: 'success',
      //   className: 'toaster-success',
      // });
    }
  }
  const blacklist = localStorage.getItem('type') || state?.data?.blacklist;

  return (
    <div className="page-content">
      <Breadcrumb
        items={[
          {
            name: 'Investors',
            link: '/investors',
          },
          { name: 'View User' },
        ]}
      />
      <Container fluid>
        <Row>
          <Card>
            <CardBody className="d-flex flex-wrap">
              <Col lg="4" md="12">
                <Media className="d-flex">
                  <div className="ms-3">
                    <img src={avatar} alt="" className="avatar-md rounded-circle img-thumbnail" />
                  </div>
                  <Media body className="flex-1 align-self-center">
                    <div className="text-muted">
                      <div className="d-flex">
                        <h5 className="ml-2 view-user-title">
                          {firstName} {lastName || '-'}
                        </h5>
                        {/* <i className="fas fa-check mx-2 mt-1" /> */}
                      </div>
                      <p className="mb-1 view-user-title">Username</p>
                    </div>
                  </Media>
                </Media>

                {blockchainAddress && (
                  <div className="d-flex align-items-center view-user-block">
                    <p className="mb-0 mt-3 view-user-title">{blockchainAddress}</p>
                    {copied ? (
                      <div className="d-flex mt-3 color-green">
                        <i className="fas fa-check ms-3" />
                        {/* <p>copied</p> */}
                      </div>
                    ) : (
                      <i
                        className="fas fa-clone mb-0 mt-3 cursor-pointer ms-3"
                        onClick={() => copyToCLipBoard(blockchainAddress)}
                      />
                    )}
                    {/* <i className="fas fa-clone mx-2 mt-3" /> */}
                  </div>
                )}
              </Col>
              <Col lg="4" md="6">
                <div className="text-center">
                  <div className="d-flex">
                    <i className="fas fa-envelope mx-2 mt-3 view-user-copy" />
                    <h6 className="mx-2 mt-3">{email}</h6>
                  </div>
                  <div className="d-flex">
                    <i className="fas fa-birthday-cake mx-2 mt-3 view-user-copy" />
                    <h6 className="mx-2 mt-3">{dob ? new Date(dob).toLocaleDateString() : '-'}</h6>
                  </div>
                  <div className="d-flex">
                    <i className="fas fa-calendar mx-2 mt-3 view-user-copy" />
                    <h6 className="mx-2 mt-3">
                      {lastLoggedIn ? new Date(lastLoggedIn).toLocaleTimeString() : '-'}
                    </h6>
                  </div>
                </div>
              </Col>
              <Col lg="4" md="6">
                <div className="d-flex">
                  <i className="fas fa-dollar-sign mx-2 mt-3 view-user-copy" />
                  <h6 className="mx-2 mt-3">-</h6>
                </div>
                <div className="d-flex">
                  <i className="fas fa-mobile mx-2 mt-3 view-user-copy" />
                  <h6 className="mx-2 mt-3">
                    {countryCode}
                    {mobileNumber || '-'}
                  </h6>
                </div>
                <div className="d-flex">
                  <i className="fas fa-map-pin mx-2 mt-3 view-user-copy" />
                  <h6 className="mx-2 mt-3">
                    {city}
                    {location ? ` ,${location}` : '-'}
                  </h6>
                </div>
              </Col>
              {!(blacklist === 'Investment' || blacklist === 'Complete') ? (
                <Col lg="12" md={6} xs={6}>
                  <div className="text-center mt-5">
                    {/* <i className="fas fa-user-slash mx-2 mt-3"
                     style={{ fontSize: '40px' }} /> */}
                    <i
                      className="fas fa-user-slash mx-2 balcklist-icon"
                      role="button"
                      onClick={() => handleBlackList(_id)}
                    />
                    <h6 className="mx-2 mt-3">Blacklist</h6>
                  </div>
                </Col>
              ) : (
                <Col lg="12" md={6} xs={6}>
                  <div className="text-center mt-5">
                    <i
                      className="fas fa-user-check mx-2 balcklist-icon"
                      role="button"
                      onClick={() => hadleWhiteList(_id)}
                    />
                    {/* <i className="fas fa-user-check mx-2 mt-3"
                     style={{ fontSize: '40px' }} /> */}

                    <h6 className="mx-2 mt-3">Whitelist</h6>
                  </div>
                </Col>
              )}
            </CardBody>
          </Card>
        </Row>

        <div className="">
          <Card>
            <h4 className="mx-4 mt-3">Token Owned</h4>
            <CardBody>
              <DatatableTables
                striped
                column={currentManagedPropertyColumn}
                row={currentPropertiesData}
              />
            </CardBody>
          </Card>
        </div>
      </Container>
      {isWhite && <WhiteListModal id={isWhite} close={() => setWhite(false)} view />}
      {isBlack && <BlackListModal id={isBlack} close={() => setBlack(false)} view />}
    </div>
  );
};
export default UserProfile;
