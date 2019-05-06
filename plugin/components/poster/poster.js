Component({
  data: {
    canvasWidth: '',
    canvasHeight: '',
    imgFile: '',
    showCanvas: true
  },
  created() {
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      canvasWidth: systemInfo.screenWidth,
      canvasHeight: systemInfo.screenHeight
    })
  },
  methods: {
    getImageLocalPath(urlArr) {
      return Promise.all(
        urlArr.map((url, i) => {
          return new Promise((resolve, reject) => {
            if (url === '') {
              reject(new Error(`getImageLocalPath : ${url} fail`))
              this.hide()
              Toast('下载图片失败，请重试')
            }
            wx.getImageInfo({
              src: url,
              success: res => {
                resolve(res)
              },
              fail: e => {
                reject(new Error(`getImageLocalPath : ${url} fail`))
                this.hide()
                Toast('下载图片失败，请重试')
              }
            })
          })
        })
      )
    },

    saveCanvas() {
      wx.canvasToTempFilePath(
        {
          canvasId: 'poster-canvas',
          quality: 1,
          success: res => {
            this.setData({
              imgFile: res.tempFilePath
            })
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: res => {
                this.triggerEvent('success', res.tempFilePath)
              },
              fail: err => {
                this.triggerEvent('fail', err)
              }
            })
          }
        },
        this
      )
    }
  }
})
