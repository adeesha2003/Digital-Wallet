# 💳 WalletX - Digital Wallet System

WalletX is a web-based digital wallet system that allows users to securely manage their money through a simple and user-friendly interface.

The system supports user registration, login, wallet creation, deposits, withdrawals, money transfers, and transaction history.

## 🚀 Features

- 🔐 User Registration & Login
- 🛡️ JWT-based Authentication
- 💳 Digital Wallet Management
- 💰 Deposit Money
- 💸 Withdraw Money
- 🔄 Transfer Money Between Wallets
- 👤 Receiver Verification
- 📊 Wallet Balance & Transaction Summary
- 📜 Transaction History
- 🔒 Wallet Ownership Validation
- 🗄️ MongoDB Database

## 🏗️ Architecture

The system follows the CQRS (Command Query Responsibility Segregation) approach.

### Commands

Commands are responsible for operations that change data.

Examples:

- Create Wallet
- Deposit Money
- Withdraw Money
- Transfer Money
- Register User
- Login User

### Queries

Queries are responsible for retrieving data.

Examples:

- Get My Wallet
- Get Wallet Details
- Get Transactions
- Find Receiver

### Event Sourcing

Important wallet operations are stored as events.

Examples:

- `WalletCreated`
- `MoneyDeposited`
- `MoneyWithdrawn`
- `MoneyTransferred`
- `MoneyReceived`

This allows the system to maintain a history of important wallet activities.

## 🔄 System Flow

```text
User
  ↓
Frontend
  ↓
API Request
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
