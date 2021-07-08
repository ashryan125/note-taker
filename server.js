const express = require('express');
const htmlRoutes = require('./routes/html_routes');
const apiRoutes = require('./routes/api_routes');

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// serve up static files
// app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('public'));
app.use(apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

