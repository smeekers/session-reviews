// Mock AI content generators for demo/POC
// These will be replaced with actual OpenAI calls later

import type { AISummaryComponent, AISuggestion } from '../data/memory-store';

const mockSummaries = [
  'This session covered advanced React patterns including custom hooks, context optimization, and performance best practices. The discussion included hands-on examples of memoization strategies and when to use useMemo vs useCallback.',
  'The session focused on TypeScript best practices, exploring advanced type system features like conditional types, mapped types, and template literal types. Participants worked through complex type challenges and learned practical patterns for type-safe code.',
  'A deep dive into system design principles, covering scalability patterns, database design, and API architecture. The session included practical examples of microservices communication and caching strategies.',
  'This session explored modern CSS techniques including CSS Grid, Flexbox, and CSS custom properties. The discussion covered responsive design patterns and accessibility considerations.',
  'The session covered testing strategies for React applications, including unit testing with Vitest, integration testing, and E2E testing with Playwright. Best practices for test organization and maintainability were discussed.',
];

const mockSuggestions = [
  'Consider implementing code splitting for the dashboard component to improve initial load time.',
  'The API endpoint could benefit from pagination to handle larger datasets more efficiently.',
  'Adding error boundaries around the main application components would improve error handling.',
  'Consider using React Query for better data fetching and caching strategies.',
  'The authentication flow could be enhanced with refresh token rotation for better security.',
  'Implementing optimistic updates would improve the perceived performance of the UI.',
  'Consider adding request debouncing for the search functionality to reduce API calls.',
  'The state management could be simplified by using Jotai atoms for local state.',
];

/**
 * Generate a mock structured AI summary for a session
 */
export function generateMockSummary(): AISummaryComponent[] {
  const baseSummary = mockSummaries[Math.floor(Math.random() * mockSummaries.length)];
  
  return [
    {
      component_type: 'overview',
      component_order: 0,
      content: baseSummary,
    },
    {
      component_type: 'key_points',
      component_order: 1,
      content: 'Key highlights from this session:\n- Explored advanced patterns and best practices\n- Discussed performance optimization strategies\n- Reviewed practical examples and use cases\n- Covered testing and maintainability considerations',
    },
    {
      component_type: 'feedback',
      component_order: 2,
      content: 'The session demonstrated strong technical understanding and effective problem-solving approaches. Clear communication and thoughtful questions contributed to a productive discussion.',
    },
  ];
}

/**
 * Generate mock AI suggestions for a session
 * @param count - Number of suggestions to generate (default: 3-5)
 */
export function generateMockSuggestions(count?: number): Omit<AISuggestion, 'id' | 'createdAt'>[] {
  const numSuggestions = count || Math.floor(Math.random() * 3) + 3;
  const suggestions: Omit<AISuggestion, 'id' | 'createdAt'>[] = [];
  const usedIndices = new Set<number>();

  for (let i = 0; i < numSuggestions && i < mockSuggestions.length; i++) {
    let index;
    do {
      index = Math.floor(Math.random() * mockSuggestions.length);
    } while (usedIndices.has(index));
    usedIndices.add(index);
    suggestions.push({
      content: mockSuggestions[index],
      status: 'pending',
    });
  }

  return suggestions;
}

/**
 * Generate a mock transcript for a session
 */
export function generateMockTranscript(): string {
  const paragraphs = [
    'Welcome everyone to today\'s session. We\'re going to be diving deep into some advanced patterns and best practices.',
    'Let me start by showing you an example of how we can structure this code. As you can see here, we have a component that handles multiple responsibilities.',
    'The key thing to remember here is that we want to keep our components focused and maintainable. This approach makes it easier to test and debug.',
    'Now, let\'s talk about performance. One common mistake I see is premature optimization. We should always measure first.',
    'That\'s a great question. The answer really depends on your specific use case, but generally speaking, you want to start with the simplest solution.',
    'I think we\'ve covered a lot of ground today. Does anyone have any final questions before we wrap up?',
  ];

  return paragraphs.join('\n\n');
}
