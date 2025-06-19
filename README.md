# Angular Posts API Project

## Overview

This project is an Angular application that interacts with a posts API. It allows users to view, add, edit, and delete posts. The application demonstrates the use of Angular features such as components, services, routing, HTTP interceptors, route guards, and both template-driven and reactive forms. Authentication is simulated using a mock token stored in localStorage.

## Features

- **View Posts:** Display a paginated list of posts fetched from an API.
- **Add Post:** Authenticated users can add new posts.
- **Edit Post:** Authenticated users can update existing posts.
- **Delete Post:** Authenticated users can delete posts with confirmation modals.
- **Authentication:** Simulated login and logout using a mock JWT token.
- **Route Guards:** Protect add and edit routes so only authenticated users can access them.
- **HTTP Interceptor:** Automatically attaches the auth token to API requests and logs requests/responses.
- **Error Handling:** Displays error modals for failed requests.
- **Responsive Design:** The UI is styled to be mobile-friendly.

## How It Works

1. **Authentication:**

   - Users log in via a login form (reactive form).
   - On successful login, a mock token is stored in `localStorage`.
   - The presence of the token is used to determine authentication status.

2. **Routing and Guards:**

   - The app uses Angular Router for navigation.
   - Route guards prevent access to add/edit post routes if the user is not authenticated.

3. **HTTP Interceptor:**

   - An interceptor attaches the token from `localStorage` to outgoing API requests.
   - It also logs requests and responses for debugging.

4. **Posts Management:**

   - Posts are fetched from an API and displayed in a paginated list.
   - Users can add, edit, or delete posts through modals and forms.
   - All changes are reflected in the UI.

5. **Error Handling:**
   - Errors from HTTP requests are caught and displayed in a modal dialog.

## Getting Started

1. **Install Dependencies:**

   npm install

2. **Run the Application:**

   ng serve

   The app is available at `http://localhost:4200`.

3. **Login:**

   - Navigate to `/login` and enter a username and email to simulate login.

4. **Using the App:**
   - After login, you can view, add, edit, and delete posts.

## Project Structure

- `src/app/components/` — Angular components (posts, login, modals, etc.)
- `src/app/services/` — Services for API and authentication logic
- `src/app/interceptors/` — HTTP interceptors for auth and logging
- `src/app/guards/` — Route guards for authentication
- `src/app/models/` — TypeScript interfaces for data models
