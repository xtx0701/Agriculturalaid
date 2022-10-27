import db from '../db/index';
import config from "../config";
import jwt from "jsonwebtoken";

export const login = (req: any, res: any) => {
    const userInfo: UserModule.IUserInfo = req.body;
    db.query("select * from user where openid=?", userInfo.openid, (err: any, results: any) => {
        if (err) return res.status(500).json({ message: "登陆失败", err });
        const tokenStr = 'Bearer' + '' + jwt.sign(userInfo, config.jwtSecretKey, { expiresIn: '2h' });
        if (results.length > 0) return res.status(200).json({ tokenStr });
        else {
            db.query("insert into user set?", userInfo, (err: any, results: any) => {
                if (err) return res.status(500).json({ message: "注册失败", err });
                if (results.affectedRows !== 1) return res.status(500).json("注册失败");
                return res.status(200).json({ tokenStr });
            })
        }
    })
};

export const changeUserMessage = (req: any, res: any) => {
    const { name, value, openid }: { name: string, value: string, openid: string } = req.body;
    db.query(`update user set ${name}=? where openid=?`, [value, openid], (err: any, results: any) => {
        if (err) return res.status(500).json({ message: "修改失败", err });
        if (results.affectedRows !== 1) return res.status(500).json({ message: "修改失败" });
        return res.status(200).json({ message: "修改成功" });
    })
};

export const getMineMessage = (req: any, res: any) => {
    const { openid }: { openid: string } = req.body;
    db.query("select * from user where openid=?", [openid], (err: any, results: any) => {
        if (err) return res.status(500).json({ message: "查询失败", err });
        return res.status(200).json({ message: "查询成功", results: results[0] });
    })
}