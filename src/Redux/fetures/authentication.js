
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  token: null,
  error: null,
  status:null,
};

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axios.post('https://fire-hot-hardhat.glitch.me/login', credentials);
  console.log(response.data, "response")
  return response
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [login.pending]: (state) => {
      state.loading=true;

    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.status=action.payload.status;
      state.error = null;
      sessionStorage.setItem("token" , action.payload.data.token )
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload
      state.loading = false;

      // console.log(action.payload , "message ")
    },
  },
});

export default authSlice.reducer;
