import React, { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

const ButtonDropDown = ({ title, options, onClick, name, noAll ,className}) => {
  const [mainValue, setMainValue] = useState(title);
  const [open, setOpen] = useState(false);
  const handleChange = (e,show) => {
    if (!onClick || mainValue === e) return;
    setMainValue(show || e || title);
    onClick(e, name);
    // if (val) {
    //   onClick(prev => ({
    //     ...prev,
    //     [name]: {
    //       key: val,
    //       value: e,
    //       onlyvalue,
    //     },
    //   }));
    // } else {
    //   onClick(prev => ({
    //     ...prev,
    //     [name]: e,
    //   }));
    // }
  };
  return (
    <div className={className || ""}>
      <Dropdown toggle={() => setOpen(e => !e)} isOpen={open}>
        <DropdownToggle caret color="primary" className="dropdownColor">
          {mainValue}
          <i className="mdi mdi-chevron-down ml-2" />
        </DropdownToggle>
        <DropdownMenu>
          {/* <DropdownItem value="" onClick={() => handleChange('', '')}>
            All
          </DropdownItem> */}
          {!options.length ? (
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
          })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
export default ButtonDropDown;
