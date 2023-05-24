/* eslint-disable prefer-template */
import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { Col, Label, Modal, Row, Spinner } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { sendGiftToUser } from 'store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const SendGifts = ({ isOpen, close, model, walletAddress, title }) => {
  const dispatch = useDispatch();
  const [currency, setCurrency] = useState('btc');
  const [amount, setAmount] = useState(0);
  const [comment, setComment] = useState('');
  const { isLoading, isGiftSend } = useSelector(state => state.user);
  // function togCreate() {
  //   close(false);
  // }
  useEffect(() => {
    if (isGiftSend) {
      toast.success('Gift sent successfully.');
      close(false);
    }
  }, [isGiftSend]);

  const submit = () => {
    const param = {
      coin: currency,
      toAddress: walletAddress[currency]?.receiveAddress,
      amount: Number(amount),
      comment,
      type: 'Gift',
    };
    dispatch(sendGiftToUser(param));
  };

  return (
    <>
      <div>
        <div>
          <Modal centered isOpen={!!isOpen}>
            <div className="modal-header">
              <h5 className="modal-title mt-0 text-center w-100" id="myModalLabel">
                Send {title ? <span>{title}</span> : 'Gift'}
              </h5>
              <button
                type="button"
                onClick={() => {
                  close(false);
                }}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <AvForm onValidSubmit={submit} model={model}>
                <Row className="p-2">
                  <Col xl={4}>
                    <div className="user-title"> Wallet Address</div>
                  </Col>
                  <Col xl={8}>
                    {walletAddress[currency]?.receiveAddress?.slice(0, 6) +
                      '...' +
                      walletAddress[currency]?.receiveAddress?.slice(
                        walletAddress[currency]?.receiveAddress?.length - 4,
                        walletAddress[currency]?.receiveAddress,
                      )}
                  </Col>
                </Row>
                <Row className="p-2">
                  <Col xl={4}>
                    <div className="user-title">Transfer</div>
                  </Col>
                  <Col xl={8}>
                    <div className="d-flex">
                      <Col xl={3} className="mright-1">
                        <AvField
                          name="currency"
                          type="select"
                          className="form-control form-select"
                          id="basicpill-pancard-input5"
                          onChange={e => setCurrency(e.target.value)}
                        >
                          <option value="btc">BTC</option>
                          <option value="eth">ETH</option>
                          <option value="usdc">USDC</option>
                          <option value="usdt">USDT</option>
                        </AvField>
                      </Col>

                      <AvField
                        name="text"
                        id="horizontal-comment-Input"
                        className="form-control"
                        placeholder="Enter Amount"
                        type="text"
                        onChange={e => setAmount(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>

                <div className="row mb-4 p-2">
                  <Label for="horizontal-comment-Input" className="col-sm-3 col-form-Label">
                    Comments
                  </Label>
                  <Col sm={12}>
                    <AvField
                      name="text"
                      id="horizontal-comment-Input"
                      className="form-control"
                      placeholder="Enter comment here"
                      type="textarea"
                      onChange={e => setComment(e.target.value)}
                    />
                  </Col>
                </div>
                <div className="modal-footer px-0">
                  <div className="row w-100">
                    <div className="col ps-0">
                      <button
                        type="button"
                        onClick={() => {
                          close(false);
                        }}
                        className="btn btn-danger waves-effect w-100"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="col pe-0">
                      <button
                        type="submit"
                        className="btn btn-success waves-effect waves-light w-100"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Spinner className="" style={{ height: 20, width: 20 }} />
                        ) : (
                          'Confirm'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </AvForm>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default SendGifts;
