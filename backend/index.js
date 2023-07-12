import express from 'express';
import userRouter from './routes/users.js'
import postRouter from './routes/post.js'
// import todoRouter from './routes/todo.js'
import connectDB from './utils/connectDB.js';
import authRouter from './routes/auth.js'
import regRouter from './routes/reg.js'
import msgRouter from './routes/mysubgreddit.js'
import sgRouter from './routes/subgreddit.js'
import rpRouter from './routes/report.js'
// import cors from 'cors';

const app  = express();

connectDB();

app.use(express.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');
    next();
  });
  
app.use('/api/users', userRouter);
app.use('/api/post', postRouter);
// app.use('/api/todo', todoRouter);
app.use('/api/auth', authRouter);
app.use('/api/register', regRouter);
app.use('/api/mysubgreddit', msgRouter);
app.use('/api/subgreddit', sgRouter);
app.use('/api/report', rpRouter);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});