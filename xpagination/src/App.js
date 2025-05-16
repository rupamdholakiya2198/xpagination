import React, { useEffect, useState } from 'react';
import EmployeeTable from './components/EmployeeTable';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
        if (!response.ok) {
          throw new Error('API fetch failed');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        alert('failed to fetch data');
      }
    };

    fetchEmployees();
  }, []);

  const totalPages = Math.ceil(employees.length / employeesPerPage);
  const firstIndex = (currentPage - 1) * employeesPerPage;
  const lastIndex = firstIndex + employeesPerPage;
  const currentEmployees = employees.slice(firstIndex, lastIndex);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Employee Data</h2>

      <EmployeeTable employees={currentEmployees} />

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          data-testid="previous-button"
        >
          Previous
        </button>

        <span style={{ margin: '0 10px' }} data-testid="page-number">
          Page {currentPage}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          data-testid="next-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
