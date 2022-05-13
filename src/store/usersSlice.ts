import {
  createSlice, createAsyncThunk, createEntityAdapter, EntityAdapter,
} from '@reduxjs/toolkit';
import { User } from 'views/Users/User';
import { RootState } from './store';

type usersState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string
}

const usersAdapter :EntityAdapter<User> = createEntityAdapter();
export const usersSelectors = usersAdapter.getSelectors<RootState>(
  (state) => state.users,
);
const initialState = usersAdapter.getInitialState({
  status: 'idle',
  error: '',
} as usersState);

export const fetchUsers = createAsyncThunk('UsersList/fetchUsers', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return (await response.json()) as Array<User>;/// todo: try Returned
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
        state.error = 'No loaded UsersList';
      });
  },
});
