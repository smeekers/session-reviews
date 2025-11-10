# TODO List

## Things for Demo

- [x] Session details page should render a session details component and that component folder should have its own components folder with the session details specific components in it to keep things cleaner. This goes the same for most other pages
- [x] there are number of places we are using in line styles. WE should never be doing that. Use classnames if we need to add to an existing className
- [x] Whiteboard loading renders on the left instead of centre. But we need to be careful not to break the other users of loading
- [x] On session details page view the session status should be updated to reviewed
- [x] On session details page the summary should have the same Was this list helpful? above the feedback as the suggestions do (this should be DRY as well)
- [x] On the live session page we should be able to add bookmarks as long as its currently recording
- [x] On the live session page the webcam panel can toggle video, it needs to toggle audio as well
- [x] On the live session page should have a share session button that copies a link to the whiteboard page to the clipboard and should give some indication it happened (probabl just button its self temporarily says "link copied to clipboard")
- [x] The webcam panel should have an audio indicator
- [x] Webcam panel needs a recording indicator
- [x] There should be no seeded session with the "processing status"
- [x] I noticed "ready" sessions have a date? What are we using for date? It should be start time not creation time. Its fine if ready sessions are using a different value for date
- [x] start recording and share session buttons could be added to the excalidraw board via the renderTopRightUI this would make it all work dynamically, we should just need to move the webcam panel down to not block
- [x] Banners are not dismissable if they have an action
- [x] I want better mocked ai responses. More suggestions per session and more variety of summaries and suggestions (bigger pool)
- [ ] Playwright tests (keep them pretty simple) One concern around lack of users so will me making changes cause the playwright screenshots to fall as I would change the state of things? Might need a to somehow make playwright only use a fresh seed?

## Things to Improve Post Demo

*(Discussion points - do not work on these)*

- Put more thought into UI. Theme and the ui library will help make this easy to change wholesale
- lean heavier into theme
- error page, session ended page (direct to details or whiteboard)
- draggable video panel
- we should not be fetching all sessions at once, add pagination
- Get recordings working
- Upload to S3
- Use Dynamo table
- Use ok response and event listeners for long BE processes (eg end session) pusher? something better?
- Actual AI interaction (need to craft prompt and turn prompt into json. Reject and retry logic)
- We need more filters and a sort option
- Consider the actual value of the UI library as opposed to just using MUI directly. These can mostly be handled via theme overrides
- add users
- update typography (use theme)
- error boundary


