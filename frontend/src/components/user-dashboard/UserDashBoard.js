import React from "react";
import axios from "axios";
import "./UserDashBoard.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import ExpenseImage from "../home/ExpenseImage";
import expenses from "./expenses1.png"; //banner image

function UserDashBoard() {
  let [budget, setBudget] = useState([]);
  let { currentUser } = useSelector((state) => state.userLogin);
  async function getBudget() {
    let res = await axios.get(
      `http://localhost:4000/user-api/get/${currentUser.username}/find`
    );
    console.log(res.data.payload);
    setBudget(res.data.payload);
  }
  useEffect(() => {
    getBudget();
  }, []);

  return (
    <div className="d-flex">
      <div class="image">
        {/* <img
          className="rounded-circle"
          src="https://img.freepik.com/premium-vector/set-people-analyzing-personal-corporate-budget-isolated-white-background-concept-finance-accounting-calculation-financial-income-expenses-flat-illustration-style_15602-620.jpg"
          height="400px"
          width="400"
        /> */}
        <div id="img1">
        <ExpenseImage image={expenses} /> 
        </div>
      </div>
      <div class="budget1">
        <h1>Total Budget left for this month!!</h1>
        {budget.map((budgetObj) => (
          <div>
            <p id="budget-left">{budgetObj.userBudget}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashBoard;
