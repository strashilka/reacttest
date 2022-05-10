import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from './store';

type usersState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string
}

const usersAdapter = createEntityAdapter();
export const usersSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.users,
);
const initialState = usersAdapter.getInitialState({
  status: 'idle',
  error: '',
} as usersState);

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return (await response.json()) as Response;/// todo: try Returned
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        usersAdapter.setAll(state, action.payload);
        state.status = 'idle';
        state.error = '';
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
        state.error = 'No loaded users';
      });
  },
});
