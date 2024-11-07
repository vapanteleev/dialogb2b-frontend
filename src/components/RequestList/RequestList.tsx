import React, { useEffect, useState } from 'react';
import ApiService from '../../services/api';
import styles from './Requests.module.css';

const RequestList: React.FC = () => {
    const [requests, setRequests] = useState<any[]>([]);

    useEffect(() => {
        const fetchRequests = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await ApiService.getRequests(token);
                setRequests(response.data);
            }
        };
        fetchRequests();
    }, []);

    return (
        <div className={styles.requestList}>
            <h2>Requests</h2>
            {requests.map(request => (
                <div key={request.id} className={styles.requestItem}>
                    <p>Item Name: {request.item_name}</p>
                    <p>Urgency: {request.urgency}</p>
                    <p>Budget: {request.budget}</p>
                </div>
            ))}
        </div>
    );
};

export default RequestList;