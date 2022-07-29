/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewTeamDetails } from '../../api/mergedData';
import PlayerCard from '../../components/PlayerCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);
  return (
    <div className="mt-5 d-flex flex-wrap justify-content-center">
      <div className="text-white ms-5 details">
        <h5>
          TEAM'S PLAYERS
        </h5>
        <hr />
        <h5>{teamDetails.public ? 'PUBLIC' : ''}</h5>
      </div>
      {teamDetails.players?.map((player) => (
        <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={setTeamDetails} />
      ))}
    </div>
  );
}
