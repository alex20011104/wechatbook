// pages/content/content.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapter_id:0,
    content:'',
    chapter_title:'',
    novel_id:0,
    user_id:0,
    font: '',
    color:'',
    showOptions: false
  },
  
  showOptions: function () {
    this.setData({
      showOptions: !this.data.showOptions
    });
  },
  changeFont(e) {
    let type = e.currentTarget.id
    this.setData({
      font: type
    });
    console.log(this.data.font)
  },
  
  
  changeBackground(e) {
    // 处理修改背景颜色的逻辑
    let type = e.currentTarget.id
    this.setData({
      color: type
    });
    console.log(this.data.color)
  },
  //回到首页
  gotohome(){
    wx.switchTab({
      url: '/pages/home/home',
    })
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
  //下一章按钮
  next(){
    const nextChapterId = Number(this.data.chapter_id) + 1;
    wx.navigateTo({
      url: '/pages/content/content?id=' + nextChapterId,
    });
  },
  //发送请求获取小说内容
  async getcontent(){
    let data = {
      chapter_id : this.data.chapter_id
    }
    let result = await request('/contentGet', data)
    let formattedContent = result.chapter.content.replace(/ {2}/g, '\n').split('\n').map(line => '      ' + line).join('\n\n')
    this.setData({
      chapter_title: result.chapter.chapter_title,
      content: formattedContent,
      novel_id: result.chapter.novel_id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.GetUserID()
    this.setData({
      chapter_id:options.id
    })
    this.getcontent()
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
  // 提交用户阅读记录
  async historyup(){
    let data = {
      novel_id: this.data.novel_id,
      user_id: this.data.user_id,
      lastchapter_id : this.data.chapter_id
    }
    await request('/historyup',data)
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
    this.historyup()
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