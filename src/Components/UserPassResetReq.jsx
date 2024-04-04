import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserPassResetReq = () => {

    const [email, setEmail] = useState('');
    const [responseMsg, setResponseMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("password reset request email:", email);
        try {
            const response = await axios.post('http://localhost:4000/api/user/forgot-password', { email });
            toast.success(response.data.message);
            setEmail('');
        } catch (error) {
            console.error("Password reset request error:", error);
            toast.error(error.response.data.error);
        }
    };
    
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="col-md-6 shadow p-4">
                <h1 className="text-center mb-4">Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <button type='submit' className="btn btn-primary d-block w-100">Reset</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
    
};

export default UserPassResetReq;