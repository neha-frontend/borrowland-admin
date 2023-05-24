export const adminColumn = [
  {
    label: 'Admin Name',
    field: 'name',
    sort: 'asc',
    width: 150,
  },
  {
    label: 'Role',
    field: 'userRole',
    sort: 'disabled',
    width: 200,
  },
  {
    label: 'Admin Email',
    field: 'email',
    sort: 'asc',
    width: 270,
  },
  {
    label: 'Last Login',
    field: 'createdAt',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Status',
    field: 'status',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Action',
    field: 'action',
    width: 100,
    sort: 'disabled',
  },
];

export const userColumn = [
  {
    label: 'Full Name',
    field: 'fullName',
    sort: 'asc',
    width: 250,
  },
  {
    label: 'KYC Status',
    field: 'kyc',
    sort: 'asc',
    width: 250,
  },
  // {
  //   label: 'Role',
  //   field: 'role',
  //   sort: 'disabled',
  //   width: 200,
  // },
  {
    label: 'Country',
    field: 'country',
    sort: 'asc',
    width: 250,
  },
  {
    label: 'Total Balance',
    field: 'totalBalance',
    sort: 'disabled',
    width: 250,
  },
  {
    label: 'Created At',
    field: 'createdAt',
    sort: 'disabled',
    width: 250,
  },
  {
    label: 'Action',
    field: 'action',
    width: 100,
    sort: 'disabled',
  },
];

export const walletHistoryColumn = [
  {
    label: 'Timestamp',
    field: 'createdAt',
    sort: 'asc',
    width: 150,
  },
  {
    label: 'Token',
    field: 'token',
    sort: 'disabled',
    width: 100,
  },
  // {
  //   label: 'Role',
  //   field: 'role',
  //   sort: 'disabled',
  //   width: 200,
  // },
  {
    label: 'Token Quantity',
    field: 'amount',
    sort: 'asc',
    width: 270,
  },
  {
    label: 'Action',
    field: 'type',
    sort: 'disabled',
    width: 100,
  },

  {
    label: 'Status',
    field: 'status',
    width: 100,
    sort: 'disabled',
  },
];

export const loanHistoryColumn = [
  {
    label: 'Timestamp',
    field: 'updatedAt',
    sort: 'asc',
    width: 150,
  },

  // {
  //   label: 'Role',
  //   field: 'role',
  //   sort: 'disabled',
  //   width: 200,
  // },
  {
    label: 'Token Quantity',
    field: 'loanAmount',
    sort: 'asc',
    width: 270,
  },
  {
    label: 'Collateral Amount',
    field: 'collateralAmount',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Tenure',
    field: 'tenure',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Payable Amount',
    field: 'pendingAmount',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Due Date',
    field: 'dueDate',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Status',
    field: 'status',
    width: 100,
    sort: 'disabled',
  },
];

export const lendingHistoryColumn = [
  {
    label: 'Timestamp',
    field: 'createdAt',
    sort: 'asc',
    width: 150,
  },

  // {
  //   label: 'Role',
  //   field: 'role',
  //   sort: 'disabled',
  //   width: 200,
  // },
  {
    label: 'Token Quantity',
    field: 'amount',
    sort: 'asc',
    width: 270,
  },

  {
    label: 'Tenure',
    field: 'tenure',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Interest',
    field: 'interestRate',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Due Date',
    field: 'dueDate',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Status',
    field: 'status',
    width: 100,
    sort: 'disabled',
  },
];

export const earningHistoryColumn = [
  {
    label: 'Timestamp',
    field: 'createdAt',
    sort: 'asc',
    width: 150,
  },

  // {
  //   label: 'Role',
  //   field: 'role',
  //   sort: 'disabled',
  //   width: 200,
  // },
  {
    label: 'Token Quantity',
    field: 'amount',
    sort: 'asc',
    width: 270,
  },

  {
    label: 'Token',
    field: 'token',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Interest Type',
    field: 'type',
    sort: 'disabled',
    width: 100,
  },

  {
    label: 'Status',
    field: 'status',
    width: 100,
    sort: 'disabled',
  },
];

export const swappingHistoryColumn = [
  {
    label: 'Timestamp',
    field: 'createdAt',
    sort: 'asc',
    width: 150,
  },

  // {
  //   label: 'Role',
  //   field: 'role',
  //   sort: 'disabled',
  //   width: 200,
  // },
  {
    label: 'From Token',
    field: 'from',
    sort: 'asc',
    width: 270,
  },

  {
    label: 'To Token',
    field: 'to',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Token Quantity',
    field: 'amount',
    sort: 'disabled',
    width: 100,
  },

  {
    label: 'Status',
    field: 'status',
    width: 100,
    sort: 'disabled',
  },
];

export const affiliateWalletHistoryColumn = [
  {
    label: 'Timestamp',
    field: 'updated',
    sort: 'asc',
    width: 150,
  },
  {
    label: 'Token',
    field: 'tokenVal',
    sort: 'disabled',
    width: 100,
  },
  // {
  //   label: 'Role',
  //   field: 'role',
  //   sort: 'disabled',
  //   width: 200,
  // },
  {
    label: 'Token Quantity',
    field: 'token',
    sort: 'asc',
    width: 270,
  },
  {
    label: 'Action',
    field: 'type',
    sort: 'disabled',
    width: 100,
  },

  {
    label: 'Status',
    field: 'update',
    width: 100,
    sort: 'disabled',
  },
];

export const affiliateLoanHistoryColumn = [
  {
    label: 'Timestamp',
    field: 'updated',
    sort: 'asc',
    width: 150,
  },

  {
    label: 'Token Quantity',
    field: 'token',
    sort: 'asc',
    width: 270,
  },
  {
    label: 'Collateral Amount',
    field: 'token',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Tenure',
    field: 'tenure',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Payable Amount',
    field: 'token',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Due Date',
    field: 'updated',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Status',
    field: 'update',
    width: 100,
    sort: 'disabled',
  },
];

export const affiliateLendingHistoryColumn = [
  {
    label: 'Timestamp',
    field: 'updated',
    sort: 'asc',
    width: 150,
  },

  // {
  //   label: 'Role',
  //   field: 'role',
  //   sort: 'disabled',
  //   width: 200,
  // },
  {
    label: 'Token Quantity',
    field: 'token',
    sort: 'asc',
    width: 270,
  },

  {
    label: 'Tenure',
    field: 'tenure',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Interest',
    field: 'distributed',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Due Date',
    field: 'updated',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Status',
    field: 'request',
    width: 100,
    sort: 'disabled',
  },
];

export const affliateEarningHistoryColumn = [
  {
    label: 'Timestamp',
    field: 'updated',
    sort: 'asc',
    width: 150,
  },

  // {
  //   label: 'Role',
  //   field: 'role',
  //   sort: 'disabled',
  //   width: 200,
  // },
  {
    label: 'Token Quantity',
    field: 'token',
    sort: 'asc',
    width: 270,
  },

  {
    label: 'wallet Address',
    field: 'address',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Interest',
    field: 'tenure',
    sort: 'disabled',
    width: 100,
  },

  {
    label: 'Status',
    field: 'request',
    width: 100,
    sort: 'disabled',
  },
];

export const affiliateSwappingHistoryColumn = [
  {
    label: 'Timestamp',
    field: 'updated',
    sort: 'asc',
    width: 150,
  },

  // {
  //   label: 'Role',
  //   field: 'role',
  //   sort: 'disabled',
  //   width: 200,
  // },
  {
    label: 'From Token',
    field: 'txnid',
    sort: 'asc',
    width: 270,
  },

  {
    label: 'To Token',
    field: 'txnid',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Token Quantity',
    field: 'token',
    sort: 'disabled',
    width: 100,
  },

  {
    label: 'Status',
    field: 'request',
    width: 100,
    sort: 'disabled',
  },
];

export const PlatformVariablesColumn = [
  {
    label: 'Variable Name',
    field: 'variableName',
    sort: 'asc',
    width: 150,
  },

  // {
  //   label: 'Role',
  //   field: 'role',
  //   sort: 'disabled',
  //   width: 200,
  // },
  {
    label: 'Value',
    field: 'values',
    sort: 'asc',
    width: 270,
  },

  {
    label: 'Last Update Date & Time',
    field: 'createdAt',
    sort: 'asc',
    width: 100,
  },

  {
    label: 'Action',
    field: 'action',
    width: 100,
    sort: 'disabled',
  },
];

export const PlatformVariablesHistoryColumn = [
  {
    label: 'TimeStamp',
    field: 'createdAt',
    sort: 'disabled',
    width: 150,
  },

  // {
  //   label: 'Role',
  //   field: 'role',
  //   sort: 'disabled',
  //   width: 200,
  // },
  {
    label: 'Previous Tenure',
    field: 'tenure',
    sort: 'disabled',
    width: 270,
  },
  {
    label: 'Previous value',
    field: 'value',
    sort: 'disabled',
    width: 270,
  },
  {
    label: 'Activity',
    field: 'activity',
    sort: 'disabled',
    width: 270,
  },
];

export const loanManagementColumn = [
  {
    label: 'Loan ID',
    field: 'loanId',
    sort: 'asc',
    width: 150,
  },

  // {
  //   label: 'Role',
  //   field: 'role',
  //   sort: 'disabled',
  //   width: 200,
  // },
  {
    label: `Borrower's Name`,
    field: 'userName',
    sort: 'asc',
    width: 270,
  },
  {
    label: 'Loan Amount',
    field: 'LoanAmount',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Token',
    field: 'token',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Date',
    field: 'createdAt',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Total Amount',
    field: 'totalAmount',
    sort: 'disabled',
    width: 100,
  },
];

export const earningManagementColumn = [
  {
    label: 'Loan ID',
    field: 'loanId',
    sort: 'asc',
    width: 150,
  },

  // {
  //   label: 'Role',
  //   field: 'role',
  //   sort: 'disabled',
  //   width: 200,
  // },
  {
    label: `User's Name`,
    field: 'userFullname',
    sort: 'asc',
    width: 270,
  },
  // {
  //   label: 'Profit',
  //   field: 'profit',
  //   sort: 'disabled',
  //   width: 100,
  // },
  {
    label: 'Txn. Type',
    field: 'txnType',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Date',
    field: 'createdAt',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Total Earning',
    field: 'amount',
    sort: 'disabled',
    width: 100,
  },
];

export const lendingManagementColumn = [
  {
    label: 'Loan ID',
    field: 'loanId',
    sort: 'asc',
    width: 150,
  },

  // {
  //   label: 'Role',
  //   field: 'role',
  //   sort: 'disabled',
  //   width: 200,
  // },
  {
    label: `User's Name`,
    field: 'userFullName',
    sort: 'asc',
    width: 270,
  },
  {
    label: 'Profit',
    field: 'profit',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Date',
    field: 'createdAt',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Total Lending',
    field: 'finalAmount',
    sort: 'disabled',
    width: 100,
  },
];

export const swapManagementColumn = [
  {
    label: 'Timestamp',
    field: 'createdAt',
    sort: 'asc',
    width: 150,
  },

  // {
  //   label: 'Role',
  //   field: 'role',
  //   sort: 'disabled',
  //   width: 200,
  // },
  {
    label: 'By',
    field: 'senderWalletAddress',
    sort: 'asc',
    width: 270,
  },
  {
    label: 'From Currency',
    field: 'from',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'To Currency',
    field: 'to',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Txn. Hash',
    field: 'txnHash',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Amount',
    field: 'amount',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Gas Fee',
    field: 'fee',
    sort: 'disabled',
    width: 100,
  },
  // {
  //   label: 'Txn. Type',
  //   field: 'type',
  //   sort: 'disabled',
  //   width: 100,
  // },
  {
    label: 'Status',
    field: 'status',
    sort: 'disabled',
    width: 100,
  },
];

export const transactionManagementColumn = [
  {
    label: 'Timestamp',
    field: 'id',
    sort: 'asc',
    width: 150,
  },

  // {
  //   label: 'Role',
  //   field: 'role',
  //   sort: 'disabled',
  //   width: 200,
  // },
  {
    label: 'By',
    field: 'name',
    sort: 'asc',
    width: 270,
  },
  {
    label: 'To',
    field: 'to',
    sort: 'disabled',
    width: 270,
  },
  {
    label: 'Currency',
    field: 'currency',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Txn. Hash',
    field: 'txnHash',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Amount',
    field: 'amount',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Gas Fee',
    field: 'fee',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Txn. Type',
    field: 'txnType',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Status',
    field: 'status',
    sort: 'disabled',
    width: 100,
  },
];

export const pendingTransactionColumn = [
  {
    label: 'Timestamp',
    field: 'createdAt',
    sort: 'asc',
    width: 150,
  },
  {
    label: 'By',
    field: 'by',
    sort: 'asc',
    width: 270,
  },
  {
    label: 'Currency',
    field: 'currency',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'User Role',
    field: 'userRole',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Amount',
    field: 'amount',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Txn. Type',
    field: 'txnType',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Status',
    field: 'status',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Action',
    field: 'action',
    width: 100,
    sort: 'disabled',
  },
];

export const withdrawManagementColumn = [
  {
    label: 'Timestamp',
    field: 'createdAt',
    sort: 'asc',
    width: 150,
  },
  {
    label: 'By',
    field: 'by',
    sort: 'asc',
    width: 270,
  },
  {
    label: 'Currency',
    field: 'currency',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'User Role',
    field: 'userRole',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Amount',
    field: 'amount',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Txn. Type',
    field: 'txnType',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Status',
    field: 'status',
    sort: 'disabled',
    width: 100,
  },
];
export const BuyStep = [
  {
    label: 'Sr. No.',
    field: 'number',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Step Name',
    field: 'name',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Step Description',
    field: 'description',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Date',
    field: 'date',
    sort: 'disabled',
    width: 100,
  },
  // {
  //   label: 'Status',
  //   field: 'status',
  //   sort: 'disabled',
  //   width: 100,
  // },
  {
    label: 'Action',
    field: 'action',
    sort: 'disabled',
    width: 100,
  },
];

export const MarketChartColumn = [
  {
    label: 'Year',
    field: 'year',
    width: 100,
  },
  {
    label: 'Rent($)',
    field: 'rent',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Appreciation($)',
    field: 'appreciation',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Action',
    field: 'action',
    sort: 'disabled',
    width: 100,
  },
];

export const fiatColumn = [
  {
    label: 'Date & Time',
    field: 'registration_date',
    sort: 'asc',
    width: 150,
  },
  {
    label: 'Amount',
    field: 'amount',
    sort: 'asc',
    width: 270,
  },
  {
    label: 'To',
    field: 'to',
    sort: 'asc',
    width: 150,
  },
  {
    label: 'From',
    field: 'description',
    sort: 'disabled',
    width: 200,
  },

  {
    label: 'Status',
    field: 'status',
    sort: 'disabled',
    width: 100,
  },
];

export const withdrawColumn = [
  {
    label: 'Date & Time',
    field: 'registration_date',
    sort: 'asc',
    width: 150,
  },
  {
    label: 'Amount',
    field: 'amount',
    sort: 'asc',
    width: 270,
  },
  {
    label: 'To',
    field: 'to',
    sort: 'asc',
    width: 150,
  },
  {
    label: 'From',
    field: 'description',
    sort: 'disabled',
    width: 200,
  },

  {
    label: 'Status',
    field: 'status',
    sort: 'disabled',
    width: 100,
  },
];

export const investorColumn = [
  {
    label: 'Name',
    field: 'name',
    width: 100,
  },
  {
    label: 'Email',
    field: 'email',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'KycStatus',
    field: 'kyc',
    sort: 'disabled',
    width: 100,
  },
  // {
  //   label: 'Portfolio Value',
  //   field: 'deposite',
  //   sort: 'disabled',
  //   width: 100,
  // },
  {
    label: 'Last Login',
    field: 'date',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Action',
    field: 'action',
    sort: 'disabled',
    width: 100,
  },
];

export const cashflowColumn = [
  {
    label: 'Asset',
    field: 'title',
    width: 100,
  },
  {
    label: 'Rent/Month',
    field: 'deposite',
    sort: 'disabled',
    width: 100,
  },
  // {
  //   label: 'Portfolio Value',
  //   field: 'deposite',
  //   sort: 'disabled',
  //   width: 100,
  // },
  {
    label: 'Next Payout Date',
    field: 'updated',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Next Payout Summary',
    field: 'label',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Status',
    field: 'update',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Action',
    field: 'action',
    sort: 'disabled',
    width: 100,
  },
];

export const cashflowDetailColumn = [
  {
    label: 'Investor Name',
    field: 'title',
    width: 100,
  },
  {
    label: 'Token owned',
    field: 'token',
    sort: 'disabled',
    width: 100,
  },
  // {
  //   label: 'Portfolio Value',
  //   field: 'deposite',
  //   sort: 'disabled',
  //   width: 100,
  // },
  {
    label: 'Duration',
    field: 'duration',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Start Date',
    field: 'updated',
    sort: 'disabled',
    width: 100,
  },
];

export const governanceColumn = [
  {
    label: 'Proposal Title',
    field: 'title',
    width: 100,
  },
  {
    label: 'Votes (In Favor)',
    field: 'favor',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Votes (Against)',
    field: 'against',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'End Date',
    field: 'date',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Status',
    field: 'pslstatus',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Request',
    field: 'request',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Action',
    field: 'action',
    sort: 'disabled',
    width: 100,
  },
];

export const portfolioColumn = [
  {
    label: 'Asset',
    field: 'title',
    width: 100,
  },
  {
    label: 'Allocation',
    field: 'distributed',
    width: 100,
  },
  {
    label: 'Balance',
    field: 'deposite',
    width: 100,
  },
  {
    label: 'Action',
    field: 'action',
    sort: 'disabled',
    width: 100,
  },
];

export const AssetPortfolioColumn = [
  {
    label: 'Time stamp',
    field: 'updated',
  },
  {
    label: 'Purpose',
    field: 'purpose',
  },
  {
    label: 'No. of tokens',
    field: 'token',
  },
  {
    label: 'Amount($)',
    field: 'favor',
  },
  {
    label: 'Txn Id',
    field: 'mobile',
  },
];

export const ProposalsColumn = [
  {
    label: 'Proposal Title',
    field: 'title',
    width: 100,
  },
  {
    label: 'Votes (In Favor)',
    field: 'favor',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Votes (Against)',
    field: 'against',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'End Date',
    field: 'date',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Status',
    field: 'pslstatus',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Action',
    field: 'action',
    sort: 'disabled',
    width: 100,
  },
];

export const affiliateColumn = [
  {
    label: 'Affiliate ID',
    field: '_id',
    sort: 'asc',
    width: 150,
  },
  {
    label: 'User name',
    field: 'fullName',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Total Balance',
    field: 'totalBalance',
    sort: 'asc',
    width: 270,
  },
  {
    label: 'Withdraw',
    field: 'totalWithdrawal',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Status',
    field: 'status',
    sort: 'disabled',
    width: 100,
  },
  {
    label: 'Action',
    field: 'action',
    width: 100,
    sort: 'disabled',
  },
];
