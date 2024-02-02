import nodemailer from "nodemailer";
import fs from "fs";

const mailSender = process.env.MAIL_SENDER;
const passwordSender = process.env.MAIL_PASSWORD;

export const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mailSender,
    pass: passwordSender,
  },
});

export function readRenderHtml(path: string, cb: any) {
  fs.readFile(path, "utf-8", (data: any, err) => {
    if (err) cb(err);
    else cb(null, data);
  });
}
