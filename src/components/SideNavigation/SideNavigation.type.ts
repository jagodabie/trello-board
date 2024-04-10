import { WorkspaceInterface } from '../../store/types';

export interface SideNavigationInterface {
  anchor: string;
  toggleDrawer: (anchor: string, open: boolean) => () => void;
  id?: number;
  boardsList: Pick<WorkspaceInterface, 'id' | 'name'>[] | [];
}
