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

async function readAndParseJSON(filePath) {
  const data = await fs.readFile(filePath, "utf8"); // Correctly use fs.promises.readFile
  return JSON.parse(data);
}

async function mergeAndExportJSON(jsonFilePaths, outputPath, additionalData) {
  try {
    const dataPromises = jsonFilePaths.map((filePath) =>
      readAndParseJSON(filePath)
    );
    const jsonData = await Promise.all(dataPromises);

    const combinedData = Object.assign({}, ...jsonData, additionalData);

    await fs.writeFile(
      outputPath,
      JSON.stringify(combinedData, null, 2),
      "utf8"
    );
    console.log("Combined JSON file has been successfully created.");
  } catch (error) {
    console.error("Error merging or exporting JSON:", error);
  }
}

const openai = new OpenAIApi(configuration);

app.post("/api/chat", async (req, res) => {
  const jsonFiles = [
    path.join(__dirname, "app/html/json/assessments.json"),
    path.join(__dirname, "app/html/json/courses.json"),
    path.join(__dirname, "app/html/json/assignments.json"),
  ];
  const outputPath = path.join(
    __dirname,
    "app/html/json/generatedSchedule.json"
  );
  const additionalRequirements = {
    // Additional data to include
  };
  const outputUrl = "app/html/json/generatedSchedule.json"; // URL path where the combined JSON can be accessed

  // Combine data with user input. Ensure req.body.message is correctly used
  const userInput = req.body.message;
  // const combinedMessage = `Here is some data: ${JSON.stringify(
  //   jsonData1
  // )}, ${JSON.stringify(jsonData2)}, and ${JSON.stringify(
  //   jsonData3
  // )}. ${userInput}`;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4-turbo-preview", // Adjust the model as needed
      messages: [
        {
          role: "system",
          content:
            "The following are the loaded data from JSON files. Please create an opimized schedule based on these JSON files maintaining the same format as the files",
        },
        {
          role: "user",
          content: userInput,
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Now response is directly the response object from OpenAI
    if (response.data.choices.length > 0 && response.data.choices[0].message) {
      const reply = response.data.choices[0].message.content;

      // Assuming you want to write the AI's reply to a file
      await mergeAndExportJSON(jsonFiles, outputPath, {
        optimizedSchedule: reply,
      });

      // Construct the URL for accessing the generated file (adjust as needed)
      const url = `${req.protocol}://${req.get("host")}/path/to/${outputPath
        .split("/")
        .pop()}`;

      // Send a combined response to the client
      res.json({
        message: "Optimized schedule created and saved.",
        url: url,
        reply: reply,
      });
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
// app.use(
//   "/favicon.ico",
//   express.static(path.join(__dirname, "public/icon/favicon.ico"))
// );

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

// Handle courses form submission to update courses.json
app.post("/submit/courses", async (req, res) => {
  try {
    const formData = req.body;

    // Update courses.json
    await updateJSON("courses", formData);

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating courses.json:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Handle exams form submission to update exams.json
app.post("/submit/exams", async (req, res) => {
  try {
    const formData = req.body;

    // Update exams.json
    await updateJSON("exams", formData);

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating exams.json:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Handle assignments form submission to update assignments.json
app.post("/submit/assignments", async (req, res) => {
  try {
    const formData = req.body;

    // Update assignments.json
    await updateJSON("assignments", formData);

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating assignments.json:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

async function updateJSON(fileName, newData) {
  const jsonFilePath = path.join(__dirname, "/public/json", `${fileName}.json`);

  try {
    let existingData = [];

    // Read existing JSON data
    try {
      const jsonData = await fs.readFile(jsonFilePath, "utf8");
      if (jsonData.trim() !== "") {
        existingData = JSON.parse(jsonData);
      }
    } catch (readError) {
      // If there's an error reading the file, log it but continue with an empty array
      console.error(`Error reading ${fileName}.json file:`, readError);
    }

    // Append new data to existing data array
    existingData.push(newData);

    // Write updated JSON data back to file
    await fs.writeFile(jsonFilePath, JSON.stringify(existingData, null, 2));

    console.log(`Added new data to ${fileName}.json`);
  } catch (error) {
    console.error(`Error updating ${fileName}.json file:`, error);
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
