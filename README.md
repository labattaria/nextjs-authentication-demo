**Read in another language: [Українська](README.ukr.md), [English](README.md).**

# Authentication-demo App

---

[![Authentication-demo](https://i.gyazo.com/7f4e5ca2afb3db976496106836a55bf3.gif)](https://gyazo.com/7f4e5ca2afb3db976496106836a55bf3)

---

[![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)](#)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](#)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](#)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](#)
[![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](#)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)

This is the Authentication Next.js, React, TypeScript demo app

This is a basic application that demonstrates simple user authentication and registration with additional form field validation

Users can access protected content only after successfully registering and logging into their account

Authentication is implemented using a **token + session** mechanism

There is a predefined test user that you can use out of the box to check the functionality.

**Email:** qwerty@example.com  
**Password:** qwerty123

The app in this repo is hosted on [![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](#), hosting public URL: [https://nextjs-authentication-demo-astra.vercel.app/](https://nextjs-authentication-demo-astra.vercel.app/)

But you can use this app manually on your local machine

## Used dependencies:

- **Next.js** - React framework for building fast, full-stack web applications with server-side rendering and static site generation
- **React** - Library used for building user interfaces, particularly for single-page applications where you need a fast, interactive experience
- **Prisma** – A modern ORM that streamlines database access by providing a type-safe, auto-generated query builder and intuitive API for working with relational databases efficiently and reliably
- **TypeScript** – static typing for safer and more maintainable code
- **Lucia** – authentication library for managing users, sessions, and tokens
- **Tailwind CSS** – utility-first CSS framework for fast and responsive UI styling

The full list of dependencies can be found in the **package.json** file.

---

## Next.js Features Used:

- **Server Components** – Enable rendering parts of the UI on the server with full access to backend resources, improving performance and security
- **App Router** – File-based routing with support for layouts, nested routes, loading/error states, and route-specific metadata
- **Server-Side Rendering (SSR)** – Render pages on each request, great for dynamic content and SEO
- **Static Site Generation (SSG)** – Pre-render pages at build time for fast performance and easy CDN caching
- **Client Components** – Standard React components rendered in the browser; useful for interactive UI
- **Metadata and SEO** – Add page-level metadata (static or dynamic) for SEO and social media previews
- **Route Groups** – Organize routes without affecting the URL structure
- **Server Actions** – Allow you to run server-side logic (like form handling, database updates, or API calls) directly from client components without needing a separate API route
- **useFormState** – Manages and updates form state when using server actions, enabling cleaner and more reactive UI handling
- **redirect** – Utility to programmatically redirect users to different routes, commonly used after form submissions or for access control
- **Link** – Client-side navigation component for seamless and fast route changes without full page reloads

---

## React Features Used:

- **Components** - Building blocks of React applications, reusable and encapsulated UI pieces
- **Props** - Mechanism to pass data and event handlers from parent to child components
- **Rendering Lists** - Dynamically displaying multiple elements by iterating over arrays
- **Conditional Rendering** - Displaying different UI elements based on application state, props or conditions

## Contents

- [Installation](#installation)
- [Usage](#usage)

### Installation

1. Clone the repository:

```shell
git clone https://github.com/labattaria/nextjs-authentication-demo.git
```

2. Install project dependencies:

```shell
cd nextjs-authentication-demo
npm install
```

### Usage

Start the next-dev-server using the following command:

```shell
npm run dev
```

Server will be located at **http://localhost:3000/**
