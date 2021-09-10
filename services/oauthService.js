const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const nodemailer = require("nodemailer");

const clientID = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;
const redirectURL = process.env.OAUTH_REDIRECT_URL;
const refreshToken = process.env.OAUTH_REFRESH_TOKEN;

const oauth2Client = new OAuth2(clientID, clientSecret, redirectURL);

if (process.env.NODE_ENV == "production") {
  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });
  let gmailAccessToken = async function () {
    return await oauth2Client.getAccessToken().then((token) => {
      return token;
    });
  };

  console.log("accesstoken", gmailAccessToken);
  console.log("refreshToken", refreshToken);
  let gmailTransporter;
  if (gmailAccessToken) {
    console.log("accesstoken2", gmailAccessToken);
    gmailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "studyplanhtwberlin@gmail.com",
        clientId: clientID,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: gmailAccessToken,
        tls: {
          rejectUnauthorized: false,
        },
      },
    });
  }

  module.exports = {
    gmailTransporter: gmailTransporter,
  };
}
