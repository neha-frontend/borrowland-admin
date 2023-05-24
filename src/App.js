import { lazy, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// import SweetAlert from 'react-bootstrap-sweetalert';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
// import { ToastContainer } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import LogoLoader from 'components/UI/Spinner/LogoSpinner';
import { authenticationValidator } from './store/actions';
// import { Spinner } from './components';
import { guestRoutes } from './routes';
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
// Import scss
import './assets/scss/theme.scss';
import './app.css';
// add js

// add css

function App() {
  const tokenPresent = useSelector(state => state.auth.authToken);
  const tokenExpire = !!useSelector(state => state.auth.isExpire);
  const pathname = window.location.pathname.split('/')[1];

  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(authenticationValidator());
  }, []);

  useEffect(() => {
    if (tokenPresent) {
      localStorage.setItem('authToken', tokenPresent);
      // dispatch(getProfile());
      // dispatch(getAllUser());
    }
  }, [tokenPresent]);
  const redirectHandler = () => {
    const guestRoute = guestRoutes
      .filter(item => item.redirectRoute === undefined)
      .map(item => item.path);
    return !guestRoute.includes(`/${pathname}`) && localStorage.getItem('authToken') == null ? (
      <Redirect to="/signin" />
    ) : null;
  };

  let mainContent = (
    <>
      {guestRoutes.map(
        route =>
          route.redirectRoute === undefined && (
            <Route key={route.name} path={route.path} exact={route.exact} name={route.name}>
              <route.component />
            </Route>
          ),
      )}
      {redirectHandler()}
    </>
  );
  if (tokenPresent) {
    mainContent = (
      <>
        <Route path="/" component={lazy(() => import('./views/MainContainer/MainContainer'))} />
      </>
    );
  }
  if (tokenExpire) {
    return (
      <Modal backdrop={false} centered fade={false} size="lg" isOpen>
        <ModalHeader className="justify-content-center">Session expired</ModalHeader>
        <ModalBody className="text-center">Session is expired please login again</ModalBody>
        <ModalFooter className="justify-content-center">
          <Button
            color="primary"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Login
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
  return (
    <>
      <Suspense fallback={<LogoLoader />}>
        <BrowserRouter>
          <div className="toastcontainer">
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              theme="colored"
              progressClassName="toastProgress"
              bodyClassName="toastBody"
            />
          </div>
          <Switch>{mainContent}</Switch>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
