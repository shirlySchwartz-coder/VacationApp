const ErrorType = {
  GENERAL_ERROR: {
    id: 1,
    httpCode: 600,
    message: `Something is not working  `,
    isShowStackTrace: true,
  },
  VACATION_DONT_EXIST: {
    id: 2,
    httpCode: 404,
    message: `Vacation does not exist.  `,
    isShowStackTrace: false,
  },
  UNAUTHORIZED: {
    id: 3,
    httpCode: 401,
    message: `Login failed. invalid user name or password`,
    isShowStackTrace: false,
  },
  USER_NAME_ALREADY_EXIST: {
    id: 4,
    httpCode: 601,
    message: 'User name already exist',
    isShowStackTrace: false,
  },
  WRONG_USER_NAME_OR_PASSWORD: {
    id: 5,
    httpCode: 401,
    message: 'Wrong username or password',
    isShowStackTrace: false,
  },
  PASSWORD_TO_SHORT: {
    id: 6,
    httpCode: 401,
    message: 'Password is too short',
    isShowStackTrace: false,
  },
  USER_NAME_IS_MISSING: {
    id: 7,
    httpCode: 401,
    message: 'User name is missing',
    isShowStackTrace: false,
  },
  PASSWORD_IS_MISSING: {
    id: 8,
    httpCode: 401,
    message: 'Password is missing',
    isShowStackTrace: false,
  },
  REQUEST_IS_EMPTY: {
    id: 9,
    httpCode: 204,
    message: 'Request is missing',
    isShowStackTrace: false,
  },
  REQUEST_IS_MISSING_DATA: {
    id: 10,
    httpCode: 204,
    message: 'Request is missing data',
    isShowStackTrace: false,
  }

};

module.exports = ErrorType;
