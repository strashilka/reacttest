import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './usersSlice';
import { postsSlice } from './postsSlice';
import { commentsSlice } from './commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    posts: postsSlice.reducer,
    comments: commentsSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
