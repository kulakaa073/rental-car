# 🚗 Rental Car App

A modern web application for renting cars. Users can browse the catalogue, filter cars by brand, mileage, and price, mark favourites, and make reservations with a simple booking form.  
<img width="3613" height="1949" alt="image" src="https://github.com/user-attachments/assets/6af7c0d9-7f9a-403e-a12a-159b559bf417" />
<img width="3612" height="1964" alt="image" src="https://github.com/user-attachments/assets/ddf4c98c-cae0-4235-9ef1-494fb4ba41ba" />
<img width="1925" height="1858" alt="image" src="https://github.com/user-attachments/assets/30d9eeb4-e6bf-4532-bcad-45976d921021" />

---

## ✨ Features

- **Home splash page** to introduce the app  
- **Car catalogue** with advanced filtering:  
  - Filter by brand, mileage, and price  
- **Favourites**: save cars for quick access  
- **Reservations**: book a car with a date range and custom form validation  
- **Custom UI/UX**:  
  - Custom scrollbar  
  - Date range picker  
  - Responsive Tailwind design  
- **Separate pages** for favourites and reservations  

---

## 🛠 Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)  
- **State management**: [Redux Toolkit](https://redux-toolkit.js.org/), [Redux Persist](https://github.com/rt2zz/redux-persist)  
- **Forms & Validation**: [Formik](https://formik.org/), [Yup](https://github.com/jquense/yup)  
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Headless UI](https://headlessui.dev/)  
- **Networking**: [Axios](https://axios-http.com/)  
- **Build tool**: [Vite](https://vitejs.dev/)  
- **Utilities**: [clsx](https://github.com/lukeed/clsx), custom hooks, and helper functions  

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (>= 18.x recommended)  
- npm (comes with Node.js)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/rental-car-app.git

# Enter project directory
cd rental-car-app

# Install dependencies
npm install
```

### Running locally

```bash
npm run dev
```

App will be avalable at (http://localhost:5173).

### Building for production

```bash
npm run build
npm run preview
```

---

### 📁 Folder Structure

```
src/
 ├── assets/         # Images and other assets
 ├── components/     # Reusable UI components (Button, Loader, etc.)
 ├── pages/          # Page-level components (HomePage, CatalogPage, etc.)
 ├── redux/          # Redux slices, operations, selectors
 ├── styles/         # Global and custom styles
 ├── types/          # Generic and utility types 
 ├── utils/          # Utility functions (e.g. formatBigNumbers, addDays)
 └── main.tsx        # App entry point
```

---

### 🔑 Environment Variables

Currently, the API base URL is hardcoded in Axios utils.

---

### 📸 Demo

Live Demo: [Rental Car](https://rental-car-vert-six.vercel.app/)

---

### 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open an issue or submit a PR.

---

### 📄 License

This project is licensed under the MIT License.

```text
MIT License

Copyright (c) 2025 Shade

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
