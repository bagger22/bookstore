import axios from 'axios';
import { BookProps } from './types';

interface ApiResponse {
  total: number;
  books: BookProps[];
}

const API_BASE_URL = 'https://api.itbook.store/1.0';

export const fetchNewBooks = async (currentPage: number, limit: number): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(`${API_BASE_URL}/search/new?page=${currentPage}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching new books:', error);
    throw error;
  }
};

export const fetchBookDetails = async (isbn13: string) => {
  try {
    const response = await fetch(`https://api.itbook.store/1.0/books/${isbn13}`);
    if (!response.ok) {
      throw new Error(`Error fetching book details. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchBookDetails:', error);
    throw error;
  }
};

