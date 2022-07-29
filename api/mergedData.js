import { deletePlayer, getSinglePlayer } from './playerData';
import getPlayersStats from './playerStats';
import { deleteTeam, getTeamsPlayers } from './teamData';

const viewPlayerDetails = (playerFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSinglePlayer(playerFirebaseKey), getPlayersStats(playerFirebaseKey)])
    .then(([playerObj, statsObj]) => {
      resolve({ playerObj, playerStats: statsObj[0] });
    }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirbaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSinglePlayer(teamFirbaseKey), getTeamsPlayers(teamFirbaseKey)])
    .then(([teamObj, teamPlayersArr]) => {
      resolve({ ...teamObj, players: teamPlayersArr });
    }).catch((error) => reject(error));
});

const deleteTeamsPlayers = (teamId) => new Promise((resolve, reject) => {
  getTeamsPlayers(teamId)
    .then((playerArray) => {
      const deletePlayerPromises = playerArray.map((player) => deletePlayer(player.firebaseKey));

      Promise.all(deletePlayerPromises).then(() => {
        deleteTeam(teamId).then(resolve);
      });
    })
    .catch((error) => reject(error));
});

export { viewTeamDetails, deleteTeamsPlayers, viewPlayerDetails };
