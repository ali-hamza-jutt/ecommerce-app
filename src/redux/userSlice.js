import { createSlice } from '@reduxjs/toolkit';

// Helper function to get the user from localStorage
const getLocalStorageUser = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const uid = localStorage.getItem('uid');
  const displayName = localStorage.getItem('displayName');

  if (isAuthenticated && uid) {
    return {
      uid,
      displayName: displayName || '',
      isAuthenticated: true,
    };
  }
  return {
    uid: null,
    displayName: '',
    isAuthenticated: false,
  };
};

const userSlice = createSlice({
  name: 'user',
  initialState: getLocalStorageUser(),
  reducers: {
    setUser: (state, action) => {
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('uid', action.payload.uid);
      localStorage.setItem('displayName', action.payload.displayName);
    },
    logout: (state) => {
      state.uid = null;
      state.displayName = '';
      state.isAuthenticated = false;
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('uid');
      localStorage.removeItem('displayName');
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

export const selectUserData = (state) => state.user;
