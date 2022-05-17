import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'store/store';
import { fetchUsers } from 'store/usersSlice';
import { fetchPosts } from 'store/postsSlice';
import App from './App';
import './index.css';

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
