Page({


        data: {
                imgUrls: [
                        'https://desk-fd.zol-img.com.cn/t_s1440x900c5/g5/M00/02/01/ChMkJlbKxSGIYJepAAKvwTQNjKAAALHRQGrVIsAAq_Z430.jpg',
                        'https://desk-fd.zol-img.com.cn/t_s1440x900c5/g5/M00/02/01/ChMkJ1bKxSGIK4znAALeXYuluYYAALHRQGuBGQAAt51232.jpg',
                        'https://desk-fd.zol-img.com.cn/t_s1440x900c5/g5/M00/02/01/ChMkJlbKxSGIJDWQAAOa7FdiBKcAALHRQGw4tkAA5sE121.jpg'
                ],//轮播图数据
        },

        onLoad() {

        },


        onShow() {

        },

        goShopCar: function (): void {
                wx.switchTab({ url: "../car/index" });
        },
})