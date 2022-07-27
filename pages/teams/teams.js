/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import TeamCard from '../../components/TeamCard';
import { getTeams } from '../../api/teamData';
import { useAuth } from '../../utils/context/authContext';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();
  const getAllTeams = () => {
    getTeams(user.uid).then(setTeams);
  };
  useEffect(() => {
    getAllTeams();
  }, [user]);

  return (
    <>
      <div className="d-flex flex-wrap">
        {teams.map((team) => (
          <TeamCard key={team.firebaseKey} teamObj={team} onUpdate={getAllTeams} />
        ))}
      </div>
    </>
  );
}
