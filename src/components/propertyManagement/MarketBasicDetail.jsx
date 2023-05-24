import { AvField, AvForm } from 'availity-reactstrap-validation';
import { marketDetailInfo } from 'constants/DraftData';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Col, FormGroup, Row } from 'reactstrap';
import { setSavedItem } from 'store/actions';

// static imports
import './financials.css';

const MarketBasicDetail = ({ detail, view, marketData }) => {
  const initialData = JSON.parse(JSON.stringify(detail));
  let changed = false;
  const dispatch = useDispatch();
  const handleChange = (e, type) => {
    let val = e.target.value.trim();
    if (type === 'number') {
      val = Number(val);
    }
    initialData[e.target.name] = val;
    marketData[e.target.name] = val;
    const changedAgain = JSON.stringify(detail) !== JSON.stringify(initialData);
    if (changedAgain !== changed) {
      changed = changedAgain;
      dispatch(setSavedItem({ tab: 8, changed }));
    }
  };
  return (
    <>
      <AvForm className="mt-5">
        <Row>
          {Object.keys(marketDetailInfo).map(item => (
            <Col lg="6" key={item}>
              <FormGroup className="mb-3">
                <AvField
                  name={item}
                  className="form-control"
                  {...marketDetailInfo[item]}
                  value={detail[item]}
                  disabled={view}
                  onChange={e => handleChange(e, marketDetailInfo[item].type)}
                />
              </FormGroup>
            </Col>
          ))}
        </Row>
      </AvForm>
    </>
  );
};

export default MarketBasicDetail;
