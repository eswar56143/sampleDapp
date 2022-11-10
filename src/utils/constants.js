export const PUBLIC_URL = process.env.REACT_APP_USER_URL;

export const STATUS_CODE = {
  successful: 200,
  badRequest: 400,
  unAuthorized: 401,
  forbidden: 403,
  notFound: 404,
};

export const FORMIK_REGEX = {
  PASSWORD_REGEX:
    /^.*(?=.{6})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  ALPHA_REGEX: /^[a-zA-Z][a-zA-Z\\s]+$/,
  ALPHA_NUMERIC_REGEX: /^[a-zA-Z0-9]+$/,
  MOBILE_REGEX: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  EMAIL_REGEX: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  POSTAL_REGEX: /^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]$/,
};