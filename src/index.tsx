import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from '@emotion/styled';
import { Users } from './users';
import NavigationMenu from './nav';
import Posts from './posts';
import Post from './post';
import './index.css';
import { store } from './store';
import { fetchUsers } from './usersSlice';
import { fetchPosts } from './postsSlice';

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

const DivError = styled.div`
  color: red;
  padding: 20px 0;
`;

function Main() {
  return (
    <div>
      <h3>Тестовое. Задача:</h3>
      <ul>
        <li>отобразить список постов</li>
        <li>постраничный вывод</li>
        <li>возможность просмотреть подробную информацию о посте</li>
        <li>у поста должен быть список комментариев</li>
        <li>пользователь должен иметь возможность добавить и удалить комментарий</li>
      </ul>
    </div>
  );
}

function NotFound404() {
  return (
    <DivError>
      Not found, 404
    </DivError>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="posts" element={<Posts />}>
          <Route path=":postId" element={<Post />} />
        </Route>
        <Route path="users" element={<Users />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
