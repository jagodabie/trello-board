import { TasksGroupWrapper } from '.';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  deleteWorkspaceTasksGroup,
  setActiveItem,
  updateTasksGroupName,
} from '../../store/slices/actions';
import { TasksGroupInterface } from '../../store/types';
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
      <div className='tasks-list-header'>
        {/* name, id */}
        {id === activeItem ? (
          <Textarea
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
            onDelete={() => dispatch(deleteWorkspaceTasksGroup(id))}
          />
        )}
      </div>
      <div className='tasks-list-main'></div>
      <div className='tasks-list-footer'></div>
    </TasksGroupWrapper>
  );
};
