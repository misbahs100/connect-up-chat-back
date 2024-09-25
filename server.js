const express = require("express");
const dotenv = require("dotenv");
const connectionDB = require("./config/db");
const userRoutes = require("./routes/user.routes")
const chatRoutes = require("./routes/chat.routes")
const messageRoutes = require("./routes/message.routes")

const cors = require('cors');

const app = express();
dotenv.config();
connectionDB();
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    console.log("welcome to chat app");
})

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

const port = process.env.PORT || 8001
const server = app.listen(port, console.log("server is running at post = ", port));

const io = require("socket.io")(server, {
    cors: {
        origin: "https://connect-up-chat.netlify.app", 
    },
});

io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected")
    })

    socket.on("join chat", (room) => {
        socket.join(room)

    })

    socket.on("new message", (newMessageRec) => {
        var chat = newMessageRec.chat;
        if (!chat.users) return console.log("chat user not defined");

        chat.users.forEach(user => {
            if (user != newMessageRec.sender._id) {
                socket.in(user).emit("message received", newMessageRec);
            }
        });
    });



});