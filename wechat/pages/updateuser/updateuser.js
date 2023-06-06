// pages/signup/signup.js
import request from '../../utils/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    user:'',
    username:'',
    password:'',
    gender:'',
    age:''
  },
  userInput(event){
    let type = event.currentTarget.dataset.type;
    this.setData({
      [type]: event.detail.value
    })
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
  async submit(){ 
    let data={
      user_id:this.data.userInfo.user_id,
      username:this.data.username,
      password:this.data.password,
      gender:this.data.gender,
      age:this.data.age
    }
    console.log(this.data.userInfo.user_id)
    let result = await request('/update_user',data)
    if(result.status == 200){
      wx.showToast({
        title: '修改成功'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userInfo=wx.getStorageSync('userInfo');
    userInfo = JSON.parse(userInfo)
    if(userInfo){
      this.setData({
        userInfo:userInfo,
        username:userInfo.username,
        password:userInfo.password,
        gender:userInfo.gender,
        age:userInfo.age
      })
    }
    this.getuser()
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