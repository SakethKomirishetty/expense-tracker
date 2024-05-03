import "./signup.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [err, setErr] = useState("");
  let navigate = useNavigate();

  async function onSignUpFormSubmit(userObj) {
    console.log(userObj);
    let res;
    //http post req to user-api
    res = await axios.post("http://localhost:4000/user-api/user", userObj);
    let budgetObj = {
      user: userObj.username,
      userBudget: 0,
    };
    let ans = await axios.post(
      "http://localhost:4000/user-api/insertBudget",
      budgetObj
    );
    if (res.data.message === "User created") {
      //navigate to signin
      navigate("../user/login");
    } else {
      setErr(res.data.message);
    }
  }

  return (
    <div id="main">
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div id="header-css" className="card shadow">
            <div  className="card-title text-center border-bottom">
              <h2  className="p-3">Register</h2>
            </div>
            <div className="card-body">
              {/* user register error message */}

              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                {err.length !== 0 && (
                  <p className="text-danger text-center">{err}</p>
                )}
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    {...register("username", {
                      required: true,
                      minLength: 4,
                      maxLength: 20,
                    })}
                  />
                  {errors.username && errors.username.type === "required" && (
                    <p className="text-danger">Username is required.</p>
                  )}
                  {errors.username && errors.username.type === "minLength" && (
                    <p className="text-danger">
                      Username must be at least 4 characters long.
                    </p>
                  )}
                  {errors.username && errors.username.type === "maxLength" && (
                    <p className="text-danger">
                      Username cannot exceed 20 characters.
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                    })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <p className="text-danger">Password is required.</p>
                  )}
                  {errors.password && errors.password.type === "minLength" && (
                    <p className="text-danger">
                      Password must be at least 6 characters long.
                    </p>
                  )}
                  {errors.password && errors.password.type === "maxLength" && (
                    <p className="text-danger">
                      Password cannot exceed 20 characters.
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Mail
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    {...register("mail", { required: true })}
                  />
                  {errors.accountNo && (
                    <p className="text-danger">Email is required.</p>
                  )}
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    id="signup-btn"
                    // style={{ backgroundColor: "maroon" }}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Signup;
