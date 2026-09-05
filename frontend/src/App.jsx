import React, { useEffect, useState } from "react";
import api from "./api";
import "./App.css";

function App() {

  // ==============================
  // Authentication states
  // ==============================

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [isRegister, setIsRegister] = useState(false);

  const [authUserName, setAuthUserName] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");


  // ==============================
  // Wallet states
  // ==============================

  const [walletId, setWalletId] = useState("");
  const [wallet, setWallet] = useState(null);

  const [userName, setUserName] = useState("");

  const [amount, setAmount] = useState("");

  const [transferAmount, setTransferAmount] = useState("");
  const [receiverWalletId, setReceiverWalletId] = useState("");
  const [receiverName, setReceiverName] = useState("");

  const [transactions, setTransactions] = useState([]);


  // ==============================
  // Login
  // ==============================

  const login = async () => {
    try {

      setAuthError("");

      if (!authUserName || !authPassword) {
        setAuthError("Please enter username and password");
        return;
      }

      const response = await api.post("/auth/login", {
        userName: authUserName,
        password: authPassword
      });

      const { token, user } = response.data.data;

      // Save login information
      localStorage.setItem("token", token);
      localStorage.setItem("userName", user.userName);

      setIsLoggedIn(true);

      setAuthUserName("");
      setAuthPassword("");
      setAuthError("");

    } catch (error) {

      setAuthError(
        error.response?.data?.message ||
        "Login failed"
      );

    }
  };


  // ==============================
  // Register
  // ==============================

  const register = async () => {
    try {

      setAuthError("");

      if (!authUserName || !authPassword) {
        setAuthError("Please enter username and password");
        return;
      }

      await api.post("/auth/register", {
        userName: authUserName,
        password: authPassword
      });

      alert("Registration successful! Please login.");

      setIsRegister(false);
      setAuthPassword("");
      setAuthError("");

    } catch (error) {

      setAuthError(
        error.response?.data?.message ||
        "Registration failed"
      );

    }
  };


  // ==============================
  // Logout
  // ==============================

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userName");

    setIsLoggedIn(false);

    setWallet(null);
    setWalletId("");
    setTransactions([]);

    setAmount("");
    setTransferAmount("");
    setReceiverWalletId("");
    setReceiverName("");
  };


  // ==============================
  // Load logged-in user's wallet
  // ==============================

  const loadMyWallet = async () => {
    try {

      // Ask backend for the wallet
      // belonging to the logged-in user
      const response = await api.get(
        "/queries/my-wallet"
      );

      const myWallet = response.data.data;

      // Save wallet information
      setWallet(myWallet);

      // Save wallet ID
      setWalletId(myWallet._id);

      // Load transaction history
      await loadTransactions(myWallet._id);

    } catch (error) {

      // User may not have a wallet yet
      setWallet(null);
      setWalletId("");
      setTransactions([]);

      console.log(
        error.response?.data?.message ||
        "No wallet found for this user"
      );

    }
  };


  // ==============================
  // Automatically load wallet
  // after login
  // ==============================

  useEffect(() => {

    if (isLoggedIn) {
      loadMyWallet();
    }

  }, [isLoggedIn]);


  // ==============================
  // Create Wallet
  // ==============================

  const createWallet = async () => {
    try {

      if (!userName.trim()) {
        alert("Please enter your name");
        return;
      }

      const response = await api.post(
        "/commands/wallet",
        {
          userName: userName
        }
      );

      const newWallet = response.data.data;

      setWallet(newWallet);
      setWalletId(newWallet._id);

      setUserName("");

      await loadTransactions(newWallet._id);

      alert("Wallet created successfully!");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Error creating wallet"
      );

    }
  };


  // ==============================
  // Find Receiver
  // ==============================

  const findReceiver = async (id) => {

    if (!id) {
      setReceiverName("");
      return;
    }

    // MongoDB ObjectId has 24 characters
    if (id.length !== 24) {
      setReceiverName("");
      return;
    }

    // Do not allow your own wallet
    if (id === walletId) {
      setReceiverName("");
      return;
    }

    try {

      const response = await api.get(
        `/queries/receiver/${id}`
      );

      const receiver = response.data.data;

      setReceiverName(receiver.userName);

    } catch (error) {

      setReceiverName("");

    }
  };


  // ==============================
  // Get My Wallet
  // ==============================

  const getWallet = async () => {
    try {

      if (!walletId) {
        alert("Wallet not found");
        return;
      }

      // Always load the logged-in user's wallet
      await loadMyWallet();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Wallet not found"
      );

    }
  };


  // ==============================
  // Deposit Money
  // ==============================

  const deposit = async () => {
    try {

      if (!walletId || !amount) {
        alert("Please enter an amount");
        return;
      }

      await api.post(
        "/commands/deposit",
        {
          walletId: walletId,
          amount: Number(amount)
        }
      );

      setAmount("");

      // Reload wallet balance
      await loadMyWallet();

      alert("Money deposited successfully!");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Deposit failed"
      );

    }
  };


  // ==============================
  // Withdraw Money
  // ==============================

  const withdraw = async () => {
    try {

      if (!walletId || !amount) {
        alert("Please enter an amount");
        return;
      }

      await api.post(
        "/commands/withdraw",
        {
          walletId: walletId,
          amount: Number(amount)
        }
      );

      setAmount("");

      // Reload wallet balance
      await loadMyWallet();

      alert("Money withdrawn successfully!");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Withdraw failed"
      );

    }
  };


  // ==============================
  // Transfer Money
  // ==============================

  const transfer = async () => {
    try {

      if (
        !walletId ||
        !receiverWalletId ||
        !transferAmount
      ) {
        alert("Please enter all transfer details");
        return;
      }

      if (walletId === receiverWalletId) {
        alert(
          "You cannot transfer money to the same wallet"
        );
        return;
      }

      // Make sure receiver exists
      if (!receiverName) {
        alert("Please enter a valid receiver wallet ID");
        return;
      }

      await api.post(
        "/commands/transfer",
        {
          fromWalletId: walletId,
          toWalletId: receiverWalletId,
          amount: Number(transferAmount)
        }
      );

      setTransferAmount("");
      setReceiverWalletId("");
      setReceiverName("");

      // Reload sender wallet
      await loadMyWallet();

      alert("Money transferred successfully!");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Transfer failed"
      );

    }
  };


  // ==============================
  // Load Transactions
  // ==============================

  const loadTransactions = async (id = walletId) => {
    try {

      if (!id) {
        return;
      }

      const response = await api.get(
        `/queries/transactions/${id}`
      );

      setTransactions(response.data.data);

    } catch (error) {

      console.log(
        error.response?.data?.message ||
        "Could not load transactions"
      );

    }
  };


  // ==============================
  // Copy Wallet ID
  // ==============================

  const copyWalletId = () => {

    if (!walletId) {
      return;
    }

    navigator.clipboard.writeText(walletId);

    alert("Wallet ID copied!");
  };


  // ==============================
  // Calculate Statistics
  // ==============================

  const totalDeposited = transactions
    .filter(
      (item) =>
        item.type === "MoneyDeposited"
    )
    .reduce(
      (total, item) =>
        total + item.amount,
      0
    );


  const totalSpent = transactions
    .filter(
      (item) =>
        item.type === "MoneyWithdrawn" ||
        item.type === "MoneyTransferred"
    )
    .reduce(
      (total, item) =>
        total + item.amount,
      0
    );


  // ==============================
  // Transaction CSS class
  // ==============================

  const getTransactionClass = (type) => {

    if (type === "MoneyDeposited") {
      return "deposit";
    }

    if (type === "MoneyWithdrawn") {
      return "withdraw";
    }

    if (type === "MoneyTransferred") {
      return "transfer";
    }

    if (type === "MoneyReceived") {
      return "receive";
    }

    return "";
  };


  // ==============================
  // Transaction display name
  // ==============================

  const getTransactionName = (type) => {

    if (type === "MoneyDeposited") {
      return "Money Deposited";
    }

    if (type === "MoneyWithdrawn") {
      return "Money Withdrawn";
    }

    if (type === "MoneyTransferred") {
      return "Money Transferred";
    }

    if (type === "MoneyReceived") {
      return "Money Received";
    }

    if (type === "WalletCreated") {
      return "Wallet Created";
    }

    return type;
  };


  // ==============================
  // LOGIN / REGISTER PAGE
  // ==============================

  if (!isLoggedIn) {

    return (
      <div className="auth-page">

        <div className="auth-card">

          <div className="auth-logo">
            W
          </div>

          <h1>
            WalletX
          </h1>

          <p className="auth-subtitle">

            {isRegister
              ? "Create your digital wallet account"
              : "Welcome back to your digital wallet"}

          </p>


          {authError && (
            <div className="auth-error">
              {authError}
            </div>
          )}


          <div className="auth-input-group">

            <label>
              Username
            </label>

            <input
              type="text"
              placeholder="Enter your username"
              value={authUserName}
              onChange={(e) =>
                setAuthUserName(e.target.value)
              }
            />

          </div>


          <div className="auth-input-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={authPassword}
              onChange={(e) =>
                setAuthPassword(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  if (isRegister) {
                    register();
                  } else {
                    login();
                  }

                }

              }}
            />

          </div>


          <button
            className="auth-button"
            onClick={
              isRegister
                ? register
                : login
            }
          >

            {isRegister
              ? "Create Account"
              : "Login"}

          </button>


          <div className="auth-switch">

            {isRegister ? (

              <>
                Already have an account?

                <button
                  onClick={() => {

                    setIsRegister(false);
                    setAuthError("");

                  }}
                >
                  Login
                </button>
              </>

            ) : (

              <>
                Don't have an account?

                <button
                  onClick={() => {

                    setIsRegister(true);
                    setAuthError("");

                  }}
                >
                  Register
                </button>
              </>

            )}

          </div>

        </div>

      </div>
    );
  }


  // ==============================
  // MAIN DASHBOARD
  // ==============================

  return (

    <div className="app">


      {/* ==========================
          NAVBAR
      =========================== */}

      <header className="navbar">

        <div className="brand">

          <div className="brand-icon">
            W
          </div>

          <div>

            <h1>
              WalletX
            </h1>

            <span>
              Digital Wallet
            </span>

          </div>

        </div>


        <div className="navbar-actions">

          <div className="secure-badge">
            <span>●</span>
            Secure Wallet
          </div>

          <button
            className="logout-button"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* ==========================
          DASHBOARD
      =========================== */}

      <main className="dashboard">


        {/* ==========================
            WELCOME
        =========================== */}

        <section className="welcome-section">

          <div>

            <p className="welcome-small">
              YOUR DIGITAL WALLET
            </p>

            <h2>

              Welcome back

              {wallet?.userName
                ? `, ${wallet.userName}`
                : ""}

              👋

            </h2>

            <p>
              Manage your money easily and securely.
            </p>

          </div>

        </section>


        {/* ==========================
            BALANCE CARD
        =========================== */}

        <section className="balance-card">

          <div className="balance-top">

            <div>

              <span className="balance-label">
                Available Balance
              </span>

              <h3>

                Rs.{" "}

                {wallet
                  ? wallet.balance.toLocaleString()
                  : "0.00"}

              </h3>

            </div>

            <div className="wallet-symbol">
              💳
            </div>

          </div>


          <div className="balance-bottom">

            <div>

              <span>
                Wallet Holder
              </span>

              <strong>

                {wallet?.userName ||
                  "No wallet connected"}

              </strong>

            </div>


            <div className="wallet-status">

              <span>
                ●
              </span>

              Active

            </div>

          </div>

        </section>


        {/* ==========================
            STATISTICS
        =========================== */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon income-icon">
              ↓
            </div>

            <div>

              <span>
                Total Deposited
              </span>

              <strong>
                Rs.{" "}
                {totalDeposited.toLocaleString()}
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon spent-icon">
              ↑
            </div>

            <div>

              <span>
                Total Spent
              </span>

              <strong>
                Rs.{" "}
                {totalSpent.toLocaleString()}
              </strong>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon transaction-icon">
              ↔
            </div>

            <div>

              <span>
                Transactions
              </span>

              <strong>
                {transactions.length}
              </strong>

            </div>

          </div>

        </section>


        {/* ==========================
            CONTENT
        =========================== */}

        <div className="content-grid">


          {/* ========================
              LEFT COLUMN
          ========================= */}

          <div className="left-column">


            {/* ======================
                CREATE WALLET
            ======================= */}

            {!wallet && (

              <section className="panel">

                <div className="panel-title">

                  <div>

                    <span className="section-tag">
                      GET STARTED
                    </span>

                    <h3>
                      Create Wallet
                    </h3>

                    <p>
                      Create your personal digital wallet.
                    </p>

                  </div>

                  <div className="panel-icon">
                    +
                  </div>

                </div>


                <div className="input-group">

                  <label>
                    Your Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={userName}
                    onChange={(e) =>
                      setUserName(e.target.value)
                    }
                  />

                </div>


                <button
                  className="primary-button"
                  onClick={createWallet}
                >
                  Create Wallet
                </button>

              </section>

            )}


            {/* ======================
                YOUR WALLET
            ======================= */}

            <section className="panel">

              <div className="panel-title">

                <div>

                  <span className="section-tag">
                    WALLET
                  </span>

                  <h3>
                    Your Wallet
                  </h3>

                  <p>
                    Your current wallet information.
                  </p>

                </div>

                <div className="panel-icon">
                  💼
                </div>

              </div>


              <div className="wallet-info-box">

                <div>

                  <span>
                    Wallet Holder
                  </span>

                  <strong>
                    {wallet?.userName ||
                      "No wallet connected"}
                  </strong>

                </div>


                <div>

                  <span>
                    Wallet ID
                  </span>

                  <strong className="wallet-id-text">

                    {wallet?._id ||
                      "No wallet available"}

                  </strong>

                </div>


                <div>

                  <span>
                    Current Balance
                  </span>

                  <strong>

                    Rs.{" "}

                    {wallet
                      ? wallet.balance.toLocaleString()
                      : "0.00"}

                  </strong>

                </div>

              </div>


              {wallet && (

                <button
                  className="secondary-button"
                  onClick={copyWalletId}
                >
                  Copy Wallet ID
                </button>

              )}

            </section>


            {/* ======================
                MONEY OPERATIONS
            ======================= */}

            <section className="panel">

              <div className="panel-title">

                <div>

                  <span className="section-tag">
                    QUICK ACTIONS
                  </span>

                  <h3>
                    Money Operations
                  </h3>

                  <p>
                    Add or withdraw money from your wallet.
                  </p>

                </div>

              </div>


              <div className="input-group">

                <label>
                  Amount
                </label>

                <div className="amount-input">

                  <span>
                    Rs.
                  </span>

                  <input
                    type="number"
                    min="1"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                  />

                </div>

              </div>


              <div className="action-grid">

                <button
                  className="action-button deposit-button"
                  onClick={deposit}
                >

                  <span className="action-icon">
                    ↓
                  </span>

                  <span>

                    <strong>
                      Deposit
                    </strong>

                    <small>
                      Add Money
                    </small>

                  </span>

                </button>


                <button
                  className="action-button withdraw-button"
                  onClick={withdraw}
                >

                  <span className="action-icon">
                    ↑
                  </span>

                  <span>

                    <strong>
                      Withdraw
                    </strong>

                    <small>
                      Take Money Out
                    </small>

                  </span>

                </button>

              </div>

            </section>

          </div>


          {/* ========================
              RIGHT COLUMN
          ========================= */}

          <div className="right-column">


            {/* ======================
                TRANSFER
            ======================= */}

            <section className="panel transfer-panel">

              <div className="panel-title">

                <div>

                  <span className="section-tag">
                    SEND MONEY
                  </span>

                  <h3>
                    Transfer Money
                  </h3>

                  <p>
                    Send money to another wallet instantly.
                  </p>

                </div>

                <div className="panel-icon transfer-icon">
                  ↗
                </div>

              </div>


              <div className="transfer-visual">

                <div className="transfer-wallet">

                  <div>
                    W
                  </div>

                  <span>
                    {wallet?.userName || "Your Wallet"}
                  </span>

                </div>


                <div className="transfer-arrow">
                  →
                </div>


                <div className="transfer-wallet">

                  <div>
                    W
                  </div>

                  <span>
                    {receiverName || "Receiver"}
                  </span>

                </div>

              </div>


              <div className="input-group">

                <label>
                  Receiver Wallet ID
                </label>

                <input
                  type="text"
                  placeholder="Enter receiver wallet ID"
                  value={receiverWalletId}
                  onChange={(e) => {

                    const value =
                      e.target.value.trim();

                    setReceiverWalletId(value);

                    findReceiver(value);

                  }}
                />


                {receiverName && (

                  <div className="receiver-found">

                    <span>
                      ✓
                    </span>

                    <div>

                      <small>
                        Receiver
                      </small>

                      <strong>
                        {receiverName}
                      </strong>

                    </div>

                  </div>

                )}

              </div>


              <div className="input-group">

                <label>
                  Transfer Amount
                </label>

                <div className="amount-input">

                  <span>
                    Rs.
                  </span>

                  <input
                    type="number"
                    min="1"
                    placeholder="0.00"
                    value={transferAmount}
                    onChange={(e) =>
                      setTransferAmount(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>


              <button
                className="transfer-button"
                onClick={transfer}
                disabled={
                  !receiverName ||
                  !transferAmount
                }
              >

                Transfer Money

                <span>
                  →
                </span>

              </button>

            </section>


            {/* ======================
                TRANSACTIONS
            ======================= */}

            <section className="panel transactions-panel">

              <div className="transactions-heading">

                <div>

                  <span className="section-tag">
                    ACTIVITY
                  </span>

                  <h3>
                    Recent Transactions
                  </h3>

                </div>


                <button
                  className="refresh-button"
                  onClick={() =>
                    loadTransactions()
                  }
                >
                  ↻
                </button>

              </div>


              <div className="transaction-list">

                {transactions.length === 0 ? (

                  <div className="empty-state">

                    <div className="empty-icon">
                      ↔
                    </div>

                    <strong>
                      No transactions yet
                    </strong>

                    <p>
                      Your wallet activity will appear here.
                    </p>

                  </div>

                ) : (

                  transactions
                    .slice()
                    .reverse()
                    .map((transaction) => (

                      <div
                        className={`transaction-item ${getTransactionClass(
                          transaction.type
                        )}`}
                        key={transaction._id}
                      >

                        <div className="transaction-left">

                          <div className="transaction-icon">

                            {transaction.type ===
                            "MoneyDeposited"
                              ? "↓"
                              : transaction.type ===
                                "MoneyReceived"
                              ? "↓"
                              : transaction.type ===
                                "MoneyWithdrawn"
                              ? "↑"
                              : transaction.type ===
                                "WalletCreated"
                              ? "+"
                              : "↗"}

                          </div>


                          <div>

                            <strong>

                              {getTransactionName(
                                transaction.type
                              )}

                            </strong>


                            <small>
                              {transaction.description}
                            </small>


                            <small>

                              {new Date(
                                transaction.createdAt
                              ).toLocaleString()}

                            </small>

                          </div>

                        </div>


                        <div className="transaction-right">

                          <strong>

                            {transaction.type ===
                              "MoneyDeposited" ||
                            transaction.type ===
                              "MoneyReceived"
                              ? "+"
                              : transaction.type ===
                                "WalletCreated"
                              ? ""
                              : "-"}

                            Rs.{" "}

                            {transaction.amount.toLocaleString()}

                          </strong>

                        </div>

                      </div>

                    ))

                )}

              </div>

            </section>

          </div>

        </div>


        {/* ==========================
            FOOTER
        =========================== */}

        <footer>

          <div className="footer-brand">

            <div className="brand-icon small">
              W
            </div>

            <span>
              WalletX
            </span>

          </div>

          <p>
            Simple. Secure. Digital.
          </p>

          <span>
            © 2026 WalletX
          </span>

        </footer>


      </main>

    </div>
  );
}

export default App;