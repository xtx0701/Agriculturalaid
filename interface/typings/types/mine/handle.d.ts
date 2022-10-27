interface IUserHandler {
    userLogin: (userInfo: IUserHandlerParameter) => Promise<{ tokenStr: string }>,
    changeUserMessage: (data: { openid: string, name: string, value: string }) => Promise<any>,
    getMineMessage: (openid: string) => Promise<any>
}

interface ICallFunctionUserIdResult {
    OPENID: string
}

interface IGetUserProfileSuccessCallbackUserInfoResult {
    nickName: string,
    avatarUrl: string
}