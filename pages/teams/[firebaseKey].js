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
    <div className="team-details">
      <div className="text-white ms-5 details">
        <h5>
          TEAM'S PLAYERS
        </h5>
        <hr />
      </div>
      {teamDetails.players?.map((player) => (
        <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={setTeamDetails} />
      ))}
    </div>
  );
}
