/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';

import { useHistory, useLocation } from 'react-router-dom';
// import Breadcrumb from 'components/BreadCrumb';
// import PropertiesManagementCard from 'components/card/PropertiesManagementCard';
import ButtonDropDown from 'components/Dropdowncomponent/DropdownButton';
import DatatableTables from 'components/Table/Table';
import { PropertyManagementColumn } from 'constants/columnUtility';
import DeleteModal from 'components/UI/Model/DeleteModal';
// import image from '../../assets/images/brands/github.png';

import './DraftProperties.css';
import AttomIdModal from 'components/UI/Model/AttomIdModal';
import RenderIf from 'components/RenderIf';
import ActionCell from 'components/ActionButton';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyList, createProperty, getEarlyInvestor, deleteProperty } from 'store/actions';
import Breadcrumb from 'components/UI/Common/Breadcrumb';

const DraftProperties = () => {
  // const breadcrumbData = [{ name: 'Draft Properties', link: '/draft-properties' }];
  const { propertyList, loading, propertyDeleted } = useSelector(state => state.property);
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [filter, setFilter] = useState({ itemsPerPage: 100, status: location.state || 'Draft' });
  const { userList, loading: userLoading } = useSelector(state => state.user);
  const [showAttomId, setShowAttomId] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);

  const modalOpen = (item) => {
    setSelectedItem(item);
    setModal(true);
  };
  const modalClose = () => {
    setModal(!modal);
  };

  const handleView = item =>
    history.push({ pathname: '/edit-property', state: { data: item, view: true } });
  const handleEdit = item => history.push({ pathname: '/edit-property', state: { data: item } });

  useEffect(() => {
    dispatch(getEarlyInvestor({ list: 'user/listUsers', field: 'userList' }));
  }, []);

  useEffect(() => {
    const propertyDetails = propertyList.map(item => ({
      title: item.otherInfo.title ?? '-',
      owner:
        (userLoading && 'Loading...') ||
        `${userList.find(usr => usr._id === item.otherInfo?._owner)?.firstName || ''}  ${
          userList.find(usr => usr._id === item.otherInfo?._owner)?.lastName || ''
        }`,
      state: `${item.attom.city}, ${item.attom.state}`,
      // city: item.attom.city,
      email:
        (userLoading && 'Loading...') ||
        userList.find(usr => usr._id === item.otherInfo?._owner)?.email ||
        '-',
      // propertyType: item.attom.locationType,
      updated: new Date(item.updatedAt).toLocaleString(),
      action: <ActionCell view={handleView} edit={handleEdit} remove={modalOpen} id={item} />,
    }));
    setData(propertyDetails);
  }, [propertyList, userList]);

  const getFilters = () => {
    const query = Object.keys(filter)
    .filter(item => filter[item])
    .map(item => `${item}=${filter[item]}`)
    .join('&');

    return query;
  }
  useEffect(() => {
    dispatch(getPropertyList(getFilters()));
  }, [JSON.stringify(filter)]);

  const handleAddNew = () => {
    setShowAttomId(prev => !prev);
  };
  const handleCreate = val => {
    dispatch(
      createProperty({
        data: { attomId: val },
        success: item => {
          history.push({ pathname: '/edit-property', state: { data: item } });
        },
      }),
    );
  };
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
  
  const confirmDelete = () => {
    if(selectedItem?._id) {
      dispatch(deleteProperty({_id: selectedItem?._id}));
    }
  }

  useEffect(() => {
    if(propertyDeleted) {
      setModal(false);
      dispatch(getPropertyList(getFilters()));
    }
  }, [propertyDeleted])

  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col xl={12}>
            <Breadcrumb name="Draft Properties" />
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
                      title={filter.status}
                      options={['Draft', 'Minted']}
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
                      <Button className="button-color ms-2" onClick={handleAddNew}>
                        Add Property
                      </Button>
                      {/* <button className="ms-2 button-color" type="button">Add New</button> */}
                    </div>
                  </Col>
                  <DatatableTables
                    column={PropertyManagementColumn}
                    row={loading ? 'loading' : data}
                  />
                  {modal && (
                    <DeleteModal
                      text="Are you sure you want to delete the property details?"
                      title="Delete Draft Proposal"
                      close={modalClose}
                      confirm={confirmDelete}
                    />
                  )}
                  <RenderIf render={showAttomId}>
                    <AttomIdModal close={handleAddNew} confirm={handleCreate} />
                  </RenderIf>
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
