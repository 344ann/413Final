import { Entertainer } from '../types/Entertainer';
import { EntertainerSummary } from '../types/EntertainerSummary';

const API_URL =
  'https://finalproject-anna-backend-g4dye9a8gnh7evhk.eastus-01.azurewebsites.net/Entertainers';

// Fetch a list of entertainers with booking count and last date
export const fetchEntertainerSummaries = async (): Promise<
  EntertainerSummary[]
> => {
  try {
    const response = await fetch(`${API_URL}/Summary`);
    if (!response.ok) {
      throw new Error('Failed to fetch entertainers');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching entertainers:', error);
    throw error;
  }
};

// Fetch a specific entertainer by ID
export const fetchEntertainerById = async (
  id: number
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch entertainer');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching entertainer:', error);
    throw error;
  }
};

// Add a new entertainer
export const addEntertainer = async (
  newEnt: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/Add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEnt),
    });

    if (!response.ok) {
      throw new Error('Failed to add entertainer');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding entertainer:', error);
    throw error;
  }
};

// Update an entertainer
export const updateEntertainer = async (
  id: number,
  updatedEnt: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/Update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEnt),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating entertainer:', error);
    throw error;
  }
};

// Delete an entertainer
export const deleteEntertainer = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/Delete/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete entertainer');
    }
  } catch (error) {
    console.error('Error deleting entertainer:', error);
    throw error;
  }
};
