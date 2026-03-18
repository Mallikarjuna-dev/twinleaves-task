# 📦 Product Catalog Frontend

A responsive **Product Catalog Web Application** built using **React (Vite) + Material UI + React Router**.
This application displays products in a **server-side paginated data grid** with features like search, filtering, sorting, and product detail navigation.

---

## 🚀 Features

* 📄 Product listing using **Material UI DataGrid**
* 🔎 Search products with **debounced API calls**
* 🧩 Filter products by **category**
* ↕️ Sort products by **price (Low → High / High → Low)**
* 📑 **Server-side pagination** support
* ⚡ Performance optimization using **useCallback & useMemo**
* 🔗 Dynamic routing for **Product Details page**
* ⏳ Loading and ❌ Error handling UI
* 🧱 Clean architecture with **API service layer**

---

## 🛠️ Tech Stack

* **React (Vite)**
* **React Router DOM**
* **Material UI (MUI + DataGrid)**
* **Axios**
* **JavaScript (ES6+)**

---

## 📂 Project Structure

```
src/
│
├── api/
│   └── productApi.js
│
├── components/
│   ├── Loader.jsx
│   ├── Error.jsx
│   └── Filters.jsx
│
├── pages/
│   ├── Products.jsx
│   └── ProductDetails.jsx
│
├── App.jsx
└── main.jsx
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/Mallikarjuna-dev/twinleaves-task.git
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Start development server

```
npm run dev
```

Application will run on:

```
http://localhost:5173
```

---

## 🌐 API Integration

The application fetches product data from a backend API.

### Note: If the API is unavailable, it automatically switches to **mock product data** to ensure smooth UI functionality.

---

## 📊 Application Flow

1. Products page loads with server-side paginated grid
2. User can search, filter, or sort products
3. Debounced API call fetches updated product list
4. Clicking **View** navigates to product details page
5. Product details are fetched dynamically using route parameter

---

## 🎯 Performance Optimizations

* `useCallback` used to memoize API and handler functions
* `useMemo` used to memoize DataGrid column configuration
* Debounce implemented to reduce excessive API calls
* Server pagination ensures scalability for large datasets

---

## 👨‍💻 Author

Developed as part of a **Frontend Assignment Project**
for demonstrating real-world React architecture and performance best practices.
