import React, { useState } from 'react';
import ApiService from '../../services/api';
import styles from '../../styles/Auth.module.css';

const RegisterForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('buyer');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await ApiService.registerUser({ name, email, password, role });
            alert('User registered successfully');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <select value={role} onChange={e => setRole(e.target.value)}>
                <option value="buyer">Buyer</option>
                <option value="supplier">Supplier</option>
            </select>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;