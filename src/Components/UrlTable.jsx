import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UrlTable = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/url/getall');
        setUrls(response.data); // Set the fetched URLs in the state
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>URLs</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Original URL</th>
            <th scope="col">Short Code</th>
            <th scope="col">Clicks</th>
            <th scope="col">Created At</th>
          </tr>
        </thead>
        <tbody>
          {urls.map(url => (
            <tr key={url._id}>
              <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{url.originalUrl}</td>
              <td>{url.shortCode}</td>
              <td>{url.clicks}</td>
              <td>{new Date(url.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UrlTable;
