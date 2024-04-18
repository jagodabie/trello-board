import { ReadModeElementWrapper } from '.';
import { Delete } from '../../../assets/icons/Delete';
import { Edit } from '../../../assets/icons/Edit';

export const ReadModeElement = ({
  name,
  customStyles,
  active,
  boardElementClass,
  isActionVisible = false,
  onEdit,
  ariaLabel,
  onDelete,
}: {
  name: string;
  customStyles?: Record<string, string>;
  header?: number;
  active?: number;
  ariaLabel?: string;

  boardElementClass: string;
  isActionVisible?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}) => {
  return (
    <ReadModeElementWrapper
      active={active || 0}
      className={boardElementClass}
      $customStyles={customStyles}
    >
      <div
        className={`${boardElementClass}-name`}
        role='button'
        aria-label={ariaLabel}
        tabIndex={0}
        onClick={!isActionVisible ? onEdit : () => {}}
      >
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
