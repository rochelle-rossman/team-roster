import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function SinglePlayer({ statsObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={statsObj?.image} />
      <Card.Body>
        <Card.Title>{statsObj?.name}</Card.Title>
        <Card.Text>{statsObj?.position}</Card.Text>
      </Card.Body>
    </Card>
  );
}

SinglePlayer.propTypes = {
  statsObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    position: PropTypes.string,
  }),
};

SinglePlayer.defaultProps = {
  statsObj: {},
};

export default SinglePlayer;
