import React, { useEffect, useState } from 'react';
import ApiService from '../../services/api';
import styles from './Dashboard.module.css';

// Интерфейс для описания типа отклика
interface Response {
    id: number;
    request_id: number;
    supplier_id: number;
    offer_price: number;
    offered_characteristics: Record<string, any>; // Используется для хранения характеристик в виде объекта
}

// Компонент панели покупателя
const BuyerDashboard: React.FC = () => {
    const [responses, setResponses] = useState<Response[]>([]);

    // Хук useEffect выполняется после монтирования компонента и загружает данные откликов
    useEffect(() => {
        const fetchResponses = async () => {
            const token = localStorage.getItem('token'); // Получение токена из localStorage
            if (token) {
                try {
                    // Вызов метода API для получения откликов по заявке (замените requestId на реальный)
                    const response = await ApiService.getResponses(1, token);
                    setResponses(response.data); // Установка полученных данных в состояние
                } catch (error) {
                    console.error('Ошибка при загрузке откликов:', error);
                }
            }
        };

        fetchResponses();
    }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз при монтировании

    return (
        <div className={styles.dashboard}>
            <h2>Buyer Dashboard</h2>
            <div className={styles.responseList}>
                {responses.map((response) => (
                    <div key={response.id} className={styles.responseItem}>
                        <p><strong>Supplier ID:</strong> {response.supplier_id}</p>
                        <p><strong>Offer Price:</strong> ${response.offer_price}</p>
                        <p><strong>Characteristics:</strong> {JSON.stringify(response.offered_characteristics)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BuyerDashboard;
