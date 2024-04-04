import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [responseMsg, setResponseMsg] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("login payloads", email, password);
        const payloads = { email, password };
        try {
            const res = await axios.post('https://urlshortener-backend-ov96.onrender.com/api/user/login', payloads);
            setResponseMsg(res.data.message);
            setEmail('')
            setPassword('')
            if (res.data.message) {
                toast.success(res.data.message, {
                    onClose: () => navigate('/dashboard')
                });
            }
        } catch (err) {
            console.log(err);
            setResponseMsg(err.response.data.error);
            toast.error(err.response.data.error);
        }
    };
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="col-md-6 shadow p-4">
                <h1 className="text-center mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type='submit' className="btn btn-primary d-block w-100">Login</button>
                </form>
                <p className="text-center mt-3">Forget Password? <Link to="/forgot-password">click here</Link></p>
                <p className="text-center mt-3">Don't have an account? <Link to="/">Register</Link></p>
            </div>
            <ToastContainer />
        </div>
    );
    ;
};

export default UserLogin;