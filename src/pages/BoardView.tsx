import { BoardHeader, BoardMain, Heading, StyledBoardView } from '.';
import { useAppSelector } from '../hooks/useAppDispatch';

export const BoardView = ({ id }: { id: string }) => {
  const workspace = useAppSelector((state) =>
    state.board.workspaces.find((workspace) => workspace.id === id)
  );

  return (
    <StyledBoardView>
      <BoardHeader>
        <Heading>{workspace?.name || ''}</Heading>
      </BoardHeader>
      <BoardMain>Body</BoardMain>
    </StyledBoardView>
  );
};
