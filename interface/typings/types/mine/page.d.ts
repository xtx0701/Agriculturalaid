// 首页
interface IIndexData {
    imgUrls: string[];
}

// 购物车页面
interface ICarData {
    isAllChose: boolean;
    isDelete: boolean;
    isNoGoods: boolean;
    goodsNum: number;
    chooseList: number[]
}

interface chooseList {
    isChose: boolean;
    name: string;
    price: number[];
    num: number;
    imageUrl: string;
}

// 个人中心
interface IUserHandlerParameter {
    nickName: string, avatarUrl: string, openid: string
}