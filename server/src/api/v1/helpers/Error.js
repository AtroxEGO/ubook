const Error = (message, path = "general") => ({
  message,
  path,
});

module.exports = Error;
