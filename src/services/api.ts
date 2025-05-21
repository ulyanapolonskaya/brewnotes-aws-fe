import axios from 'axios';

// Get the base URL from environment variables
const BASE_API_URL = import.meta.env.VITE_API_URL;

export interface Bean {
  id: string;
  name: string;
  rating: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewBean {
  name: string;
  description?: string;
  rating?: number | null;
}

export const fetchBeans = async (): Promise<Bean[]> => {
  try {
    const response = await axios.get(`${BASE_API_URL}/coffee-beans`);
    return response.data;
  } catch (error) {
    console.error('Error fetching beans:', error);
    throw error;
  }
};

export const addBean = async (bean: NewBean): Promise<Bean> => {
  try {
    const response = await axios.post(`${BASE_API_URL}/coffee-beans`, bean);
    return response.data;
  } catch (error) {
    console.error('Error adding bean:', error);
    throw error;
  }
};

export const deleteBean = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_API_URL}/coffee-beans/${id}`);
  } catch (error) {
    console.error('Error deleting bean:', error);
    throw error;
  }
};
