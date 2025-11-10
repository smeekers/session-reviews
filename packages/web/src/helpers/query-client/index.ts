import type { QueryClient } from '@tanstack/react-query';

/**
 * Invalidates session-related queries
 */
function invalidateSessionQueries(queryClient: QueryClient, sessionUid?: string): void {
  if (sessionUid) {
    queryClient.invalidateQueries({ queryKey: ['session', sessionUid] });
  }
  queryClient.invalidateQueries({ queryKey: ['sessions'] });
}

export { invalidateSessionQueries };

