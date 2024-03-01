export interface NavigationInterface {
  anchor: string;
  toggleDrawer: (anchor: string, open: boolean) => () => void;
  id?: number;
  boardsList?: string[];
}
