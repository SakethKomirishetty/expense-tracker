import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import LogoHeader from "../home/LogoHeader";
import { useForm } from "react-hook-form";
import "./dashboard.css";
import axios from "axios";
import { useSelector } from "react-redux";
import "../budget-page/budget.css"
const Dashboard = () => {
  // State variables
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [budget, setBudget] = useState(0);
  const [leftamount, setLeftAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  //  const [purpose, setPurpose] = useState("");
  //const [category, setCategory] = useState("");
  //const [date, setDate] = useState("");
  //const [amount, setAmount] = useState("");

  // Navigate hook for redirection
  const navigate = useNavigate();

  let { currentUser } = useSelector((state) => state.userLogin);
  const categories = ["Children", "Personal", "Fees", "Daily Wages","Others"];
  // Function to handle form submission
  async function onSubmit(userObj) {
    console.log(userObj);
    userObj = {
      ...userObj,
      username: currentUser.username,
      status: "true",
    };
    let response = await axios.post(
      "http://localhost:4000/user-api/insert",
      userObj
    );
    if (response.data.message === "Inserted") {
      let ans = await axios.get(
        `http://localhost:4000/user-api/get/${currentUser.username}`
      );
      setTransactions(ans.data.payload);
    } else if (response.data.message === "Insufficient Budget") {
      alert("Budget is insufficient");
      navigate(`../budget/${currentUser.username}`);
    }
  }
  async function getExpenses() {
    let ans = await axios.get(
      `http://localhost:4000/user-api/get/${currentUser.username}`
    );
    setTransactions(ans.data.payload);
  }
  useEffect(() => {
    getExpenses();
  }, []);
  console.log(currentUser.username);
  // Function to handle deleting a transaction
  async function handleDelete(purpose, category, amount, date) {
    let userCred = {
      amount: amount,
      username: currentUser.username,
      // date: date,
      category: category,
      purpose: purpose,
    };
    const updatedTransactions = [...transactions];
    let temp = await axios.post(
      "http://localhost:4000/user-api/delete",
      userCred
    );
    if (temp.data.message === "Deleted") {
      let ans = await axios.get(
        `http://localhost:4000/user-api/get/${currentUser.username}`
      );
      setTransactions(ans.data.payload);
    }
  }

  // Calculate total expenses
  // const totalExpenses = transactions.reduce(
  //   (total, transaction) => total + transaction.amount,
  //   0
  // );

  // Calculate remaining budget
  //const remainingBudget = budget - totalExpenses;

  // Function to handle signout

  return (
    <>
      
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-12 p-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="purpose">Purpose:</label>
                <input
                  type="text"
                  className="form-control"
                  id="purpose"
                  {...register("purpose", { required: true })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                  className="form-control"
                  id="category"
                  {...register("category", { required: true })}
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  {...register("date", { required: true })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount:</label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  {...register("amount")}
                />
              </div>
              <button id="btn1" type="submit" className="btn btn-sm btn-primary">
                Add
              </button>
            </form>
          </div>
          <div className="col-md-12 p-4">
            <table className="table">
              <thead>
                <tr>
                  <th>Purpose</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transactionObj, index) => {
                  return (
                    <tr key={transactionObj._id}>
                      <td>{transactionObj.purpose}</td>
                      <td>{transactionObj.category}</td>
                      <td>{transactionObj.date}</td>
                      <td>{transactionObj.amount}</td>
                      {/* <td>
                      {transaction.amount.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </td> */}
                      <td>
                        <button
                          id="btn1"
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(
                              transactionObj.purpose,
                              transactionObj.category,
                              transactionObj.amount,
                              transactionObj.date
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
