import {
  BoardHeader,
  BoardMain,
  ReadModeActiveWrapper,
  StyledBoardView,
} from '..';
import { ReadModeElement } from '../../components/UI/ReadModeElement/ReadModeElement';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { Textarea } from '../../components/UI/Textarea/Textarea';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  createWorkspaceTasksGroup,
  setActiveColumn,
  setActiveItem,
  setActiveTask,
  setActiveWorkspace,
  updateWorkspaceName,
} from '../../store/slices/actions';
import { useHandleDragEnd } from '../../hooks/useHandleDragEnd/useHandleDragEnd';
import { SortableContext } from '@dnd-kit/sortable';
import { withDnDElement } from '../../hoc/withDnDElement';
import { TasksGroupType } from '../../store/types';
import { createPortal } from 'react-dom';
import { Task } from '../../components/Task/Task';
import { Button } from '../../components/UI/Button/Button';
import { Plus } from '../../assets/icons/Plus';
import { generateId } from '../../utils';
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { withRefTextarea } from '../../hoc/withRefsTextarea';
import { useHandleOnDragOver } from '../../hooks/useHandleOnDragOver/useHandleOnDragOver';
import { TasksGroup } from '../../components/TasksGroup/TasksGroup';

const DraggableTasksGroup = withDnDElement(TasksGroup);
const DraggableTask = withDnDElement(Task);
const TextareaWithRef = withRefTextarea(Textarea);

export const BoardView = () => {
  const { id } = useParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {
    dispatch(setActiveWorkspace(id!));
  }, [dispatch, id]);
  return (
    <StyledBoardView>
      <BoardHeader
        role='header'
        aria-label='Board header'
        test-dataid={`board-header-${activeWorkspace?.id}`}
      >
        {activeWorkspace?.id === activeItem ? (
          <TextareaWithRef
            placeholder='Add a workspace title'
            name='title'
            dataTestid='workspace-title'
            ariaLabel='title'
            forwardedRef={textareaRef}
            onBlur={(inputValue?: string) => {
              if (!inputValue) {
                // TODO: make it that better
                alert('Field cannot be empty!');
                return;
              }
              dispatch(updateWorkspaceName(inputValue));
              dispatch(setActiveItem(''));
            }}
            customStyle={{
              maxWidth: '100%',
              backgroundColor: 'transparent',
              fontWeight: '1000',
              fontSize: '25px',
            }}
            defaultValue={activeWorkspace?.name}
          />
        ) : (
          <ReadModeElement
            key={activeWorkspace?.id}
            name={activeWorkspace?.name || ''}
            boardElementClass='workspace'
            dataTestid='workspace-title'
            isActionVisible={false}
            onEdit={() => dispatch(setActiveItem(activeWorkspace?.id || ''))}
            customStyles={{
              fontWeight: '800',
              fontSize: '25px',
              height: '24px',
              maxWidth: '100%',
            }}
          />
        )}
      </BoardHeader>
      <BoardMain role='main' aria-label='Board main'>
        {!!activeWorkspace?.tasksGroups?.length && (
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
                  (tasksGroup: TasksGroupType) => (
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
