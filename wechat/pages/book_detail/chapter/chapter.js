// pages/book_detail/chapter/chapter.js
import request from '../../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    novel_id:0,
    chapterlist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
   async onLoad(options) {
     this.setData({
       novel_id:options.id
     })
     let data = {
       novel_id:options.id,
     }
    let result = await request("/chapterGet",data) 
    this.setData({
      chapterlist:result.chapterlist
    })
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