import { TasksGroupWrapper } from '.';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  deleteWorkspaceTasksGroup,
  setActiveItem,
  setTasks,
  updateTasksGroupName,
} from '../../store/slices/actions';
import { Task } from '../Task/Task';
import { Button } from '../UI/Button/Button';
import { ReadModeElement } from '../UI/ReadModeElement/ReadModeElement';
import { Textarea } from '../UI/Textarea/Textarea';
import { generateId } from '../../utils';
import { useEffect, useState } from 'react';
import { TasksGroupProps } from './index.type';
import { SortableContext } from '@dnd-kit/sortable';
import { DragOverlay } from '@dnd-kit/core';
import { withDnDElement } from '../../hoc/withDnDElement';
import { createPortal } from 'react-dom';

const DraggableTask = withDnDElement(Task);

export const TasksGroup = ({ tasksGroup }: TasksGroupProps) => {
  const [height, setHeight] = useState(0);
  const dispatch = useAppDispatch();
  const { id, name, tasks } = tasksGroup;
  const boardSlice = useAppSelector(({ board }) => board);
  const { activeItem, activeColumn, activeTask } = boardSlice;

  useEffect(() => {
    setHeight(tasks.length * 3 + 1);
  }, [tasks.length]);

  return (
    <TasksGroupWrapper
      $height={height.toString()}
      active={Number(activeColumn === id)}
    >
      <div
        role='heading'
        aria-level={7}
        aria-label='Task group header'
        className='tasks-list-header'
      >
        {/* name, id */}
        {id === activeItem ? (
          <Textarea
            // TODO: add cases
            ariaLabel='Add list'
            placeholder='Add list'
            defaultValue={name}
            onBlur={(inputValue) => {
              if (!inputValue) return;
              dispatch(updateTasksGroupName(inputValue));
              dispatch(setActiveItem(''));
            }}
          />
        ) : (
          <ReadModeElement
            key={id}
            name={name}
            transparent={1}
            boardElementClass='tasksGroup'
            isActionVisible
            onEdit={() => dispatch(setActiveItem(id))}
            onDelete={() => {
              dispatch(deleteWorkspaceTasksGroup(id));
            }}
          />
        )}
      </div>
      <div
        className='tasks-list-main'
        role='main'
        aria-label='Tasks group main'
      >
        <SortableContext items={tasks}>
          {tasks?.length &&
            tasks.map((task) => (
              <DraggableTask
                element={task}
                type='task'
                task={task}
                key={task.id}
                id={task.id}
                tasksGroup={tasksGroup}
              />
            ))}
          <DragOverlay>
            {activeItem &&
              createPortal(
                <DraggableTask
                  task={activeTask!}
                  tasksGroup={tasksGroup}
                  type='task'
                  id={activeTask!.id}
                  element={activeTask!}
                />,
                document.body // Add the target container as the second argument to createPortal
              )}
          </DragOverlay>
        </SortableContext>
      </div>
      <div
        className='tasks-list-footer'
        role='contentinfo'
        aria-label='Tasks group footer'
      >
        <Button
          text='Add task'
          onClick={() => {
            dispatch(
              setTasks({
                tasks: [
                  ...tasksGroup.tasks,
                  {
                    id: generateId(),
                    name: 'New Task',
                    done: false,
                    tasksGroupId: tasksGroup.id,
                  },
                ],
                tasksGroupId: tasksGroup.id,
              })
            );
            setHeight(tasks.length * 3 + 1);
          }}
        />
      </div>
    </TasksGroupWrapper>
  );
};
