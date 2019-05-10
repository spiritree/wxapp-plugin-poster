"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function drawRoundImage(_a) {
    var ctx = _a.ctx, img = _a.img, x = _a.x, y = _a.y, r = _a.r;
    ctx.save();
    var d = 2 * r;
    var cx = x + r;
    var cy = y + r;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, x, y, d, d);
    ctx.restore();
}
exports.drawRoundImage = drawRoundImage;
function fillmultiLineText(_a) {
    var ctx = _a.ctx, text = _a.text, x = _a.x, y = _a.y, maxWidth = _a.maxWidth, _b = _a.baseLine, baseLine = _b === void 0 ? 'top' : _b, _c = _a.textAlign, textAlign = _c === void 0 ? 'left' : _c, _d = _a.fontStyle, fontStyle = _d === void 0 ? 'normal' : _d, _e = _a.fontWeight, fontWeight = _e === void 0 ? 'normal' : _e, fontSize = _a.fontSize, _f = _a.fontFamily, fontFamily = _f === void 0 ? 'sans-serif' : _f, color = _a.color, _g = _a.paddingTop, paddingTop = _g === void 0 ? 0 : _g, firstLineX = _a.firstLineX;
    ctx.save();
    var isSingle = true;
    var finalY = 0;
    if (firstLineX === undefined)
        firstLineX = x;
    ctx.font = fontStyle + " " + fontWeight + " " + fontSize + "px " + fontFamily;
    ctx.setFillStyle(color);
    ctx.setTextBaseline(baseLine);
    ctx.setTextAlign(textAlign);
    var textArr = text.split('');
    var singleLine = '';
    var newTextArr = [];
    for (var i = 0; i < textArr.length; i++) {
        var testLine = singleLine + textArr[i];
        var metrics = ctx.measureText(testLine).width;
        if (metrics > maxWidth && i > 0) {
            newTextArr.push(singleLine);
            singleLine = textArr[i];
        }
        else {
            singleLine = testLine;
        }
        if (i === textArr.length - 1) {
            newTextArr.push(singleLine);
        }
    }
    newTextArr.length === 1 ? (isSingle = true) : (isSingle = false);
    newTextArr.forEach(function (text, i) {
        var textX = i === 0 ? firstLineX : x;
        var textY = isSingle
            ? y + paddingTop
            : y + paddingTop + i * (Math.ceil(fontSize / 2) + fontSize);
        ctx.fillText(text, textX, textY);
        finalY = y + paddingTop + (i + 1) * (Math.ceil(fontSize / 2) + fontSize);
    });
    ctx.restore();
    return finalY;
}
exports.fillmultiLineText = fillmultiLineText;
function drawRoundRect(_a) {
    var ctx = _a.ctx, x = _a.x, y = _a.y, width = _a.width, height = _a.height, r = _a.r, _b = _a.type, type = _b === void 0 ? 'stroke' : _b, _c = _a.shape, shape = _c === void 0 ? { tl: true, tr: true, br: true, bl: true } : _c;
    var PI = Math.PI;
    ctx.moveTo(x, y + r);
    ctx.beginPath();
    shape.tl ? ctx.arc(x + r, y + r, r, PI, 1.5 * PI) : ctx.arc(x, y, 0, 0, 0);
    shape.tr
        ? ctx.arc(x + width - r, y + r, r, 1.5 * PI, 2 * PI)
        : ctx.arc(x + width, y, 0, 0, 0);
    shape.br
        ? ctx.arc(x + width - r, y + height - r, r, 0, 0.5 * PI)
        : ctx.arc(x + width, y + height, 0, 0, 0);
    shape.bl
        ? ctx.arc(x + r, y + height - r, r, 0.5 * PI, PI)
        : ctx.arc(x, y + height, 0, 0, 0);
    ctx.closePath();
    var method = type;
    ctx[method]();
}
exports.drawRoundRect = drawRoundRect;
function fillText(_a) {
    var ctx = _a.ctx, text = _a.text, x = _a.x, y = _a.y, _b = _a.baseLine, baseLine = _b === void 0 ? 'top' : _b, _c = _a.textAlign, textAlign = _c === void 0 ? 'left' : _c, _d = _a.fontStyle, fontStyle = _d === void 0 ? 'normal' : _d, _e = _a.fontWeight, fontWeight = _e === void 0 ? 'normal' : _e, fontSize = _a.fontSize, _f = _a.fontFamily, fontFamily = _f === void 0 ? 'sans-serif' : _f, color = _a.color, _g = _a.returnWidth, returnWidth = _g === void 0 ? false : _g;
    ctx.save();
    ctx.font = fontStyle + " " + fontWeight + " " + fontSize + "px " + fontFamily;
    ctx.setFillStyle(color);
    ctx.setTextBaseline(baseLine);
    ctx.setTextAlign(textAlign);
    ctx.fillText(text, x, y);
    ctx.restore();
    if (returnWidth) {
        return ctx.measureText(text).width;
    }
}
exports.fillText = fillText;
function drawLine(_a) {
    var ctx = _a.ctx, startX = _a.startX, startY = _a.startY, endX = _a.endX, endY = _a.endY, lineWidth = _a.lineWidth, color = _a.color;
    ctx.save();
    ctx.setStrokeStyle(color);
    ctx.setLineWidth(lineWidth);
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}
exports.drawLine = drawLine;
