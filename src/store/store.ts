import { configureStore } from '@reduxjs/toolkit';
import { boardSlice } from './slices';
import { tasksApi } from './slices/apiSlice';

export const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
