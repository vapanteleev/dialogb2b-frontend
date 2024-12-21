import React, { useState, useEffect } from 'react';
import styles from './RequestForm.module.css'
import api from '../../services/api';
import CharacteristicsField from './CharacteristicsField/CharacteristicsField';
interface RequestFormProps {
    requestId?: number; // ID записи для редактирования, опционально
    onSaveSuccess?: () => void; // Callback после сохранения
}

const RequestForm: React.FC<RequestFormProps> = ({ requestId, onSaveSuccess }) => {
    const [formData, setFormData] = useState({
        user_id: '',
        item_name: '',
        // characteristics: { "hui": "pizda" },
        urgency: '',
        budget: '',
        status: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    // Получение данных записи при редактировании
    useEffect(() => {
        if (requestId) {
            setIsLoading(true);
            fetch(`/api/requests/${requestId}`)
                .then((res) => res.json())
                .then((data) => {
                    setFormData(data);
                })
                .catch((err) => console.error('Error fetching request:', err))
                .finally(() => setIsLoading(false));
        }
    }, [requestId]);

    // Обработчик изменения полей формы
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Обработчик отправки формы
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const method = requestId ? 'PUT' : 'POST';
            const url = requestId ? `/api/requests/${requestId}` : '/api/requests';

            api.CreateRequest(formData)


            alert(requestId ? 'Request updated successfully' : 'Request created successfully');
            if (onSaveSuccess) onSaveSuccess();
        } catch (err) {
            console.error(err);
            alert('Error saving request');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.RequestForm_Wrapper}>
                <h2>{requestId ? 'Edit Request' : 'Create New Request'}</h2>

                <div className={styles.inputWrapper}>
                    <input
                        placeholder='User ID:'
                        type="text"
                        name="user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className={styles.inputWrapper}>
                    <input
                        placeholder='Item Name:'

                        type="text"
                        name="item_name"
                        value={formData.item_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <CharacteristicsField setFormData={setFormData as any} />
                <div className={styles.inputWrapper}>
                    <input
                        placeholder='Urgency'

                        type="text"
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        placeholder='Budget'
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <input
                        placeholder='Status'

                        type="text"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : requestId ? 'Update' : 'Create'}
                    </button>
                </div></div>
        </form>
    );
};

export default RequestForm;
