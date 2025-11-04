// Store adapter - switches between MemoryStore and DynamoStore
// Set USE_DYNAMODB=true to use DynamoDB, otherwise uses in-memory

import { MemoryStore } from './memory-store';
import { dynamoStore } from './dynamo-store';

const memoryStore = new MemoryStore();

const useDynamo = process.env.USE_DYNAMODB === 'true';

export const store = useDynamo ? dynamoStore : memoryStore;

// Re-export types
export type { Session, Bookmark, AISuggestion, SessionStatus } from './memory-store';

