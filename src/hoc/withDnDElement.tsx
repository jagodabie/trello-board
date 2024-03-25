import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { JSX } from 'react/jsx-runtime';

export const withDnDElement = <T extends {}>(
  DraggableElement: React.ComponentType<T>
) => {
  return function DnDElement(
    props: JSX.IntrinsicAttributes &
      T & { id: string; type: string; element: Record<string, any> }
  ) {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: props.id!,
        data: { type: props.type, element: props.element },
      });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    return (
      <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
        <DraggableElement {...props} />
      </div>
    );
  };
};
