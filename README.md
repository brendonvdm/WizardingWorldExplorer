# Interview Vue Project

## Important note to reviewers

There are no update or modify API's but the inital project recieved had modifying actions,
they were removed.

I have done as much as I can within a reasonable timeframe for a technical interview.

I believe this is a Minimum Viable Product (MVP)
I understand this is not 100% perfect, but its decent for a couple hours of work.

If the api could provide images, they would be in the left boxes of each carousel item

Also in future some update API's would be amazing for extra work.

API's also dont have paging, so the data is all loaded at once,
which could defenitley be optimizeed (as of now there is no reason to find my id).

Images are loaded via URL, rather than stored and hosted from this site,
this is because I do not believe I have usage rights, and I dont want to
steal other peoples images. If they remove their images the images will break.

This can be optimized by having a graphics team design images, or perhaps getting AI to generate some.
(I currently dont have any image generating AI)

## Overview

This is a Vue.js-based web application designed for demonstration and interview purposes. The app features authentication, data management, and a modern UI. It is intended to be easy to set up, run, and extend.

**Note:** Any email and password combination will work to log in. There is no real authentication backend—this is for demo/testing only.

---

## Table of Contents

- [Project Setup](#project-setup)
- [Architecture](#architecture)
- [Usage Instructions](#usage-instructions)
- [Running Tests](#running-tests)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [Additional Notes](#additional-notes)

---

## Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16 or above recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd interview-vue
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the App

To start the development server:

```sh
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173` (or the port shown in your terminal).

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

---

## Architecture

- **Framework:** [Vue.js 3](https://vuejs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vite.dev/)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Testing:** [Vitest](https://vitest.dev/) with Vue Test Utils
- **Component Structure:**
  - Views are located in `src/views/`
  - Stores (state) are in `src/stores/`
  - Components are in `src/components/`
- **Authentication:**
  - Any email and password combination is accepted (demo mode).
- **API/Data:**
  - Data is queried from the Wizarding World API or via mock APIs for demonstration.
  - [Tanstack Query](https://tanstack.com/query/latest) is used for data fetching.
  - Data is cached to local storage for faster loading and offline loading.
- **Component Library:** [Volt PrimeVue](https://volt.primevue.org/) is used for UI components, as it is better compatible with tailwind 4.
- **Service Worker:** [vite-plugin-pwa](https://github.com/vitejs/vite-plugin-pwa) is used for service worker,
  to enable offline loading

---

## Usage Instructions

1. **Login**
   - Use any email and password to log in. There is no real authentication.
2. **Explore Features**
   - Navigate between views (Home, Spells, Houses, Elixirs, etc.).
   - Interact with data (view, filter, etc.).
3. **Carousel**
   - Use the carousel to navigate between different views.
   - You can swipe on mobile as well as on trackpad or use horizontal scroll.
4. **Filter**
   - You can use the filter to filter data by name.
5. **Select Your House**
   - You can select your house, with the dropdown at the top,
   - This will change your theme based off of your preferred theme.
   - Dark Mode and Light Mode Developed

---

## Running Tests

To run the test suite:

```sh
npm run test:unit
```

Test files are located alongside their source files, typically in `__tests__` folders.

---

## Folder Structure

```
interview-vue/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images, styles
│   ├── components/     # Vue components
|   |────__tests__/     # Vue component tests
│   ├── composables/    # Vue composables
│   ├── stores/         # Pinia stores (state management)
│   ├────__tests__/     # Pinia stores (state management) tests
│   ├── views/          # Page-level views
│   ├────__tests__/     # Page-level views tests
│   └── types/          # TypeScript types
│   └── utils/          # Utility functions
├── package.json        # Project metadata & scripts
└── README.md           # Project documentation
```

---

## Contributing

- Fork the repository and create a feature branch.
- Submit a pull request with a clear description of your changes.
- Ensure all tests pass before submitting.

---

## Additional Notes

- This project is for demonstration/interview purposes. It is not intended for production use.
- Feel free to modify and extend the codebase as needed.

---

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).
- For TypeScript in `.vue` files, [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) is recommended for full type support.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Contact

For any questions or suggestions, please contact the project maintainer.
