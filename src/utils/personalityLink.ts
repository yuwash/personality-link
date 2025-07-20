export interface Statement {
  placeId: string;
  interactionId: string;
}

export function serializePersonalityLink(statements: Statement[]): string {
  if (statements.length === 0) return '';
  
  const serializedStatements = statements.map(
    statement => `${statement.placeId}-${statement.interactionId}`
  ).join(';');
  
  return `v1;${serializedStatements}`;
}

export function deserializePersonalityLink(serializedString: string): Statement[] {
  if (!serializedString) return [];
  
  const parts = serializedString.split(';');
  if (parts.length < 2 || parts[0] !== 'v1') return [];
  
  const statements: Statement[] = [];
  for (let i = 1; i < parts.length; i++) {
    const [placeId, interactionId] = parts[i].split('-');
    if (placeId && interactionId) {
      statements.push({ placeId, interactionId });
    }
  }
  
  return statements;
}

export function addStatement(
  statements: Statement[], 
  placeId: string, 
  interactionId: string
): Statement[] {
  const newStatement = { placeId, interactionId };
  
  // Check if this combination already exists
  const exists = statements.some(
    statement => statement.placeId === placeId && statement.interactionId === interactionId
  );
  
  if (exists) return statements;
  
  return [...statements, newStatement];
}

export function removeStatement(statements: Statement[], index: number): Statement[] {
  return statements.filter((_, i) => i !== index);
}

export function moveStatementUp(statements: Statement[], index: number): Statement[] {
  if (index <= 0) return statements;
  
  const newStatements = [...statements];
  [newStatements[index - 1], newStatements[index]] = [newStatements[index], newStatements[index - 1]];
  return newStatements;
}

export function moveStatementDown(statements: Statement[], index: number): Statement[] {
  if (index >= statements.length - 1) return statements;
  
  const newStatements = [...statements];
  [newStatements[index], newStatements[index + 1]] = [newStatements[index + 1], newStatements[index]];
  return newStatements;
}