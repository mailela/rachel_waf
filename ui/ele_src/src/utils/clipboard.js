const copy = (text) => {
  return new Promise((resolve, reject) => {
    const textArea = document.createElement("textarea");
    textArea.style.position = "fixed";
    textArea.style.visibility = "-10000px";
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    if (!document.execCommand("copy")) {
      console.warn('浏览器不支持 document.execCommand("copy")');
      // 复制失败将构造的标签 移除
      document.body;
      resolve("浏览器不支持",false)
    } else {
      console.log("复制成功");
      // 复制成功后再将构造的标签 移除
      document.body.removeChild(textArea);
      resolve("复制成功",true)
    }
  });
};

export default copy;
