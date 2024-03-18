import { TasksGroupWrapper } from '.';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  deleteWorkspaceTasksGroup,
  setActiveItem,
  updateTasksGroupName,
} from '../../store/slices/actions';
import { TasksGroupInterface } from '../../store/types';
import { Button } from '../UI/Button/Button';
import { ReadModeElement } from '../UI/ReadModeElement/ReadModeElement';
import { Textarea } from '../UI/Textarea/Textarea';

interface TasksGroupProps {
  tasksGroup: TasksGroupInterface;
}

export const TasksGroup = ({ tasksGroup }: TasksGroupProps) => {
  const dispatch = useAppDispatch();
  const { id, name } = tasksGroup;
  const activeItem = useAppSelector((state) => state.board.activeItem);

  return (
    <TasksGroupWrapper>
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
      ></div>
      <div
        className='tasks-list-footer'
        role='contentinfo'
        aria-label='Tasks group footer'
      >
        <Button text='Add task' onClick={() => console.log('Jagoda')} />
      </div>
    </TasksGroupWrapper>
  );
};
