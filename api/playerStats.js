import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getPlayersStats = (playerId) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/playerStats.json?orderBy="playerId"&equalTo="${playerId}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

export default getPlayersStats;
