import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from '@emotion/styled';
import { Users } from './users';
import NavigationMenu from './nav';
import Posts from './posts';
import Post from './post';
import './index.css';
import Example from './hooktest';

const DivError = styled.div`
  color: red;
  padding: 20px 0;
`;

// let AnotherComp = styled.div`
//   color: ${props => props.color};
// `

function App() {
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
      Not found 404
    </DivError>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <NavigationMenu />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="posts" element={<Posts />}>
        <Route path=":postId" element={<Post />} />
      </Route>
      <Route path="users" element={<Users />} />
      <Route path="example" element={<Example />} />
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'),
);
