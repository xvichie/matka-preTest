require('dotenv').config();
const express = require('express');
const { Storage } = require('@google-cloud/storage');
const Multer = require('multer');

const router = express.Router();

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
});

const cloudStorage = new Storage({
    keyFilename: `${__dirname}/service_account_key.json`,
    projectId: process.env.CLOUD_PROJECT_ID,
});

const bucketName = process.env.CLOUD_BUCKET_NAME;
const bucket = cloudStorage.bucket(bucketName);

router.post("/", multer.single("file"), async function (req, res, next) {
    if (!req.file) {
        res.status(400).send("No file uploaded.");
        return;
    }

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    try {
        await new Promise((resolve, reject) => {
            blobStream.on("error", (err) => {
                console.error("Error uploading file:", err);
                reject(err);
            });
            blobStream.on("finish", () => {
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                res.status(200).json({ publicUrl });
                resolve();
            });

            blobStream.end(req.file.buffer);
        });
    } catch (err) {
        res.status(500).json({ error: "Error uploading the file.", details: err.message });
    }
});
router.get("/", (req, res) => {
    const file = bucket.file(req.body);
    const config = {
        action: "read", // giving read permission here
        expires: "03-17-2025", // specifying the expiry date
    };
    file.getSignedUrl(config, (err, url) => {
        res.status(200).json({ url });
    });
});
module.exports = router;