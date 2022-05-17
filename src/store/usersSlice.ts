import {
  createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityAdapter,
} from '@reduxjs/toolkit';
import { User } from 'views/Users/User';
import { LoadingStatus } from 'utils/LoadingStatus';
import { RootState } from './store';

type usersState = {
  status: LoadingStatus
  error: string
}

const usersAdapter :EntityAdapter<User> = createEntityAdapter();
export const { selectAll: selectAllUsers } = usersAdapter.getSelectors(
  (state:RootState) => state.users,
);

const initialState = usersAdapter.getInitialState({
  status: LoadingStatus.Idle,
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
        state.status = LoadingStatus.Loading;
        state.error = '';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        usersAdapter.setAll(state, action.payload);
        state.status = LoadingStatus.Idle;
        state.error = '';
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = LoadingStatus.Failed;
        state.error = 'No loaded UsersList ';
      });
  },
});

const selectSelf = (state: RootState) => state;
export const selectUsersStatus = createSelector(
  selectSelf,
  (state:RootState) => state.users.status,
);
