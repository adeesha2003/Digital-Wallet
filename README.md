
````markdown
# 💳 WalletX - Digital Wallet System

WalletX is a web-based digital wallet system that allows users to securely manage their money through a simple and user-friendly interface.

The system allows users to create and manage wallets, deposit and withdraw money, transfer money to other users, and view transaction activities.

The project demonstrates the practical implementation of **CQRS (Command Query Responsibility Segregation)** and **Event Sourcing** in a full-stack web application.

---

## 🚀 Features

- 🔐 User Registration and Login
- 🛡️ JWT-based Authentication
- 💳 Digital Wallet Management
- 💰 Deposit Money
- 💸 Withdraw Money
- 🔄 Transfer Money Between Wallets
- 👤 Receiver Wallet Verification
- 📊 Wallet Balance and Transaction Summary
- 📜 Transaction History
- 🔒 Wallet Ownership Validation
- 🚫 Prevention of Invalid Transfers
- 🗄️ MongoDB Database

---

## 🏗️ CQRS Implementation

This project uses **CQRS (Command Query Responsibility Segregation)** to separate operations that change data from operations that retrieve data.

### Commands

Commands handle operations that modify the wallet state.

The project includes:

- Create Wallet
- Deposit Money
- Withdraw Money
- Transfer Money
- Register User
- Login User

These operations are organized inside the `commands` folder.

### Queries

Queries are responsible for retrieving information from the system.

The project includes:

- Get My Wallet
- Get Wallet Details
- Get Transactions
- Find Receiver

These operations are organized inside the `queries` folder.

### CQRS Flow

```text
User Request
     ↓
Command / Query
     ↓
Backend
     ↓
MongoDB
     ↓
Response
     ↓
Frontend
````

### CQRS Structure

```text
Digital Wallet
      │
      ├── Commands
      │      ↓
      │   Change Data
      │      ↓
      │   Create Events
      │
      └── Queries
             ↓
          Read Data
```

---

## 📜 Event Sourcing Implementation

The system uses **Event Sourcing** to record important wallet activities as events.

Instead of only storing the current wallet balance, important wallet operations are also recorded in the `events` collection.

### Stored Events

The system records:

* `WalletCreated`
* `MoneyDeposited`
* `MoneyWithdrawn`
* `MoneyTransferred`
* `MoneyReceived`

Each event contains information such as the wallet, event type, amount, related wallets, description, and creation time.

### Event Flow

```text
Wallet Operation
       ↓
Create Event
       ↓
Store Event
       ↓
Update Wallet State
       ↓
Return Result
```

### Example

When a user deposits Rs. 5,000:

```text
Deposit Rs. 5,000
       ↓
MoneyDeposited Event
       ↓
Event stored in MongoDB
       ↓
Wallet balance updated
```

This provides a history of important wallet activities.

---

## 🔄 CQRS + Event Sourcing

CQRS and Event Sourcing work together in the system.

```text
Digital Wallet
      │
      ├── Commands
      │      ↓
      │   Change Data
      │      ↓
      │   Create Events
      │
      └── Queries
             ↓
          Read Data
```

### Transfer Example

```text
User
 ↓
Transfer Command
 ↓
Validate Sender
 ↓
Validate Receiver
 ↓
Create Transfer Events
 ↓
Store Events
 ↓
Update Wallet Balances
 ↓
Return Result
```

This separation demonstrates the practical use of **CQRS and Event Sourcing** in a digital wallet application.

---

## 🛠️ Technologies Used

### Frontend

* React
* Vite
* Axios
* CSS

### Backend

* Node.js
* Express.js
* JWT
* bcrypt

### Database

* MongoDB
* Mongoose

### Development Tools

* Visual Studio Code
* Git
* GitHub
* MongoDB Compass
* Postman

---

## 📁 Project Structure

```text
Digital-Wallet
│
├── backend
│   │
│   ├── src
│   │   │
│   │   ├── commands
│   │   │   ├── createWalletCommand.js
│   │   │   ├── depositCommand.js
│   │   │   ├── withdrawCommand.js
│   │   │   ├── transferCommand.js
│   │   │   ├── registerCommand.js
│   │   │   └── loginCommand.js
│   │   │
│   │   ├── queries
│   │   │   ├── getWalletQuery.js
│   │   │   ├── getTransactionsQuery.js
│   │   │   ├── getMyWalletQuery.js
│   │   │   └── getReceiverQuery.js
│   │   │
│   │   ├── events
│   │   │   └── eventStore.js
│   │   │
│   │   ├── models
│   │   │   ├── Event.js
│   │   │   ├── Wallet.js
│   │   │   └── User.js
│   │   │
│   │   ├── middleware
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── routes
│   │   │   ├── commandRoutes.js
│   │   │   ├── queryRoutes.js
│   │   │   └── authRoutes.js
│   │   │
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
├── frontend
│   │
│   ├── src
│   ├── public
│   └── package.json
│
└── .gitignore
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/adeesha2003/Digital-Wallet.git
cd Digital-Wallet
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/digital_wallet
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd Digital-Wallet/frontend
npm install
npm run dev
```

The application will run on the local Vite development server.

---

## 🔐 Security

The system includes:

* Password hashing using bcrypt
* JWT-based authentication
* Protected API routes
* Wallet ownership validation
* Receiver wallet validation
* Prevention of self-transfers
* Insufficient balance validation
* Invalid amount validation
* Environment variables stored in `.env`
* `.env` excluded from Git using `.gitignore`

---

## 💰 Main User Operations

| Operation         | Description                               |
| ----------------- | ----------------------------------------- |
| Register          | Create a new user account                 |
| Login             | Authenticate the user                     |
| Create Wallet     | Create a wallet for the logged-in user    |
| Deposit           | Add money to the wallet                   |
| Withdraw          | Remove money from the wallet              |
| Transfer          | Send money to another wallet              |
| Find Receiver     | Verify another wallet before transferring |
| View Balance      | Check the current wallet balance          |
| View Transactions | View wallet activity                      |

---

## 🗄️ Database Collections

The application uses MongoDB with three main collections.

### Users

Stores registered user information.

### Wallets

Stores wallet information including:

* User ID
* Username
* Current Balance

### Events

Stores important wallet activities including:

* Wallet creation
* Deposits
* Withdrawals
* Transfers
* Received money

---

## 🔄 Example System Flow

### Deposit

```text
User
 ↓
Deposit Request
 ↓
Deposit Command
 ↓
Validate Wallet
 ↓
MoneyDeposited Event
 ↓
Event Stored
 ↓
Wallet Balance Updated
 ↓
Response
```

### Withdraw

```text
User
 ↓
Withdraw Request
 ↓
Withdraw Command
 ↓
Validate Wallet
 ↓
Check Balance
 ↓
MoneyWithdrawn Event
 ↓
Event Stored
 ↓
Wallet Balance Updated
 ↓
Response
```

### Transfer

```text
User
 ↓
Transfer Request
 ↓
Transfer Command
 ↓
Validate Sender
 ↓
Validate Receiver
 ↓
Create Transfer Events
 ↓
Store Events
 ↓
Update Wallet Balances
 ↓
Response
```

---

## 🎯 Project Objective

The main objective of this project is to develop a functional digital wallet system while demonstrating the practical application of **CQRS and Event Sourcing** in a full-stack web application.

The project focuses on:

* Separating data modification operations from data retrieval operations
* Maintaining a history of important wallet activities through events
* Providing secure wallet operations
* Developing a user-friendly digital wallet interface

---

## 📌 Future Improvements

Possible future improvements include:

* Email notifications
* Transaction search and filtering
* PDF transaction reports
* Admin dashboard
* Spending analytics
* Two-factor authentication
* Cloud deployment
* Mobile application

---

## ⭐ Project

**WalletX - Digital Wallet System**

A full-stack digital wallet application built using React, Node.js, Express, and MongoDB with CQRS and Event Sourcing.

````
