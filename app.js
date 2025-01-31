const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db.js');
const userRoutes = require('./routes/user.routes.js');
const captainRoutes = require('./routes/captain.routes.js');
const mapsRoutes = require('./routes/maps.routes.js');
const rideRoutes = require('./routes/ride.routes.js');

const path = require('path');
// const { fileURLToPath } = require('url');


// const __filename = fileURLToPath(import.meta.url);
// const __dirname  = path.dirname(__filename);
console.log(__dirname);
console.log(__filename)

connectToDb();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);


app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/dist/index.html'));
});



module.exports = app;

