import {
  createSlice, createAsyncThunk, createEntityAdapter, EntityAdapter,
} from '@reduxjs/toolkit';
import { RootState } from './store';

export type PostI = {
  id: string;
  userId: number;
  title: string;
  body: string;
}

type postsState = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string
    entities: Array<PostI>
}

const postsAdapter: EntityAdapter<PostI> = createEntityAdapter();
export const postsSelectors = postsAdapter.getSelectors<RootState>(
  (state) => state.posts,
);

export const { selectById: selectPostById } = postsAdapter
  .getSelectors<RootState>((state) => state.posts);

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: '',
  entities: [],
} as postsState);

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
  return (await response.json()) as Array<PostI>;
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        postsAdapter.setAll(state, action.payload);
        state.status = 'idle';
        state.error = '';
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = 'failed';
        state.error = 'No loaded users';
      });
  },
});
