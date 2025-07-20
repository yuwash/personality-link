export interface Selection {
  placeId: string;
  interactionId: string;
}

export function serializePersonalityLink(selections: Selection[]): string {
  if (selections.length === 0) return '';
  
  const serializedSelections = selections.map(
    selection => `${selection.placeId}-${selection.interactionId}`
  ).join(';');
  
  return `v1;${serializedSelections}`;
}

export function deserializePersonalityLink(serializedString: string): Selection[] {
  if (!serializedString) return [];
  
  const parts = serializedString.split(';');
  if (parts.length < 2 || parts[0] !== 'v1') return [];
  
  const selections: Selection[] = [];
  for (let i = 1; i < parts.length; i++) {
    const [placeId, interactionId] = parts[i].split('-');
    if (placeId && interactionId) {
      selections.push({ placeId, interactionId });
    }
  }
  
  return selections;
}

export function addSelection(
  selections: Selection[], 
  placeId: string, 
  interactionId: string
): Selection[] {
  const newSelection = { placeId, interactionId };
  
  // Check if this combination already exists
  const exists = selections.some(
    selection => selection.placeId === placeId && selection.interactionId === interactionId
  );
  
  if (exists) return selections;
  
  return [...selections, newSelection];
}

export function removeSelection(selections: Selection[], index: number): Selection[] {
  return selections.filter((_, i) => i !== index);
}

export function moveSelectionUp(selections: Selection[], index: number): Selection[] {
  if (index <= 0) return selections;
  
  const newSelections = [...selections];
  [newSelections[index - 1], newSelections[index]] = [newSelections[index], newSelections[index - 1]];
  return newSelections;
}

export function moveSelectionDown(selections: Selection[], index: number): Selection[] {
  if (index >= selections.length - 1) return selections;
  
  const newSelections = [...selections];
  [newSelections[index], newSelections[index + 1]] = [newSelections[index + 1], newSelections[index]];
  return newSelections;
}