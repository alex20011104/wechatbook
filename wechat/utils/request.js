import config from './config';

export default (url, data = {}, method = 'GET', header = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      method,
      header: {
        ...header,
        'content-type': method === 'POST' ? 'application/x-www-form-urlencoded' : 'application/json',
      },
      success: (res) => {
        console.log('请求成功', res.data);
        resolve(res.data);
      },
      fail: (err) => {
        console.log('请求失败', err);
        reject(err);
      },
    });
  });
};



// import config from './config'
// export default (url,data={},method='GET') => {
//  return new Promise((resolve,reject) =>{
//   wx.request({
//     url:config.host+url,
//     data,
//     method,
//     success:(res) => {
//       console.log('请求成功',res);
//       resolve(res.data);
//     },
//     fail : (err) =>{
//       console.log('请求失败',err);
//       reject(err);
//     }
//   })
//  })
// }