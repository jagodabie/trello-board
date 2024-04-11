import { WorkspaceInterface } from '../../store/types';

export interface SideNavigationInterface {
  anchor: string;
  toggleDrawer: (anchor: string, open: boolean) => () => void;
  id?: string;
  boardsList: Pick<WorkspaceInterface, 'id' | 'name'>[] | [];
}
