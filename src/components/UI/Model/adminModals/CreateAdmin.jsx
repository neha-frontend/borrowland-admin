import { AvField, AvForm, AvInput } from 'availity-reactstrap-validation';
import React, { useState, useEffect } from 'react';
import { Col, Label, Modal, Spinner } from 'reactstrap';
import PhoneInput from 'react-phone-input-2';

import RenderIf from 'components/RenderIf';
import 'react-phone-input-2/lib/style.css';
import { useSelector } from 'react-redux';

const Responbilities = [
  {
    label: 'Admin',
    permission: [
      {
        param: 'adminManagement',
        type: 'create',
        name: 'Create',
      },
      {
        param: 'adminManagement',
        type: 'update',
        name: 'Update',
      },
      {
        param: 'adminManagement',
        type: 'view',
        name: 'View',
      },
      {
        param: 'adminManagement',
        type: 'delete',
        name: 'Delete',
      },
    ],
  },
  {
    label: 'User',
    permission: [
      {
        param: 'userManagement',
        type: 'create',
        name: 'Create',
      },
      {
        param: 'userManagement',
        type: 'update',
        name: 'Update',
      },
      {
        param: 'userManagement',
        type: 'view',
        name: 'View',
      },
      {
        param: 'userManagement',
        type: 'delete',
        name: 'Delete',
      },
    ],
  },
  {
    label: 'Affiliate management',
    permission: [
      {
        param: 'affiliateManagement',
        type: 'create',
        name: 'Create',
      },
      {
        param: 'affiliateManagement',
        type: 'update',
        name: 'Update',
      },
      {
        param: 'affiliateManagement',
        type: 'view',
        name: 'View',
      },
      {
        param: 'affiliateManagement',
        type: 'delete',
        name: 'Delete',
      },
    ],
  },
  {
    label: 'Platform Variables',
    permission: [
      {
        param: 'platformVariables',
        type: 'update',
        name: 'Update',
      },
      {
        param: 'platformVariables',
        type: 'view',
        name: 'View',
      },
    ],
  },
  {
    label: 'Transaction',
    permission: [
      {
        param: 'transactionManagement',
        type: 'update',
        name: 'Update',
      },
      {
        param: 'transactionManagement',
        type: 'view',
        name: 'View',
      },
    ],
  },
  {
    label: 'Platform Management',
    permission: [
      {
        param: 'platformManagement',
        type: 'view',
        name: 'Access',
      },
    ],
  },
  {
    label: 'CMS',
    permission: [
      {
        param: 'cms',
        type: 'view',
        name: 'Access',
      },
    ],
  },
];
const CreateModal = ({
  isOpen,
  close,
  model,
  disable,
  onSubmit,
  // adminDetails?.userData,
  // generateTempPassword,
}) => {
  const [number, setNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [, setCountryCode] = useState('1');
  const [adminObj, setAdminObj] = useState({
    fullName: '',
    email: '',
    mobile: '',
    countryCode: '',
    userRole: 'admin',
    responsibilities: {
      adminManagement: {
        view: false,
        create: false,
        update: false,
        delete: false,
        sendGift: false,
        block: false,
        approve: false,
      },
      userManagement: {
        view: false,
        create: false,
        update: false,
        delete: false,
        sendGift: false,
        block: false,
        approve: false,
      },
      platformManagement: {
        view: false,
        create: false,
        update: false,
        delete: false,
        sendGift: false,
        block: false,
        approve: false,
      },
      platformVariables: {
        view: false,
        create: false,
        update: false,
        delete: false,
        sendGift: false,
        block: false,
        approve: false,
      },
      transactionManagement: {
        view: false,
        create: false,
        update: false,
        delete: false,
        sendGift: false,
        block: false,
        approve: false,
      },
      affiliateManagement: {
        view: false,
        create: false,
        update: false,
        delete: false,
        sendGift: false,
        block: false,
        approve: false,
      },
      cms: {
        view: false,
        create: false,
        update: false,
        delete: false,
        sendGift: false,
        block: false,
        approve: false,
      },
    },
  });
  const { adminDetails, isLoading, isSubmitted } = useSelector(state => state.admins);
  useEffect(() => {
    if (adminDetails?.userData?.responsibilities) {
      const { mobile, countryCode } = adminDetails?.userData;
      if (isOpen !== 'create') {
        setAdminObj({
          fullName: adminDetails?.userData?.fullName || '',
          email: adminDetails?.userData?.email || '',
          mobile: adminDetails?.userData?.mobile || '',
          countryCode: adminDetails?.userData?.countryCode || '',
          userRole: adminDetails?.userData?.userRole || '',
          responsibilities: {
            adminManagement: {
              view: adminDetails?.userData?.responsibilities?.adminManagement?.view,
              create: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.adminManagement?.create
                : false,
              update: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.adminManagement?.update
                : false,
              delete: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.adminManagement?.delete
                : false,
              sendGift: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.adminManagement?.sendGift
                : false,
              block: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.adminManagement?.block
                : false,
              approve: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.adminManagement?.approve
                : false,
            },
            userManagement: {
              view: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.userManagement?.view
                : false,
              create: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.userManagement?.create
                : false,
              update: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.userManagement?.update
                : false,
              delete: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.userManagement?.delete
                : false,
              sendGift: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.userManagement?.sendGift
                : false,
              block: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.userManagement?.block
                : false,
              approve: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.userManagement?.approve
                : false,
            },
            platformManagement: {
              view: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.platformManagement?.view
                : false,
              create: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.platformManagement?.create
                : false,
              update: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.platformManagement?.update
                : false,
              delete: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.platformManagement?.delete
                : false,
              sendGift: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.platformManagement?.sendGift
                : false,
              block: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.platformManagement?.block
                : false,
              approve: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.platformManagement?.approve
                : false,
            },
            platformVariables: {
              view: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.platformVariables?.view
                : false,
              create: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.platformVariables?.create
                : false,
              update: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.platformVariables?.update
                : false,
              delete: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.platformVariables?.delete
                : false,
              sendGift: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.platformVariables?.sendGift
                : false,
              block: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.platformVariables?.block
                : false,
              approve: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.platformVariables?.approve
                : false,
            },
            transactionManagement: {
              view: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.transactionManagement?.view
                : false,
              create: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.transactionManagement?.create
                : false,
              update: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.transactionManagement?.update
                : false,
              delete: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.transactionManagement?.delete
                : false,
              sendGift: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.transactionManagement?.sendGift
                : false,
              block: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.transactionManagement?.block
                : false,
              approve: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.transactionManagement?.approve
                : false,
            },
            affiliateManagement: {
              view: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.affiliateManagement?.view
                : false,
              create: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.affiliateManagement?.create
                : false,
              update: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.affiliateManagement?.update
                : false,
              delete: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.affiliateManagement?.delete
                : false,
              sendGift: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.affiliateManagement?.sendGift
                : false,
              block: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.affiliateManagement?.block
                : false,
              approve: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities.affiliateManagement?.approve
                : false,
            },
            cms: {
              view: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.cms?.view
                : false,
              create: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.cms?.create
                : false,
              update: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.cms?.update
                : false,
              delete: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.cms?.delete
                : false,
              sendGift: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.cms?.sendGift
                : false,
              block: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.cms?.block
                : false,
              approve: adminDetails?.userData?.responsibilities
                ? adminDetails?.userData?.responsibilities?.cms?.approve
                : false,
            },
          },
        });

        if (adminDetails?.userData?.mobile) {
          const phoneNumber = `${countryCode || ''}${mobile || ''}`;
          setNumber(phoneNumber);
          setPhone(adminDetails?.userData?.mobile.toString());
        }
      }
    }
  }, [adminDetails?.userData?.responsibilities]);

  const handleChange = (x, num) => {
    const l = num.dialCode.length;
    const mobile = x.slice(l);
    setNumber(x);
    setPhone(mobile);
    setCountryCode(num.dialCode);
    if (mobile) {
      setError('');
      setAdminObj({ ...adminObj, mobile, countryCode: `+${num.dialCode}` });
    } else {
      setError('Phone number is required');
    }
  };

  function togCreate() {
    close(false);
    // window.location.reload();
  }

  // eslint-disable-next-line no-unused-vars
  const submit = (event, values) => {
    if (!phone) {
      setError('Phone number is required');
    } else {
      const objToPost = adminObj;
      onSubmit(objToPost);
    }
  };
  // const renderCheckbox = item => {
  //   console.log('Render');
  //   return (
  //     <>
  //       <AvInput
  //         className="mright-1 ml-1"
  //         type="checkbox"
  //         name={item.name}
  //         defaultChecked={adminObj?.responsibilities[item.param][item.type]}
  //         onChange={e => (adminObj.responsibilities[item.param][item.type] = e?.target?.checked)}
  //       />
  //     </>
  //   );
  // };

  return (
    <>
      <div>
        <div>
          <Modal centered isOpen={!!isOpen} className="modal620">
            <div className="modal-header">
              <h5 className="modal-title mt-0 text-center w-100" id="myModalLabel">
                {isOpen === 'view' ? 'View' : isOpen === 'edit' ? 'Edit' : 'Create'} Admin
              </h5>
              <button
                type="button"
                onClick={() => {
                  close(false);
                  // window.location.reload();
                }}
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <AvForm onValidSubmit={submit} model={model} disabled={disable}>
              <div className="modal-body">
                <div className="row mb-4">
                  <Label for="horizontal-firstname-Input" className="col-sm-3 col-form-Label">
                    Name
                  </Label>
                  <Col sm={12}>
                    {isLoading ? (
                      <div className="skel" />
                    ) : (
                      <AvField
                        type="text"
                        className="form-control"
                        id="horizontal-firstname-Input"
                        name="fullName"
                        value={adminObj?.fullName}
                        required
                        validate={{
                          required: {
                            value: true,
                            errorMessage: 'Name is required',
                          },
                          pattern: {
                            value: /^([a-zA-Z ]{1,})$/i,
                            errorMessage: 'Enter valid Admin name',
                          },
                        }}
                        onChange={e => (adminObj.fullName = e?.target?.value)}
                        placeholder="Name"
                      />
                    )}
                  </Col>
                </div>
                <div className="row mb-4">
                  <Label for="horizontal-email-Input" className="col-sm-3 col-form-Label">
                    Email
                  </Label>
                  <Col sm={12}>
                    {isLoading ? (
                      <div className="skel" />
                    ) : (
                      <AvField
                        name="email"
                        value={adminObj?.email}
                        className="form-control"
                        placeholder="Enter email"
                        disabled={isOpen === 'edit' || isOpen === 'view'}
                        type="email"
                        required
                        errorMessage="Email is required"
                        validate={{
                          required: { value: true },
                          pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                            errorMessage: 'Enter valid email',
                          },
                        }}
                        onChange={e => (adminObj.email = e?.target?.value)}
                      />
                    )}
                  </Col>
                </div>
                <div className="row mb-4">
                  <Label for="horizontal-password-Input" className="col-sm-3 col-form-Label">
                    Mobile Number
                  </Label>
                  <Col sm={12} className={error ? 'is-invalid' : ''}>
                    {isLoading ? (
                      <div className="skel" />
                    ) : (
                      <PhoneInput
                        inputStyle={{ width: '100%', paddingLeft: '50px', height: '50px' }}
                        country="us"
                        enableSearch
                        disabled={disable}
                        value={number}
                        onChange={handleChange}
                        autoFormat={false}
                        name="mobile"
                        inputClass={error ? 'is-invalid' : ''}
                        inputProps={{
                          name: 'phone',
                          required: true,
                          autoFocus: true,
                        }}
                        countryCodeEditable={false}
                      />
                    )}
                  </Col>
                  <p className="invalid-feedback d-block">{error}</p>
                </div>
                <div className="col-sm-auto mb-4">
                  <label className="" htmlFor="autoSizingSelect">
                    Select Role
                  </label>
                  {isLoading ? (
                    <div className="skel" />
                  ) : (
                    <AvField
                      name="userRole"
                      type="select"
                      className="form-select p-2"
                      id="autoSizingSelect"
                      value={adminObj.userRole}
                      onChange={e => (adminObj.userRole = e?.target?.value)}
                      disabled
                    >
                      <option value="admin" selected>
                        Admin
                      </option>
                      <option value="super-admin">Super Admin</option>
                    </AvField>
                  )}
                </div>
                <fieldset className="scheduler-border">
                  <legend className="scheduler-border">
                    Responbilities{' '}
                    <AvInput
                      className="mright-1 ml-1"
                      type="checkbox"
                      // name={item.name}
                      // defaultChecked={
                      //   adminDetails?.userData?.responsibilities
                      //     ? adminDetails?.userData?.responsibilities[item.param][
                      //         item.type
                      //       ]
                      //     : adminObj?.responsibilities[item.param][item.type]
                      // }
                      // onChange={e =>
                      //   (adminObj.responsibilities[item.param][item.type] =
                      //     e?.target?.checked)
                      // }
                    />
                  </legend>
                  {adminDetails?.userData?.responsibilities &&
                    Responbilities?.map(items => (
                      <>
                        {isLoading ? (
                          <div className="skel" />
                        ) : (
                          <div className="d-flex ">
                            <div className="w-145">{items.label}</div>
                            {items.permission.map(item => (
                              <div className="d-flex align-items-center minWidth_100">
                                {/* <input
                            type="checkbox"
                            className="mright-1 ml-1"
                            checked={adminObj.responsibilities[item.param][item.type]}
                            onChange={e =>
                              (adminObj.responsibilities[item.param][item.type] =
                                e?.target?.checked)
                            }
                          /> */}
                                <AvInput
                                  className="mright-1 ml-1"
                                  type="checkbox"
                                  name={item.name}
                                  defaultChecked={
                                    adminDetails?.userData?.responsibilities
                                      ? adminDetails?.userData?.responsibilities[item.param][
                                          item.type
                                        ]
                                      : adminObj?.responsibilities[item.param][item.type]
                                  }
                                  onChange={e =>
                                    (adminObj.responsibilities[item.param][item.type] =
                                      e?.target?.checked)
                                  }
                                />

                                {item.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ))}
                  {isOpen === 'create' &&
                    Responbilities?.map(items => (
                      <>
                        {isLoading ? (
                          <div className="skel" />
                        ) : (
                          <div className="d-flex ">
                            <div className="w-145">{items.label}</div>
                            {items.permission.map(item => (
                              <div className="d-flex align-items-center minWidth_100">
                                {/* <input
                            type="checkbox"
                            className="mright-1 ml-1"
                            checked={adminObj.responsibilities[item.param][item.type]}
                            onChange={e =>
                              (adminObj.responsibilities[item.param][item.type] =
                                e?.target?.checked)
                            }
                          /> */}
                                <AvInput
                                  className="mright-1 ml-1"
                                  type="checkbox"
                                  name={item.name}
                                  defaultChecked={
                                    adminDetails?.userData?.responsibilities
                                      ? adminDetails?.userData?.responsibilities[item.param][
                                          item.type
                                        ]
                                      : adminObj?.responsibilities[item.param][item.type]
                                  }
                                  onChange={e =>
                                    (adminObj.responsibilities[item.param][item.type] =
                                      e?.target?.checked)
                                  }
                                />

                                {item.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ))}
                </fieldset>
              </div>
              <RenderIf render={isOpen === 'edit' || isOpen === 'create'}>
                <div className="modal-footer">
                  <div className="row w-100">
                    <div className="col ps-0">
                      {isOpen === 'create' && (
                        <button
                          type="button"
                          onClick={() => {
                            close(false);
                          }}
                          className="btn btn-danger waves-effect waves-light w-100"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                    <div className="col pe-0">
                      {(isOpen === 'create' || isOpen === 'edit') && (
                        <button
                          type="submit"
                          // onClick={submit}
                          className="btn btn-success waves-effect waves-light w-100"
                          disabled={isSubmitted}
                        >
                          {isSubmitted ? <Spinner className="h_20 w_20" /> : 'Submit'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </RenderIf>
              <RenderIf render={isOpen === 'view'}>
                <div className="modal-footer">
                  <button
                    type="button"
                    onClick={() => {
                      togCreate();
                    }}
                    className="btn btn-primary waves-effect w-50 mx-auto"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </RenderIf>
            </AvForm>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CreateModal;
