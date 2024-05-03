import React from "react";

// Main Image
// import expenses from "../../images/expenses1.png"; //banner image
//Header Logo
import LogoHeader from "./LogoHeader";
//Credit Footer
import CreditFooter from "./CreditFooter";
//expense image
import ExpenseImage from "./ExpenseImage";

// React Router DOM
import { Link } from "react-router-dom";

// css file
import "./home.css";
document.title = "ExpenSense";

const Home = () => {
  return (
    <React.StrictMode>
      <div className="main-container">
        <LogoHeader />
        <main className="sub-container">
          {/* <ExpenseImage image={expenses} /> */}
          <img
          className="rounded-circle"
          src="https://img.freepik.com/premium-vector/set-people-analyzing-personal-corporate-budget-isolated-white-background-concept-finance-accounting-calculation-financial-income-expenses-flat-illustration-style_15602-620.jpg"
          height="550px"
          width="600"
        />
          <div className="app-heading">
            <nav className="user-account-buttons">
              <Link to={"/user/register"}>
                <button>Register</button>
              </Link>

              <Link to={"/user/login"}>
                <button>Log in</button>
              </Link>
            </nav>

            <h1>Manage Your Expenses</h1>
            <h2>Like a Pro!</h2>
            <span>ExpenSense - The Expense Tracker App</span>
            <br></br>
            {/* <span>Happy Savings :)</span> */}
          </div>
        </main>
        <CreditFooter />
      </div>
    </React.StrictMode>
  );
};

export default Home;
