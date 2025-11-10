// Mock AI content generators for demo/POC
// These will be replaced with actual OpenAI calls later

import type { AISummaryComponent, AISuggestion, AISuggestionType } from '../data/memory-store';

const mockSummaries = [
  'This session covered advanced React patterns including custom hooks, context optimization, and performance best practices. The discussion included hands-on examples of memoization strategies and when to use useMemo vs useCallback.',
  'The session focused on TypeScript best practices, exploring advanced type system features like conditional types, mapped types, and template literal types. Participants worked through complex type challenges and learned practical patterns for type-safe code.',
  'A deep dive into system design principles, covering scalability patterns, database design, and API architecture. The session included practical examples of microservices communication and caching strategies.',
  'This session explored modern CSS techniques including CSS Grid, Flexbox, and CSS custom properties. The discussion covered responsive design patterns and accessibility considerations.',
  'The session covered testing strategies for React applications, including unit testing with Vitest, integration testing, and E2E testing with Playwright. Best practices for test organization and maintainability were discussed.',
];

interface MockSuggestion {
  title: string;
  content: string;
  type: AISuggestionType;
}

const mockSuggestions: MockSuggestion[] = [
  { title: 'Implement code splitting', content: 'Consider implementing code splitting for the dashboard component to improve initial load time. Based on your session, the dashboard is one of the first components users interact with, and reducing its initial bundle size would significantly improve perceived performance.', type: 'idea' },
  { title: 'Add pagination to API endpoints', content: 'The API endpoint could benefit from pagination to handle larger datasets more efficiently. During the session, you discussed handling large result sets, and pagination would prevent memory issues and improve response times.', type: 'task' },
  { title: 'Add error boundaries', content: 'Adding error boundaries around the main application components would improve error handling. When errors occur in child components, error boundaries prevent the entire app from crashing and provide a better user experience.', type: 'feedback' },
  { title: 'Use React Query for data fetching', content: 'Consider using React Query for better data fetching and caching strategies. This would reduce redundant API calls and provide better loading states, which aligns with the performance improvements discussed in your session.', type: 'idea' },
  { title: 'Enhance authentication security', content: 'The authentication flow could be enhanced with refresh token rotation for better security. This would prevent token theft attacks and improve the overall security posture of the application.', type: 'feedback' },
  { title: 'Implement optimistic updates', content: 'Implementing optimistic updates would improve the perceived performance of the UI. Users would see immediate feedback for their actions, making the application feel more responsive.', type: 'idea' },
  { title: 'Add request debouncing', content: 'Consider adding request debouncing for the search functionality to reduce API calls. This would improve performance and reduce server load, especially when users type quickly in search fields.', type: 'task' },
  { title: 'Simplify state management', content: 'The state management could be simplified by using Jotai atoms for local state. This would reduce complexity and make the codebase more maintainable, addressing some of the concerns raised during the session.', type: 'feedback' },
  { title: 'Add input validation', content: 'Add input validation to prevent XSS attacks in user-generated content. This is a critical security measure that should be implemented to protect users from malicious input.', type: 'task' },
  { title: 'Extract authentication service', content: 'Extract the authentication logic into a separate service module. This would improve code organization and make the authentication flow easier to test and maintain.', type: 'feedback' },
  { title: 'Create unit tests', content: 'Create unit tests for the payment processing module. This would ensure reliability and catch regressions early, which is especially important for financial transactions.', type: 'task' },
  { title: 'Implement rate limiting', content: 'Implement rate limiting on API endpoints to prevent abuse. This would protect your API from being overwhelmed and ensure fair usage across all users.', type: 'feedback' },
];

/**
 * Generate a mock structured AI summary for a session
 */
export function generateMockSummary(): AISummaryComponent[] {
  const baseSummary = mockSummaries[Math.floor(Math.random() * mockSummaries.length)];
  
  // Generate suggestions
  const numSuggestions = Math.floor(Math.random() * 3) + 3;
  const suggestions: AISuggestion[] = [];
  const usedIndices = new Set<number>();

  for (let i = 0; i < numSuggestions && i < mockSuggestions.length; i++) {
    let index;
    do {
      index = Math.floor(Math.random() * mockSuggestions.length);
    } while (usedIndices.has(index));
    usedIndices.add(index);
    
    const mockSuggestion = mockSuggestions[index];
    suggestions.push({
      id: `suggestion_${Date.now()}_${i}`,
      title: mockSuggestion.title,
      content: mockSuggestion.content,
      type: mockSuggestion.type,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
  }
  
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
    {
      component_type: 'suggestions',
      component_order: 3,
      content: 'AI-generated suggestions to improve your codebase and development workflow based on this session.',
      content_details: suggestions,
    },
  ];
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
