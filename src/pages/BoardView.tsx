import { BoardHeader, BoardMain, StyledBoardView } from '.';
import { ReadModeElement } from '../components/UI/ReadModeElement/ReadModeElement';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { Textarea } from '../components/UI/Textarea/Textarea';
import {
  deleteWorkspace,
  setActiveItem,
  updateWorkspaceName,
} from '../store/slices/actions';
import { TasksGroup } from '../components/TasksGroups/TasksGroup';

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
              dispatch(setActiveItem(''));
              if (!inputValue) return;
              dispatch(updateWorkspaceName(inputValue));
            }}
            header={1}
            defaultValue={activeWorkspace?.name}
          />
        ) : (
          <ReadModeElement
            key={activeWorkspace?.id}
            header={1}
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
      <BoardMain>
        {activeWorkspace?.tasksGroups &&
          activeWorkspace?.tasksGroups.map((tasksGroup) => (
            <TasksGroup tasksGroup={tasksGroup} key={tasksGroup.id} />
          ))}
      </BoardMain>
    </StyledBoardView>
  );
};
