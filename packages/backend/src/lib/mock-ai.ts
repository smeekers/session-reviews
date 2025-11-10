// Mock AI content generators for demo/POC
// These will be replaced with actual OpenAI calls later

import type { AISummaryComponent, AISuggestion, AISuggestionType } from '../data/memory-store';

const mockSummaries = [
  'This session covered advanced React patterns including custom hooks, context optimization, and performance best practices. The discussion included hands-on examples of memoization strategies and when to use useMemo vs useCallback.',
  'The session focused on TypeScript best practices, exploring advanced type system features like conditional types, mapped types, and template literal types. Participants worked through complex type challenges and learned practical patterns for type-safe code.',
  'A deep dive into system design principles, covering scalability patterns, database design, and API architecture. The session included practical examples of microservices communication and caching strategies.',
  'This session explored modern CSS techniques including CSS Grid, Flexbox, and CSS custom properties. The discussion covered responsive design patterns and accessibility considerations.',
  'The session covered testing strategies for React applications, including unit testing with Vitest, integration testing, and E2E testing with Playwright. Best practices for test organization and maintainability were discussed.',
  'An exploration of GraphQL vs REST API design, discussing when to use each approach and how to structure queries efficiently. The session included examples of schema design and query optimization techniques.',
  'This session delved into database optimization strategies, covering indexing, query performance, and connection pooling. Participants learned about common pitfalls and how to identify slow queries.',
  'A comprehensive look at DevOps practices including CI/CD pipelines, containerization with Docker, and Kubernetes orchestration. The discussion covered deployment strategies and monitoring best practices.',
  'The session focused on security best practices for web applications, covering OWASP Top 10 vulnerabilities, authentication strategies, and data encryption. Real-world examples of security breaches were analyzed.',
  'An in-depth discussion about state management in large applications, comparing Redux, Zustand, and Jotai. The session included practical examples of when to use each solution and migration strategies.',
  'This session explored API design principles including RESTful conventions, versioning strategies, and documentation practices. Participants learned about OpenAPI specifications and API testing tools.',
  'A deep dive into performance optimization techniques for web applications, covering bundle size reduction, lazy loading, and code splitting. The session included hands-on profiling and optimization exercises.',
  'The session covered accessibility best practices, exploring WCAG guidelines, ARIA attributes, and keyboard navigation. Participants learned how to audit and improve accessibility in their applications.',
  'An exploration of modern JavaScript features including async/await patterns, generators, and advanced array methods. The session included practical examples and performance comparisons.',
  'This session focused on code review best practices, discussing how to give constructive feedback, identify code smells, and maintain code quality standards across teams.',
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
  { title: 'Add loading skeletons', content: 'Consider adding loading skeleton components instead of spinners for better perceived performance. Skeleton screens provide a better user experience by showing the expected content structure while data loads.', type: 'idea' },
  { title: 'Implement service workers', content: 'Add service workers to enable offline functionality and improve caching strategies. This would allow the application to work even when network connectivity is poor or unavailable.', type: 'idea' },
  { title: 'Add comprehensive logging', content: 'Implement structured logging throughout the application to improve debugging and monitoring. This would help identify issues faster and provide better insights into application behavior.', type: 'task' },
  { title: 'Optimize database queries', content: 'Review and optimize slow database queries identified during the session. Adding proper indexes and refactoring complex queries would significantly improve response times.', type: 'feedback' },
  { title: 'Implement feature flags', content: 'Consider using feature flags to enable gradual rollouts and A/B testing. This would allow you to test new features with a subset of users before full deployment.', type: 'idea' },
  { title: 'Add API documentation', content: 'Create comprehensive API documentation using OpenAPI/Swagger. This would improve developer experience and make it easier for team members to understand and use the API.', type: 'task' },
  { title: 'Improve error messages', content: 'Enhance error messages to be more user-friendly and actionable. The current error messages are too technical and don\'t help users understand what went wrong or how to fix it.', type: 'feedback' },
  { title: 'Add monitoring and alerts', content: 'Set up application monitoring and alerting for critical errors and performance issues. This would help catch problems early and ensure system reliability.', type: 'task' },
  { title: 'Implement dark mode', content: 'Consider adding a dark mode option for better user experience, especially for users who prefer darker interfaces or work in low-light environments.', type: 'idea' },
  { title: 'Refactor legacy code', content: 'The legacy authentication module needs refactoring to match current code standards. This would improve maintainability and reduce technical debt.', type: 'feedback' },
  { title: 'Add automated backups', content: 'Implement automated database backups to prevent data loss. This is a critical infrastructure task that should be prioritized.', type: 'task' },
  { title: 'Use TypeScript strict mode', content: 'Enable TypeScript strict mode to catch more type errors at compile time. This would improve code quality and reduce runtime errors.', type: 'idea' },
  { title: 'Improve test coverage', content: 'Increase test coverage for critical business logic, especially around payment processing and user authentication. Current coverage is below the recommended threshold.', type: 'feedback' },
  { title: 'Add API versioning', content: 'Implement API versioning strategy to support backward compatibility as the API evolves. This would prevent breaking changes from affecting existing clients.', type: 'task' },
  { title: 'Optimize image loading', content: 'Implement lazy loading and responsive images to improve page load performance. Large images are currently blocking the initial render.', type: 'idea' },
  { title: 'Fix memory leaks', content: 'Address memory leaks in the dashboard component identified during profiling. Event listeners and subscriptions need proper cleanup.', type: 'feedback' },
  { title: 'Add request retry logic', content: 'Implement exponential backoff retry logic for failed API requests. This would improve resilience to transient network issues.', type: 'task' },
  { title: 'Improve accessibility', content: 'Enhance keyboard navigation and screen reader support throughout the application. Several components lack proper ARIA labels and keyboard handlers.', type: 'feedback' },
  { title: 'Add data export functionality', content: 'Implement data export features to allow users to download their data in various formats. This would improve user control and data portability.', type: 'idea' },
  { title: 'Refactor component structure', content: 'Break down large components into smaller, more focused components. The current component structure makes testing and maintenance difficult.', type: 'feedback' },
  { title: 'Implement caching strategy', content: 'Add Redis caching layer for frequently accessed data to reduce database load and improve response times.', type: 'task' },
  { title: 'Add user preferences', content: 'Implement user preference settings to allow customization of the interface. This would improve user satisfaction and engagement.', type: 'idea' },
  { title: 'Fix security vulnerabilities', content: 'Address security vulnerabilities identified in the dependency audit. Several packages have known security issues that need updating.', type: 'feedback' },
  { title: 'Add analytics tracking', content: 'Implement analytics tracking to understand user behavior and identify areas for improvement. This data would inform future development decisions.', type: 'task' },
  { title: 'Improve mobile responsiveness', content: 'Enhance mobile experience by fixing layout issues and improving touch interactions. The current mobile experience needs significant improvements.', type: 'feedback' },
  { title: 'Add search functionality', content: 'Implement full-text search across the application to help users find content quickly. This would significantly improve discoverability.', type: 'idea' },
  { title: 'Optimize bundle size', content: 'Analyze and reduce JavaScript bundle size by removing unused dependencies and code splitting. The current bundle is larger than necessary.', type: 'feedback' },
  { title: 'Add notification system', content: 'Implement a notification system to keep users informed about important updates and events. This would improve user engagement.', type: 'idea' },
  { title: 'Improve error recovery', content: 'Add better error recovery mechanisms to handle network failures gracefully. Users currently see confusing errors when connectivity is poor.', type: 'feedback' },
  { title: 'Add data validation', content: 'Implement comprehensive data validation on both client and server side to prevent invalid data from entering the system.', type: 'task' },
  { title: 'Refactor API structure', content: 'Restructure the API to follow RESTful conventions more closely. The current structure is inconsistent and makes it difficult for developers to understand.', type: 'feedback' },
];

/**
 * Generate a mock structured AI summary for a session
 */
export function generateMockSummary(): AISummaryComponent[] {
  const baseSummary = mockSummaries[Math.floor(Math.random() * mockSummaries.length)];
  
  // Generate suggestions (4-8 per session for more variety)
  const numSuggestions = Math.floor(Math.random() * 5) + 4;
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
  
  const keyPointsOptions = [
    'Key highlights from this session:\n- Explored advanced patterns and best practices\n- Discussed performance optimization strategies\n- Reviewed practical examples and use cases\n- Covered testing and maintainability considerations',
    'Main takeaways:\n- Deep dive into architectural decisions and trade-offs\n- Hands-on coding exercises with real-world scenarios\n- Discussion of scalability and performance implications\n- Exploration of alternative approaches and their pros/cons',
    'Session focus areas:\n- Code quality and maintainability improvements\n- Security best practices and vulnerability prevention\n- User experience enhancements and accessibility\n- Team collaboration and code review processes',
    'Key discussion points:\n- Modern development tools and their applications\n- Database design patterns and query optimization\n- API design principles and versioning strategies\n- Deployment pipelines and infrastructure considerations',
    'Highlights:\n- Performance profiling and optimization techniques\n- Error handling and resilience patterns\n- State management solutions and their trade-offs\n- Testing strategies for complex applications',
    'Main topics covered:\n- Type safety and how it improves code quality\n- Component architecture and reusability patterns\n- Data fetching strategies and caching mechanisms\n- Monitoring and observability best practices',
    'Key insights:\n- Refactoring strategies for legacy codebases\n- Design system implementation and maintenance\n- Internationalization and localization approaches\n- Mobile-first responsive design patterns',
  ];

  const feedbackOptions = [
    'The session demonstrated strong technical understanding and effective problem-solving approaches. Clear communication and thoughtful questions contributed to a productive discussion.',
    'Excellent session with well-structured content and practical examples. The discussion was engaging and covered both theoretical concepts and real-world applications.',
    'Great collaborative session with active participation. The technical depth was appropriate and the examples were relevant to current challenges.',
    'Productive session with clear explanations and good pacing. The hands-on approach helped solidify understanding of complex concepts.',
    'Strong session covering important topics with practical relevance. The Q&A portion was particularly valuable for addressing specific concerns.',
    'Well-organized session with comprehensive coverage of the subject matter. The balance between theory and practice was effective.',
    'Engaging discussion with good technical depth. The examples and case studies provided valuable context for the concepts discussed.',
  ];

  const selectedKeyPoints = keyPointsOptions[Math.floor(Math.random() * keyPointsOptions.length)];
  const selectedFeedback = feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];

  return [
    {
      component_type: 'overview',
      component_order: 0,
      content: baseSummary,
    },
    {
      component_type: 'key_points',
      component_order: 1,
      content: selectedKeyPoints,
    },
    {
      component_type: 'feedback',
      component_order: 2,
      content: selectedFeedback,
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
