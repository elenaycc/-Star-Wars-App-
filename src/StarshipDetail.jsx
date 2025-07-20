import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function StarshipDetail() {
  const { id } = useParams();
  const [starship, setStarship] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://swapi.dev/api/starships/${id}/`);
        const data = await response.json();
        setStarship(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
      setLoading(false);
    };

    fetchDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!starship) return <p>Details not found.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{starship.name}</h1>
      <p><strong>Model:</strong> {starship.model}</p>
      <p><strong>Passengers:</strong> {starship.passengers}</p>
      <p><strong>Max Atmosphering Speed:</strong> {starship.max_atmosphering_speed}</p>
      <p><strong>Manufacturer:</strong> {starship.manufacturer}</p>
      <p><strong>Crew:</strong> {starship.crew}</p>
      <p><strong>Cargo Capacity:</strong> {starship.cargo_capacity}</p>

      <Link className='link' to="/" style={{ marginTop: '20px', display: 'inline-block' }}>
        &larr; Back to Home
      </Link>
    </div>
  );
}
