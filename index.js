import express from "express"
import { dirname } from "path"
import { fileURLToPath } from "url"


const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", __dirname + "/Views")

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


function isWeekend (req, res, next) {
    const d = new Date();
let day = weekday[d.getDay()];
if (day === "Sunday" || day === "Saturday") {
    req.currentDay = "the weekend, it's time to have fun!";
} else {
    req.currentDay = "a weekday, it's time to work hard!";
}
next();
}

app.get("/", isWeekend, (req, res) => {
    res.render("index.ejs", {
        day: req.currentDay
    });
});

app.listen(port, () => {
    console.log(`Running on ${port}`)
})

