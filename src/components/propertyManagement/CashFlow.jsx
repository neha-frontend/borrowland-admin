import { AvField, AvForm } from 'availity-reactstrap-validation';
import { cashflowInfo } from 'constants/DraftData';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Col, FormGroup, Row } from 'reactstrap';
import { setSavedItem } from 'store/actions';

// static imports
import './financials.css'

// eslint-disable-next-line arrow-body-style
const CashFlow = () => {
  const data = {};
  Object.keys(cashflowInfo).forEach(item => {
    data[item] = '';
  });
  const initialData = JSON.parse(JSON.stringify(data));
  let changed = false;
  const dispatch = useDispatch();
  const handleChange = (e, type) => {
    let val = e.target.value.trim();
    if (type === 'number') {
      val = Number(val);
    }
    initialData[e.target.name] = val;
    const changedAgain = JSON.stringify(data) !== JSON.stringify(initialData);
    if (changedAgain !== changed) {
      changed = changedAgain;
      dispatch(setSavedItem({ tab: 6, changed }));
    }
  };
  return (
    <>
    <div className="heading fw-bolder">Cashflow</div>
    <AvForm className="mt-5">
      <Row>
        {Object.keys(cashflowInfo).map(item => (
          <Col lg="6" key={item}>
            <FormGroup className="mb-3">
              <AvField
               
                name={item}
                type={cashflowInfo[item].type}
                className="form-control"
                id="basicpill-pancard-input5"
                {...cashflowInfo[item]}
                // value={data[item]}
                onChange={e => handleChange(e, cashflowInfo[item].type)}
              />
            </FormGroup>
          </Col>
        ))}
      </Row>
         </AvForm>
         </>
  );
};

export default CashFlow