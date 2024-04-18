import { Route, Routes } from 'react-router-dom';

export const CustomRouter = ({
  components,
}: {
  components: Array<{ path: string; component: React.ReactNode }>;
}) => {
  return (
    <Routes>
      {components.map(
        ({ path, component }: { path: string; component: React.ReactNode }) => (
          <Route path={path} element={component} />
        )
      )}
    </Routes>
  );
};
