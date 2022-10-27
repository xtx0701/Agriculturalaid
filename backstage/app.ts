import express from 'express';
import cors from 'cors'
const { expressjwt: expressJWT } = require('express-jwt');
import config from './config';
import userRouter from './router/user';

const app: any = express();
// 跨域中间件
app.use(cors());
// 解析json格式数据中间件
app.use(express.json());

app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/user/, /^\/check/] }));

// 全局错误中间件
app.use((err: any, _req: any, res: any, next: any) => {
    if (err.name === "UnauthorizedError") return res.status(500).json({ meg: "身份验证失败", err });
    res.send(err);
    next();
})

app.use("/user", userRouter);

// 运行于8000端口
app.listen(8000, () => console.log("Server running"));

