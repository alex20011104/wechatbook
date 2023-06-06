// pages/book_detail/book_detail.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grade:0,
    scorebtn:false,
    inputValue:'',//输入框评论
    user_id:'',
    username:'',
    novel_id:1,
    // timestamp:'',//评论提交时间
    comment_list:[],
    favorite:0 ,//收藏状态
    booklist:'',
    score:null,
    mygrade:0
  },
  // 评论输入框
  onInputChange(e) {
    let type = e.currentTarget.id
    console.log(type)
    this.setData({
      [type]: e.detail.value.trim(),
    });
    console.log(this.data.inputValue)
    console.log(typeof this.data.score)
  },

  // 评论提交按钮
  async onSubmit() {
    const comment = this.data.inputValue;
    if (comment.trim()) {
      // 在这里处理提交评论的逻辑
      // this.setData({
      //   timestamp: new Date().getTime(),
      // });
      // console.log("提交的评论:", this.data.timestamp,this.data.inputValue);
      let data={
        user_id:this.data.user_id,
        novel_id:this.data.novel_id,
        comment:this.data.inputValue,
        // timestamp:this.data.timestamp
      }
      console.log(data); // 在发送请求之前检查数据对象
      let result = await request('/commentup/',data,'POST')
      let newComment = {
        username: this.data.username,
        comment_content: comment,
      };
      let comment_list = this.data.comment_list
      comment_list.push(newComment)
      this.setData({
        inputValue:'',
        comment_list:comment_list
      })
    } else {
      wx.showToast({
        title: "评论内容不能为空",
        icon: "none",
      });
    }
    
    
  },
  //立即阅读
  async read(){
    let data = {
      user_id:  this.data.user_id,
      novel_id: this.data.novel_id
    }
    let result = await request('/read',data)
    let lastchapter_id = result.historyread.lastchapter_id
    wx.navigateTo({
      url: '/pages/content/content?id=' + lastchapter_id,
    })
  },
  //点击评分按钮
  score(){
    this.setData({
      scorebtn : !this.data.scorebtn
    }) 
  },
  //提交评分按钮
  async onScore(){
    let score = this.data.score; 
    if (score == '' || !(/^[1-9]$|^10$/.test(score))) { // 判断评分是否为 1-10 的整数
      wx.showToast({
        title: '请输入1-10的整数评分',
        icon: 'none',
        duration: 2000,
      });
      return;
    }
    let data ={
      user_id: this.data.user_id,
      novel_id: this.data.novel_id,
      score : this.data.score*1
    }
    await request('/scoreup',data)
    wx.showToast({
      title: '评分提交成功',
    })
  },

  // 点击收藏按钮
  async favorite(){
    this.setData({
      favorite: this.data.favorite === 0 ? 1 : 0,
    })
    let data={
      user_id:this.data.user_id,
      novel_id:this.data.novel_id,
      favorite:this.data.favorite
    }
    let result = await request('/favorite/',data,'POST')
  },
  //获取用户ID
  GetUserID(){
    let userInfo=wx.getStorageSync('userInfo');
    userInfo = JSON.parse(userInfo)
    if(userInfo){
      this.setData({
        user_id:userInfo.user_id,
        username:userInfo.username
      })
    }
  },
  // 获取小说ID，发送请求获取评论信息
  async GetNovelID(){
    let data1={
      novel_id:this.data.novel_id
    }
    let result = await request('/comment',data1)
    this.setData({
      comment_list:result.comment
    })
  },
  //获取小说信息
  async GetNovel(){
    let data={
      novel_id: this.data.novel_id
    }
    let result = await request('/novel_get',data)
    this.setData({
      booklist:result.novel
    })
  },
  //获取小说评分 
  async Getgrade(){
    let data={
      novel_id: this.data.novel_id
    }
    let result = await request('/getgrade',data)
    this.setData({
      grade: result.grade
    })
  },

  //获取我的评分 
  async Getmygrade(){
    let data={
      user_id : this.data.user_id,
      novel_id: this.data.novel_id
    }
    let result = await request('/getmygrade',data)
    this.setData({
      mygrade: result.mygrade
    })
  },

  //获取收藏信息，发送请求获取收藏信息
  async favoriteget(){
    let data={
      user_id:this.data.user_id,
      novel_id:this.data.novel_id
    }
    let result = await request('/favoriteget',data)
    let favorite = result.favorite
    this.setData({
      favorite:favorite
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取书籍ID
    this.setData({
      novel_id:options.id,
    })
    //获取用户ID,本地储存
    this.GetUserID()
    // 获取小说ID，发送请求获取评论信息
    this.GetNovelID()
    //获取收藏信息，发送请求获取收藏信息
    this.favoriteget()
    //获取小说信息
    this.GetNovel()
    //获取评分
    this.Getgrade()
    //获取我的评分
    this.Getmygrade()
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