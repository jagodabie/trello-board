import { ReadModeElementWrapper } from '.';
import { Delete } from '../../../assets/icons/Delete';
import { Edit } from '../../../assets/icons/Edit';

export const ReadModeElement = ({
  name,
  boardElementClass,
  isActionVisible = false,
  onEdit,
  onDelete,
}: {
  name: string;
  boardElementClass: string;
  isActionVisible?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}) => {
  return (
    <ReadModeElementWrapper boardElementClass={boardElementClass}>
      <div className={`${boardElementClass}-name`} role='button' tabIndex={0}>
        {name}
      </div>
      {isActionVisible && (
        <div className={`${boardElementClass}-actions`} role='group'>
          <div role='button' aria-label='edit' onClick={onEdit}>
            <Edit />
          </div>
          <div role='button' aria-label='delete' onClick={onDelete}>
            <Delete />
          </div>
        </div>
      )}
    </ReadModeElementWrapper>
  );
};
