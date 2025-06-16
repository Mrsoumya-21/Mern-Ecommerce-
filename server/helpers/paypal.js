const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AZndgla-l9esQIJZ6LOpa5P1FIpkb-Pbx4ESFpyoBypOlwjz4mz0ZUcsWpsza49KE74FyUQmFddLEg84",
  client_secret:
    "EEUrF2OCW9RaZDFUcFX1ncroTXFkYKP3c4c20kzrP_kCn_-lA9CbCl980QGxFJWenSpCq4OIUaoJFG_J",
});

module.exports = paypal;
