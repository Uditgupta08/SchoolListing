const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const schoolRoutes = require('./routes/schoolRoutes');
const { createTable } = require('./models/school');

dotenv.config();
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

console.log("Initializing routes...");
app.use('/', schoolRoutes);

app.use((err, req, res, next) => {
  console.error("Error handler triggered:", err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await createTable();
});