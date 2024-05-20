// watermark.js
function bind(el, binding) {
  // 获取水印文字
  const watermarkText = binding.value || "";
  watermark.set(watermarkText);
  // setWatermark(watermarkText);
}
function unbind(el) {
  // 清除事件监听
  watermark.remove();
}
let watermark = {};
let idd = Math.random(1,9999);
let setWatermark = (str, width, height,fontsize,opacity) => {
  let id = idd;
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id));
  }
  fontsize=fontsize||12;
  opacity=opacity||.1;
  //创建一个画布
  let can = document.createElement("canvas");
  //设置画布的长宽
  can.width = width || 600;
  can.height = height || 600;
  let cans = can.getContext("2d");
  //旋转角度
  cans.rotate((-25 * Math.PI) / 180);
  cans.font = fontsize+"px Vedana";
  //设置填充绘画的颜色、渐变或者模式
  cans.fillStyle = "rgba(200, 200, 200,"+opacity+")";
  //设置文本内容的当前对齐方式
  cans.textAlign = "left";
  //设置在绘制文本时使用的当前文本基线
  cans.textBaseline = "Middle";
  //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
  let items = (str || "").split("\n");
  for (let i = 0; i < items.length; i++) {
    let text = items[i];
    let w=0;
    let h=i*fontsize*2;
    cans.fillText(text, (can.width / 20)+w, (can.height / 4)+h);
  }
  let div = document.createElement("div");
  div.id = id;
  const styleStr = `
            position:fixed;
            visibility:visible !important;
            top:30px;
            width:${document.documentElement.clientWidth}px;
            height:${document.documentElement.clientHeight}px;
            left:0;
            z-index:100000;
            pointer-events:none;
            background:url('${can.toDataURL("image/png")}') left top repeat`;
  div.setAttribute("style", styleStr);
  div.style.width = document.documentElement.clientWidth + 'px';
  div.style.height = document.documentElement.clientHeight + 'px';
  document.body.appendChild(div);
  //此方法是防止用户通过控制台修改样式去除水印效果
  /* MutationObserver 是一个可以监听DOM结构变化的接口。 */
  
  
  // const observer = new MutationObserver(() => {
  //   const wmInstance = document.getElementById(id);
  //   if (
  //     (wmInstance && wmInstance.getAttribute("style") !== styleStr) ||
  //     !wmInstance
  //   ) {
  //     //如果标签在，只修改了属性，重新赋值属性
  //     // console.log("水印属性修改了")
  //     if (wmInstance) {
  //       // 避免一直触发
  //       observer.disconnect();
  //       console.log("水印属性修改了");
  //       wmInstance.setAttribute("style", styleStr);
  //     } else {
  //       /* 此处根据用户登录状态，判断是否终止监听，避免用户退出后登录页面仍然有水印 */
  //       if (store.state.user.token) {
  //         //标签被移除，重新添加标签
  //         // console.log('水印标签被移除了');
  //         document.body.appendChild(div);
  //       } else {
  //         observer.disconnect();
  //       }
  //     }
  //   }
  // });
  // observer.observe(document.body, {
  //   attributes: true,
  //   subtree: true,
  //   childList: true,
  // });
  return id;
};

// 该方法只允许调用一次
watermark.set = (str,width,height,fontsize) => {
  let id = setWatermark(str,width,height,fontsize);
  setInterval(() => {
    if (document.getElementById(id) === null) {
      id = setWatermark(str,width,height,fontsize);
    }
  }, 500);
  window.onresize = () => {
    setWatermark(str,width,height,fontsize);
  };
};
// 移除
const outWatermark = (id) => {
  if (document.getElementById(id) !== null) {
    const div = document.getElementById(id);
    div.style.display = "none";
  }
};

watermark.remove = () => {
  const str = idd;
  outWatermark(str);
};
// 将 watermark 的控制方法挂载到 window 对象上
window.watermark = watermark;
export default {
  watermark,
  bind,
  unbind,
};
