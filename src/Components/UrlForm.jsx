import React, { useState } from 'react';
import axios from 'axios';

const UrlForm = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.post('https://urlshortener-backend-ov96.onrender.com/api/url/shorten', { originalUrl });
            setShortUrl(response.data.shortUrl);
            setError(''); 
        } catch (error) {
            console.error('Error shortening URL:', error);
            setError('Failed to shorten URL. Please try again.');
            setShortUrl('');
        }
    };

    const handleRedirect = async () => {
        try {
            await axios.get(shortUrl); // Make a GET request to the short URL
        } catch (error) {
            console.error('Error redirecting:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="originalUrl" className="form-label">Enter URL to shorten:</label>
                                    <input
                                        type="text"
                                        id="originalUrl"
                                        className="form-control"
                                        value={originalUrl}
                                        onChange={(e) => setOriginalUrl(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Shorten URL</button>
                            </form>
                            {shortUrl && (
                                <div className="mt-3">
                                    <p>Shortened URL: <a href={`http://${shortUrl}`} target="_blank" rel="noopener noreferrer" onClick={handleRedirect}>{shortUrl}</a></p>
                                </div>
                            )}
                            {error && <p className="text-danger">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UrlForm;
