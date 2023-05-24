import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';

import { useHistory } from 'react-router-dom';
import DatatableTables from 'components/Table/Table';
import DeleteModal from 'components/UI/Model/DeleteModal';
import './DraftProperties.css';
import RenderIf from 'components/RenderIf';
import ActionCell from 'components/ActionButton';
import { MarketDetailColumn } from 'constants/columnUtility';
import AddMarketModal from 'components/UI/Model/AddMarketModal';
import { useDispatch, useSelector } from 'react-redux';
import { getMarket, createMarket, deleteMarket } from 'store/actions';
import { toast } from 'react-toastify';
import Breadcrumb from 'components/UI/Common/Breadcrumb';

const DraftProperties = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [showAddMarket, setShowAddMarket] = useState(false);
  const { loading, marketList } = useSelector(state => state.market);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getMarket());
  }, []);
  const modalOpen = item => {
    setModal(item._id);
  };
  const modalClose = () => {
    setModal(!modal);
  };
  const handleView = item =>
    history.push({ pathname: '/market-detail', state: { data: item, view: true } });
  const handleEdit = item => history.push({ pathname: '/market-detail', state: { data: item } });
  useEffect(() => {
    const marketDetail = marketList.map(item => ({
      name: item.marketName,
      state: item.state,
      city: item.city,
      action: <ActionCell view={handleView} edit={handleEdit} remove={modalOpen} id={item} />,
    }));
    setData(marketDetail);
  }, [marketList]);
  const handleAddNew = () => {
    setShowAddMarket(prev => !prev);
  };
  const addMarket = (err, val) => {
    // add market and marketChart field
    const marketdata = { ...val, marketChart: [] };
    const success = id =>
      history.push({
        pathname: '/market-detail',
        state: { data: { ...marketdata, _id: id }, subtab: 2 },
      });
    dispatch(createMarket({ data: marketdata, success }));
    // handleAddNew();
  };
  const handleDelete = async () => {
    dispatch(
      deleteMarket({
        id: modal,
        success: () => {
          toast.success('market deleted successfully');
          modalClose();
        },
      }),
    );
  };
  const handleChange = e => {
    const val = e.target.value.trim().toLocaleLowerCase();
    const serachData = marketList.filter(item =>
      Object.values(item).join('').toLocaleLowerCase().includes(val),
    );
    const marketDetail = serachData.map(item => ({
      name: item.marketName,
      state: item.state,
      city: item.city,
      action: <ActionCell view={handleView} edit={handleEdit} remove={modalOpen} id={item} />,
    }));
    setData(marketDetail);
  };
  return (
    <div className="page-content">
      <Container fluid>
        <Row>
          <Col xl={12}>
      <Breadcrumb name="Market Management" />
            <Card>
              <CardBody>
                <Row>
                  <Col className="d-flex justify-content-end p-4">
                    <div className="d-flex">
                      <div className="search-box me-2 ">
                        <div className="position-relative">
                          <input
                            className="form-control mr-sm-2"
                            type="text"
                            placeholder="Search Market"
                            onChange={handleChange}
                          />
                          <i className="mdi mdi-magnify search-icon" />
                        </div>
                      </div>
                      <Button className="button-color ms-2" onClick={handleAddNew}>
                        Add Market
                      </Button>
                    </div>
                  </Col>
                  <DatatableTables
                    striped
                    column={MarketDetailColumn}
                    row={loading ? 'loading' : data}
                  />
                  {modal && (
                    <DeleteModal
                      text="Are you sure you want to delete the market ?"
                      title="Delete market"
                      close={modalClose}
                      confirm={handleDelete}
                    />
                  )}
                  <RenderIf render={showAddMarket}>
                    <AddMarketModal close={handleAddNew} addMarket={addMarket} />
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
