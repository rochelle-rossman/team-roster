import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

function PlayerStatsTable({ statsObj }) {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Total Points</th>
          <th>Assists</th>
          <th>Blocks</th>
          <th>Fouls</th>
          <th>Rebounds</th>
          <th>Steals</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{statsObj.points}</td>
          <td>{statsObj.assists}</td>
          <td>{statsObj.blocks}</td>
          <td>{statsObj.fouls}</td>
          <td>{statsObj.rebounds}</td>
          <td>{statsObj.steals}</td>
        </tr>
      </tbody>
    </Table>
  );
}

PlayerStatsTable.propTypes = {
  statsObj: PropTypes.shape({
    points: PropTypes.number,
    assists: PropTypes.number,
    blocks: PropTypes.number,
    fouls: PropTypes.number,
    rebounds: PropTypes.number,
    steals: PropTypes.number,
  }).isRequired,
};

export default PlayerStatsTable;
