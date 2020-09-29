import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
/**
 * 导出图片
 * @param el 需要转成图片的HTML元素
 * @param type 导出图片类型，'PDF'|'PNG'
 * @param name 导出图片名称
 */
export function htmlElementToImage(
  el: HTMLElement,
  type: 'PDF' | 'PNG' = 'PDF',
  name: string = 'download'
): Promise<HTMLCanvasElement> {
  return html2canvas(el).then((canvas) => {
    const img = canvas.toDataURL('image/png', 1.0);
    if (type === 'PDF') {
      const pdf = new jsPDF({
        unit: 'pt',
        format: 'a4',
      });

      const contentWidth = canvas.width;
      const contentHeight = canvas.height;
      // 一页pdf显示html页面生成的canvas高度;
      const pageHeight = (contentWidth / 592.28) * 841.89;
      // 未生成pdf的html页面高度
      let leftHeight = contentHeight;
      // 页面偏移
      let position = 0;
      // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      const pdfImgWidth = 595.28;
      const pdfImgHeight = (592.28 / contentWidth) * contentHeight;

      // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      // 当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        pdf.addImage(img, 'PNG', 0, 0, pdfImgWidth, pdfImgHeight);
      } else {
        while (leftHeight > 0) {
          pdf.addImage(img, 'PNG', 0, position, pdfImgWidth, pdfImgHeight);
          leftHeight -= pageHeight;
          position -= 841.89;
          // 避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage();
          }
        }
      }
      pdf.save(`${name}.pdf`);
    } else if (type === 'PNG') {
      const link = document.createElement('a');
      link.href = img;
      link.download = `${name}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
    return canvas;
  });
}
