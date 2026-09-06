import React from "react";
import "./Home.css";

function Home({ onLogin, onRegister }) {
    return (
        <div className="home-page">

            {/* Navigation */}
            <nav className="home-navbar">

                <div className="home-brand">
                    <div className="home-logo">
                        W
                    </div>

                    <div>
                        <h2>WalletX</h2>
                        <span>Digital Wallet</span>
                    </div>
                </div>

                <div className="home-nav-buttons">
                    <button
                        className="nav-login"
                        onClick={onLogin}
                    >
                        Login
                    </button>

                    <button
                        className="nav-register"
                        onClick={onRegister}
                    >
                        Get Started
                    </button>
                </div>

            </nav>


            {/* Hero Section */}
            <main className="home-hero">

                <div className="hero-content">

                    <div className="hero-badge">
                        ✦ Simple & Secure Digital Wallet
                    </div>

                    <h1>
                        Your money.
                        <br />
                        <span>Simply managed.</span>
                    </h1>

                    <p>
                        Manage your money, send payments, and keep
                        track of your wallet activity — all in one
                        simple and secure place.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="hero-primary"
                            onClick={onRegister}
                        >
                            Create Your Wallet
                            <span>→</span>
                        </button>

                        <button
                            className="hero-secondary"
                            onClick={onLogin}
                        >
                            Login to Wallet
                        </button>

                    </div>

                    <div className="hero-note">
                        🔒 Your wallet is protected with secure authentication
                    </div>

                </div>


                {/* Wallet Visual */}
                <div className="hero-visual">

                    <div className="glow glow-one"></div>
                    <div className="glow glow-two"></div>

                    <div className="wallet-card">

                        <div className="wallet-card-top">

                            <div>
                                <span>WALLETX</span>
                                <small>Digital Wallet</small>
                            </div>

                            <div className="card-chip">
                                ◈
                            </div>

                        </div>


                        <div className="card-balance">

                            <span>Available Balance</span>

                            <strong>
                                Rs. 25,000.00
                            </strong>

                        </div>


                        <div className="card-bottom">

                            <div>
                                <small>WALLET HOLDER</small>
                                <strong>YOUR NAME</strong>
                            </div>

                            <div className="card-symbol">
                                W
                            </div>

                        </div>

                    </div>


                    {/* Floating transaction */}
                    <div className="floating-box floating-income">

                        <div className="floating-icon income">
                            ↓
                        </div>

                        <div>
                            <span>Money Received</span>
                            <strong>+ Rs. 5,000</strong>
                        </div>

                    </div>


                    <div className="floating-box floating-transfer">

                        <div className="floating-icon transfer">
                            ↗
                        </div>

                        <div>
                            <span>Transfer Complete</span>
                            <strong>Rs. 2,500</strong>
                        </div>

                    </div>

                </div>

            </main>


            {/* Features */}
            <section className="home-features">

                <div className="feature-heading">

                    <span>
                        EVERYTHING YOU NEED
                    </span>

                    <h2>
                        One wallet. Everything simpler.
                    </h2>

                </div>


                <div className="feature-grid">

                    <div className="feature-card">

                        <div className="feature-icon">
                            💳
                        </div>

                        <h3>
                            Easy Wallet Management
                        </h3>

                        <p>
                            Create and manage your digital wallet
                            from one convenient dashboard.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            ⚡
                        </div>

                        <h3>
                            Quick Transfers
                        </h3>

                        <p>
                            Send money to another wallet quickly
                            and easily.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            📊
                        </div>

                        <h3>
                            Track Your Activity
                        </h3>

                        <p>
                            Keep track of your balance and
                            recent wallet transactions.
                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon">
                            🔒
                        </div>

                        <h3>
                            Secure Access
                        </h3>

                        <p>
                            Your account is protected with
                            secure authentication.
                        </p>

                    </div>

                </div>

            </section>


            {/* Bottom CTA */}
            <section className="home-cta">

                <div>

                    <span>
                        READY TO GET STARTED?
                    </span>

                    <h2>
                        Take control of your money.
                    </h2>

                    <p>
                        Create your WalletX account and start
                        managing your digital wallet today.
                    </p>

                </div>

                <button
                    onClick={onRegister}
                >
                    Get Started
                    <span>→</span>
                </button>

            </section>


            {/* Footer */}
            <footer className="home-footer">

                <div className="footer-logo">

                    <div className="home-logo small-logo">
                        W
                    </div>

                    <div>
                        <strong>WalletX</strong>
                        <span>Digital Wallet</span>
                    </div>

                </div>

                <p>
                    Simple. Secure. Digital.
                </p>

                <span>
                    © 2026 WalletX
                </span>

            </footer>

        </div>
    );
}

export default Home;