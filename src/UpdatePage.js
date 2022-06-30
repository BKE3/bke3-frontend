import React from 'react';
import { useState, useEffect } from 'react';
import { updateBird, getBirdById } from './services/fetch-utils';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function UpdatePage() {
  const { push } = useHistory();
  const { id } = useParams();

  const [birdInForm, setBirdInForm] = useState({
    latin_name: '',
    common_name: '',
    habitat: '',
    life_expectancy: '',
    flightless: false,
    image_url: '',
  });

  async function fetch(){
    const birdData = await getBirdById(id);
    setBirdInForm(birdData);
  }

  useEffect(() => {
    fetch();
  }, [id]); //eslint-disable-line

  async function handleSubmit(e) {
    e.preventDefault();
    await updateBird(birdInForm);
    push('/birds');
  }
  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <h2>Update this Bird!</h2>
        <label>
          Latin Name
          <input
            required
            value={birdInForm.latin_name}
            name="latin-name"
            onChange={(e) => setBirdInForm({ ...birdInForm, latin_name: e.target.value })}
          />
        </label>
        <label>
          Common Name
          <input
            required
            value={birdInForm.common_name}
            name="common-name"
            onChange={(e) => setBirdInForm({ ...birdInForm, common_name: e.target.value })}
          />
        </label>
        <label>
          Habitat
          <input
            required
            value={birdInForm.habitat}
            name="habitat"
            onChange={(e) => setBirdInForm({ ...birdInForm, habitat: e.target.value })}
          />
        </label>
        <label>
          Life Expectancy
          <input
            required
            value={birdInForm.life_expectancy}
            name="life-expectancy"
            onChange={(e) => setBirdInForm({ ...birdInForm, life_expectancy: e.target.value })}
          />
        </label>
        <label>
          Can your bird fly?
          <select
            required
            value={birdInForm.flightless}
            onChange={(e) => setBirdInForm({ ...birdInForm, flightless: e.target.value })}
          >
            <option value="true">Flightless</option>
            <option value="false">Flightful</option>
          </select>
        </label>
        <label>
          Give us an Image of your Bird
          <input
            required
            value={birdInForm.image_url}
            name="image"
            onChange={(e) => setBirdInForm({ ...birdInForm, image_url: e.target.value })}
          />
        </label>
        <button> Update your BIRD! </button>
      </form>
    </div>
  );
}
