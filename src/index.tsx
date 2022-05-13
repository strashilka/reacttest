import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from '@emotion/styled';
import { store } from 'store/store';
import UsersList from 'views/Users/UsersList';
import { fetchUsers } from 'store/usersSlice';
import { fetchPosts } from 'store/postsSlice';
import NavigationMenu from 'views/NavigationMenu/NavigationMenu';
import PostsList from 'views/Posts/PostsList';
import PostItem from 'views/Posts/PostItem';
import './index.css';

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
        <Route path="posts" element={<PostsList />}>
          <Route path=":postId" element={<PostItem />} />
        </Route>
        <Route path="users" element={<UsersList />} />
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
