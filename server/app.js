import express from "express";
import cors from "cors";
import { createServer } from "http";
// import { Socket } from "socket.io";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import * as http from "http";
import postRoutes from "./routes/posts.js";
import { Server } from "socket.io";
import webSockets from "./socket/index.js";

//Added by upu
// import connectDB from './db/connect.js';
import authenticateUser from "./middleware/authentication.js";
// routers
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import jobsRouter from "./routes/jobs.js";
import groupsRouter from "./routes/group.js";
import sectorsRouter from "./routes/sector.js";
import groupUsersRouter from "./routes/groupUser.js";
import groupSectorsRouter from "./routes/groupSector.js";
import dataStatsRouter from "./routes/dataStat.js";
import notificationsRouter from "./routes/notification.js";
import scheduleRouter from "./routes/schedule.js";
import chatRouter from "./routes/chat.js";
import fileRouter from "./routes/file.js";
import assignmentRouter from "./routes/assignmentRouter.js";
import reportRouter from "./routes/reportRouter.js";
import checkPlagiarismRouter from "./routes/checkPlagiarism.js";

// error handler
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import compression from "compression";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

import { getMyGroup } from "./controllers/group.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

//Added by upu end

const app = express();

const httpServer = http.createServer(app);
const router = express.Router();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  webSockets(io, socket);
});

app.use(compression());
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(fileUpload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//io
const PORT = process.env.PORT || 8080;

// routes
app.use("/posts", postRoutes);
app.use("/users", authRoutes);

app.use("/api/users", userRouter);
app.use("/api/group", groupsRouter);
app.use("/api/sector", sectorsRouter);
app.use("/api/groupusers", groupUsersRouter);
app.use("/api/groupsectors", groupSectorsRouter);
app.use("/api/datastats", dataStatsRouter);

app.use("/api/notification", notificationsRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/chat", chatRouter);
app.use("/api/chat", chatRouter);
app.use("/api/file", fileRouter);
app.use("/api/assignment", assignmentRouter);
app.use("/api/report", reportRouter);

app.use("/api/checkplagiarism", checkPlagiarismRouter);
app.use("/posts", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const CONNECTION_URL =
  "mongodb+srv://user1:wXrS4OTbpg9DzsxV@cluster0.4mjii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    httpServer.listen(PORT, () => {
      console.log("hosted on " + 8080);
    })
  )
  .catch((error) => console.log(`${error} did not connect`));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
