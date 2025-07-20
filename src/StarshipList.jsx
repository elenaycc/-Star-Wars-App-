import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'https://swapi.dev/api/starships/';

export default function StarshipList() {
  const [starships, setStarships] = useState([]);
  const [nextPage, setNextPage] = useState(API_URL);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchStarships = async (url, append = false) => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setNextPage(data.next);
      if (append) {
        setStarships(prev => [...prev, ...data.results]);
      } else {
        setStarships(data.results);
      }
    } catch (error) {
      console.error('API fetch error:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStarships(API_URL);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      fetchStarships(API_URL);
    } else {
      fetchStarships(`${API_URL}?search=${searchTerm}`, false);
    }
  };

  const loadMore = () => {
    fetchStarships(nextPage, true);
  };

  const getIdFromUrl = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Star Wars Starships</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by name or model..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: '8px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '8px 12px', marginLeft: '8px' }}>
          Search
        </button>
      </form>

      {starships.length === 0 && !loading && <p>No starships found.</p>}

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {starships.map(ship => (
          <li
            key={ship.url}
            style={{
              borderBottom: '1px solid #ddd',
              marginBottom: '10px',
              paddingBottom: '10px',
            }}
          >
            <Link
              to={`/starship/${getIdFromUrl(ship.url)}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <h3>{ship.name}</h3>
              <p>Model: {ship.model}</p>
              <p>Max Atmosphering Speed: {ship.max_atmosphering_speed}</p>
            </Link>
          </li>
        ))}
      </ul>

      {loading && <p>Loading...</p>}

      {!loading && nextPage && (
        <button onClick={loadMore} style={{ padding: '10px 20px' }}>
          Load More
        </button>
      )}
    </div>
  );
}
