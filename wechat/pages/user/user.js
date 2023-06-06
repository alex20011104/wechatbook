// pages/user/user.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    user:''
  },
  //获取个人信息
  async getuser(){
    let data ={
      user_id:this.data.userInfo.user_id
    }
    let result = await request('/getuser',data)
    this.setData({
      user:result.user[0]
    })
  },
  gotoUpdate(){
    wx.navigateTo({
      url: '/pages/updateuser/updateuser',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userInfo=wx.getStorageSync('userInfo');
    if(userInfo){
      this.setData({
        userInfo:JSON.parse(userInfo)
      })
    }
    // this.getuser()
    // console.log('1')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getuser()
    // console.log('2')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})