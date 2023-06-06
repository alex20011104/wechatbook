// pages/login/login.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:'',
    password:''
  },
  gotosignup(){
    wx.navigateTo({
      url: '/pages/login/signup/signup',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  //表单项发生变化
  handleinput(event){
    let type= event.currentTarget.id;
    console.log(type,event.detail.value);
    this.setData({
      [type]: event.detail.value
    })
  },
  //登录的回调
  async login(){
    let{user_id,password} = this.data
    //前端验证
    if(!user_id){
      wx.showToast({
        title: '账号不能为空',
        icon:"none"
      })
      return;
    }
    //账号为6位验证
    // let phoneReg=/^\d{6}$/
    // if(!phoneReg.test(user_id)){
    //   wx.showToast({
    //     title: '账号应为6位',
    //     icon:"none"
    //   })
    //   return;
    // }
    //密码验证
    if(!password){
      wx.showToast({
        title: '密码不能为空',
        icon:"none"
      })
      return;
    }
    
    //后端验证
    let result = await request('/login',{user_id,password})
    
    if(result.status == 200){
      wx.showToast({
        title: '登录成功'
      })
      //将用户信息存储自本地
      wx.setStorageSync('userInfo', JSON.stringify(result.user))
      //跳转个人中心页面
      wx.reLaunch({
        url: '/pages/message/message'
      })
      
    }else if(result.status == 400){
      wx.showToast({
        title: '用户名或密码错误',
      })
    }
      else if(result.status == 500){
        wx.showToast({
          title: '用户不存在',
        })
      }
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