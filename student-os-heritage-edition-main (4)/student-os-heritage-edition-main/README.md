# STUDENT OS: Heritage Edition

STUDENT OS is a responsive student dashboard built with HTML, CSS, and vanilla JavaScript. It presents fictional grades, attendance, classes, coursework, assignments, and campus notices. It runs in a browser without a backend and can be hosted on GitHub Pages.

## Files

- `index.html` contains the dashboard and its demonstration data.
- `style.css` defines the layout, colors, and responsive styles.
- `script.js` handles navigation, timetable selection, search, notifications, and announcement status.
- `assets/images/` is available for images. The current interface uses inline SVG and CSS instead.

## Preview

Open `index.html` in a browser. The Google Fonts link is optional. Offline, the page uses the browser's sans-serif fallback.

## Publish with GitHub Pages

1. Put the contents of this folder at the root of a GitHub repository. Keep `index.html` at the repository root.
2. Push the files to the repository's default branch.
3. In GitHub, open **Settings**, then **Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**. Choose the default branch and the root folder, then save.
5. Open the site URL shown in the Pages settings after publishing finishes.

The project needs no build step, package manager, API key, or server. Relative file paths let it run from a repository subpath.

## Interactions

- Choose a weekday to update the timetable.
- Select a navigation item to move to a dashboard section. On mobile, use the menu button to open or close navigation.
- Search courses, announcements, and tasks in the search field. Press `Ctrl+K` or `⌘K` to focus it. Press `Escape` to clear the search.
- Open the notification menu with the bell button.
- Change an announcement's read status with its button. The unread count updates in the sidebar and notification menu.

## Accessibility and responsive layout

The page has a skip link, visible keyboard focus, labelled visualizations, keyboard controls for timetable tabs, a live search status, reduced-motion support, and layouts for mobile screens.
