import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getTeams = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/teams.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const createTeam = (teamObj, uid) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/teams.json`, teamObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/teams/${response.data.name}.json`, payload).then(() => {
        getTeams(uid).then((playerArr) => resolve(playerArr));
      });
    })
    .catch((error) => reject(error));
});

const getSingleTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/teams/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateTeam = (teamObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbUrl}/teams/${teamObj.firebaseKey}.json`, teamObj)
    .then(() => getTeams(teamObj))
    .then(resolve)
    .catch(reject);
});

const deleteTeam = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/teams/${firebaseKey}.json`)
    .then(() => {
      getTeams();
    })
    .then(resolve)
    .catch(reject);
});

const getTeamsPlayers = (teamName) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/players.json?orderBy="teamId"&equalTo="${teamName}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getTeams, createTeam, getSingleTeam, updateTeam, deleteTeam, getTeamsPlayers,
};
