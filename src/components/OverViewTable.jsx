import React from 'react';
import { Table } from 'reactstrap';

const OverViewTable = props => (
  <Table striped bordered hover variant="dark">
    <thead>
      <tr>
        <th>Currency</th>
        <th>1 M</th>
        <th>3 M</th>
        <th>6 M</th>
      </tr>
    </thead>
    <tbody>
      {props?.OverViewTableData?.map(items => (
        <tr key={items?.id}>
          <td>{items?.currency}</td>
          <td>{items?.firstMonth?.toFixed(4)}</td>
          <td>{items?.thirdMonth?.toFixed(4)}</td>
          <td>{items?.sixthMonth?.toFixed(4)}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default OverViewTable;
