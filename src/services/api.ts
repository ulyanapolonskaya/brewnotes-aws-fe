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

export const fetchBeans = async (): Promise<Bean[]> => {
  try {
    const response = await axios.get(`${BASE_API_URL}/coffee-beans`);
    return response.data;
  } catch (error) {
    console.error('Error fetching beans:', error);
    throw error;
  }
};
