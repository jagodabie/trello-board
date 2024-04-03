import { ReadModeElementWrapper } from '.';
import { Delete } from '../../../assets/icons/Delete';
import { Edit } from '../../../assets/icons/Edit';

export const ReadModeElement = ({
  name,
  header,
  active,
  boardElementClass,
  transparent = 0,
  isActionVisible = false,
  onEdit,
  onDelete,
}: {
  name: string;
  header?: number;
  active?: number;
  transparent?: number;
  boardElementClass: string;
  isActionVisible?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}) => {
  return (
    <ReadModeElementWrapper
      active={active || 0}
      className={boardElementClass || ''}
      $header={header || 0}
      $transparent={transparent}
    >
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
