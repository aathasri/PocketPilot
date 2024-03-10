const express = require("express");
const app = express();

const path = require("path");
const fs = require("fs").promises;
const bodyParser = require("body-parser");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const port = process.env.PORT || 8000;

app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/api/chat", async (req, res) => {
  const { message } = req.body; // Get the message from the request body

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo", // Adjust the model as needed
      messages: [{ role: "user", content: message }],
      max_tokens: 150,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Now response is directly the response object from OpenAI
    if (response.data.choices.length > 0 && response.data.choices[0].message) {
      const reply = response.data.choices[0].message.content;
      res.json({ reply }); // Correctly use the Express res object to send the reply
    } else {
      throw new Error("No valid reply from OpenAI.");
    }
  } catch (error) {
    console.error(
      "Error calling OpenAI API:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: error.message });
  }
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Serve favicon using a more efficient method
app.use(
  "/favicon.ico",
  express.static(path.join(__dirname, "public/icon/favicon.ico"))
);

// Handle the root route
app.get("/", async (req, res) => {
  try {
    const doc = await fs.readFile(
      path.join(__dirname, "app/html/main.html"),
      "utf8"
    );
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
    const jsonData = await fs.readFile(
      path.join(__dirname, "app/json", `${jsonFileName}.json`),
      "utf8"
    );
    res.json(JSON.parse(jsonData));
  } catch (error) {
    if (error.code === "ENOENT") {
      res.status(404).send("JSON file not found");
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
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Function to update JSON file dynamically based on the filename
async function updateJSON(fileName, newData) {
  const jsonFilePath = path.join(__dirname, "/public/json", `${fileName}.json`);

  try {
    let existingData = { courses: [] }; // Initialize existingData as an object with an empty array

    // Read existing JSON data
    try {
      const jsonData = await fs.readFile(jsonFilePath, "utf8");
      existingData = JSON.parse(jsonData);
    } catch (readError) {
      // If there's an error reading the file, log it but continue with an empty object
      console.error("Error reading JSON file:", readError);
    }

    // Push new data to the courses array
    existingData.courses.push(newData);

    // Write updated JSON data back to file
    await fs.writeFile(jsonFilePath, JSON.stringify(existingData, null, 2));

    console.log(`Added new data to ${fileName}.json`);
  } catch (error) {
    console.error("Error updating JSON file:", error);
    throw error;
  }
}


// Catch-all for 404 Not Found responses
app.use((req, res) => {
  res
    .status(404)
    .send(
      "<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>"
    );
});

// Corrected the string template literal syntax for displaying the port number
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
