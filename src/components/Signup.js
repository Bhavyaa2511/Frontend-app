import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock signup logic (you can add real backend integration here if needed)
    localStorage.setItem('mockUser', JSON.stringify(credentials)); // Store user in mock storage
    alert('Signup successful! You can now log in.');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="container mt-4">
      <h1 className="text-primary">Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
