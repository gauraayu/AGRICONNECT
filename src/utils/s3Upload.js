import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const REGION = process.env.REACT_APP_AWS_REGION;
const BUCKET = process.env.REACT_APP_S3_BUCKET;

// ── DEBUG LOGS — check if env is loaded ──
console.log("🔍 AWS Config Check:");
console.log("   Region:", REGION || "❌ MISSING!");
console.log("   Bucket:", BUCKET || "❌ MISSING!");
console.log("   Access Key:", process.env.REACT_APP_AWS_ACCESS_KEY_ID
  ? `✅ ${process.env.REACT_APP_AWS_ACCESS_KEY_ID.slice(0, 4)}...${process.env.REACT_APP_AWS_ACCESS_KEY_ID.slice(-4)}`
  : "❌ MISSING!");
console.log("   Secret Key:", process.env.REACT_APP_AWS_SECRET_ACCESS_KEY ? "✅ Loaded" : "❌ MISSING!");

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId:     process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadToS3 = async (file, folder = "problems") => {
  console.log("📤 Starting S3 upload...");
  console.log("   File name:", file.name);
  console.log("   File size:", (file.size / 1024).toFixed(1), "KB");
  console.log("   File type:", file.type);

  try {
    const extension = file.name.split(".").pop();
    const fileName  = `${folder}/${uuidv4()}.${extension}`;
    console.log("   S3 path:", fileName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer      = new Uint8Array(arrayBuffer);
    console.log("   Buffer size:", buffer.length);

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key:    fileName,
      Body:   buffer,
      ContentType: file.type,
    });

    console.log("   Sending to S3...");
    const result = await s3Client.send(command);
    console.log("✅ S3 response:", result);

    const publicUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;
    console.log("✅ Public URL:", publicUrl);
    return publicUrl;
  } catch (error) {
    console.error("❌ S3 UPLOAD FAILED:");
    console.error("   Error name:", error.name);
    console.error("   Error message:", error.message);
    console.error("   Full error:", error);
    throw error;
  }
};

export const uploadBase64ToS3 = async (base64String, folder = "problems") => {
  console.log("📤 Uploading captured photo to S3...");
  try {
    const res    = await fetch(base64String);
    const blob   = await res.blob();
    const fileName = `${folder}/${uuidv4()}.jpg`;
    const arrayBuffer = await blob.arrayBuffer();
    const buffer      = new Uint8Array(arrayBuffer);

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key:    fileName,
      Body:   buffer,
      ContentType: "image/jpeg",
    });

    await s3Client.send(command);
    const publicUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;
    console.log("✅ Captured photo uploaded:", publicUrl);
    return publicUrl;
  } catch (error) {
    console.error("❌ Base64 S3 upload failed:", error);
    throw error;
  }
};

export const deleteFromS3 = async (url) => {
  try {
    const key = url.split(".com/")[1];
    await s3Client.send(new DeleteObjectCommand({ Bucket: BUCKET, Key: key }));
    console.log("✅ Deleted from S3");
  } catch (error) {
    console.error("❌ S3 delete error:", error);
  }
};