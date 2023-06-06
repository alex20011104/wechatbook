// pages/home/home.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booklist:[],
    cover_list:[]
  },

  //获取封面
  async getcover(){
    let result = await request('/noveltopics')
    this.setData({
      cover_list:result.cover_list
    })
  },
  gotosearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
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
  onLoad(options) {
    this.getcover()
    this.setData({
      query: options
    })
    this.getbookcity()
  },
  async getbookcity(){
    let result = await request("/newnovels")

    this.setData({
      booklist:result
    })
  },
  // getbookcity(){
  //   let limit = 15
  //   wx.request({
  //     url: `http://127.0.0.1:8000/allnovels/`,
  //     method:"GET",
  //     data:{
  //     },
  //     success:(res) => {
  //       this.setData({
  //         booklist: res.data,
  //       })
  //       booklist:[res.data],
  //       console.log(res)
  //     }
  //   })
  // },

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