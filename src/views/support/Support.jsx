import { useHistory } from 'react-router-dom';
import { Container } from 'reactstrap';

import RenderIf from 'components/RenderIf';
import LogoLoader from 'components/UI/Spinner/LogoSpinner';
import Breadcrumb from 'components/BreadCrumb';

import '../viewcommon.css';

const Support = () => {
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();

  return (
    <div className="page-content">
      <div className="d-flex align-items-baseline justify-content-between">
        <div className="d-flex">
          <div>
            <Breadcrumb name="Support" />
          </div>
        </div>
      </div>
      <RenderIf>
        <LogoLoader />
      </RenderIf>
      <RenderIf render>
        <Container fluid>This page in progress....</Container>
      </RenderIf>
    </div>
  );
};

export default Support;
