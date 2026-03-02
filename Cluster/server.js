const express = require('express');
const cluster = require('cluster');
const os = require('os');


const totalCPUs = os.availableParallelism() - 1; // Reserve one CPU for the master process


if (cluster.isPrimary) {
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }
} else {
    const app = express();
    const PORT = 5000;
    app.get('/', (req, res) => {
        return res.json({ message: `Express server ${process.pid}` });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} with PID: ${process.pid}`);
    });
}