const express = require("express");
const bodyParser = require("body-parser").json();
require("dotenv").config();
app = express();

const port = process.env.PORT || 3000;

app.get("/ping", (request, response) => {
  console.log("Ping recieved");
  response.type("text/plain");
  response.send("Pong!");
});

app.post("/calculate_risk", bodyParser, (request, response) => {
  risk = {};

  totalScore =
    request.body.age +
    request.body.bmi +
    request.body.bp +
    request.body.disease;

  risk.score = totalScore;

  if (totalScore <= 20) {
    risk.risk = "Low Risk";
    risk.color = "bg-success";
  } else if (totalScore <= 50) {
    risk.risk = "Moderate Risk";
    risk.color = "bg-warning";
  } else if (totalScore <= 75) {
    risk.risk = "High Risk";
    risk.color = "bg-danger";
  } else {
    risk.risk = "Uninsurable";
    risk.color = "bg-warning-subtle";
  }

  response.type("application/json");
  response.send(risk);
});

app.post("/age_to_points", bodyParser, (request, response) => {
  var output = {};
  age = request.body.age;
  output.points = age < 30 ? 0 : age < 45 ? 10 : age < 60 ? 20 : 30;

  if (output.points === 0) output.color = "bg-success";
  else if (output.points === 10) output.color = "bg-warning";
  else if (output.points === 20) output.color = "bg-danger";
  else output.color = "bg-warning-subtle";

  response.type("application/json");
  response.send(output);
});

app.post("/bmi_to_points", bodyParser, (request, response) => {
  var output = {};

  height = request.body.height * 0.0254;
  weight = request.body.weight / 2.2;
  bmi = weight / Math.pow(height, 2);

  if (bmi >= 18.5 && bmi < 25) {
    output.points = 0;
    output.bmi = "normal";
    output.color = "bg-success";
  } else if (bmi < 30) {
    output.points = 30;
    output.bmi = "overweight";
    output.color = "bg-warning";
  } else {
    output.points = 75;
    output.bmi = "other";
    output.color = "bg-danger";
  }

  response.type("application/json");
  response.send(output);
});

app.post("/bp_to_points", bodyParser, (request, response) => {
  var output = {};

  systolic = request.body.systolic;
  diastolic = request.body.diastolic;

  if (systolic > 180 || diastolic > 120) {
    output.points = 100;
    output.bp = "crisis";
  } else if (systolic >= 140 || diastolic >= 90) {
    output.points = 75;
    output.bp = "stage 2";
  } else if (
    (systolic >= 120 && systolic < 130) ||
    (diastolic >= 80 && diastolic < 90)
  ) {
    output.points = 15;
    output.bp = "elevated";
  } else if (systolic >= 130 || diastolic >= 80) {
    output.points = 30;
    output.bp = "stage 1";
  } else if (systolic < 120 && diastolic < 80) {
    output.points = 0;
    output.bp = "normal";
  } else {
    output.bp = "other";
    output.points = 0;
  }

  if (output.points === 0) output.color = "bg-success";
  else if (output.points === 15) output.color = "bg-warning";
  else if (output.points === 30) output.color = "bg-danger";
  else output.color = "bg-warning-subtle";

  response.type("application/json");
  response.send(output);
});

app.post("/disease_to_points", bodyParser, (request, response) => {
  output = { points: 0 };
  diabetes = request.body.diabetes;
  cancer = request.body.cancer;
  alzhe = request.body.alzhe;

  if (cancer) output.points += 10;
  if (diabetes) output.points += 10;
  if (alzhe) output.points += 10;

  if (output.points === 0) output.color = "bg-success";
  else if (output.points === 10) output.color = "bg-warning";
  else if (output.points === 20) output.color = "bg-danger";
  else output.color = "bg-warning-subtle";

  response.type("application/json");
  response.send(output);
});

// Custom 404 page.
app.use((request, response) => {
  response.type("text/plain");
  response.status(404);
  response.send("404 - Not Found");
});

// Custom 500 page.
app.use((err, request, response, next) => {
  console.error(err.message);
  response.type("text/plain");
  response.status(500);
  response.send("500 - Server Error");
});

app.listen(port, () =>
  console.log(
    `Express started at \"http://localhost:${port}\"\n` +
      `press Ctrl-C to terminate.`
  )
);
