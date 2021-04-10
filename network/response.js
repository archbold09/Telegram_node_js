exports.success = function (req, res, data, status) {
  res.status(status || 200).send({
    error: "",
    body: data,
  });
};

exports.error = function (req, res, data, status, errorDetails) {
  console.error(`Response error: ${errorDetails}`);
  res.status(status || 500).send({
    error: data,
    body: "",
  });
};
