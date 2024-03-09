const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs").promises;

const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/favicon.ico', express.static(path.join(__dirname, 'public/icon/favicon.ico')));

app.get("/", async (req, res) => {
    try {
        const doc = await fs.readFile(path.join(__dirname, 'app/html/main.html'), 'utf8');
        res.send(doc);
    } catch (error) {
        console.error("Error reading html file:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.use((req, res) => {
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>")
});

app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
});