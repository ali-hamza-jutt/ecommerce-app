import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../Authentication/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Extract only the necessary fields from Firebase user object
const extractUserData = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
});

export const signup = createAsyncThunk(
  "user/signup",
  async ({ firstName, email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return {
      displayName: firstName,
      ...extractUserData(user),
    };
  }
);

export const login = createAsyncThunk("user/login", async ({ email, password }) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  return extractUserData(user);
});

export const logout = createAsyncThunk('user/logout', async () => {
  await signOut(auth);
  return {};
});

const initialState = {
  userData: JSON.parse(localStorage.getItem('userData')) || {
    uid: "",
    email: "",
    displayName: "",
  },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getCoordinates(state, action) {
      state.longitude = action.payload.longitude;
      state.latitude = action.payload.latitude;
    },
    setProfileData(state, action) {
      state.userData.email = action.payload.email;
      state.userData.displayName = action.payload.displayName;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        localStorage.setItem('userData', JSON.stringify(action.payload));
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        localStorage.setItem('userData', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.userData = {
          uid: "",
          email: "",
          displayName: "",
        };
        localStorage.removeItem('userData');
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;

export const { getCoordinates, setProfileData } = userSlice.actions;

export const selectUserData = (state) => state.user.userData || {};
