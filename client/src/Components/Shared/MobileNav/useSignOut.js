// useSignOut.js (example implementation)
import { useDispatch } from 'react-redux';
import { signOut } from 'src/Features/userSlice'; // Adjust path as per your project structure

const useSignOut = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    // Dispatch the signOut action from Redux
    dispatch(signOut());
    // Additional logic for sign-out functionality if needed
  };

  return handleSignOut;
};

export default useSignOut;
