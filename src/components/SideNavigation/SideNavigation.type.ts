export interface SideNavigationInterface {
  anchor: string;
  toggleDrawer: (anchor: string, open: boolean) => () => void;
  id: string;
}
