import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { boardSlice } from './store/slices';
import { globalTheme as theme } from './styles/globalTheme';
import AppProviders from './providers/AppProvider';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Record<string, unknown>;
  store?: ReturnType<typeof configureStore>;
  path?: string;
  theme?: Record<string, Record<string, string>>;
}

const customRender = (
  ui: ReactElement,
  {
    preloadedState = {},
    path = '/',
    store = configureStore({
      reducer: { board: boardSlice.reducer },
      preloadedState,
    }),
    ...options
  }: CustomRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <AppProviders theme={options?.theme || theme}>
        <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>
      </AppProviders>
    </Provider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
