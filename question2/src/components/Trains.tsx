import React, { useEffect, useState } from 'react';

const Trains = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await fetch('http://104.211.219.98:80/train/trains');
        const data = await response.json();
        setTrains(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTrains();
  }, []);

  return (
    <div>
      <h1>List of Trains</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {trains.map((train) => (
            <li key={train.id}>
              <strong>Train ID:</strong> {train.id}<br />
              <strong>Train Name:</strong> {train.name}<br />
              <strong>Source:</strong> {train.source}<br />
              <strong>Destination:</strong> {train.destination}<br />
              <strong>Departure Time:</strong> {train.departure_time}<br />
              <strong>Arrival Time:</strong> {train.arrival_time}<br />
              <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Trains;
