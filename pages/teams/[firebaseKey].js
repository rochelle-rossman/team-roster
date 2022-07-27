import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewTeamPlayers } from '../../api/mergedData';
import PlayerCard from '../../components/PlayerCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewTeamPlayers(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);
  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-white ms-5 details">
        <h5>
          {teamDetails.teamName}
        </h5>
        <h5>{teamDetails.public ? 'PUBLIC' : ''}</h5>
      </div>
      {teamDetails.players?.map((player) => (
        <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={setTeamDetails} />
      ))}
    </div>
  );
}
