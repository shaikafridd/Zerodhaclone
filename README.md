# 📈 Aero - Full-Stack Stock Trading Platform

A fully functional, responsive full-stack replica of **Aero** (Online trading and investing platform), featuring the marketing landing pages, an interactive trading dashboard (Aero platform), and a robust backend API server.

---

## 🏗️ Architecture & Project Structure

This project is organized as a monorepo consisting of three core modules:

```text
Aero/
├── landing-page/    # Marketing & Informational Website (Aero Main Website)
├── dashboard/       # Interactive Trading Platform (Aero Dashboard)
├── backend/         # Express.js & MongoDB Server (REST API, DB Models, Authentication)
└── index.js         # Core entry points and helper configuration
```

---

## 🌟 Key Features

### 💻 1. Frontend (Marketing Portal)
* **Pixel-Perfect Home Page**: Showcasing awards, stats, and simple equity structures.
* **Product & Pricing Showcases**: Dedicated layouts highlighting Aero, Aero Console, Aero Coin, and brokerage rates ($0$ for equity delivery).
* **Support Ticket Simulator**: Interactive support page mimicking ticket queries.
* **Auth Flow Integration**: Custom signup and login navigation.

### 📊 2. Dashboard (Aero Platform)
* **Interactive Watchlist**: Real-time stock prices, state-aware buy/sell action windows, and sorting.
* **Portfolio Holdings**: Doughnut Chart visualizations (`chart.js`) representing equity distributions and profit/loss calculations.
* **Active Positions**: Intraday tracking of open positions with live profit & loss calculations.
* **Order Management**: History of executed orders categorized by buy/sell and status.
* **Funds Section**: Virtual margin/collateral simulation.

### 🛡️ 3. Backend REST API
* **Database Models**: Strong schemas for `User`, `Holdings`, `Positions`, `Orders`, and `Watchlist` powered by **MongoDB & Mongoose**.
* **Authentication & Security**: Secure route middleware using **Passport.js** and **JSON Web Tokens (JWT)**.
* **Live Market Simulation**: Integrated with **Yahoo Finance API** (`yahoo-finance2`) to provide dynamic price updates.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend & Marketing** | React.js, React Router, Vanilla CSS |
| **Dashboard UI** | React.js, Material-UI (`@mui/material`), Chart.js, Axios |
| **Backend & Server** | Node.js, Express.js, Yahoo Finance API, Nodemon |
| **Database & Auth** | MongoDB, Mongoose, Passport.js, JWT, bcrypt |

---

## 🚀 Getting Started & Local Setup

Follow these steps to run the entire application locally on your machine.

### Prerequisites
* [Node.js](https://nodejs.org/) installed (v16+ recommended).
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or a local MongoDB community instance running.

---

### Step-by-Step Installation

#### 📦 1. Clone & Set Up the Repository
```bash
git clone https://github.com/shaikafridd/Zerodhaclone.git
cd Zerodhaclone
```

#### ⚙️ 2. Configure Environment Variables
Create a `.env` file inside the `backend` directory and add the following keys:
```env
PORT=3001
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

---

### Running the Services

You need to run all three services in parallel. Open three separate terminal windows in your project directory:

#### 🟢 Terminal 1: Backend Server
```bash
cd backend
npm install
npm start
```
*Runs on [http://localhost:3001](http://localhost:3001)*

#### 🔵 Terminal 2: Marketing Frontend
```bash
cd landing-page
npm install
npm start
```
*Runs on [http://localhost:3000](http://localhost:3000)*

#### 🟡 Terminal 3: Trading Dashboard
```bash
cd dashboard
npm install
npm start
```
*Runs on [http://localhost:3002](http://localhost:3002)* (React will automatically prompt to use a different port if `3000` is taken).

---

## 🎨 Design & Aesthetics
* Styled using sleek, high-contrast, cohesive color schemes mirroring Aero's signature typography and brand presence.
* Responsive layouts built from scratch utilizing fluid Flexbox/Grid CSS properties.
* Interactive transitions and modal animation windows for trade actions.

## 📄 License
This project is open-source and available under the [ISC License](LICENSE).
