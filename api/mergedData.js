import { deletePlayer, getSinglePlayer } from './playerData';
import { deleteTeam, getTeamsPlayers } from './teamData';

const viewTeamPlayers = (teamFirbaseKey) => new Promise((resolve, reject) => {
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

export { viewTeamPlayers, deleteTeamsPlayers };
