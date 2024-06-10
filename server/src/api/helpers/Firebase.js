const admin = require("firebase-admin");
const accountKey = require("../../config/firebaseAdminKey.json");
const { getDownloadURL } = require("firebase-admin/storage");
const crypto = require("crypto");
const Error = require("./Error");

admin.initializeApp({
  credential: admin.credential.cert(accountKey),
  storageBucket: "ubook-1695284277411.appspot.com",
});

const Bucket = admin.storage().bucket();

// Upload an Image to a folder in Storage
const uploadImage = (imageBuffer, folder) => {
  return new Promise((resolve, reject) => {
    // Create a new ref to Storage file
    const file = Bucket.file(`${folder}/${crypto.randomUUID()}.png`);

    // Stream the data to Storage
    const stream = file.createWriteStream({
      metadata: {
        contentType: "image/png",
      },
    });

    stream.on("error", (error) => {
      reject(error);
    });

    stream.on("finish", async () => {
      const url = await getDownloadURL(file);
      resolve(url);
    });
    stream.end(imageBuffer);
  });
};

module.exports = { uploadImage };
