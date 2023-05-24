import React, { useEffect, useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import { Row, Col, Progress } from 'reactstrap';
import { Link } from 'react-router-dom';
import './datatables.scss';

import ToggleSwitch from 'components/Switch/ToggleSwitch';
import { adminColumn } from 'constants/tableColumn';
import Pagination from 'components/pagination';
// import ActionCell from 'components/ActionButton';

const DatatableTables = ({
  hidePaging = true,
  column = adminColumn,
  action,
  row,
  handelSort,
  handleClick,
  isSend = false,
  isDelete = false,
  isHistory = false,
  isEdit = false,
  isView = false,
  isBlock = false,
  paginationConfig,
}) => {
  const [data, setData] = useState({
    columns: column,
    rows: [
      {
        name: 'Tiger Nixon',
        position: 'System Architect',
        office: 'Edinburgh',
        age: '61',
        date: '2011/04/25',
        tokenVal: 'USDC',
        type: 'Deposit',
      },
      {
        name: 'Garrett Winters',
        position: 'Accountant',
        office: 'Tokyo',
        age: '63',
        date: '2011/07/25',
        salary: '$170',
        tokenVal: 'USDC',
        type: 'Withdraw',
      },
      {
        name: 'Ashton Cox',
        position: 'Junior Technical Author',
        office: 'San Francisco',
        age: '66',
        date: '2009/01/12',
        salary: '$86',
        tokenVal: 'USDT',
        type: 'Deposit',
      },
      {
        name: 'Cedric Kelly',
        position: 'Senior Javascript Developer',
        office: 'Edinburgh',
        age: '22',
        date: '2012/03/29',
        salary: '$433',
        tokenVal: 'BTC',
        type: 'Withdraw',
      },
      {
        name: 'Airi Satou',
        position: 'Accountant',
        office: 'Tokyo',
        age: '33',
        date: '2008/11/28',
        salary: '$162',
        tokenVal: 'ETH',
        type: 'Deposit',
      },
      {
        name: 'Brielle Williamson',
        position: 'Integration Specialist',
        office: 'New York',
        age: '61',
        date: '2012/12/02',
        salary: '$372',
        tokenVal: 'USDC',
        type: 'Withdraw',
      },
      {
        name: 'Herrod Chandler',
        position: 'Sales Assistant',
        office: 'San Francisco',
        age: '59',
        date: '2012/08/06',
        salary: '$137',
        tokenVal: 'USDC',
        type: 'Deposit',
      },
      {
        name: 'Rhona Davidson',
        position: 'Integration Specialist',
        office: 'Tokyo',
        age: '55',
        date: '2010/10/14',
        salary: '$327',
        tokenVal: 'BTC',
        type: 'Withdraw',
      },
    ],
  });
  useEffect(() => {
    setData(prev => ({ ...prev, columns: column }));
  }, [JSON.stringify(column)]);

  useEffect(() => {
    if (!row) {
      data?.rows?.forEach((item, idx) => {
        console.log('item', item, idx);
        data.rows[idx] = {
          ...item,
          title: `title${idx + 1}`,
          // toggle: <ToggleSwitch />,
          action: (action && action(idx, item)) || (
            <>
              <div className="d-flex align-items-center">
                {isHistory && (
                  <i
                    className="fa fa-history mx-2 active-link title-color"
                    role="button"
                    onClick={() => handleClick(idx, 'history')}
                  />
                )}
                {isView && (
                  <i
                    className="fa fa-eye mx-2 active-link title-color"
                    role="button"
                    onClick={() => handleClick(idx, 'view')}
                  />
                )}
                {isEdit && (
                  <i
                    className="color-green fas fa-edit mx-2"
                    role="button"
                    onClick={() => handleClick(idx, 'edit')}
                  />
                )}
                {isBlock && (
                  <i
                    className="color-gray fas fa-ban mx-2"
                    role="button"
                    onClick={() => handleClick(idx, 'block')}
                  />
                )}
                {isDelete && (
                  <i
                    className="fa fa-trash mx-2 color-red"
                    role="button"
                    onClick={() => handleClick(idx, 'delete')}
                  />
                )}
                {isSend && (
                  <i
                    className="fa fa-paper-plane mx-2 color-green"
                    role="button"
                    onClick={() => handleClick(idx, 'send')}
                  />
                )}
              </div>
            </>
          ),

          // action: `${(
          //   <ActionCell view={handleClick} edit={handleClick} remove={handleClick} id="1" />
          // )}`,
          location: `Location${idx + 1}`,
          updated: '3/21/2022 3:03:27 EST',
          number: idx + 1,
          status: <ToggleSwitch />,
          lastLogin: '12-12-2022',
          enddate: (
            <div className="d-flex">
              <i className="far fa-clock" />
              11/20/21
            </div>
          ),
          property: `House${idx + 1}`,
          deposite: '$5000',
          distributed: '45%',
          token: '500',
          asset: 'NCB',
          role: 'default',
          txnid: <Link>12xgwhwhxwgd263</Link>,
          email: '12xgwhwhx@gmail.com',
          price: '$1000.00 - 2.15%',
          progress: <Progress value="25"> 25%</Progress>,
          category: 'Commercial',
          platfee: 'Paid',
          propdoc: 'Uploaded',
          Destination: 'Bank Account Name',
          owner: 'crypto',
          mobile: '1234567890',
          update: 'pending',
          label: 'november.pdf',
          duration: '10 days',
          favor: 200,
          against: 0,
          date: '30/11/2022',
          pslstatus: <p className="color-green">Success</p>,
          request: 'Approved',
          purpose: 'Buy',
          id: 6754,
          tenure: 3,
        };
      });
      setData({ ...data });
      return;
    }
    if (row === 'loading') {
      const skelData = {};
      column.forEach(item => {
        skelData[item.field] = <div className="skel" />;
      });
      const rowloading = [...new Array(4)].map(() => skelData);
      setData(prev => ({ ...prev, rows: rowloading }));
      return;
    }
    setData(prev => ({ ...prev, rows: row }));
  }, [JSON.stringify(row)]);
  return (
    <>
      <Row className="m-auto p-2">
        <Col className="col-12">
          <MDBDataTable
            key={data.rows?.length}
            responsive
            striped
            bordered
            data={data}
            paging={!hidePaging}
            displayEntries
            onSort={handelSort}
            noRecordsFoundLabel="No record found"
            searching
          />
        </Col>
        {paginationConfig && (
          <Col className="col-12">
            <Pagination paginationConfig={paginationConfig} />
          </Col>
        )}
      </Row>
    </>
  );
};

export default DatatableTables;
