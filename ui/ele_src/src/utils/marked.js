// 解析markdown语法为html
export function parse(markdownContent) {
  if (!markdownContent) {
    return "";
  }
  // 处理标题
  markdownContent = markdownContent.replace(/^#\s(.*)$/gm, "<h1>$1</h1>");
  markdownContent = markdownContent.replace(/^##\s(.*)$/gm, "<h2>$1</h2>");
  markdownContent = markdownContent.replace(/^###\s(.*)$/gm, "<h3>$1</h3>");
  markdownContent = markdownContent.replace(/^####\s(.*)$/gm, "<h4>$1</h4>");
  markdownContent = markdownContent.replace(/^#####\s(.*)$/gm, "<h5>$1</h5>");
  markdownContent = markdownContent.replace(/^######\s(.*)$/gm, "<h6>$1</h6>");

  // 处理加粗、斜体、删除线
  markdownContent = markdownContent.replace(
    /\*\*(.*)\*\*/gm,
    "<strong>$1</strong>"
  );
  markdownContent = markdownContent.replace(
    /__(.*)__/gm,
    "<strong>$1</strong>"
  );
  markdownContent = markdownContent.replace(/\*(.*)\*/gm, "<em>$1</em>");
  markdownContent = markdownContent.replace(/_(.*)_/gm, "<em>$1</em>");
  markdownContent = markdownContent.replace(/~~(.*)~~/gm, "<del>$1</del>");

  // 处理链接和图片
  markdownContent = markdownContent.replace(
    /\[(.*?)\]\((.*?)\)/gm,
    '<a href="$2" target="_blank" rel="external nofollow" ><font color="#ff6600">$1</font></a>'
  );
  markdownContent = markdownContent.replace(
    /!\[(.*?)\]\((.*?)\)/gm,
    '<img src="$2" alt="$1">'
  );

  // 处理行内代码和代码块
  markdownContent = markdownContent.replace(/`(.*?)`/gm, "<code>$1</code>");
  markdownContent = markdownContent.replace(
    /```([\s\S]*?)```/gm,
    "<pre>$1</pre>"
  );

  // 处理换行
  markdownContent = markdownContent.replace(/\n/g, "<br>");

  return markdownContent;
}
