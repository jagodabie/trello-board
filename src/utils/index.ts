import { arrayMove } from '@dnd-kit/sortable';

export const generateId = (): string => {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001).toString();
};
export const getTaskPosition = <T extends { id: string }>(
  elements: T[],
  id: string
) => elements.findIndex((element) => element.id === id);

export const changedElementsOrder = <T>(
  elements: T[],
  originalPosition: number,
  newPosition: number
) => {
  return arrayMove(elements, originalPosition, newPosition);
};
