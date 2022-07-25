const { request, response , next} = require('express');

function paginatedResults(vacations) {
  return (request, response, next) => {
    const page = +request.query.page;
    const limit = +request.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    if (endIndex < vacations.langth) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    result
    try {
      result.result = vacations.slice(startIndex, endIndex);
      res.paginatedResults = results;
      next();
    } catch (error) {
      res.status(500).json({ message: e.message });
    }
  };
}

module.exports = {
  paginatedResults,
};
