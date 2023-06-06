// pages/login/signup/signup.js
import request from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:'',
    password:'',
    username:'',
    age:'',
    gender:'',
  },
  userInput(event){
    let type= event.currentTarget.id;
    this.setData({
      [type]: event.detail.value
    })
  },
  async submit(){
    let data = {
      user_id:this.data.user_id,
      password:this.data.password,
      username:this.data.username,
      age:this.data.age,
      gender:this.data.gender,
    }
    await request('/signup',data)
    wx.showToast({
      title: '注册成功',
    })
    setTimeout(function() {
      wx.navigateTo({
        url: '/pages/login/login',
      });
    }, 1000); 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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