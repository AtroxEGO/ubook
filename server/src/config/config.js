module.exports = {
  port: 3002,
  saltRounds: 15, // For password hashing
  sessionDuration: "999d",
  verificationCodeValidDuration: 10, // In Minutes
  socketOptions: {
    cors: "*",
  },
};
