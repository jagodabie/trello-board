import {
  BoardHeader,
  BoardMain,
  ReadModeActiveWrapper,
  StyledBoardView,
} from '.';
import { ReadModeElement } from '../components/UI/ReadModeElement/ReadModeElement';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { Textarea } from '../components/UI/Textarea/Textarea';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  createWorkspaceTasksGroup,
  deleteWorkspace,
  setActiveColumn,
  setActiveItem,
  setActiveTask,
  updateWorkspaceName,
} from '../store/slices/actions';
import { TasksGroup } from '../components/TasksGroups/TasksGroup';
import { useHandleDragEnd } from '../hooks/useHandleDragEnd/useHandleDragEnd';
import { SortableContext } from '@dnd-kit/sortable';
import { withDnDElement } from '../hoc/withDnDElement';
import { TasksGroupInterface } from '../store/types';
import { useHandleOnDragOver } from '../hooks/useHandleOnDragOver/useHandleOnDragOver';
import { createPortal } from 'react-dom';
import { Task } from '../components/Task/Task';
import { Button } from '../components/UI/Button/Button';
import { Plus } from '../assets/icons/Plus';
import { generateId } from '../utils';

const DraggableTasksGroup = withDnDElement(TasksGroup);
const DraggableTask = withDnDElement(Task);

export const BoardView = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { activeTask, activeColumn, workspaces, activeItem } = useAppSelector(
    (state) => state.board
  );
  const activeWorkspace = workspaces?.find((workspace) => workspace?.id === id);

  const { handleOnDragOver } = useHandleOnDragOver(
    activeWorkspace?.tasksGroups || []
  );

  const { handleDragEnd } = useHandleDragEnd();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <StyledBoardView>
      <BoardHeader role='header' aria-label='Board header'>
        {/* TODO: Style for task but separate style for header */}

        {activeWorkspace?.id === activeItem ? (
          <Textarea
            placeholder='Add a title'
            name='title'
            ariaLabel='title'
            onBlur={(inputValue) => {
              dispatch(setActiveTask(null));
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
        {activeWorkspace?.tasksGroups?.length && (
          <DndContext
            sensors={sensors}
            onDragOver={handleOnDragOver}
            onDragEnd={handleDragEnd}
            onDragStart={(e) => {
              e.active.data.current?.type === 'task'
                ? dispatch(setActiveTask(e.active.data.current?.element))
                : dispatch(setActiveColumn(e.active.data.current?.element));
            }}
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
            {createPortal(
              <DragOverlay>
                {activeColumn && (
                  <DraggableTasksGroup
                    element={activeColumn!}
                    type='tasksGroup'
                    tasksGroup={activeColumn!}
                    id={activeColumn.id}
                  />
                )}
                {activeTask && (
                  <ReadModeActiveWrapper>
                    <DraggableTask
                      element={activeTask}
                      type='task'
                      task={activeTask!}
                      id={activeTask.id}
                      tasksGroup={activeColumn!}
                    />
                  </ReadModeActiveWrapper>
                )}
              </DragOverlay>,
              document.body
            )}
          </DndContext>
        )}
        <Button
          text={`Add ${
            activeWorkspace?.tasksGroups?.length ? 'next' : 'new'
          } list`}
          iconComponent={<Plus color='#fff' />}
          onClick={() => {
            const newTasksGroup = {
              id: generateId(),
              name: 'New list',
              tasks: [],
              workspaceId: activeWorkspace?.id || '',
            };
            dispatch(createWorkspaceTasksGroup(newTasksGroup));
            dispatch(setActiveColumn(newTasksGroup));
          }}
        />
      </BoardMain>
    </StyledBoardView>
  );
};
