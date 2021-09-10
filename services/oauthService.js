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
  // eslint-disable-next-line no-unused-vars

  // Request refreshed tokens from Google
  let gmailAccessToken = oauth2Client.getAccessToken(function (
    err,
    tokens,
    res
  ) {
    if (err) {
      console.log("getAccessToken error: " + err);
      return undefined;
    } else {
      console.log("tokens: " + JSON.stringify(tokens, null, 2)); //DEBUG
      if (res && res.data) {
        //console.log("results: ", util.inspect(res));  // DEBUG:
        if (Object.prototype.hasOwnProperty.call(res.data, "id_token")) {
          // We return all of res.data, but it's id_token that we're really after
          console.log("res.data: " + JSON.stringify(res.data, null, 2)); // DEBUG:
          return res.data;
        }
      } else {
        // Only token returned, no res
        console.log("No refresh"); // DEBUG:
        return undefined;
      }
    }
  }); // oauth2Client.getAccessToken()

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
