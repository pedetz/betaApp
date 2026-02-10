import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getTransactions = async () => {
    const response = await axios.get(`${API_URL}/transactions`);
    return response.data;
};

export const addTransaction = async (transaction) => {
    const response = await axios.post(`${API_URL}/transactions`, transaction);
    return response.data;
};

export const deleteTransaction = async (id) => {
    await axios.delete(`${API_URL}/transactions/${id}`);
};

export const getSummary = async () => {
    const response = await axios.get(`${API_URL}/stats/summary`);
    return response.data;
};

export const exportTransactions = () => {
    window.location.href = `${API_URL}/transactions/export`;
};
