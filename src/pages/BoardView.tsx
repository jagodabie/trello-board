import { BoardHeader, BoardMain, Heading, StyledBoardView } from '.';
import { Input } from '../components/UI/Input/Input';
import { ReadModeElement } from '../components/UI/ReadModeElement/ReadModeElement';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { setActiveItem } from '../store/slices/actions';

export const BoardView = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const activeWorkspace = useAppSelector((state) =>
    state.board.workspaces.find((workspace) => workspace.id === id)
  );

  return (
    <StyledBoardView>
      <BoardHeader>
        <ReadModeElement
          name={activeWorkspace?.name || ''}
          boardElementClass='workspace'
          isActionVisible
        />

        <Input
          placeholder='Add a title'
          name='title'
          // TODO: remov e console log dispatch(setActiveItem)
          onBlur={(value) => console.log(value)}
          defaultValue={activeWorkspace?.name}
          type='text'
        />
        <Heading
          onClick={() => dispatch(setActiveItem(activeWorkspace?.id || ''))}
        >
          {activeWorkspace?.name}
        </Heading>
      </BoardHeader>
      <BoardMain>Body</BoardMain>
    </StyledBoardView>
  );
};
