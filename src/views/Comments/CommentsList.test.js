import React from 'react';
// import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
// import configureMockStore from 'redux-mock-store';
import { screen, render, cleanup } from '@testing-library/react';
import { configureStore, createStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { commentsSlice } from '@store/commentsSlice';
import { usersSelectors, usersSlice } from '@store/usersSlice';
import CommentsList from './CommentsList';
// import { render } from './testUtils';
// const mockStore = configureMockStore();

const initialState = usersAdapter.getInitialState({
  status: 'idle',
  error: '',
});

const renderWithRedux = (
  component:React.Component,
  { initialState, store = configureStore({ reducer: usersSlice.reducer }, { initialState }) } = {},
) => ({
  ...render(<Provider store={store}>{component}</Provider>),
  store,
});

// afterEach(cleanup);

describe('CommentsList', () => {
  test('is preloading text present', () => {
    renderWithRedux(<CommentsList postId="5" />);

    expect(screen).toHaveTextContent('Loading CommentsList...');
  });

  // test('get CommentsList for post 5', async () => {
  //   render(<CommentsList postId="5" />);
  //
  //   const loading = screen.getByText('Loading CommentsList...');
  //   expect(loading).toBeTruthy();
  //
  //   await waitFor(() => {
  //     expect(screen.getByText('Khalil@emile.co.uk')).toBeInTheDocument();
  //   });
  // });
});
