const cloud = require('wx-server-sdk')

cloud.init({ env: 'cloud1-4gl7hltw69979229' })

// 云函数入口函数
exports.main = async (event, context) => {
        return new Promise((resolve, reject) => {
                try {
                        const wxContext = cloud.getWXContext()
                        resolve(wxContext);
                } catch (err) {
                        throw err;
                }
        })
}