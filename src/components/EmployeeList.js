import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState({ name: '', department: '', position: '' });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  const deleteEmployee = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      alert('Employee deleted successfully!');
      setEmployees(employees.filter((employee) => employee._id !== id)); // Update the state
    } catch (err) {
      console.error('Error deleting employee:', err);
      alert('Failed to delete employee. Please try again.');
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees/search', {
        params: search,
      });
      setEmployees(response.data); // Update employees based on search
    } catch (err) {
      console.error('Error performing search:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-primary">Employee List</h1>

      {/* Add Employee Button */}
      <div className="mb-3">
        <Link to="/add" className="btn btn-success">
          Add Employee
        </Link>
      </div>

      {/* Search Bar */}
      <div className="row mb-3">
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Search by Name"
            className="form-control"
            value={search.name}
            onChange={(e) => setSearch({ ...search, name: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Search by Department"
            className="form-control"
            value={search.department}
            onChange={(e) => setSearch({ ...search, department: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Search by Position"
            className="form-control"
            value={search.position}
            onChange={(e) => setSearch({ ...search, position: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <table className="table table-hover table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            const matchesSearch =
              (search.name && `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(search.name.toLowerCase())) ||
              (search.department && employee.department?.toLowerCase().includes(search.department.toLowerCase())) ||
              (search.position && employee.position?.toLowerCase().includes(search.position.toLowerCase()));

            return (
              <tr key={employee._id} className={matchesSearch ? 'table-success' : ''}>
                <td>{employee.firstName} {employee.lastName}</td>
                <td>{employee.department || 'N/A'}</td>
                <td>{employee.position || 'N/A'}</td>
                <td>{employee.email}</td>
                <td>
                  <Link to={`/view/${employee._id}`} className="btn btn-info btn-sm mr-2">
                    View
                  </Link>
                  <Link to={`/update/${employee._id}`} className="btn btn-warning btn-sm mr-2">
                    Update
                  </Link>
                  <button
                    onClick={() => deleteEmployee(employee._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
