# News Site

A modern news site built with [Next.js](https://nextjs.org), [Contentful](https://www.contentful.com/) as a headless CMS, and deployed on [Vercel](https://vercel.com/). Features include article listing, categories, search, bookmarks, and a responsive UI.

## Features

- **Next.js App Router** for fast, modern routing
- **Contentful CMS** for managing articles and categories
- **Bookmarks**: Save articles to bookmarks (stored in your browser's localStorage)
- **Zustand** for theme (light/dark mode) state management
- **Responsive design**: Works on desktop and mobile
- **Vercel deployment**: Easily shareable live demo
- **Search**: Find articles by title and category
- **Categories**: Filter articles by category
- **Bookmark navigation**: Access all your bookmarks from the navigation bar

## Getting Started

### 1. Clone the repository
```bash
git https://github.com/nihaljaiswal11/Capstone-project.git
cd news-site
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Set up environment variables
Create a `.env.local` file in the root of the project and add your Contentful credentials:
```env
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token
```

### 4. Run the development server
```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

## Bookmarks
- Click the bookmark icon on any article to save it.
- Access all your bookmarks from the "Bookmarks" link in the navigation bar.
- Bookmarks are stored in your browser's localStorage and persist across sessions (but only on the same device/browser).

## Theme
- Toggle between light and dark mode using the theme button in the navigation bar.
- Theme state is managed globally with Zustand.


