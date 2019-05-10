import { drawRoundImage, fillText, fillmultiLineText } from '../../utils/canvas'

const avatar =
  'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erYOFcEd4wPsUogoJgAPB90GuGDtKe3U4awXonGxh0VTbXHa1lZNoAo3QZKM8xrrFyaiaceW3ImBdQ/132'

Component({
  data: {
    // canvasWidth: 300,
    // canvasHeight: 300,
    imgFile: '',
    showCanvas: true,
    posterConfig: {
      designWidth: 270,
      designHeight: 480,
      blocks: [{}],
      texts: [
        {
          text: '深树',
          x: 66,
          y: 169,
          fontSize: 13,
          color: '#687583'
        },
        {
          text: '邀请你一起打卡·一起进步',
          x: 66,
          y: 185,
          fontSize: 10,
          color: '#95A1AF'
        }
      ],
      images: [
        {
          width: 270,
          height: 480,
          x: 0,
          y: 0,
          url: 'https://i.loli.net/2019/05/09/5cd43062c7f92.png'
        },
        {
          width: 30,
          height: 30,
          x: 27,
          y: 170,
          url: avatar,
          borderRadius: 15
        }
      ]
    }
  },

  created() {
    const systemInfo = wx.getSystemInfoSync()
    this.setData(
      {
        canvasWidth: systemInfo.screenWidth,
        canvasHeight: systemInfo.screenHeight
      },
      () => {
        this.init()
      }
    )
  },

  methods: {
    preloadImages(images) {
      const loadList = images.map(item => this.getImageTempPath(item))
      return Promise.all(loadList)
    },

    init() {
      const { canvasWidth, canvasHeight, posterConfig } = this.data
      const canvasId = 'poster-canvas'
      const ctx = wx.createCanvasContext(canvasId, this)
      const {
        texts = [],
        images = [],
        lines = [],
        designWidth = 375,
        designHeight = 667
      } = posterConfig
      this.preloadImages(images).then(() => {
        const rWidth = canvasWidth / designWidth
        const rHeight = canvasHeight / designHeight
        ctx.scale(rWidth, rHeight)
        console.log(images)
        images.forEach(item => {
          ctx.save()
          ctx.drawImage(item.path, item.x, item.y, item.width, item.height)
          ctx.restore()
        })
        ctx.draw(false, () => {}, this)
      })
    },

    getImageTempPath(image) {
      return new Promise((resolve, reject) => {
        if (image.url === '') {
          reject(new Error('no image url'))
        }
        wx.getImageInfo({
          src: image.url,
          success(res) {
            image.path = res.path
            resolve()
          },
          fail(err) {
            reject(err)
          }
        })
      })
    },

    canvas2tempFile() {
      wx.canvasToTempFilePath(
        {
          canvasId: 'poster-canvas',
          success(res) {
            this.triggerEvent('success', res.tempFilePath)
          },
          fail(err) {
            this.triggerEvent('fail', err)
          }
        },
        this
      )
    }
  }
})
