import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // toBeInTheDocument
import { BrowserRouter } from 'react-router-dom';
import NavigationMenu from './nav';

describe('NavigationMenu', () => {
  test('renders Navigation Menu', () => {
    render(
      <BrowserRouter>
        <NavigationMenu />
      </BrowserRouter>,
    );

    expect(screen.getByText('Posts')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  test('links navigate to location', () => {
    render(
      <BrowserRouter>
        <NavigationMenu />
      </BrowserRouter>,
    );

    const urlBeforeClick = document.URL;

    const usersLink = screen.getByText('Users');
    fireEvent.click(usersLink);
    expect(window.location.href).toBe(`${urlBeforeClick}users`);

    const postsLink = screen.getByText('Posts');
    fireEvent.click(postsLink);
    expect(window.location.href).toBe(`${urlBeforeClick}posts`);
  });

  test('number of links in Navigation Menu', () => {
    render(
      <BrowserRouter>
        <NavigationMenu />
      </BrowserRouter>,
    );

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(3);
  });
});
