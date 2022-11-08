import React, { useState } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import "./login.css";
import { useDispatch } from "react-redux";
import { loginFetch } from "../../../redux/user/reducer";
import { Link } from "react-router-dom";
import countrylabels from "../../../utils/countryCodes";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import { encryptPassword } from "../../../utils/encrypt";

const Login = () => {
  const dispatch = useDispatch();

  const initialValues = {
    mobile: "+91",
    countryCode: "",
    password: "",
    rememberPassword: false,
  };

  const schema = Yup.object().shape({
    mobile: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required").min(3),
  });

  const loginHandler = (values) => {
    console.log(values);
    encryptPassword(values.password);
    // dispatch(loginFetch(values));
  };

  return (
    <div className="Auth-form-container">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={loginHandler}
      >
        {({ setFieldValue }) => (
          <>
            <Form className="Auth-form">
              <div className="mt-5 Auth-form-title">
                <h2 className="fw-bold mb-2">Login</h2>
              </div>

              <MDBContainer className="p-xl-5 d-flex flex-column">
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
                      placeholder="Enter mobile Number"
                      onChange={(e) => setFieldValue("mobile", e.target.value)}
                    />
                  </MDBInputGroup>
                  <ErrorMessage name="mobile" className="text-danger" />
                </div>

                <div className="input-wrapper mb-4">
                  <label htmlFor="password" className="input-label">
                    Password
                  </label>
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    autoComplete="off"
                    placeholder="Enter Password"
                    onChange={(e) => setFieldValue("password", e.target.value)}
                  />
                  <ErrorMessage name="password" className="text-danger" />
                </div>

                <div className="d-flex justify-content-between mx-3 mb-4">
                  <MDBCheckbox
                    name="rememberPassword"
                    value=""
                    label="Remember me"
                  />
                  <a href="!#">Forgot password?</a>
                </div>

                <MDBBtn className="mb-4">Sign in</MDBBtn>

                <div className="text-center">
                  <p>
                    Not a member? <Link to="/register">Register</Link>
                  </p>
                  <p>or sign up with:</p>

                  <div
                    className="d-flex justify-content-between mx-auto"
                    style={{ width: "40%" }}
                  >
                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="facebook-f" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="twitter" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="google" size="sm" />
                    </MDBBtn>

                    <MDBBtn
                      tag="a"
                      color="none"
                      className="m-1"
                      style={{ color: "#1266f1" }}
                    >
                      <MDBIcon fab icon="github" size="sm" />
                    </MDBBtn>
                  </div>
                </div>
              </MDBContainer>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Login;
