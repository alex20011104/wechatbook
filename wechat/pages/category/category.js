// pages/category/category.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navId:0,
    novellist:[],
    categorylist:[]
  },

  //获取小说种类
  async category(){
    let result = await request('/categoryget')
    this.setData({
      categorylist:result,
      navId:result[0].category_id
    })
    this.catenovel()
  },
  //获取对应种类的小说
  async catenovel(){
    let data = {
      category_id: this.data.navId
    }
    console.log(typeof data.category_id,data)
    let result = await request('/catenovel',data) 
    this.setData({
      novellist:result
    })
  },
  //导航切换按钮的回调
  changeNav(event){
    let navId= event.currentTarget.id;
    this.setData({
      navId: navId*1
    })
    this.catenovel()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.category()
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