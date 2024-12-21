import React, { useEffect, useState } from 'react';
import ApiService from '../../services/api';
import styles from '../../styles/Auth.module.css';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate('/')
        }
    }, [])
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await ApiService.loginUser({ email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            window.location.reload();

            alert('Login successful');
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;