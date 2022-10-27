Page({
        data: {
                isAllChose: false,//判断是否全选
                isDelete: false,//判断是否为编辑
                isNoGoods: false,//判断是否显示购物为空
                goodsNum: 0,//商品总价
                shopList: [
                        { isChose: false, name: "大凉山苹果 2022新鲜采摘", price: [34, 5], num: 1, imageUrl: "https://ts1.cn.mm.bing.net/th?id=OIP-C.ct8lqyu5nQ1q_anY6miS1wHaFz&w=176&h=170&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" },
                        { isChose: false, name: "大凉山苹果 2022新鲜采摘", price: [34, 5], num: 1, imageUrl: "https://ts1.cn.mm.bing.net/th?id=OIP-C.ct8lqyu5nQ1q_anY6miS1wHaFz&w=176&h=170&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" }
                ]//选择的商品数组
        },

        onLoad(_options) {

        },

        onShow() {

        },
        // 全选按钮事件
        chooseAll: function (): void {
                const { isAllChose, shopList }: { isAllChose: boolean, shopList: chooseList[] } = this.data;
                if (isAllChose) shopList.forEach((item: chooseList) => item.isChose = false);
                else shopList.forEach((item: chooseList) => item.isChose = true);
                this.setData({ isAllChose: !isAllChose, shopList });
        },
        // 选择商品
        choose: function (event: any): void {
                const { index }: { index: number } = event.target.dataset;
                let { isAllChose, shopList }: { isAllChose: boolean, shopList: chooseList[] } = this.data;
                // 改变当前商品状态
                shopList[index].isChose = !shopList[index].isChose;
                const result = shopList.every((item: chooseList) => item.isChose);
                if (result) isAllChose = true;
                else isAllChose = false;
                this.setData({ isAllChose, shopList });
        },
        // 开启关闭编辑状态
        changeDeleteAge: function (): void {
                this.setData({ isDelete: !this.data.isDelete });
        },
        // 无商品时点击返回首页
        goIndex: function () {
                wx.switchTab({ url: '../index/index' });
        }
})