// pages/search/search.js
import request from '../../utils/request'
let isSend = false;//定时器
let timerId = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input:'',
    novel_list:[]
  },
  //搜索框事件
  handleinput(event){ 
    this.setData({
      input:event.detail.value.trim()
    })
    if (timerId) {
      clearTimeout(timerId); 
    }
    timerId = setTimeout(async () => { 
      if(!this.data.input){
        this.setData({
          novel_list:[]
        })
        return;
      }
      let data = {
        novel_title: this.data.input 
      };
      let result = await request('/search', data); 
      this.setData({
        novel_list: result.novel 
      });
      timerId = null; 
    }, 300);
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