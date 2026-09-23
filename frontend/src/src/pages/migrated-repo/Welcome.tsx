// Endpoints used in this component:
// - GET /welcome (UNCONFIRMED)
// - POST /logout (UNCONFIRMED)

import React, { useEffect, useState } from 'react';

interface Document {
  id: number;
  title: string;
  link: string;
  description: string;
  userId: number;
}

const Welcome: React.FC = () => {
  const [docs, setDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [csrfToken, setCsrfToken] = useState<string>('');

  useEffect(() => {
    // Fetch documents for the logged‑in user
    fetch('/welcome', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data: Document[]) => {
        setDocs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    // Placeholder for fetching username and CSRF token
    // Endpoints for these are UNCONFIRMED; implement when contract is known
  }, []);

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    const form = document.getElementById('logoutForm') as HTMLFormElement;
    if (form) form.submit();
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark default-color-dark fixed-top">
          <a className="navbar-brand" href="/">
            App Name
          </a>
          {username && (
            <>
              <form id="logoutForm" method="POST" action="/logout">
                <input type="hidden" name="_csrf" value={csrfToken} />
              </form>
              <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li className="nav-item">
                    <a style={{ color: '#FFFFFF' }} href="#">
                      {username}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          )}
        </nav>
      </header>

      <div className="container">
        {username && (
          <>
            <div className="row col-md-9 col-md-offset-2 custyle">
              <h3>Document List</h3>
            </div>

            <div className="row col-md-6 col-md-offset-2 custyle">
              {loading ? (
                <p>Loading...</p>
              ) : error ?