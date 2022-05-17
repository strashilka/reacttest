import {
  AsyncThunk,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityAdapter,
} from '@reduxjs/toolkit';
import { LoadingStatus } from 'utils/LoadingStatus';
import { RootState } from './store';

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
  isDeleted: boolean;
}

type commentsState = {
    status: LoadingStatus
    error: string
    currentPostId: number
    postComments: Array<Comment>
  entities:Array<Comment>
}

const commentsAdapter:EntityAdapter<Comment> = createEntityAdapter<Comment>();
export const { selectById: selectCommentById } = commentsAdapter.getSelectors(
  (state:RootState) => state.comments,
);

const initialState = commentsAdapter.getInitialState({
  status: LoadingStatus.Idle,
  error: '',
  entities: [],
} as commentsState);

export const fetchCommentsByPostId = createAsyncThunk('CommentsList/fetchCommentsByPostId', async (postId:number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  return (await response.json()) as Array<Comment>;
});

export const removeComment = createAsyncThunk('CommentsList/removeComment', async (commentId:number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${commentId}`, {
    method: 'DELETE',
  });
  return (await response.json()) as Response;
});

export type UpdateComment = {
  commentId: number,
  commentBody: string
}

export const editComment:AsyncThunk<Comment, UpdateComment, {}> = createAsyncThunk('CommentsList/editComment', async (data: UpdateComment) => {
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
  return (await response.json()) as Comment;
});

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.status = LoadingStatus.Loading;
        state.error = '';
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        commentsAdapter.upsertMany(state, action.payload);
        state.status = LoadingStatus.Idle;
        state.error = '';
      })
      .addCase(fetchCommentsByPostId.rejected, (state) => {
        state.status = LoadingStatus.Idle;
        state.error = 'Can not load CommentsList for post ';
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
    const commentsArray: Array<Comment> = Object.values(state.comments.entities);
    return commentsArray.filter((comment) => comment.postId === postId && !comment.isDeleted)
      .map((comment) => comment.id);
  },
);

export const wasCommentsLoadedByPostId = (postId: number) => createSelector(
  selectSelf,
  (state: RootState) => {
    const commentsArray: Array<Comment> = Object.values(state.comments.entities);
    return commentsArray.filter((comment) => comment.postId === postId).length > 0;
  },
);

export const selectCommentsStatus = createSelector(
  selectSelf,
  (state:RootState) => state.comments.status,
);
