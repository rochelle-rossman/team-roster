/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
// import { Button } from 'react-bootstrap';
import { getPlayers } from '../api/teamData';
import PlayerCard from '../components/PlayerCard';
// import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [players, setPlayers] = useState([]);
  const { user } = useAuth();
  const getAllPlayers = () => {
    getPlayers(user.uid).then(setPlayers);
  };
  useEffect(() => {
    getAllPlayers();
  }, []);

  return (

    <div className="d-flex flex-wrap">
      {players.map((player) => (
        <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllPlayers} />
      ))}
    </div>

  );
}

export default Home;
