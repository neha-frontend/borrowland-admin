import React from 'react';
import { Card, CardBody } from 'reactstrap';
import './PropertyManagerCard.css';

const PropertiesManagementCard = ({ name, score, icon }) => (
  <Card>
    <CardBody>
      <div className="property-management-card">
        {/* <img src={img} alt="propertyimage" /> */}
        <div className="property-management-card-details">
          <h5 className="text-muted">{name}</h5>
          <h4>{score}</h4>
        </div>
        <i className={icon || ' uil-usd-circle fa-3x'} />
      </div>
    </CardBody>
  </Card>
);

export default PropertiesManagementCard;
