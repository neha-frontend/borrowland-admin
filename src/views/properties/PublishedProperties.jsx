/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

import { useHistory, useLocation } from 'react-router-dom';
// import Breadcrumb from 'components/BreadCrumb';
// import PropertiesManagementCard from 'components/card/PropertiesManagementCard';
import ButtonDropDown from 'components/Dropdowncomponent/DropdownButton';
import DatatableTables from 'components/Table/Table';
import { PublishedPropertiesColumn } from 'constants/columnUtility';
// import DeleteModal from 'components/UI/Model/DeleteModal';
// import image from '../../assets/images/brands/github.png';

import './DraftProperties.css';
import ActionCell from 'components/ActionButton';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyList } from 'store/actions';
import Breadcrumb from 'components/UI/Common/Breadcrumb';
import SimpleToggleSwitch from 'components/Switch/SimpleToggleSwitch';

const DraftProperties = () => {
  // const breadcrumbData = [{ name: 'Draft Properties', link: '/draft-properties' }];
  const [data, setData] = useState([]);
  // const [modal, setModal] = useState(false);
  const location = useLocation();

  const [filter, setFilter] = useState({ itemsPerPage: 100, status: location.state || 'OnSale' });
  const { propertyList, loading } = useSelector(state => state.property);
  const history = useHistory();
  const dispatch = useDispatch();
  // const modalOpen = () => {
  //   setModal(true);
  // };
  // const modalClose = () => {
  //   setModal(!modal);
  // };
  const handleView = item =>
    history.push({
      pathname: '/edit-property',
      state: { data: item, view: true, published: true },
    });
  const handleEdit = item =>
    history.push({ pathname: '/edit-property', state: { data: item, published: true } });
  useEffect(() => {
    // dispatch(getEarlyInvestor({ list: 'user/listUsers', field: 'userList' }));
    // dispatch(getPropertyList());
  }, []);
  useEffect(() => {
    const propertyDetails = propertyList.map(item => ({
      title: item.otherInfo.title ?? '-',

      state: `${item.attom.city}, ${item.attom.state}`,
      tokens: item.crowdSale?.tokensForSale,
      // city: item.attom.city,
      // propertyType: item.attom.locationType,
      price: (() => {
        const { currentDebt, propertyValues } = item.financials;
        const { numberOfTokens } = item.crowdSale;

        return (
          (propertyValues[propertyValues.length - 1]?.value - currentDebt) /
          numberOfTokens
        ).toFixed(2);
      })(),
      switch: (
        <SimpleToggleSwitch status={!item.otherInfo?.isHidden} id={item._id} key={item._id} />
      ),
      status:
        item.crowdSale.status ||
        (new Date(item.crowdSale?.startDate) < new Date() ? 'Sale Ongoing' : 'Upcoming'),
      start: new Date(item.crowdSale?.startDate).toLocaleString(),
      action: <ActionCell view={handleView} edit={handleEdit} id={item} />,
    }));
    setData(propertyDetails);
  }, [propertyList]);
  useEffect(() => {
    const query = Object.keys(filter)
      .filter(item => filter[item])
      .map(item => `${item}=${filter[item]}`)
      .join('&');
    dispatch(getPropertyList(query));
  }, [JSON.stringify(filter)]);

  let timeout = '';
  const handleSearch = e => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setFilter(prev => ({ ...prev, title: e.target.value.trim() || undefined }));
    }, 700);
  };
  const handleFilter = (val, name) => {
    setFilter(prev => ({ ...prev, [name]: val }));
  };
  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col xl={12}>
            <Breadcrumb name="Published Properties" />
            <Card>
              <CardBody>
                <Row>
                  {/* <Col xl={6}>
                    <Breadcrumb name="Property Management" items={breadcrumbData} />
                  </Col>
                  <Col
                    xl={6}
                    className="d-flex justify-content-between align-items-center property-cards"
                  > */}
                  {/* <PropertiesManagementCard name="Drafted" score="1000" img={image} />
                    <PropertiesManagementCard name="published" score="999" img={image} /> */}
                  {/* </Col> */}
                  <Col className="d-flex justify-content-between p-4">
                    {/* <ButtonDropDown title="Location" options={['bombay', 'mumbai']} noAll/> */}
                    <ButtonDropDown
                      title="On sale"
                      options={[{ 'On sale': 'OnSale' }]}
                      name="status"
                      onClick={handleFilter}
                      noAll
                    />
                    <div className="d-flex">
                      <div className="search-box me-2 ">
                        <div className="position-relative">
                          <input
                            className="form-control mr-sm-2"
                            type="text"
                            placeholder="Search Property"
                            onChange={handleSearch}
                          />
                          <i className="mdi mdi-magnify search-icon" />
                        </div>
                      </div>
                    </div>
                  </Col>
                  <DatatableTables
                    column={PublishedPropertiesColumn}
                    row={loading ? 'loading' : data}
                  />
                  {/* {modal && (
                    <DeleteModal
                      text="Are you sure you want to delete the property details ?"
                      title="Delete Draft Proposal"
                      close={modalClose}
                    />
                  )} */}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DraftProperties;
