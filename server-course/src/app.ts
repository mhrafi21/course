/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: ['http://localhost:5173', "https://client-course-3f7odohh2-mahdihasanrafis-projects.vercel.app/"],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"],
        allowedHeaders: ['Content-Type', 'Authorization'],

    }));

// application routes
app.use('/api', router);


app.get("/", (req, res) => {
    res.status(200).json({ message: "Success", data: "Welcome to the API" });
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
