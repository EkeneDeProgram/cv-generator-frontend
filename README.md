# 📄 CV Generator Frontend

A modern, interactive **CV / Resume generator** built with **React**, **TypeScript**, **Vite**, **TailwindCSS**, and **React Hook Form**. Let users create, edit, preview and download professional CVs using clean UI components and dynamic templates.

---

## Table of contents

- [Demo](#demo)
- [Features](#🚀features)
- [Tech stack](#⚙️tech-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Run locally](#run-locally)
  - [Build](#build)
- [Project structure](#📁project-structure)
- [Environment Variables](#🔧environment-variables)
- [API Integration](#🔌api-integration)
- [State Management](#🧠state-management)
- [Templates](#🖼templates)
- [Pages](#📄pages)
- [Data](#🗂data)
- [Styling](#🎨styling)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Demo

### 📸 Screenshot

![CV Generator Screenshot](https://github.com/user-attachments/assets/b83fdf24-925f-4900-abaf-d6bda08886a3)



---

## 🚀Features
### 🧩 Core Functionality

- Build CVs with structured forms (Personal Info, Work Experience, Education, Skills, Projects, etc.)
- Real-time syncing of form data with global CV state using CVContext + CVProvider
- Auto-update forms with useSyncFormWithCV custom hook
- Save & load example CV data
- Template switching (multiple CV layouts)
- Preview mode with dynamic rendering
- Export and download CV (PDF / DOCX)

---

## ⚙️Tech stack

- React
- TypeScript
- Vite
- React Router
- React Hook Form
- Zod validation
- TailwindCSS
- Axios
- ESLint + TypeScript ESLint

---

## Getting started

### Prerequisites

- Node.js 16+ (LTS recommended)
- npm or yarn

### Install

```bash
# clone
git clone https://github.com/EkeneDeProgram/cv-generator-frontend.git
cd cv-generator-frontend

# install
npm install
# or
# yarn
```

### Run locally

```bash
# dev server
npm run dev
# or
# yarn dev
```

Open http://localhost:5173 (or the URL Vite prints).

### Build

```bash
npm run build
# or
# yarn build
```

Then preview the production build with `npm run preview`.

---

## 📁Project structure

```
src/
├─ components/         
├─ constants/              
├─ context/            
├─ data/               
├─ hooks/               
├─ pages/             
├─ services/  
├── types/            
└─ utils/              
```

---

## 🔧Environment Variables

Create .env.local in the project root:
```bash
VITE_API_URL=http://localhost:5000/api/cv
```

---

## 🔌API Integration
The frontend communicates with a backend CV service through Axios.
API Config (src/services/api.ts)

The API base URL is automatically read from:
```ts
import.meta.env.VITE_API_URL
```
Backend endpoint example:
```bash
POST /api/cv/preview
POST /api/cv/download/pdf
POST /api/cv/download/pdf
```
Make sure your backend CORS configuration allows frontend communication.
---

## 🧠State Management
CV state is handled globally using:
- CVContext.ts
- CVProvider.tsx
- useCV.ts

All forms sync with the global CV state using:

- useSyncFormWithCV.ts (custom hook).

This ensures consistent CV data across all pages.

---

## 🖼Templates
CV layout changes dynamically using:
```bash
src/components/TemplateSwitcher.tsx
```
Templates can be extended or customized easily.

---

## 📄Pages

| Page       | Description             |
| ---------- | ----------------------- |
| `/`        | Home page (start CV)    |
| `/builder` | Main CV Builder (forms) |
| `/preview` | Final CV preview        |

Routing handled with React Router

---

## 🗂Data
Default CV example is stored in:
```bash
src/data/example-data.json
```
You can update it or create additional samples.

---

## 🎨Styling
The project uses:

- TailwindCSS & Traditional CSS
- Custom UI components located in **src/components/ui/**

---
## Deployment

This app can be deployed to static hosts such as Vercel, Netlify, or GitHub Pages.

Example (Vercel):

1. Push to GitHub
2. Import project in Vercel
3. Set build command `npm run build` and output directory `dist`

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Make changes, add tests
4. Open a Pull Request describing the change

Please follow the existing code style and keep commits atomic.

---

## License

This project is available under the **MIT License**. See `LICENSE` for details.

---

## Acknowledgements

- Built with ❤️ using React, Vite TailwindCSS and Traditional CSS.
---
