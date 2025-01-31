const http = require('http');
const app = require('./app.js');
const { initializeSocket } = require('./socket.js');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(port, '0.0.0.0' , () => {
    console.log(`Server is running on port ${port}`);
});