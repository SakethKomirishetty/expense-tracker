import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import "./budget.css";
function Budget() {
  let navigate = useNavigate();
  let {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  let { currentUser } = useSelector((state) => state.userLogin);
  async function onBudget(budgetObj) {
    console.log(budgetObj);
    //budgetObj.budget = Number(budgetObj.budget);
    budgetObj = {
      userBudget: Number(budgetObj.budget),
    };
    let res2 = await axios.post(
      `http://localhost:4000/user-api/updateBudget/${currentUser.username}`,
      budgetObj
    );
    navigate(`../dashboard/${currentUser.username}`);
  }
  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onBudget)}>
        <div className="form-group">
          <label htmlFor="budget">
            <h3> Enter Budget for this Month : </h3>
          </label>
          <input
            type="number"
            className="form-control"
            id="budget"
            {...register("budget", { required: true })}
          />
        </div>
        <button id="btn1" className="btn btn-success" type="submit">
          Set Budget
        </button>
      </form>
      <br></br>

      <h3>
        Note : The above amount will be added to the previous budget that was
        set
      </h3>
    </div>
  );
}

export default Budget;
