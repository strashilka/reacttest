import * as React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// Import your own reducer
import { commentsSlice } from 'store/commentsSlice';

type v = {
    children: React.ReactNode;
}
function render(
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: { comments: commentsSlice.reducer }, preloadedState }),
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }:v) {
    console.log({ children });
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
