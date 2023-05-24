import React, { useState } from 'react';
import {
  Button,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';

// eslint-disable-next-line no-unused-vars
const Filter = ({ title, className, onClick }) => {
  // const Filter = ({ title, options, onClick, name, noAll, className }) => {

  // const [mainValue, setMainValue] = useState(title);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('admin');
  const [status, setStatus] = useState(true);

  // const handleChange = (e,show) => {
  //   if (!onClick || mainValue === e) return;
  //   setMainValue(show || e || title);
  //   onClick(e, name);
  //   if (val) {
  //     onClick(prev => ({
  //       ...prev,
  //       [name]: {
  //         key: val,
  //         value: e,
  //         onlyvalue,
  //       },
  //     }));
  //   } else {
  //     onClick(prev => ({
  //       ...prev,
  //       [name]: e,
  //     }));
  //   }
  // };
  const handleClick = (value, name) => {
    if (name === 'Role') {
      setRole(value);
    } else {
      setStatus(value);
    }
  };
  const submit = name => {
    onClick(status, role, name);
    setOpen(e => !e);
    if (name === 'reset') {
      setRole('admin');
      setStatus(true);
    }
  };
  return (
    <div className={className || ''}>
      <Dropdown toggle={() => setOpen(e => !e)} isOpen={open}>
        <DropdownToggle caret color="primary" className="dropdownColor">
          {title}
          <i className="mdi mdi-chevron-down ml-2" />
        </DropdownToggle>
        <DropdownMenu style={{ width: 350 }}>
          <DropdownItem text>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="exampleSelect">Role</Label>
                  <Input
                    type="select"
                    name="select"
                    value={role}
                    id="exampleSelect"
                    onChange={e => handleClick(e.target.value, 'Role')}
                  >
                    <option value="admin">Admin</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="exampleSelect">Status</Label>
                  <Input
                    type="select"
                    name="select"
                    value={status}
                    id="exampleSelect"
                    onChange={e => handleClick(e.target.value, 'Status')}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-3">
              <div className="d-flex justify-content-center text-center">
                <Button className="mr-5" onClick={() => submit('reset')}>
                  Reset
                </Button>
                <Button type="button" className="button-color" onClick={() => submit('submit')}>
                  Apply
                </Button>
              </div>
            </Row>
          </DropdownItem>
          {/* <DropdownItem value="" onClick={() => handleChange('', '')}>
            All
          </DropdownItem> */}
          {/* {!options.length ? (
            <DropdownItem>No data</DropdownItem>
          ) : !noAll ? (
            <DropdownItem value="" onClick={() => handleChange('', '')}>
              All
            </DropdownItem>
          ) : null}
          {options.map(item => {
            if (typeof item === 'object') {
              return (
                <DropdownItem
                  key={Object.keys(item)[0]}
                  value={Object.values(item)[0]}
                  onClick={e => handleChange(e.target.value, Object.keys(item)[0])}
                  // active={item === title}
                >
                  {Object.keys(item)[0]}
                </DropdownItem>
              );
            }
            return (
              <DropdownItem
                key={item}
                value={item}
                onClick={e => handleChange(e.target.value)}
                active={item === mainValue}
              >
                {item}
              </DropdownItem>
            );
          })} */}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
export default Filter;
