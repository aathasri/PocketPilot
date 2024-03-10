const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs").promises;

const port = process.env.PORT || 8000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve favicon using a more efficient method
app.use('/favicon.ico', express.static(path.join(__dirname, 'public/icon/favicon.ico')));

// Handle the root route
app.get("/", async (req, res) => {
    try {
        const doc = await fs.readFile(path.join(__dirname, 'app/html/main.html'), 'utf8');
        res.send(doc);
    } catch (error) {
        console.error("Error reading html file:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Serve JSON data from the 'app/json' directory
app.get("/data/:jsonFileName", async (req, res) => {
    const jsonFileName = req.params.jsonFileName;
    try {
        const jsonData = await fs.readFile(path.join(__dirname, 'app/json', `${jsonFileName}.json`), 'utf8');
        res.json(JSON.parse(jsonData));
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.status(404).send('JSON file not found');
        } else {
            console.error("Error reading json file:", error);
            res.status(500).send("Internal Server Error");
        }
    }
});

// Handle form submission to update JSON data
app.post("/submit/:jsonFileName", async (req, res) => {
    try {
        const jsonFileName = req.params.jsonFileName;
        const formData = req.body;

        // Update JSON file
        await updateJSON(jsonFileName, formData);

        res.json({ success: true });
    } catch (error) {
        console.error("Error updating JSON file:", error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Function to update JSON file dynamically based on the filename
async function updateJSON(fileName, newData) {
    const jsonFilePath = path.join(__dirname, 'app/json', `${fileName}.json`);
    
    try {
        // Read existing JSON data
        const jsonData = await fs.readFile(jsonFilePath, 'utf8');
        const existingData = JSON.parse(jsonData);

        // Merge existing data with new data
        const updatedData = [...existingData, newData];

        // Write updated JSON data back to file
        await fs.writeFile(jsonFilePath, JSON.stringify(updatedData, null, 2));

        console.log(`Added new data to ${fileName}.json`);
    } catch (error) {
        console.error("Error updating JSON file:", error);
        throw error;
    }
}

// Catch-all for 404 Not Found responses
app.use((req, res) => {
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>")
});

// Corrected the string template literal syntax for displaying the port number
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});