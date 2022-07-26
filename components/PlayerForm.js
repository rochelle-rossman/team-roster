import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import PropTypes from 'prop-types';
import { createPlayer, updatePlayer } from '../api/playerData';
import { useAuth } from '../utils/context/authContext';
import { getTeams } from '../api/teamData';

const initialState = {
  name: '',
  position: '',
  image: '',
};

export default function PlayerForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getTeams(user.uid).then(setTeams);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updatePlayer(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createPlayer(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Player</h2>
      <FloatingLabel controlId="floatingInput1" label="Full Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Player's First and Last Name" name="name" value={formInput.name} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Player Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image URL" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Position">
        <Form.Select name="position" value={formInput.position} onChange={handleChange} className="mb-3" required>
          <option disabled value="">
            Select a Position
          </option>
          <option value="Center">Center</option>
          <option value="Point Guard">Point Guard</option>
          <option value="Shooting Guard">Shooting Guard</option>
          <option value="Power Forward">Power Forward</option>
          <option value="Small Forward">Small Forward</option>
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Team">
        <Form.Select aria-label="Team" name="teamId" onChange={handleChange} className="mb-3" required>
          <option value="">Select a Team</option>
          {teams.map((team) => (
            <option key={team.firebaseKey} value={team.firebaseKey} selected={obj.teamId === team.firebaseKey}>
              {team.teamName}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Player</Button>
    </Form>
  );
}

PlayerForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    position: PropTypes.string,
    teamId: PropTypes.string,
  }),
};

PlayerForm.defaultProps = {
  obj: initialState,
};
