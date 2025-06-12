import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://3.7.81.243/projects/plie-api/public/api';

export const handleLogin = async (email: string, password: string): Promise<{ success: boolean; token?: string; message?: string }> => {
  if (!email || !password) {
    return { success: false, message: 'Please enter email and password.' };
  }

  const data = new FormData();
  data.append('email', email);
  data.append('password', password);

  try {
    const response = await axios.post(`${BASE_URL}/login`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.data.success) {
      const token = response.data.data?.token;
      if (token) {
        await AsyncStorage.setItem('auth_token', token);
      }
      return { success: true, token };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error: any) {
    return { success: false, message: error.message || 'Login failed' };
  }
};

export const fetchEvents = async () => {
  const token = await AsyncStorage.getItem('auth_token');
  const response = await axios.post(
    `${BASE_URL}/events-listing`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data.events;
};

export const handleLogout = async () => {
    await AsyncStorage.removeItem('auth_token');
};
