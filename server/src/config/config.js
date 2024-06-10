module.exports = {
  port: 3002, // Application port
  saltRounds: 15, // Streangth of password encryption
  sessionDuration: "1h", // Sesstion token duration
  verificationCodeValidDuration: 10, // Verification code duration in minutes
  socketConfig: {
    // Socket configuration
    cors: "*",
  },
};
