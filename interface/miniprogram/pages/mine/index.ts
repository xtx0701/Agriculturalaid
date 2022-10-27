import useUserHandler from "../../utils/useUserHandler";
Page({


        data: {
                mineOrderData: [
                        { name: "未付款", imageUrl: "../../images/mine_payNot.png" },
                        { name: "未发货", imageUrl: "../../images/mine_payHandle.png" },
                        { name: "已发货", imageUrl: "../../images/mine_paySuccess.png" },
                        { name: "全部订单", imageUrl: "../../images/mine_allPay.png" },
                ],
                mineOptionsData: [
                        { name: "购物车", imageUrl: "../../images/mine_shopCar.png", method: "goShopCar" },
                        { name: "收货地址", imageUrl: "../../images/mine_address.png", method: "" },
                        { name: "个人信息", imageUrl: "../../images/mine_message.png", method: "goMineMessage" },
                ],
                isLogin: false,
                userInfo: {}
        },

        onLoad() {
                if (wx.getStorageSync("userInfo")) {
                        const userInfo = wx.getStorageSync("userInfo");
                        this.setData({ isLogin: true, userInfo });
                }
        },

        onShow() {

        },
        // 跳转购物车
        goShopCar: (): void => {
                wx.switchTab({ url: "../car/index" });
        },

        // 用户登陆
        userLogin: async function (): Promise<void> {
                // 获取自定义hook
                const userHandler: IUserHandler = useUserHandler();
                // 请求接口判断是否已经注册
                wx.showLoading({ title: "登陆中" });
                try {
                        var { nickName, avatarUrl }: { nickName: string, avatarUrl: string }
                                = ((await wx.getUserProfile({ desc: "是否授权获取用户信息" }) as WechatMiniprogram.GetUserProfileSuccessCallbackResult).userInfo) as IGetUserProfileSuccessCallbackUserInfoResult;
                        var { OPENID }: { OPENID: string }
                                = ((await wx.cloud.callFunction({ name: "getUserOpenId" }) as ICloud.CallFunctionResult).result) as ICallFunctionUserIdResult;
                } catch (err: (any | unknown)) {
                        throw Error(err);
                }
                // 获取登陆令牌
                const { tokenStr } = await userHandler.userLogin({ nickName, avatarUrl, openid: OPENID });
                // 登陆成功后存储用户信息
                wx.setStorageSync("userInfo", { nickName, avatarUrl });
                wx.setStorageSync("openid", OPENID);
                wx.setStorageSync("tokenStr", tokenStr);
                this.setData({ isLogin: true, userInfo: { nickName, avatarUrl } });
                wx.hideLoading();
        },
        signOut: function (): void {
                // 询问是否退出登陆
                wx.showModal({
                        content: "是否退出登陆",
                        success: (res: any) => {
                                // 选择确定后清除用户信息
                                if (res.confirm) {
                                        wx.showLoading({ title: "退出登陆中" });
                                        wx.removeStorageSync("userInfo");
                                        wx.removeStorageSync("userBillData");
                                        wx.removeStorageSync("tokenStr");
                                        this.setData({ isLogin: false });
                                        wx.hideLoading();
                                        wx.showToast({ title: "退出登陆成功", icon: "success" });
                                }
                        }
                })

        },
        // 跳转个人信息
        goMineMessage: function (): void {
                wx.navigateTo({ url: "../mineMessage/index" })
        }
})