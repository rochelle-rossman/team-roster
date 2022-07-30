/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';

function SinglePlayer({ statsObj }) {
  return (
    <>
      <img src={statsObj?.image} alt={statsObj?.name} className="playerDetailsImage" />
      <h4>{statsObj?.position}</h4>
      <h2>{statsObj?.name}'s Season Stats</h2>
    </>
  );
}

SinglePlayer.propTypes = {
  statsObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    position: PropTypes.string,
  }),
};

SinglePlayer.defaultProps = {
  statsObj: {},
};

export default SinglePlayer;
