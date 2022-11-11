import { ErrorMessage, Form, Formik } from "formik";
import { MDBContainer, MDBInputGroup } from "mdb-react-ui-kit";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerFetch } from "../../../redux/user/reducer";
import { FORMIK_REGEX } from "../../../utils/constants";
import countrylabels from "../../../utils/countryCodes";
import "./register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    fullName: "",
    username: "",
    mobile: "",
    countryCode: "+91",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  };

  const schema = Yup.object().shape({
    fullName: Yup.string()
      .required("This field is required")
      .min(4, "Full name must be at least 4 characters!")
      .max(40, "Full name length must not exceed more than 40 characters!")
      .matches(FORMIK_REGEX.ALPHA_REGEX, "Name should only contain alphabets"),
    username: Yup.string()
      .required("This field is required")
      .min(4, "Username must be at least 4 characters!")
      .max(40, "Username length must not exceed more than 40 characters!")
      .matches(
        FORMIK_REGEX.ALPHA_NUMERIC_REGEX,
        "Username can contain alpha numeric characters"
      ),
    mobile: Yup.string()
      .required("This field is required")
      .matches(FORMIK_REGEX.MOBILE_REGEX, "Please enter a valid mobile number"),
    email: Yup.string()
      .required("This field is required")
      .email("enter a valid email address"),

    password: Yup.string()
      .required("This field is required")
      .min(8, "Password must be at least 8 characters!")
      .max(40, "Password length must not exceed more than 40 characters!")
      .matches(
        FORMIK_REGEX.PASSWORD_REGEX,
        "Password must contain atleast one uppercase, one lowercase, one numeric and one special character!"
      ),
    confirmPassword: Yup.string()
      .required("This field is required")
      .oneOf(
        [Yup.ref("password"), null],
        "Password doesn't match, Please retype your password!"
      ),
    acceptTerms: Yup.boolean().oneOf(
      [true],
      "Please accept terms and conditions"
    ),
  });

  const registerCallback = () => {
    navigate("/login");
  };
  const registerHandler = (values) => {
    dispatch(registerFetch({ values, registerCallback }));
  };

  return (
    <div className="register-form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={registerHandler}
      >
        {({ setFieldValue }) => (
          <>
            {" "}
            <Form className="register-form">
              <div className="mt-5 Auth-form-title">
                <h2 className="fw-bold mb-2">Register Now</h2>
              </div>

              <MDBContainer className="p-xl-5 d-flex flex-column">
                <div className="row">
                  <div className="col-md-6 ">
                    <div className="input-wrapper mb-4">
                      <label htmlFor="fullName" className="input-label">
                        Full Name
                      </label>
                      <input
                        className="form-control"
                        name="fullName"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter name"
                        onChange={(e) =>
                          setFieldValue("fullName", e.target.value)
                        }
                      />
                      <div className="text-danger">
                        <ErrorMessage name="fullName" className="text-danger" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="input-wrapper mb-4">
                      <label htmlFor="username" className="input-label">
                        Username
                      </label>
                      <input
                        className="form-control"
                        name="username"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter username"
                        onChange={(e) =>
                          setFieldValue("username", e.target.value)
                        }
                      />
                      <div className="text-danger">
                        <ErrorMessage name="username" className="text-danger" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 ">
                    <div className="input-wrapper mb-4">
                      <label htmlFor="mobile" className="input-label">
                        Mobile Number
                      </label>
                      <MDBInputGroup
                        textBefore={
                          <select
                            className="input-country-code"
                            defaultValue="+91"
                            onChange={(e) =>
                              setFieldValue("countryCode", e.target.value)
                            }
                          >
                            {countrylabels.map((item) => {
                              return (
                                <option value={item.key} key={item.label}>
                                  {item.label}
                                </option>
                              );
                            })}
                          </select>
                        }
                      >
                        <input
                          type="text"
                          name="mobile"
                          className="form-control"
                          placeholder="Enter mobile number"
                          onChange={(e) =>
                            setFieldValue("mobile", e.target.value)
                          }
                        />
                      </MDBInputGroup>
                      <div className="text-danger">
                        <ErrorMessage name="mobile" className="text-danger" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="input-wrapper mb-4">
                      <label htmlFor="email" className="input-label">
                        Email
                      </label>
                      <input
                        className="form-control"
                        name="email"
                        type="email"
                        autoComplete="off"
                        placeholder="Enter email"
                        onChange={(e) => setFieldValue("email", e.target.value)}
                      />
                      <div className="text-danger">
                        <ErrorMessage name="email" className="text-danger" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 ">
                    <div className="input-wrapper mb-4">
                      <label htmlFor="password" className="input-label">
                        Password
                      </label>
                      <input
                        className="form-control"
                        name="password"
                        type="password"
                        autoComplete="off"
                        placeholder="Enter password"
                        onChange={(e) =>
                          setFieldValue("password", e.target.value)
                        }
                      />
                      <div className="text-danger">
                        <ErrorMessage name="password" className="text-danger" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="input-wrapper mb-4">
                      <label htmlFor="confirmPassword" className="input-label">
                        Confirm Password
                      </label>
                      <input
                        className="form-control"
                        name="confirmPassword"
                        type="password"
                        autoComplete="off"
                        placeholder="Re-enter password"
                        onChange={(e) =>
                          setFieldValue("confirmPassword", e.target.value)
                        }
                      />
                      <div className="text-danger">
                        <ErrorMessage
                          name="confirmPassword"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="input-wrapper mb-4">
                  <div className="form-check d-flex">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      name="acceptTerms"
                      onChange={(e) =>
                        setFieldValue("acceptTerms", e.target.checked)
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="form2Example33"
                    >
                      Accept Terms and Conditions
                    </label>
                  </div>
                  <div className="text-danger">
                    <ErrorMessage name="acceptTerms" className="text-danger" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Sign up
                </button>

                <div className="text-center">
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                  <p>or sign up with:</p>
                  <button
                    type="button"
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-google"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button
                    type="button"
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-github"></i>
                  </button>
                </div>
              </MDBContainer>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Register;
