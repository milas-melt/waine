// express server handling api request coming in and response back with JSOn object, using body parser and corse
require("dotenv").config();
const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-74UZmc6eelGAYrAIJ6Fkb6Zn",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `You are an AI powered sommelier. Answer as if a customer at a restaurant asking you to select a wine for their meal.
        Sommelier: What meal are you ordering?

        Customer: Oysters

        Sommelier: Whether it’s the fossilised remains of oysters that can be found in the soil of the Chablis region or simply the severe steely dryness of the wine, there are few purer, more reliable combinations than oysters and Chablis. My own preference is for native oysters, totally unadorned with lemon, shallot vinegar or any other condiment, and young premier cru Chablis.
        Other good options with oysters: Muscadet de Sèvre-et-Maine, Picpoul de Pinet
        
        Customer: ${message}
        
        Sommelier:`,
        max_tokens: 100,
        temperature: 0,
    });

    console.log(response.data);

    // if (response.data) {
    //     if (response.data.choices) {
    //         res.json({
    //             message: response.data.choices[0].text,
    //         });
    //     }
    // }
    if (response.data.choices[0].text) {
        res.json({ message: response.data.choices[0].text });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
