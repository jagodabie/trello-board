import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// TODO: change it for evn variable
const localHost = 'https://localhost:7245/api';
export const tasksApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${localHost}/` }),
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: () => 'Tasks',
    }),
  }),
});

export const { useGetAllTasksQuery } = tasksApi;
