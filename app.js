const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Define a Handlebars helper function to get the current year
const hbs = exphbs.create({
  helpers: {
    getCurrentYear: function () {
      return new Date().getFullYear();
    }
  }
});

// Set Handlebars as the templating engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Static folder
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/bar-chart', (req, res) => {
  res.render('barChart', { title: 'Bar Chart' });
});

app.get('/pie-chart', (req, res) => {
  res.render('pieChart', { title: 'Pie Chart' });
});

// Endpoint to serve the JSON data
app.get('/data', (req, res) => {
  const jsonData = {
    "labels": ["January", "February", "March", "April", "May"],
    "datasets": [
      {
        "label": "Sales",
        "backgroundColor": "rgba(54, 162, 235, 0.2)",
        "borderColor": "rgba(54, 162, 235, 1)",
        "borderWidth": 1,
        "data": [1000, 1500, 1200, 1800, 2000]
      },
      {
        "label": "Expenses",
        "backgroundColor": "rgba(255, 99, 132, 0.2)",
        "borderColor": "rgba(255, 99, 132, 1)",
        "borderWidth": 1,
        "data": [800, 1000, 900, 1100, 1200]
      }
    ]
  };

  res.json(jsonData);
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
