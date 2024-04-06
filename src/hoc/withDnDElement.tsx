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
    const {
      attributes,
      // isDragging,
      listeners,
      setNodeRef,
      transform,
      transition,
    } = useSortable({
      id: props.id!,
      data: { type: props.type, element: props.element },
    });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
    // TODO: It does not work dragging the element when i uncomment this code
    // if (isDragging) {
    //   return (
    //     <DraggingFrame>
    //       <div ref={setNodeRef} style={style}>
    //         {''}
    //       </div>
    //     </DraggingFrame>
    //   );
    // }
    return (
      <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
        <DraggableElement {...props} />
      </div>
    );
  };
};
