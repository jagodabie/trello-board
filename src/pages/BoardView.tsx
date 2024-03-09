import { BoardHeader, BoardMain, StyledBoardView } from '.';
import { ReadModeElement } from '../components/UI/ReadModeElement/ReadModeElement';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { Textarea } from '../components/UI/Textarea/Textarea';
import {
  deleteWorkspace,
  setActiveItem,
  updateWorkspaceName,
} from '../store/slices/actions';

export const BoardView = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const activeWorkspace = useAppSelector((state) =>
    state.board.workspaces.find((workspace) => workspace.id === id)
  );

  const activeItem = useAppSelector((state) => state.board.activeItem);

  return (
    <StyledBoardView>
      <BoardHeader>
        {/* TODO: Style for task but separate style for header */}
        {activeItem && activeItem === activeWorkspace?.id ? (
          <Textarea
            placeholder='Add a title'
            name='title'
            onBlur={(inputValue) => {
              console.log('inputValue', inputValue);
              dispatch(setActiveItem(''));
              if (!inputValue) return;
              dispatch(updateWorkspaceName(inputValue));
            }}
            header={true}
            defaultValue={activeWorkspace?.name}
          />
        ) : (
          <ReadModeElement
            header
            name={activeWorkspace?.name || ''}
            boardElementClass='workspace'
            isActionVisible
            onEdit={() => dispatch(setActiveItem(id))}
            onDelete={() =>
              dispatch(deleteWorkspace(activeWorkspace?.id || ''))
            }
          />
        )}
      </BoardHeader>
      <BoardMain>Body</BoardMain>
    </StyledBoardView>
  );
};
