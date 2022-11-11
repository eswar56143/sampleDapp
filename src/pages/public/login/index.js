import React, { useState } from "react";
import {
  MDBContainer,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBInputGroup,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import "./login.css";
import { useDispatch } from "react-redux";
import { loginFetch } from "../../../redux/user/reducer";
import { Link } from "react-router-dom";
import countrylabels from "../../../utils/countryCodes";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import { FORMIK_REGEX } from "../../../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const schema1 = Yup.object().shape({
    username: Yup.string()
      .required("This field is required")
      .min(4, "Username must be at least 4 characters!")
      .max(40, "Username length must not exceed more than 40 characters!")
      .matches(
        FORMIK_REGEX.ALPHA_NUMERIC_REGEX,
        "Username can contain alpha numeric characters"
      ),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Password must be at least 8 characters!")
      .max(40, "Password length must not exceed more than 40 characters!")
      .matches(
        FORMIK_REGEX.PASSWORD_REGEX,
        "Password must contain atleast one uppercase, one lowercase, one numeric and one special character!"
      ),
  });

  const schema = Yup.object().shape({
    mobile: Yup.string()
      .required("This field is required")
      .matches(FORMIK_REGEX.MOBILE_REGEX, "Please enter a valid mobile number"),
    password: Yup.string()
      .required("This field is required")
      .min(8, "Password must be at least 8 characters!")
      .max(40, "Password length must not exceed more than 40 characters!")
      .matches(
        FORMIK_REGEX.PASSWORD_REGEX,
        "Password must contain atleast one uppercase, one lowercase, one numeric and one special character!"
      ),
  });

  const loginHandler = (values) => {
    console.log(values);
    dispatch(loginFetch(values));
  };

  return (
    <div className="Auth-form-container">
      <div className="Auth-form">
        <div className="mt-1 Auth-form-title">
          <h2 className="fw-bold mb-2">Login</h2>
        </div>
        <p className="text-center">with</p>
        <MDBTabs pills justify className="mb-3 px-5">
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab1")}
              active={justifyActive === "tab1"}
            >
              Username
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}
            >
              Mobile number
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>
        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === "tab1"}>
            <Formik
              initialValues={{
                mode: 0,
                username: "",
                password: "",
                rememberPassword: false,
              }}
              validationSchema={schema1}
              onSubmit={loginHandler}
            >
              {({ setFieldValue }) => (
                <>
                  <Form>
                    <MDBContainer className="px-xl-5 pt-4 d-flex flex-column">
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
                        <ErrorMessage name="username" className="text-danger" />
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
                          onChange={(e) =>
                            setFieldValue("password", e.target.value)
                          }
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

                      <MDBBtn className="mb-4" type="submit">
                        Sign in
                      </MDBBtn>
                    </MDBContainer>
                  </Form>
                </>
              )}
            </Formik>
          </MDBTabsPane>
          <MDBTabsPane show={justifyActive === "tab2"}>
            <Formik
              initialValues={{
                mode: 1,
                mobile: "",
                countryCode: "+91",
                password: "",
                rememberPassword: false,
              }}
              validationSchema={schema}
              onSubmit={loginHandler}
            >
              {({ setFieldValue }) => (
                <>
                  <Form>
                    <MDBContainer className="px-xl-5 pt-4 d-flex flex-column">
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
                            onChange={(e) =>
                              setFieldValue("mobile", e.target.value)
                            }
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
                          onChange={(e) =>
                            setFieldValue("password", e.target.value)
                          }
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

                      <MDBBtn className="mb-4" type="submit">
                        Sign in
                      </MDBBtn>
                    </MDBContainer>
                  </Form>
                </>
              )}
            </Formik>
          </MDBTabsPane>
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
        </MDBTabsContent>
      </div>
    </div>
  );
};

export default Login;
