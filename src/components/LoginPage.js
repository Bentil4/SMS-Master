import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; // Import useUser hook
import school_logo from '../asset/school_logo.png';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser(); // Get setUser function from useUser hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/teacher/login',
        { email, password }
      );

      const userData = response.data; // Assuming login was successful
      setError('');
      setUser(userData); // Set user data into the context
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.response.data);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login">
      <div className="loginleft">
        <img src={school_logo} alt="" />
        <h3>
          WELCOME TO NBYC <br /> STUDENT MANAGEMENT SYSTEM
        </h3>
      </div>
      <div className="loginright">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            {/* <label>Email:</label> */}
            <input
              type="text"
              value={email}
              placeholder="kofi@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            {/* <label>Password:</label> */}
            <input
              type="password"
              value={password}
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
        {error && <p>{error}</p>}
        <p>c Student Management System</p>
      </div>
    </div>
  );
};

export default LoginForm;
