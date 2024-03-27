import { BoardHeader, BoardMain, StyledBoardView } from '.';
import { ReadModeElement } from '../components/UI/ReadModeElement/ReadModeElement';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { Textarea } from '../components/UI/Textarea/Textarea';
import {
  DndContext,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  deleteWorkspace,
  setActiveColumn,
  setActiveItem,
  updateWorkspaceName,
} from '../store/slices/actions';
import { TasksGroup } from '../components/TasksGroups/TasksGroup';
import { useHandleDragEnd } from '../hooks/useHandleDragEnd/useHandleDragEnd';
import { SortableContext } from '@dnd-kit/sortable';
import { withDnDElement } from '../hoc/withDnDElement';
import { TasksGroupInterface } from '../store/types';

const DraggableTasksGroup = withDnDElement(TasksGroup);

export const BoardView = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const activeWorkspace = useAppSelector((state) =>
    state.board.workspaces.find((workspace) => workspace.id === id)
  );
  const { handleDragEnd } = useHandleDragEnd(
    activeWorkspace?.tasksGroups || []
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const activeItem = useAppSelector((state) => state.board.activeItem);
  return (
    <StyledBoardView>
      <BoardHeader role='header' aria-label='Board header'>
        {/* TODO: Style for task but separate style for header */}

        {activeItem && activeItem === activeWorkspace?.id ? (
          <Textarea
            placeholder='Add a title'
            name='title'
            ariaLabel='title'
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
      <BoardMain role='main' aria-label='Board main'>
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={(e) => dispatch(setActiveColumn(e.active.id.toString()))}
          collisionDetection={closestCorners}
        >
          <SortableContext items={activeWorkspace?.tasksGroups ?? []}>
            {activeWorkspace?.tasksGroups.length ? (
              activeWorkspace?.tasksGroups.map(
                (tasksGroup: TasksGroupInterface) => (
                  <DraggableTasksGroup
                    type='tasksGroup'
                    element={tasksGroup}
                    tasksGroup={tasksGroup}
                    id={tasksGroup.id}
                    key={tasksGroup.id}
                  />
                )
              )
            ) : (
              <p aria-label='No tasks groups'>No tasks groups</p>
            )}
          </SortableContext>
        </DndContext>
      </BoardMain>
    </StyledBoardView>
  );
};
