/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import Search from '../../components/Search';
import { getPlayers } from '../../api/playerData';
import PlayerCard from '../../components/PlayerCard';

export default function Players() {
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
