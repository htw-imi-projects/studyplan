const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const nodemailer = require("nodemailer");

const clientID = process.env.OAUTH_CLIENT_ID;
const clientSecret = process.env.OAUTH_CLIENT_SECRET;
const redirectURL = process.env.OAUTH_REDIRECT_URL;
const refreshToken = process.env.OAUTH_REFRESH_TOKEN;

const oauth2Client = new OAuth2(clientID, clientSecret, redirectURL);

const mail = async () => {
  if (process.env.NODE_ENV == "production") {
    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });
    // eslint-disable-next-line no-unused-vars

    let gmailAccessToken = await oauth2Client.getAccessToken();

    console.log("accesstoken", gmailAccessToken);
    console.log("refreshToken", refreshToken);
    if (gmailAccessToken) {
      console.log("accesstoken2", gmailAccessToken);
      return nodemailer.createTransport({
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
  }
};
let gmailTransporter = mail();

module.exports = {
  gmailTransporter: gmailTransporter,
};
