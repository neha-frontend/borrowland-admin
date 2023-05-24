import React from 'react';

export const guestRoutes = [
  {
    path: '/signin',
    name: 'Signin',
    exact: true,
    component: React.lazy(() => import('../../views/auth/Login/Login')),
  },
  {
    path: '/otp',
    name: 'OTPVERIFY',
    exact: true,
    component: React.lazy(() => import('../../views/auth/Login/OtpScreen')),
  },
  {
    path: '/reset-password',
    name: 'OTPVERIFY',
    exact: true,
    component: React.lazy(() => import('../../views/auth/Login/ResetPassword')),
  },
];

export const userRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    exact: true,
    component: React.lazy(() => import('../../views/user/Dashboard/Dashboard')),
  },
  {
    path: '/admin-management',
    name: 'Admin-management',
    exact: true,
    component: React.lazy(() => import('../../views/adminManagment/AdminManagment')),
  },
  {
    path: '/user-management',
    name: 'User-management',
    exact: true,
    component: React.lazy(() => import('../../views/userManagement/UserManagement')),
  },
  {
    path: '/user-management/user-detail/:id',
    name: 'user-details',
    exact: true,
    component: React.lazy(() => import('../../views/userManagement/ViewUserDetails')),
  },
  {
    path: '/platform-management/loan-management',
    name: 'Loan-management',
    exact: true,
    component: React.lazy(() => import('../../views/platformManagement/LoanManagement')),
  },
  {
    path: '/platform-management/earning-management',
    name: 'Earning-management',
    exact: true,
    component: React.lazy(() => import('../../views/platformManagement/EarningManagement')),
  },
  {
    path: '/platform-management/lending-management',
    name: 'Lending-management',
    exact: true,
    component: React.lazy(() => import('../../views/platformManagement/LendingManagement')),
  },
  {
    path: '/platform-management/swap-management',
    name: 'Swap-management',
    exact: true,
    component: React.lazy(() => import('../../views/platformManagement/SwapManagement')),
  },
  {
    path: '/platform-variables',
    name: 'Platform-variables',
    exact: true,
    component: React.lazy(() => import('../../views/platformVariables/PlatformVariable')),
  },
  {
    path: '/transaction-management',
    name: 'Transaction-management',
    exact: true,
    component: React.lazy(() => import('../../views/transactionManagement/TransactionManagement')),
  },
  {
    path: '/withdraw-management',
    name: 'Withdraw-management',
    exact: true,
    component: React.lazy(() => import('../../views/withdrawManagement/WithdrawManagement')),
  },
  {
    path: '/affiliate-management',
    name: 'Affiliate-management',
    exact: true,
    component: React.lazy(() => import('../../views/affiliateManagement/AffiliateManagement')),
  },
  {
    path: '/affiliate-management/affiliate-user/:id',
    name: 'user-details',
    exact: true,
    // component: React.lazy(() => import('../../views/affiliateManagement/ViewAffiliateUser')),
    component: React.lazy(() => import('../../views/userManagement/ViewUserDetails')),
  },
  {
    path: '/cms',
    name: 'CMS',
    exact: true,
    component: React.lazy(() => import('../../views/cms/cms')),
  },
  {
    path: '/support',
    name: 'Support',
    exact: true,
    component: React.lazy(() => import('../../views/support/Support')),
  },

  {
    path: '/early-investors',
    name: 'Users-early-invester',
    exact: true,
    component: React.lazy(() => import('../../views/user/users/EarlyInvestors')),
  },
  {
    path: '/investors',
    name: 'Users-invesrtors',
    exact: true,
    component: React.lazy(() => import('../../views/investor/Investor')),
  },
  {
    path: '/property-managers',
    name: 'Users-property-manager',
    exact: true,
    component: React.lazy(() => import('../../views/user/users/PropertyManagers')),
  },
  {
    path: '/view-user',
    name: 'ViewUSER',
    exact: true,
    component: React.lazy(() => import('../../views/ViewUser/ViewUser')),
  },

  {
    path: '/account-details',
    name: 'Account-details',
    exact: true,
    component: React.lazy(() => import('../../views/accountDetails/AccountDetails')),
  },
  {
    path: '/wallet',
    name: 'Wallet',
    exact: true,
    component: React.lazy(() => import('../../views/wallet/FiatWallet')),
  },
  {
    path: '/draft-properties',
    name: 'Draft Properties',
    exact: true,
    component: React.lazy(() => import('../../views/properties/DraftProperties')),
  },
  {
    path: '/published-properties',
    name: 'Published Properties',
    exact: true,
    component: React.lazy(() => import('../../views/properties/PublishedProperties')),
  },
  {
    path: '/edit-property',
    name: 'Edit Property',
    exact: true,
    component: React.lazy(() => import('../../views/properties/EditProperty')),
  },
  {
    path: '/market-management',
    name: 'Market Management',
    exact: true,
    component: React.lazy(() => import('../../views/properties/MarketManagement')),
  },
  {
    path: '/market-detail',
    name: 'Market detail',
    exact: true,
    component: React.lazy(() => import('../../views/properties/EditProperty')),
  },
  {
    path: '/cashflow',
    name: 'Cashflow',
    exact: true,
    component: React.lazy(() => import('../../views/cashflow/Cashflow')),
  },
  {
    path: '/rental-detail',
    name: 'Cashflow Detail',
    exact: true,
    component: React.lazy(() => import('../../views/cashflow/CashflowDetail')),
  },
  {
    path: '/governance',
    name: 'Governance',
    exact: true,
    component: React.lazy(() => import('../../views/governance/Governance')),
  },
  {
    path: '/profile',
    name: 'Profile detail',
    exact: true,
    component: React.lazy(() => import('../../views/profle/profile')),
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    exact: true,
    component: React.lazy(() => import('../../views/portfolio/Portfolio')),
  },
  {
    path: '/portfolio-property',
    name: 'Portfolio Property',
    exact: true,
    component: React.lazy(() => import('../../views/portfolio/AssetPortfolio')),
  },
  {
    path: '/property-proposals',
    name: 'Property Proposals',
    exact: true,
    component: React.lazy(() => import('../../views/portfolio/Proposals')),
  },
  {
    path: '/view-proposal',
    name: 'View Proposal',
    exact: true,
    component: React.lazy(() => import('../../views/portfolio/ViewProposal')),
  },
  {
    redirectRoute: true,
    name: 'dashboardRedirect',
    path: '/dashboard',
  },
];
