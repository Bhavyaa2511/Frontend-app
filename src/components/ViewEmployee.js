import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
        setEmployee(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching employee details:', err);
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (loading) {
    return <div className="container mt-4"><h3>Loading...</h3></div>;
  }

  if (!employee) {
    return <div className="container mt-4"><h3>Employee not found.</h3></div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="text-info">Employee Details</h1>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">Name: {`${employee.firstName} ${employee.lastName}`}</h5>
          <p className="card-text">
            <strong>Email:</strong> {employee.email}
          </p>
          <p className="card-text">
            <strong>Department:</strong> {employee.department || 'N/A'}
          </p>
          <p className="card-text">
            <strong>Position:</strong> {employee.position || 'N/A'}
          </p>
          {/* Add Home Button */}
          <Link to="/" className="btn btn-primary mt-3">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
