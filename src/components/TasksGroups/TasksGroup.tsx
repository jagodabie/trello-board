import { TasksGroupWrapper } from '.';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  deleteWorkspaceTasksGroup,
  setActiveColumn,
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
import { withDnDElement } from '../../hoc/withDnDElement';

const DraggableTask = withDnDElement(Task);

export const TasksGroup = ({ tasksGroup }: TasksGroupProps) => {
  const [height, setHeight] = useState(0);
  const dispatch = useAppDispatch();
  const { id, name, tasks } = tasksGroup;
  const boardSlice = useAppSelector(({ board }) => board);
  const { activeColumn } = boardSlice;

  useEffect(() => {
    setHeight(tasks.length * 3 + 1);
  }, [tasks.length]);

  return (
    <TasksGroupWrapper
      $height={height.toString()}
      active={Number(activeColumn?.id === id)}
    >
      <div
        role='heading'
        aria-level={7}
        aria-label='Task group header'
        className='tasks-list-header'
      >
        {!!(id === activeColumn?.id) ? (
          <Textarea
            // TODO: add cases
            ariaLabel='Add list'
            placeholder='Add list'
            defaultValue={name}
            onBlur={(inputValue) => {
              if (!inputValue) return;
              dispatch(updateTasksGroupName(inputValue));
              dispatch(setActiveColumn(null));
            }}
          />
        ) : (
          <ReadModeElement
            key={id}
            name={name}
            transparent={1}
            boardElementClass='tasksGroup'
            isActionVisible
            onEdit={() => dispatch(setActiveColumn(tasksGroup))}
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
          {!!tasks?.length &&
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
