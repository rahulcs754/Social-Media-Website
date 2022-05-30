import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginCheck, STATUSES } from "../../../store/authSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaUserFriends } from "react-icons/fa";
import * as Yup from "yup";

export const Login = () => {
  const navigate = useNavigate();
  const { status, message, isLogged } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // check user is logged in or not then send to home page
  useEffect(() => {
    if (isLogged) {
      toast.success("You have successfully logged in");
      navigate("/homepage");
    }

    if (status === STATUSES.ERROR) {
      toast.warning(message);
    }
  }, [isLogged, status]);

  //set default entry for login
  const handlerGuestEntry = () => {
    const userCredentail = {
      username: "rahul",
      password: "test123",
    };
    dispatch(loginCheck(userCredentail));
  };

  const LoginSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be 3 characters at minimum")
      .required("Password is required"),
  });

  return (
    <div className={`flex flex-center ${styles.login_box}`}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={({ email, password }) => {
          const userCredentail = { username: email, password };
          dispatch(loginCheck(userCredentail));
        }}
      >
        {({ touched, errors }) => (
          <div>
            <div className="row mb-5">
              <div className="col-lg-12 text-center">
                <h1 className="space-between text-center mr-s ml-s">
                  Connect <FaUserFriends className="friend_icons" />
                </h1>
              </div>
            </div>
            <Form className={styles.login_form}>
              <div className="input-box input-box-icon">
                <label htmlFor="email" className="label-text">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className={`field-item mt-2 form-control
                          ${touched.email && errors.email ? "is-invalid" : ""}`}
                />

                <ErrorMessage
                  component="div"
                  name="email"
                  className={styles.error_text}
                />
              </div>

              <div className="input-box input-box-icon">
                <label htmlFor="password" className="mt-3 label-text">
                  Password
                </label>
                <Field
                  name="password"
                  placeholder="Enter password"
                  className={`field-item mt-2 form-control
                          ${
                            touched.password && errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                  type="password"
                />
                <ErrorMessage
                  component="div"
                  name="password"
                  className={styles.error_text}
                />
              </div>

              <div className="space-between mt-s">
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                >
                  Log In
                </button>
                <button
                  className="btn btn_outline d-inline"
                  onClick={handlerGuestEntry}
                  type="button"
                >
                  Guest Entry
                </button>
                <button className="btn btn_outline d-inline">
                  <Link to="/signup">Create New Account </Link>
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};
