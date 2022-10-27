const useUserHandler = (): IUserHandler => {
    const userLogin = (userInfo: IUserHandlerParameter): Promise<{ tokenStr: string }> => {
        return new Promise((resolve: any, reject: any) => {
            wx.request({
                method: "POST",
                url: "http://localhost:8000/user/login",
                data: { ...userInfo },
                success: (res: any) => {
                    resolve(res.data);
                },
                fail: (err: any) => reject(err)
            }) as WechatMiniprogram.RequestTask;
        });
    };
    const changeUserMessage = (data: { openid: string, name: string, value: string }): Promise<any> => {
        return new Promise((resolve: any, reject: any) => {
            wx.request({
                method: "POST",
                url: "http://localhost:8000/user/changeUserMessage",
                data: { ...data },
                success: (res: any) => resolve(res),
                fail: (err: any) => reject(err)
            }) as WechatMiniprogram.RequestTask;
        });
    };
    const getMineMessage = (openid: string): Promise<any> => {
        return new Promise((resolve: any, reject: any) => {
            wx.request({
                method: "POST",
                url: "http://localhost:8000/user/getMineMessage",
                data: { openid },
                success: (res: any) => resolve(res.data.results),
                fail: (err: any) => reject(err)
            }) as WechatMiniprogram.RequestTask;
        });
    }
    return { userLogin, changeUserMessage, getMineMessage }
}

export default useUserHandler;