# Company Structure Fetcher

A web application to visualize, edit, and manage company organizational charts. Supports drag-and-drop file upload, tree and table views, and saving changes to a backend.

## Features

- Upload org chart files (supported format: image or JSON)
- Visualize org structure as an interactive tree
- Edit, add, or delete entities in a table view
- Save changes to a backend API
- Export org chart as JSON

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

### 1. Clone the repository

```sh
git clone <your-repo-url>
cd structure_fetch
```

### 2. Install dependencies

```sh
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root with the following content:

```
VITE_BACKEND_URL=http://localhost:3000
```

Replace the URL with your backend API endpoint if different.

### 4. Run the development server

```sh
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### 5. Build for production

```sh
npm run build
```

### 6. Preview the production build

```sh
npm run preview
```

## Project Structure

- `src/` - Main source code
  - `components/` - React components (Dropzone, ShowStructure, TableView, etc.)
  - `utils/` - Utility functions (e.g., flattenOrgchart.js)
  - `assets/` - Static assets (images)
- `public/` - Public static files
- `.env` - Environment variables
- `vite.config.js` - Vite configuration
- `package.json` - Project metadata and scripts

## Customization

- Update the backend URL in `.env` as needed.
- Tailwind CSS is used for styling; customize via `src/index.css` and `tailwind.config.js` if present.

---

**Note:** Make sure your backend API implements the required endpoints:

- `POST /user/fetch-json` for file upload and org chart extraction
- `PUT
