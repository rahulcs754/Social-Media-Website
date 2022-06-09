import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SignupUser, STATUSES } from "../../../store/authSlice";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaUserFriends } from "react-icons/fa";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isRegisterd, message, status } = useSelector((state) => state.auth);

  // check user is logged in or not then send to home page
  useEffect(() => {
    if (isRegisterd) {
      toast.success("You have successfully registered");
      navigate("/homepage");
    }

    if (status === STATUSES.ERROR) {
      toast.warning(message);
    }
  }, [isRegisterd, status]);

  const signupSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required"),
    password: Yup.string()
      .min(3, "Password must be 3 characters at minimum")
      .required("Password is required"),
    confirmpassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Your password do not match."),
  });
  npm;
  return (
    <div className={styles.signup_box}>
      <Formik
        initialValues={{
          username: "",
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          confirmpassword: "",
        }}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          const { username, firstname, lastname, email, password } = values;
          const passObject = {
            username,
            firstname,
            lastname,
            email,
            password,
          };
          dispatch(SignupUser(passObject));
        }}
      >
        {({ touched, errors }) => (
          <div>
            <div className="row mb-5">
              <div className="col-lg-12 text-center">
                <h1 className="space-between text-center mr-s ml-s">
                  SignUp <FaUserFriends className="friend_icons" />
                </h1>
              </div>
            </div>
            <Form className={styles.signup_form}>
              <div className="input-box input-box-icon">
                <label htmlFor="username" className="label-text">
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  className={`field-item mt-2 form-control
                          ${
                            touched.username && errors.username
                              ? "is-invalid"
                              : ""
                          }`}
                />

                <ErrorMessage
                  component="div"
                  name="username"
                  className={styles.error_text}
                />
              </div>
              <div className="input-box input-box-icon">
                <label htmlFor="firstname" className="label-text">
                  First Name
                </label>
                <Field
                  type="text"
                  name="firstname"
                  className={`field-item mt-2 form-control
                          ${
                            touched.firstname && errors.firstname
                              ? "is-invalid"
                              : ""
                          }`}
                />

                <ErrorMessage
                  component="div"
                  name="firstname"
                  className={styles.error_text}
                />
              </div>
              <div className="input-box input-box-icon">
                <label htmlFor="lastname" className="label-text">
                  Last Name
                </label>
                <Field
                  type="text"
                  name="lastname"
                  className={`field-item mt-2 form-control
                          ${
                            touched.lastname && errors.lastname
                              ? "is-invalid"
                              : ""
                          }`}
                />

                <ErrorMessage
                  component="div"
                  name="lastname"
                  className={styles.error_text}
                />
              </div>

              <div className="input-box input-box-icon">
                <label htmlFor="email" className="label-text">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
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
              <div className="input-box input-box-icon">
                <label htmlFor="confirmpassword" className="mt-3 label-text">
                  Confirm Password
                </label>
                <Field
                  name="confirmpassword"
                  className={`field-item mt-2 form-control
                          ${
                            touched.confirmpassword && errors.confirmpassword
                              ? "is-invalid"
                              : ""
                          }`}
                  type="password"
                />
                <ErrorMessage
                  component="div"
                  name="confirmpassword"
                  className={styles.error_text}
                />
              </div>

              <div className="space-between mt-s">
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                >
                  Sign Up
                </button>

                <button className="btn btn_outline d-inline">
                  <Link to="/">Go To Login</Link>
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};
