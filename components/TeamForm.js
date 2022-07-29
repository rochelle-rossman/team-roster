import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createTeam, getTeams, updateTeam } from '../api/teamData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  teamName: '',
  image: '',
};

function TeamForm({ obj }) {
  const [formInput, setFormInput] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getTeams(user.uid);
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
      updateTeam(formInput).then(() => router.push('/teams/teams'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeam(payload).then(() => {
        router.push('/teams/teams');
      });
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Add'} Team</h2>
      <FloatingLabel controlId="floatingInput1" label="Team Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Team Name" name="teamName" value={formInput.teamName} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Team Image" className="mb-3">
        <Form.Control type="url" placeholder="Enter an image URL" name="image" value={formInput.image} onChange={handleChange} required />
      </FloatingLabel>
      <Form.Check
        className=""
        type="switch"
        id="public"
        label="Public Team?"
        checked={formInput.public}
        onChange={(e) => setFormInput((prevState) => ({
          ...prevState,
          public: e.target.checked,
        }))}
      />
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Add'} Team</Button>
    </Form>
  );
}

TeamForm.propTypes = {
  obj: PropTypes.shape({
    teamName: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    public: PropTypes.bool,
  }),
};

TeamForm.defaultProps = {
  obj: initialState,
};

export default TeamForm;
