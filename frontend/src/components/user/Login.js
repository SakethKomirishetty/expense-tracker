import "./login.css";
import { useForm } from "react-hook-form";
import { userLoginThunk } from "../../redux/slices/userLoginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { isPending, currentUser, errorStatus, errorMessage, loginStatus } =
    useSelector((state) => state.userLogin);

  function onSignUpFormSubmit(userCred) {
    let actionObj = userLoginThunk(userCred);
    dispatch(actionObj);
    console.log(userCred);
    console.log(loginStatus);
  }

  useEffect(() => {
    if (loginStatus === true) {
      navigate("/user-profile");
    }
  }, [loginStatus]);

  return (
    <div class="container1" className="container1">
      <div class="card" className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div id="header-css" className="card shadow">
            <div  className="card-title text-center border-bottom">
              <h2 className="p-3">Log In</h2>
            </div>
            <div className="card-body bg-succcess">
              {errorStatus === true && (
                <p className="text-center text-danger">{errorMessage}</p>
              )}
              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
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
                      minLength: 4,
                      maxLength: 20,
                    })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <p className="text-danger">Password is required.</p>
                  )}
                  {errors.password && errors.password.type === "minLength" && (
                    <p className="text-danger">
                      Password must be at least 4 characters long.
                    </p>
                  )}
                  {errors.password && errors.password.type === "maxLength" && (
                    <p className="text-danger">
                      Password cannot exceed 20 characters.
                    </p>
                  )}
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    id="login-btn"
                    // style={{background: linear-gradient(to right,#117e2c,#117e2c)}}
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
