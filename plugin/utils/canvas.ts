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
  text: string
  x: number
  y: number
  maxWidth: number
  baseLine: 'top' | 'bottom' | 'middle' | 'normal'
  textAlign: 'left' | 'center' | 'right'
  fontStyle: 'normal' | 'italic' | 'oblique'
  fontWeight: 'normal' | 'bold'
  fontSize: number
  fontFamily: string
  color: string
  // 下一行相对于上一行的额外路径
  paddingTop: number
  // 第一行的X坐标
  firstLineX: number
}

export function fillmultiLineText({
  ctx,
  text,
  x,
  y,
  maxWidth,
  baseLine = 'top',
  textAlign = 'left',
  fontStyle = 'normal',
  fontWeight = 'normal',
  fontSize,
  fontFamily = 'sans-serif',
  color,
  paddingTop = 0,
  firstLineX
}: IfillMultiLineText) {
  ctx.save()

  let isSingle = true
  let finalY = 0
  if (firstLineX === undefined) firstLineX = x

  ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`
  ctx.setFillStyle(color)
  ctx.setTextBaseline(baseLine)
  ctx.setTextAlign(textAlign)

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

    finalY = y + paddingTop + (i + 1) * (Math.ceil(fontSize / 2) + fontSize)
  })
  ctx.restore()
  return finalY
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
  text: string
  x: number
  y: number
  baseLine: 'top' | 'bottom' | 'middle' | 'normal'
  textAlign: 'left' | 'center' | 'right'
  fontStyle: 'normal' | 'italic' | 'oblique'
  fontWeight: 'normal' | 'bold'
  fontSize: number
  fontFamily: string
  color: string
  returnWidth: boolean
}

export function fillText({
  ctx,
  text,
  x,
  y,
  baseLine = 'top',
  textAlign = 'left',
  fontStyle = 'normal',
  fontWeight = 'normal',
  fontSize,
  fontFamily = 'sans-serif',
  color,
  returnWidth = false
}: IfillText) {
  ctx.save()
  ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`
  ctx.setFillStyle(color)
  ctx.setTextBaseline(baseLine)
  ctx.setTextAlign(textAlign)
  ctx.fillText(text, x, y)
  ctx.restore()
  if (returnWidth) {
    return ctx.measureText(text).width
  }
}

export interface IdrawLine {
  ctx: wx.CanvasContext
  startX: number
  startY: number
  endX: number
  endY: number
  lineWidth: number
  color: string
}

export function drawLine({
  ctx,
  startX,
  startY,
  endX,
  endY,
  lineWidth,
  color
}: IdrawLine) {
  ctx.save()
  ctx.setStrokeStyle(color)
  ctx.setLineWidth(lineWidth)
  ctx.beginPath()
  ctx.moveTo(startX, startY)
  ctx.lineTo(endX, endY)
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}
