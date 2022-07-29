/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePlayer } from '../api/playerData';
import { useAuth } from '../utils/context/authContext';

function PlayerCard({ playerObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisPlayer = () => {
    if (window.confirm(`Delete ${playerObj.name}?`)) {
      deletePlayer(playerObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={playerObj?.image} alt={playerObj?.name} style={{ height: '250px' }} />
      <Card.Body>
        <Card.Title>{playerObj?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{playerObj?.position}</Card.Subtitle>
        <Link href={`/players/${playerObj?.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            VIEW
          </Button>
        </Link>
        <Link href={`/players/edit/${playerObj?.firebaseKey}`} passHref>
          <Button className={playerObj.uid !== user.uid ? 'noShow' : ''} variant="info">
            EDIT
          </Button>
        </Link>
        <Button className={playerObj.uid !== user.uid ? 'noShow' : ''} variant="danger" onClick={deleteThisPlayer}>
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PlayerCard.propTypes = {
  playerObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
    position: PropTypes.string,
    teamId: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PlayerCard;
