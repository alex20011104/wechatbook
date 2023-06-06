// pages/myscorebook/myscorebook.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:'',
    scorenovel:[]
  },
  //获取用户ID
  GetUserID(){
    let userInfo=wx.getStorageSync('userInfo');
    userInfo = JSON.parse(userInfo)
    if(userInfo){
      this.setData({
        user_id:userInfo.user_id,
      })
    }
  },
  async getscorenovel(){
    this.GetUserID()
    let data = {
      user_id : this.data.user_id
    }
    let result = await request('/getscorenovel',data)
    this.setData({
      scorenovel: result.scorenovel
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getscorenovel()
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