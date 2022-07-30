import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteTeamsPlayers } from '../api/mergedData';
import { useAuth } from '../utils/context/authContext';

function TeamCard({ teamObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisTeam = () => {
    if (window.confirm(`Delete ${teamObj.teamName}?`)) {
      deleteTeamsPlayers(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={teamObj.image} alt={teamObj.teamName} style={{ height: '250px' }} />
      <Card.Body>
        <Card.Title>{teamObj.teamName}</Card.Title>
        <Link href={`/teams/${teamObj.firebaseKey}`} passHref>
          <Button variant="outline-dark" className="m-2">
            VIEW
          </Button>
        </Link>
        <Link href={`/teams/edit/${teamObj.firebaseKey}`} passHref>
          <Button className={teamObj.uid !== user.uid ? 'noShow' : ''} variant="outline-dark">
            EDIT
          </Button>
        </Link>
        <Button className={teamObj.uid !== user.uid ? 'noShow' : ''} variant="outline-danger" onClick={deleteThisTeam}>
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    image: PropTypes.string,
    teamName: PropTypes.string,
    firebaseKey: PropTypes.string,
    public: PropTypes.bool,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default TeamCard;
