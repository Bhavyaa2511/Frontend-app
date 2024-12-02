import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateEmployee = () => {
  const { id } = useParams(); // Extract the employee ID from the URL
  const [employee, setEmployee] = useState({ firstName: '', lastName: '', email: '' });
  const navigate = useNavigate();

  // Fetch the current employee data when the component loads
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
        setEmployee(response.data); // Set the employee data to the state
      } catch (err) {
        console.error('Error fetching employee data:', err);
      }
    };
    fetchEmployee();
  }, [id]);

  // Update the state when input fields are modified
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  // Submit the updated data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/employees/${id}`, employee);
      navigate('/'); // Navigate back to the employee list page
    } catch (err) {
      console.error('Error updating employee:', err);
    }
  };

  return (
    <div className="container">
      <h1>Update Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Update</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
