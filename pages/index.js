/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getPlayers } from '../api/teamData';
import PlayerCard from '../components/PlayerCard';
import Search from '../components/Search';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const { user } = useAuth();
  const getAllPlayers = () => {
    getPlayers(user.uid).then((playerArr) => {
      setPlayers(playerArr);
      setFilteredPlayers(playerArr);
    });
  };
  useEffect(() => {
    getAllPlayers();
  }, [user]);

  return (
    <>
      <Search players={players} setFilteredPlayers={setFilteredPlayers} />
      <div className="d-flex flex-wrap">
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.firebaseKey} playerObj={player} onUpdate={getAllPlayers} />
        ))}
      </div>
    </>
  );
}

export default Home;
