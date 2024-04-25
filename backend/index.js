const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Leaderboard")
    .then(() => {
        console.log("Connected to mongodb://127.0.0.1:27017/SocialMediaDB");
        // populateTeams();
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

const teamSchema = new mongoose.Schema({
    rank: { type: Number },
    name: { type: String },
    gamesPlayed: { type: Number },
    score: { type: Number },
    image: { type: String }
});

const Team = mongoose.model("Team", teamSchema);

app.get("/", function (req, res) {
    res.send("Express Server is running on port 4000")
});

app.get("/getTeams", async (req, res) => {
    const teamsData = await Team.find({});
    //console.log(teamsData);

    if (teamsData) {
        res.status(200).send(teamsData);
    }
    else {
        res.status(400).send("Error Fetching Data");
    }
})

app.listen(4000, function () {
    console.log("Server is up and running on port 4000");
});


async function populateTeams() {
    try {
        const dummyTeams = [];
        for (let i = 1; i <= 20; i++) {
            dummyTeams.push({
                rank: i,
                name: `Team ${i}`,
                gamesPlayed: Math.floor(Math.random() * 100),
                score: Math.floor(Math.random() * 50000),
                image: `/assets/team${i}.png`
            });
        }

        await Team.insertMany(dummyTeams);
        console.log("Data inserted successfully");
    } catch (error) {
        console.error("Error populating teams:", error);
    }
}