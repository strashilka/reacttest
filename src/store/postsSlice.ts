import {
  createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityAdapter,
} from '@reduxjs/toolkit';
import { UserOption } from 'views/Users/User';
import { LoadingStatus } from 'utils/LoadingStatus';
import { RootState } from './store';

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
}

type postsState = {
    status: LoadingStatus
    error: string
    entities: Array<Post>
}

const postsAdapter: EntityAdapter<Post> = createEntityAdapter();
export const { selectById: selectPostById } = postsAdapter
  .getSelectors<RootState>((state) => state.posts);

const initialState = postsAdapter.getInitialState({
  status: LoadingStatus.Idle,
  error: '',
  entities: [],
} as postsState);

export const fetchPosts = createAsyncThunk('Posts/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
  return (await response.json()) as Array<Post>;
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = LoadingStatus.Loading;
        state.error = '';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        postsAdapter.setAll(state, action.payload);
        state.status = LoadingStatus.Idle;
        state.error = '';
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = LoadingStatus.Failed;
        state.error = 'No loaded UsersList';
      });
  },
});

const selectSelf = (state: RootState) => state;
export const selectPostsByUser = (selectedUser: UserOption) => createSelector(
  selectSelf,
  (state: RootState) => {
    const postsArray: Array<Post> = Object.values(state.posts.entities);

    if (selectedUser === null) return postsArray;
    return postsArray.filter((post) => post.userId === selectedUser.value);
  },
);

export const selectPostsStatus = createSelector(
  selectSelf,
  (state:RootState) => state.posts.status,
);
