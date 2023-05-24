import Breadcrumb from 'components/UI/Common/Breadcrumb';
import avatar from 'assets/images/avatar.jpg';
import { Button, Card, CardBody, Container, Progress } from 'reactstrap';
import '../viewcommon.css';
import { useLocation } from 'react-router';

const ViewProposal = () => {
  const { state } = useLocation();
  const pathItems = state?.items || [
    { name: 'My Portfolio', link: '/portfolio' },
    { name: 'Property', link: '/portfolio-property' },
    { name: 'Proposals', link: '/property-proposals' },
  ];
  return (
    <div className="page-content">
      <Breadcrumb items={[...pathItems, { name: 'Renovate the bathroom' }]} />
      <Container fluid>
        <Card>
          <CardBody className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div>
                <img src={avatar} alt="" className="avatar-md rounded-circle img-thumbnail me-3" />
              </div>
              <div>
                <div>
                  <h5>Diamond Ridge</h5>
                  <i>City, State</i>
                </div>
              </div>
            </div>
            <div className="d-flex button-header">
              <Button className="w-100" color="success">
                Approve
              </Button>
              <Button className="ms-2 w-100" color="danger">
                Reject
              </Button>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="d-flex justify-content-between align-items-center proposal-detail">
            <div>Renovate the bathroom</div>
            <div>Publish date : 11/10/22 10:10:15</div>
            <div className="d-flex align-items-center">
              <i className="uil-clock-three fa-2x me-2" />
              <div>Proposal end in 12d : 15hr : 29m : 30s</div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="d-flex justify-content-between align-items-baseline">
              <div className="summary">
                <h5>Summary :-</h5>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book. It has survived not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                  with desktop publishing software like Aldus PageMaker including versions of Lorem
                  Ipsum
                </p>
              </div>
              <div className="vote-card">
                <h5>Status</h5>
                <div className="d-flex justify-content-between w-100">
                  <p> Votes For</p>
                  <p>Votes Against</p>
                </div>
                <div>
                  <Progress multi className="progress-vote">
                    <Progress bar value="45" color="success">
                      45
                    </Progress>
                    <Progress bar value="15" color="light" />
                    <Progress bar value="40" color="danger">
                      40
                    </Progress>
                  </Progress>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Button className="w-100 vote-button" color="success">
                    Vote For
                  </Button>
                  <Button className="ms-2 w-100 vote-button" color="danger">
                    Vote Against
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <div className="description mt-3">
                <h5>Description :-</h5>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book. It has survived not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                  with desktop publishing software like Aldus PageMaker including versions of Lorem
                  Ipsum
                </p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                  unknown printer took a galley of type and scrambled it to make a type specimen
                  book. It has survived not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                  with desktop publishing software like Aldus PageMaker including versions of Lorem
                  Ipsum
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default ViewProposal;
