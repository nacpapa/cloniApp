import axios from 'axios';
import { useState } from 'react';
import './register.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post('/auth/register', {
        username,
      });
      res.data && window.location.replace('/login');
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <img src="./img/register.svg" className="registerimg" alt="register" />
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      {error && (
        <span style={{ color: 'red', marginTop: '10px' }}>
          Something went wrong!
        </span>
      )}
    </div>
  );
}
