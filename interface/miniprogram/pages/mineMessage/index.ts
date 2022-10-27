import useUserHandler from "../../utils/useUserHandler"
Page({


        data: {
                mineMessage: [],
                isChangeName: false,
                isShowInput: false,
        },


        onLoad() {
                // 进入页面请求用户信息
                this.getMineMessage();
        },


        onShow() {

        },

        // 获取用户的个人信息
        getMineMessage: async function (): Promise<void> {
                // 获取openid
                const openid = wx.getStorageSync("openid");
                // 创建自定义hook
                const userHandler = useUserHandler();
                // 获取信息
                const mineMessage = await userHandler.getMineMessage(openid);
                this.setData({ mineMessage });
        },

        openInput: function () {
                this.setData({ isShowInput: !this.data.isShowInput })
        },

        changeUserName: function (event: any) {
                this.changeMessageGeneralMethods("name", event.detail);
                this.setData({ isShowInput: false });
        },

        // 更改性别
        changeUserGender: async function () {
                // 获取用户选项
                const result = await wx.showActionSheet({ itemList: ["男", "女"] });
                // 根据序号赋值
                const gender = result.tapIndex === 0 ? "男" : "女";
                // 请求接口修改信息
                this.changeMessageGeneralMethods("gender", gender);
        },

        // 更改生日、地区
        changePicker: async function (event: any): Promise<void> {
                // 获取用户选项
                let value = event.detail.value;
                // 如果是日期则进行拼接
                if (event.target.dataset.name === "region") value = event.detail.value.join(" ");
                // 请求接口修改信息
                this.changeMessageGeneralMethods(event.currentTarget.dataset.name, event.detail.value);

        },

        // 修改信息通用请求方法
        changeMessageGeneralMethods: async function (name: string, value: string) {
                // 提示框
                wx.showLoading({ title: "更改中" });
                // 创建自定义hook
                const userHandler = useUserHandler();
                // 获取openid
                const openid: string = wx.getStorageSync("openid");
                // 请求接口进行修改
                const result = await userHandler.changeUserMessage({ openid, name, value });
                // 根据反馈来弹框提示
                if (result.statusCode === 200) {
                        wx.showToast({ title: "修改成功", icon: "success" });
                        this.getMineMessage();
                }
                else wx.showToast({ title: "修改失败", icon: "error" });
                wx.hideLoading();
        }
})