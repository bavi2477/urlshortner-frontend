// Dashboard.jsx
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Chart from './Chart';
import UrlForm from './UrlForm';
import UrlTable from './UrlTable';

const Dashboard = () => {
  return (
    <div className='pt-3 pb-5 container-fluid h-100'>
      <div className='row h-100'>
        <nav id='sidebar' className='col-md-3 col-lg-2 d-md-block bg-light sidebar'>
          <div className='position-sticky'>
            <h3>My Dashboard</h3>
            <ul className='nav flex-column'>
              {/* Links for other components */}
              <li className='nav-item'>
                <Link to='/dashboard/urlform' className='nav-link'>Url Form</Link>
              </li>
              <li className='nav-item'>
                <Link to='/dashboard/urltable' className='nav-link'>Url Table</Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4 h-100'>
          {/* Directly include the Chart component here */}
          <Chart />
          
          {/* Routes for other components */}
          <Routes>
            <Route path='/urlform' element={<UrlForm />} />
            <Route path='/urltable' element={<UrlTable />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;