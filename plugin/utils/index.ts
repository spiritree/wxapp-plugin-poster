export interface IdrawRoundImage {
  // canvas实例
  ctx: wx.CanvasContext
  // 图片
  img: string
  // x坐标
  x: number
  // y坐标
  y: number
  // 半径
  r: number
}

export function drawRoundImage({ ctx, img, x, y, r }: IdrawRoundImage): void {
  ctx.save()
  let d = 2 * r
  let cx = x + r
  let cy = y + r
  ctx.fill()
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, 2 * Math.PI)
  ctx.closePath()
  ctx.clip()
  ctx.drawImage(img, x, y, d, d)
  ctx.restore()
}

export interface IfillMultiLineText {
  ctx: wx.CanvasContext
  x: number
  y: number
  maxWidth: number
  text: string
  bold: boolean
  fontSize: number
  // 下一行相对于上一行的额外路径
  paddingTop: number
  // 第一行的X坐标
  firstLineX: number
}

export function fillmultiLineText({
  ctx,
  x,
  y,
  maxWidth,
  text,
  bold = false,
  fontSize,
  paddingTop = 0,
  firstLineX
}: IfillMultiLineText) {
  let isSingle = true
  let finalHeight = 0
  if (firstLineX === undefined) firstLineX = x

  bold
    ? (ctx.font = `normal bold ${fontSize}px sans-serif`)
    : (ctx.font = `normal normal ${fontSize}px sans-serif`)

  let textArr = text.split('')
  let singleLine = ''
  let newTextArr = []
  for (let i = 0; i < textArr.length; i++) {
    let testLine = singleLine + textArr[i]
    let metrics = ctx.measureText(testLine).width
    if (metrics > maxWidth && i > 0) {
      newTextArr.push(singleLine)
      singleLine = textArr[i]
    } else {
      singleLine = testLine
    }
    if (i === textArr.length - 1) {
      newTextArr.push(singleLine)
    }
  }

  newTextArr.length === 1 ? (isSingle = true) : (isSingle = false)

  newTextArr.forEach((text, i) => {
    let textX = i === 0 ? firstLineX : x
    let textY = isSingle
      ? y + paddingTop
      : y + paddingTop + i * (Math.ceil(fontSize / 2) + fontSize)

    ctx.fillText(text, textX, textY)

    finalHeight =
      y + paddingTop + (i + 1) * (Math.ceil(fontSize / 2) + fontSize)
  })
  return finalHeight
}

export interface IroundRect {
  ctx: wx.CanvasContext
  x: number
  y: number
  width: number
  height: number
  r: number
  type: 'fill' | 'stroke'
  shape: { tl: boolean; tr: boolean; br: boolean; bl: boolean }
}

export function drawRoundRect({
  ctx,
  x,
  y,
  width,
  height,
  r,
  type = 'stroke',
  shape = { tl: true, tr: true, br: true, bl: true }
}: IroundRect) {
  let PI = Math.PI
  ctx.moveTo(x, y + r)
  ctx.beginPath()
  shape.tl ? ctx.arc(x + r, y + r, r, PI, 1.5 * PI) : ctx.arc(x, y, 0, 0, 0)
  shape.tr
    ? ctx.arc(x + width - r, y + r, r, 1.5 * PI, 2 * PI)
    : ctx.arc(x + width, y, 0, 0, 0)
  shape.br
    ? ctx.arc(x + width - r, y + height - r, r, 0, 0.5 * PI)
    : ctx.arc(x + width, y + height, 0, 0, 0)
  shape.bl
    ? ctx.arc(x + r, y + height - r, r, 0.5 * PI, PI)
    : ctx.arc(x, y + height, 0, 0, 0)
  ctx.closePath()
  const method = type // 默认描边，传入fill即可填充矩形
  ctx[method]()
}

export interface IfillText {
  ctx: wx.CanvasContext
  txt: string
  x: number
  y: number
  bold: boolean
  fontSize: number
  color: string
  returnWidth: boolean
}

/**
 * 画普通文字
 * @export fillText
 * @param {*} ctx
 * @param {*} x
 * @param {*} y
 * @param {*} width
 * @param {*} height
 * @param {*} bold
 * @param {*} fontSize
 * @param {*} color
 * @param {*} returnWidth
 */
export function fillText({
  ctx,
  txt,
  x,
  y,
  bold = false,
  fontSize,
  color,
  returnWidth = false
}: IfillText) {
  ctx.setFillStyle(color)
  let boldFlag = bold ? 'bold' : 'normal'
  ctx.font = `normal ${boldFlag} ${fontSize}px sans-serif`
  ctx.fillText(txt, x, y)
  if (returnWidth) {
    return ctx.measureText(txt).width
  }
}

/**
 * 画cover效果的背景图（IOS无效）
 * @export drawCoverImage
 * @param {*} ctx
 * @param {*} bg
 * @param {*} bgWidth
 * @param {*} bgHeight
 * @param {*} canvasWidth
 * @param {*} canvasHeight
 */
// export function drawCoverImage({
//   ctx,
//   bg,
//   bgWidth,
//   bgHeight,
//   canvasWidth,
//   canvasHeight
// }) {
//   const imageRatio = bgWidth / bgHeight
//   const canvasRatio = canvasWidth / canvasHeight
//   let sx, sy, sHeight, sWidth
//   if (imageRatio < canvasRatio) {
//     sWidth = bgWidth
//     sHeight = sWidth / canvasRatio
//     sx = 0
//     sy = (bgHeight - sHeight) / 2
//   } else {
//     sHeight = bgHeight
//     sWidth = bgHeight * canvasRatio
//     sy = 0
//     sx = (bgWidth - sWidth) / 2
//   }
//   ctx.drawImage(bg, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight)
// }
