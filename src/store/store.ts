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
// Inferred type: {Posts: PostsState, CommentsList: CommentsState, UsersList: UsersState}
export type AppDispatch = typeof store.dispatch
