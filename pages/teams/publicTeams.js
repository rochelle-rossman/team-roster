import React, { useState, useEffect } from 'react';
import { getPublicTeams } from '../../api/teamData';
import TeamCard from '../../components/TeamCard';

export default function PublicTeams() {
  const [teams, setTeams] = useState([]);
  const getAllPublicTeams = () => {
    getPublicTeams().then(setTeams);
  };
  useEffect(() => {
    getAllPublicTeams();
  }, []);
  return (
    <>
      <div className="d-flex flex-wrap">
        {teams.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllPublicTeams} />
        ))}
      </div>
    </>
  );
}
