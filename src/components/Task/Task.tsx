import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { useUpdateTaskProperty } from '../../hooks/useUpdateTaskProperty/useUpdateTaskProperty';
import { setActiveItem, setTasks } from '../../store/slices/actions'; // Remove the unused import
import { TaskInterface, TasksGroupInterface } from '../../store/types';
import { ReadModeElement } from '../UI/ReadModeElement/ReadModeElement';
import { Textarea } from '../UI/Textarea/Textarea';

export const Task = ({
  task,
  tasksGroup,
}: {
  task: TaskInterface;
  tasksGroup: TasksGroupInterface;
}) => {
  const { name, id } = task;
  const board = useAppSelector((state) => state.board);
  const { activeItem } = board;
  const dispatch = useAppDispatch();
  const updateTaskProperty = useUpdateTaskProperty(task, tasksGroup);
  return (
    <>
      {id === activeItem ? (
        <Textarea
          name={name}
          placeholder='Add task'
          ariaLabel='Add task'
          defaultValue={name}
          onBlur={(inputValue) => {
            if (!inputValue) return;
            updateTaskProperty('name', inputValue || '');
            dispatch(setActiveItem(''));
          }}
        />
      ) : (
        <ReadModeElement
          key={id}
          name={name}
          active={Number(id === activeItem)}
          boardElementClass='tasks'
          isActionVisible
          onEdit={() => dispatch(setActiveItem(id))}
          onDelete={() =>
            dispatch(
              setTasks({
                tasks: [...tasksGroup.tasks.filter((task) => task.id !== id)],
                tasksGroupId: tasksGroup.id,
              })
            )
          }
        />
      )}
    </>
  );
};
