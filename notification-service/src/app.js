require("dotenv").config({path:".env"})
const express = require('express');
const run = require('./services/notificationService')
const app = express();


app.use(express.json());

run().catch(console.error);

app.listen(3003, () => {
  console.log('Notification service listening on port 3003');
});