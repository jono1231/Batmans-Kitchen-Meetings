// Some code stolen from https://github.com/dimasma0305/CTF-XSS-BOT

const express = require("express")
const path = require("path")
var cors = require('cors')
const app = express();
const route = express.Router()
const bot = require("./bot")

const port = process.env.PORT || 5000;

if (process.env.USE_PROXY){
    app.set('trust proxy', () => true)
}

app.use(express.urlencoded({ extended: false }))
app.use(cors())

route.post("/report", async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).send({ error: "Url is missing." });
    }
    if (!RegExp(bot.urlRegex).test(url)) {
        return res.status(422).send({ error: "URL must start with " + bot.urlRegex})
    }
    if (await bot.bot(url)) {
        return res.send({ success: "Admin successfully visited the URL." });
    } else {
        return res.status(500).send({ error: "Admin failed to visit the URL." });
    }
});

route.get("/", (_, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.use("/", route)

app.listen(port, () => {
    console.log("Server running at " + process.env.URL + ":" + port);
});
