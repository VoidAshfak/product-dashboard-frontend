# Real-Time Product Management Dashboard – **Frontend**

This is the **frontend** for the _Real-Time Product Management Dashboard_ assignment.

Built with **Next.js + TypeScript**, it includes authentication, real-time product management, and product analytics using a modern UI based on **Shadcn UI**.

---

##  Features

###  Authentication

- Login page with **hard-coded demo credentials**
- Backend returns a **JWT**, stored in an **HTTP-only cookie**
- Protected routes:
  - `/products` – Product Management Dashboard  
  - `/analytics` – Product Analytics Dashboard
- Route protection via:
  - Middleware
  - Client-side Redux auth slice
  - Cookie-based session detection

---

##  Product Management Page (`/products`)

- Displays all products in a table using **TanStack / React Table**
- **Real-time updates from Firestore**
- Automatic UI updates on:
  - Create
  - Edit
  - Delete
  - Status change (**Note: Status change was unintentionally missed!**)
- Features:
  - **Add Product** (modal)
  - **Edit Product** (modal)
  - **Delete Product**
- Technologies used:
  - **React Hook Form** for form management
  - **Zod** for schema-based validation
  - **Shadcn Dialog** for modals

---

##  Analytics Page (`/analytics`)

Includes **4 meaningful charts**, powered by Firestore + RTK Query:

- Total Sold by Product  
- Total Views Trend  
- Rating Distribution  
- Stock by Product  

Charts are built using:

- **Shadcn Charts** (Recharts wrapper)

---

## 🛠 Tech Stack

| Category | Tools |
|---------|--------|
| Framework | Next.js (TypeScript) |
| State Management | Redux Toolkit |
| Data Fetching & Caching | RTK Query |
| Realtime DB | Firebase Firestore |
| Forms | React Hook Form + Zod |
| UI Components | Shadcn UI |
| Tables | TanStack / React Table |
| Charts | Shadcn Charts (Recharts) |

---

#  Running the Frontend Locally

##  Prerequisites

You need:

- **Node.js (18+)**
- **npm** or **yarn**
- A **Firebase project** with Firestore enabled
- The **backend server** running (for `/auth/login`, etc.)

---

##  Clone the Repository

```sh
git clone https://github.com/your-username/your-frontend-repo.git
cd your-frontend-repo
```

## Install Dependencies
```
npm install
```

## Configure Environment Variables
```
# Backend API base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1

# Firebase Web SDK configuration (from Firebase console)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Optional: Firestore collection name
NEXT_PUBLIC_FIREBASE_PRODUCTS_COLLECTION=dashboard

```

## Start the Development Server
```
npm run dev
```

## The app will be available at:

 - http://localhost:3000