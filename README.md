# 💳 WalletX - Digital Wallet System

WalletX is a web-based digital wallet system that allows users to securely manage their money through a simple and user-friendly interface.

The system allows users to create and manage their wallets, deposit and withdraw money, transfer money to other users, and view their wallet activities.

The project also demonstrates the practical implementation of **CQRS (Command Query Responsibility Segregation)** and **Event Sourcing** in a full-stack web application.

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

The project includes the following commands:

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
