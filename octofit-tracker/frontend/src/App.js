import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark octofit-navbar">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/octofitapp-small.png"
              alt="OctoFit Tracker"
              height="32"
              className="me-2"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            OctoFit Tracker
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {[['Users', '/users'], ['Teams', '/teams'], ['Activities', '/activities'],
                ['Workouts', '/workouts'], ['Leaderboard', '/leaderboard']].map(([label, path]) => (
                <li className="nav-item" key={path}>
                  <NavLink
                    className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
                    to={path}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={
            <div className="octofit-hero mt-2">
              <img
                src="/octofitapp-small.png"
                alt="OctoFit Tracker Logo"
                className="hero-logo"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <h1 className="display-5 fw-bold">Welcome to OctoFit Tracker</h1>
              <p className="lead mt-3">
                Track your fitness activities, join teams, and compete on the leaderboard.
              </p>
              <div className="hero-links mt-4">
                <NavLink to="/users" className="btn btn-outline-light">Users</NavLink>
                <NavLink to="/teams" className="btn btn-outline-light">Teams</NavLink>
                <NavLink to="/activities" className="btn btn-outline-light">Activities</NavLink>
                <NavLink to="/workouts" className="btn btn-outline-light">Workouts</NavLink>
                <NavLink to="/leaderboard" className="btn btn-danger">Leaderboard</NavLink>
              </div>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>

      <footer className="text-center py-3 mt-0">
        <small>&copy; {new Date().getFullYear()} OctoFit Tracker. All rights reserved.</small>
      </footer>
    </Router>
  );
}

export default App;
