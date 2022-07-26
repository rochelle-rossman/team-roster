import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

const initialState = {
  search: '',
};

function Search({ players, setFilteredPlayers }) {
  const [searchInput, setSearchInput] = useState();
  const handleChange = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    const results = players.filter((player) => player.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredPlayers(results);
  };
  return (
    <Form className="search">
      <Form.Control className="searchInput" placeholder="Search Players" value={searchInput} onChange={handleChange} />
      <Button type="btn" value="" onClick={initialState}>Clear</Button>
    </Form>
  );
}

Search.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  setFilteredPlayers: PropTypes.func.isRequired,
};

export default Search;
