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
    message: `Vacation was Not Found  `,
    isShowStackTrace: true,
  },
  UNAUTHORIZED: {
    id: 3,
    httpCode: 401,
    message: `Login failed. invalid user name or password`,
    isShowStackTrace: false,
  },
};

module.exports = ErrorType;
