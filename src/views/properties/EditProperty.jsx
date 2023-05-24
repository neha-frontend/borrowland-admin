import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, Col, Container, Row, TabContent, TabPane } from 'reactstrap';

// static imports
// import Financials from 'components/propertyManagement/Financials';
import PropertySideBar from 'components/propertySidebar/propertySidebar';
import './DraftProperties.css';
import AttomDetail from 'components/propertyManagement/AttomDetail';
import DocumentUpload from 'components/propertyManagement/DocumentUpload';
import { propertyData, marketDetailInfo } from 'constants/DraftData';
import BuyProcess from 'components/propertyManagement/BuyProcess';
import ImageUpload from 'components/propertyManagement/imageUpload';
import { useHistory, useLocation } from 'react-router';

import RenderIf from 'components/RenderIf';
import MarketTabs from 'components/propertyManagement/MarketTabs';
import { useDispatch, useSelector } from 'react-redux';
import {
  editMarket,
  setSavedItem,
  createProperty,
  getMarket,
  getEarlyInvestor,
} from 'store/actions';
import LogoLoader from 'components/UI/Spinner/LogoSpinner';
import Details from 'components/propertyManagement/Details';
import SavePropertyButton from 'components/SavePropertyButton';
import Breadcrumb from 'components/UI/Common/Breadcrumb';
// import LogoLoader from 'components/UI/Spinner/LogoSpinner';

const EditProperty = () => {
  const location = useLocation();
  const history = useHistory();
  const showMarket = location.pathname === '/market-detail';
  const [currentTab, setCurrentTab] = useState(showMarket ? 8 : 1);
  const { createLoader } = useSelector(state => state.market);
  const { createLoading, minting } = useSelector(state => state.property);
  const dispatch = useDispatch();
  let data = '';
  let marketData = {};
  const [view, setView] = useState(location.state?.view);
  const [published] = useState(location.state?.published);
  if (showMarket) {
    marketData = JSON.parse(JSON.stringify(location.state.data));
  } else {
    data = location?.state?.data || propertyData;
    data.crowdSale = data.crowdSale || {};
    const propeVal = data.financials?.propertyValues;

    if (propeVal?.[0]) {
      const tokens = data.crowdSale.numberOfTokens;
      data.crowdSale.pricePerToken = (
        (propeVal[propeVal.length - 1]?.value - data.financials.currentDebt) /
        tokens
      ).toFixed(2);
    }
    const rent = data?.cashflow?.monthlyRent;
    if (typeof rent === 'object') {
      data.cashflow.monthlyRent = rent[rent.length - 1]?.value || 0;
    }
  }
  useEffect(() => {
    dispatch(setSavedItem());
    dispatch(getMarket());
    dispatch(getEarlyInvestor({ list: 'user/listUsers', field: 'userList' }));
  }, []);
  const handleSave = () => {
    if (showMarket) {
      const changed = JSON.stringify(marketData) !== JSON.stringify(location.state.data);
      const marketDetail = {};
      Object.keys(marketDetailInfo).forEach(item => {
        marketDetail[item] = marketData[item] ? String(marketData[item]) : '';
      });
      marketDetail.marketChart =
        marketData?.marketChart?.map(item => ({
          year: item.year,
          rent: item.rent,
          appreciation: item.appreciation,
        })) || [];
      if (changed) {
        dispatch(
          editMarket({
            id: marketData._id,
            success: () => history.push('/market-management'),
            marketDetail,
          }),
        );
      }
    } else {
      delete data.attom.attomId;
      dispatch(createProperty(data));
    }
  };
  const handleView = () => setView(prev => !prev);
  return (
    <div className="page-content">
      {(createLoader || createLoading || minting) && <LogoLoader backdrop />}
      <RenderIf render>
        <div className="w-100 d-flex justify-content-between align-items-center pb-3 px-3">
          <Breadcrumb
          nopadding
            items={[
              {
                name:showMarket ? "Market" : published ? 'Published Properties' : 'Draft Properties',
                link:showMarket ? "/market-management" : published ? '/published-properties' : '/draft-properties',
                state: data.status,
              },
              { name: view ? 'View detail' : 'Edit detail', link: '/edit-properties' },
            ]}
          />
          {view ? (
            <Button className="button-color" onClick={handleView}>
              Edit Details <i className="fas fa-edit mx-2" role="button" />
            </Button>
          ) : (
            <div>
              {' '}
              <SavePropertyButton handleSave={handleSave} data={data} showMarket={showMarket} />
            </div>
          )}
        </div>
        <Container fluid>
          <Row>
            <Col xl={3}>
              <Card className="sidebar-card">
                <CardBody>
                  <PropertySideBar
                    setCurrentTab={setCurrentTab}
                    currentTab={currentTab}
                    data={
                      showMarket
                        ? {
                            title: marketData?.marketName,
                            location: `${marketData?.city}, ${marketData?.state}`,
                          }
                        : {
                            title: data.otherInfo?.title,
                            location: `${data?.attom?.city}, ${data?.attom?.state}`,
                          }
                    }
                    tabs={showMarket ? 'showOnmarket' : 'propertyTab'}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col xl={9}>
              <Card className="detail-card">
                <CardBody>
                  <TabContent activeTab={currentTab}>
                    <RenderIf render={!showMarket}>
                      <TabPane tabId={1}>
                        <AttomDetail data={data} view={view} status={data.status}/>
                      </TabPane>
                      <TabPane tabId={2}>
                        <Details
                          info="financialInfo"
                          data={data.financials}
                          view={view}
                          tab={2}
                          heading="Financials"
                          status={data.status}
                        />
                      </TabPane>
                      <TabPane tabId={3}>
                        <DocumentUpload
                          data={data.documents}
                          view={view}
                          rental={
                            data.cashflow?.rentalDocument
                              ? [data.cashflow?.rentalDocument]
                              : data.cashflow?.rentalDocuments?.map(item => item.value)
                          }
                          status={data.status}
                        />
                      </TabPane>
                      <TabPane tabId={4}>
                        <ImageUpload data={data.images} view={view} />
                      </TabPane>
                      <TabPane tabId={5}>
                        <Details
                          info="crowdSaleInfo"
                          data={data.crowdSale}
                          view={view}
                          tab={5}
                          heading="Crowdsale"
                          status={data.status}
                        />
                      </TabPane>
                      <TabPane tabId={6}>
                        <Details
                          info="cashflowInfo"
                          data={data.cashflow}
                          view={view}
                          tab={6}
                          heading="Cashflow"
                          status={data.status}
                        />
                      </TabPane>
                      <TabPane tabId={7}>
                        <BuyProcess detail={data.buyProcess || []} data={data} view={view} />
                      </TabPane>
                    </RenderIf>
                    <RenderIf render={showMarket}>
                      <TabPane tabId={8}>
                        <MarketTabs data={location.state} marketData={marketData} view={view} F />
                      </TabPane>
                    </RenderIf>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </RenderIf>
    </div>
  );
};

export default EditProperty;
