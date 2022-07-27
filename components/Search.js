import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

function Search({ players, setFilteredPlayers }) {
  const [searchInput, setSearchInput] = useState('');
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    const results = players.filter((player) => player.name.toLowerCase().includes(value.toLowerCase()) || player.position.toLowerCase().includes(value.toLowerCase()));
    setFilteredPlayers(results);
  };
  return (
    <Form className="search">
      <Form.Control type="search" className="searchInput" placeholder="Search Players" value={searchInput} onChange={handleChange} />
    </Form>
  );
}

Search.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    position: PropTypes.string,
  })).isRequired,
  setFilteredPlayers: PropTypes.func.isRequired,
};

export default Search;
