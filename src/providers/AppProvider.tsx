import { ThemeProvider } from 'styled-components';

interface AppProvidersProps {
  children: React.ReactNode;
  theme: Record<string, Record<string, string>>;
}

const AppProviders = ({ children, theme }: AppProvidersProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
export default AppProviders;
