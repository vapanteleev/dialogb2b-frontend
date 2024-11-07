import React, { useEffect, useState } from 'react';
import ApiService from '../../services/api';
import styles from './Responses.module.css';

interface ResponseListProps {
  requestId: number;
}

const ResponseList: React.FC<ResponseListProps> = ({ requestId }) => {
  const [responses, setResponses] = useState<any[]>([]);

  useEffect(() => {
    const fetchResponses = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await ApiService.getResponses(requestId, token);
        setResponses(response.data);
      }
    };
    fetchResponses();
  }, [requestId]);

  return (
    <div className={styles.responseList}>
      <h2>Responses for Request ID {requestId}</h2>
      {responses.map(response => (
        <div key={response.id} className={styles.responseItem}>
          <p>Supplier ID: {response.supplier_id}</p>
          <p>Offer Price: {response.offer_price}</p>
          <p>Characteristics: {JSON.stringify(response.offered_characteristics)}</p>
        </div>
      ))}
    </div>
  );
};

export default ResponseList;