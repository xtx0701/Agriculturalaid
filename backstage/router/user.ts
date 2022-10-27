import express from "express";
import { login, changeUserMessage, getMineMessage } from "../router_handler/user";

// 创建路由
const router: any = express.Router();
// 挂载接口
router.post("/login", login);
router.post("/changeUserMessage", changeUserMessage);
router.post("/getMineMessage", getMineMessage);
export default router;