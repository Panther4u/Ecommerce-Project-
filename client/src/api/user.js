// user.js

// Assume this function fetches user profile data from the backend API
export const fetchUserProfile = async (userId) => {
    try {
      // Make an HTTP request to fetch user profile data based on userId
      const response = await fetch(`http://localhost:8000/api/users/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const userProfile = await response.json();
      return userProfile;
    } catch (error) {
      throw new Error('Error fetching user profile: ' + error.message);
    }
  };
  