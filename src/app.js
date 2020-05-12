const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App!",
    name: "Udara Sandesha",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page!",
    name: "Udara Sandesha",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Helloo how can I help you?",
    title: "Help page",
    name: "Udara Sandesha",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Provide a search term!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, placeName } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(
        latitude,
        longitude,
        (error, { description, temprature, feels } = {}) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            forecast: `${description}.It is currently ${temprature} out,but feels like ${feels} out!`,
            placeName,
            address: req.query.address,
          });
        }
      );
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found!",
    title: "Error",
    name: "Udara Sandesha",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page not found!",
    title: "Error",
    name: "Udara Sandesha",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
