import { BoardHeader, BoardMain, Heading, StyledBoardView } from '.';
import { Input } from '../components/UI/Input/Input';
import { useAppSelector } from '../hooks/useAppDispatch';

export const BoardView = ({ id }: { id: string }) => {
  const workspace = useAppSelector((state) =>
    state.board.workspaces.find((workspace) => workspace.id === id)
  );

  return (
    <StyledBoardView>
      <BoardHeader>
        <Input
          name='tasks-list'
          placeholder='Add list'
          defaultValue={workspace?.name || ''}
        />
        <Heading>{workspace?.name || ''}</Heading>
      </BoardHeader>
      <BoardMain>Body</BoardMain>
    </StyledBoardView>
  );
};
