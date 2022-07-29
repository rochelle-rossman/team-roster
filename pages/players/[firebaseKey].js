/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { viewPlayerDetails } from '../../api/mergedData';
import PlayerStatsTable from '../../components/PlayerStatsTable';

export default function ViewPlayer() {
  const [playerStats, setPlayerStats] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    viewPlayerDetails(firebaseKey).then(setPlayerStats);
  }, [firebaseKey]);

  return (
    <>
      <PlayerStatsTable statsObj={playerStats.playerStats} />
    </>
  );
}
