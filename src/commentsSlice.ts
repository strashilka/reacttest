import {
  createSlice, createAsyncThunk, createEntityAdapter, createSelector, EntityAdapter, AsyncThunk,
} from '@reduxjs/toolkit';
import { RootState } from './store';

export type CommentI = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
  isDeleted: boolean;
}

type commentsState = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string
    currentPostId: number
    postComments: Array<CommentI>
  entities:Array<CommentI>
}

const commentsAdapter:EntityAdapter<CommentI> = createEntityAdapter<CommentI>();

export const commentsSelectors = commentsAdapter.getSelectors<RootState>(
  (state: RootState) => state.comments,
);

export const { selectById: selectCommentById } = commentsAdapter.getSelectors(
  (state:RootState) => state.comments,
);

const initialState = commentsAdapter.getInitialState({
  status: 'idle',
  error: '',
  entities: [],
} as commentsState);

export const fetchCommentsByPostId = createAsyncThunk('comments/fetchCommentsByPostId', async (postId:number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  return (await response.json()) as Array<CommentI>;
});

export const removeComment = createAsyncThunk('comments/removeComment', async (commentId:number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`, {
    method: 'DELETE',
  });
  return (await response.json()) as Response;
});

export type UpdateComment = {
  commentId: number,
  commentBody: string
}

export const editComment:AsyncThunk<CommentI, UpdateComment, any> = createAsyncThunk('comments/editComment', async (data: UpdateComment) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${data.commentId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      body: data.commentBody,
      id: data.commentId,
      text: data.commentBody,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return (await response.json()) as CommentI;
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.status = 'idle';
        state.error = '';
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        commentsAdapter.upsertMany(state, action.payload);
        state.status = 'idle';
        state.error = '';
      })
      .addCase(fetchCommentsByPostId.rejected, (state) => {
        state.status = 'idle';
        state.error = 'Can not load comments for post ';
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        const commentId = action.meta.arg;
        state.entities[commentId.toString()].isDeleted = true;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        const commentId = action.payload.id;
        state.entities[commentId.toString()].body = action.payload.body;
      });
  },
});

const selectSelf = (state: RootState) => state;
export const getCommentsIdsByPostId = (postId: number) => createSelector(
  selectSelf,
  (state: RootState) => {
    const commentsArray: Array<CommentI> = Object.values(state.comments.entities);
    return commentsArray.filter((comment) => comment.postId === postId && !comment.isDeleted)
      .map((comment) => comment.id);
  },
);

export const wasCommentsLoadedByPostId = (postId: number) => createSelector(
  selectSelf,
  (state: RootState) => {
    const commentsArray: Array<CommentI> = Object.values(state.comments.entities);
    return commentsArray.filter((comment) => comment.postId === postId).length > 0;
  },
);
