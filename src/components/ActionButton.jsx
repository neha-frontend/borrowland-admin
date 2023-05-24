import React from 'react';
import RenderIf from './RenderIf';

const ActionCell = ({
  view,
  edit,
  remove,
  blacklist,
  whitelist,
  id,
  buy,
  sell,
  vote,
  history,
  gift,
  item,
  isShowGift,
  accept,
  reject,
  send,
  status,
}) => (
  <div className="d-flex align-items-center">
    {buy && <a className="title-color px-2 fw-bolder cursor-pointer">BUY</a>}
    {sell && <a className="title-color px-2 fw-bolder cursor-pointer">SELL</a>}
    {vote && <a className="title-color px-2 fw-bolder cursor-pointer">VOTE</a>}
    {view && (
      <i
        className="fa fa-eye mx-2 active-link title-color"
        title="View"
        role="button"
        onClick={() => view(id)}
      />
    )}
    {edit && (
      <i
        className="color-green fas fa-edit mx-2"
        title="Edit"
        role="button"
        onClick={() => edit(id, item)}
      />
    )}
    {remove && (
      <i
        className="fa fa-trash mx-2 color-red"
        title="Remove"
        role="button"
        onClick={() => remove(id)}
      />
    )}
    {whitelist && (
      <i className="fas fa-user-check mx-2" role="button" onClick={() => whitelist(id)} />
    )}
    {blacklist && (
      <i className="fas fa-user-slash mx-2" role="button" onClick={() => blacklist(id)} />
    )}
    {history && (
      <i className="fa fa-history mx-2" title="History" role="button" onClick={() => history(id)} />
    )}
    {gift && isShowGift === 'approved' && (
      <i
        className="fa fa-paper-plane mx-2"
        title="Send"
        role="button"
        onClick={() => gift(id, item)}
      />
    )}
    <RenderIf render={status === 'Pending'}>
      {accept && (
        <i
          className="fas fa-check mx-2 color-green"
          title="Approve"
          role="button"
          onClick={() => accept(id)}
        />
      )}
      {reject && (
        <i
          className="fas fa-times mx-2 color-red"
          title="Reject"
          role="button"
          onClick={() => reject(id)}
        />
      )}
    </RenderIf>
    <RenderIf render={status === 'Approved'}>
      {send && (
        <i
          className="fa fa-paper-plane mx-2"
          title="Send"
          role="button"
          onClick={() => send(id, item)}
        />
      )}
    </RenderIf>
  </div>
);

export default ActionCell;
