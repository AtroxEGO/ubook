const Notification = (message, path = "general") => {
  const type = "info";
  return {
    message,
    path,
    type, // TODO: Check if this is needed
  };
};

module.exports = Notification;
