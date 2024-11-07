import React, { useEffect, useState } from 'react';
import ApiService from '../../services/api';
import styles from './Dashboard.module.css';

// Интерфейс для описания типа заявки
interface Request {
    id: number;
    item_name: string;
    urgency: string;
    budget: number;
}

// Компонент панели поставщика
const SupplierDashboard: React.FC = () => {
    const [requests, setRequests] = useState<Request[]>([]);

    // Хук useEffect выполняется после монтирования компонента и загружает данные заявок
    useEffect(() => {
        const fetchRequests = async () => {
            const token = localStorage.getItem('token'); // Получение токена из localStorage
            if (token) {
                try {
                    const response = await ApiService.getRequests(token); // Вызов метода API для получения заявок
                    setRequests(response.data); // Установка полученных данных в состояние
                } catch (error) {
                    console.error('Ошибка при загрузке заявок:', error);
                }
            }
        };

        fetchRequests();
    }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз при монтировании

    return (
        <div className={styles.dashboard}>
            <h2>Supplier Dashboard</h2>
            <div className={styles.requestList}>
                {requests.map((request) => (
                    <div key={request.id} className={styles.requestItem}>
                        <p><strong>Item Name:</strong> {request.item_name}</p>
                        <p><strong>Urgency:</strong> {request.urgency}</p>
                        <p><strong>Budget:</strong> ${request.budget}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SupplierDashboard;
