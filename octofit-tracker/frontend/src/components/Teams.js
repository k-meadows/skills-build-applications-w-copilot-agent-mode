import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const apiUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log('Teams: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Teams: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  return (
    <div className="mt-4">
      <div className="card octofit-card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <span>&#128101; Teams</span>
          <span className="badge bg-danger rounded-pill">{teams.length}</span>
        </div>
        <div className="card-body p-0">
          {error && (
            <div className="alert alert-danger octofit-alert m-3">Error: {error}</div>
          )}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover octofit-table mb-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Team Name</th>
                    <th scope="col">Members</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.length === 0 ? (
                    <tr><td colSpan="3" className="text-center text-muted py-4">No teams found.</td></tr>
                  ) : (
                    teams.map((team, index) => (
                      <tr key={team._id || index}>
                        <td><span className="text-muted">{index + 1}</span></td>
                        <td><strong>{team.name}</strong></td>
                        <td>
                          {Array.isArray(team.members)
                            ? team.members.map((m, i) => (
                                <span key={i} className="badge bg-secondary me-1">{m}</span>
                              ))
                            : <span className="badge bg-secondary">{team.members}</span>}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;
