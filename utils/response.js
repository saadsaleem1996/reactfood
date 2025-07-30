module.exports = {
  successResponse: (res, httpCode, ...rest) => {
    res.status(httpCode).send(rest)
    res.end()
  },
  errorResponse: (res, httpCode, ...rest) => {
    res.status(httpCode).send(rest)
    res.end()
  },
  response: (res, httpCode, rest) => {
    res.status(httpCode).send(rest)
    res.end()
  },
  responses: (res, response) => {
    if (response?.errors?.length > 0) {
      res.status(response.httpCode).send({ error: response.errors })
      res.end()
    } else {
      res.status(response.httpCode).send(response.data)
      res.end()
    }
  },
  redirect: (req, res, response) => {
    res.status(response.status).redirect(response.path)
  }
}
