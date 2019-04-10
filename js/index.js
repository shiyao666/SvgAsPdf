function handleFileSelect(evt) {
  const $el = $('#filereader');
  const reader = new FileReader();
  $('.load-target').load('js/small1.svg', function () {
    svgAsPngUri($el.find('.load-target svg')[0], null, (uri, width, height) => {

      $el.find('.preview').html(
        '<div id="prety_good">' +
        '<img src="' + uri + '" /></div>'
      );
      var doc = new jsPDF('s', 'px', [width, height]);
      doc.addFont('zongyi-normal.ttf', 'zongyi', 'normal');
      doc.setFont('zongyi');
      var imageData = "" + uri + "";
      doc.setFontSize(20);
      doc.addImage(imageData, 'PNG', 0, 0, width, height);
      doc.text(100, 100, '尧哥');
      doc.save('book.pdf');
      NProgress.done();
      // 进度条结束
    });
  })



}
function as() {
  handleFileSelect();
  var ajax = new XMLHttpRequest();
  ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && ajax.status == 200) {

      // localStorage.setItem("name", JSON.parse(ajax.responseText.data.project_manager.name));
      // localStorage.setItem("user_code", JSON.parse(ajax.responseText.project_manager.usercode));
      // localStorage.setItem("is_pass", JSON.parse(ajax.responseText.project_manager.achievement));

    }
  }

  ajax.open("post", "http://192.168.60.175:666/certificate/data/test", false); //true异步请求，false同步
  var token = {
    token: "asfygwhjbe",
    type: "1,2,3"
  }
  // 第四步： send一个请求。 可以发送对象和字符串，不需要传递数据发送null
  ajax.send(JSON.stringify(token));

}
$(document).ready(function () {
  as();
})


// function inlineTest(title, $el, saveOptions, testOptions) {
//   const svg = $el.html();
//   const template = $('#inline-template').html();
//   const row = $el.html(template);
//   row.find('h2').text(title);
//   row.find('.canvas').html(svg);

//   const canvas = row.find(testOptions && testOptions.selector || 'svg')[0];
//   svgAsPngUri(canvas, saveOptions, (uri, width, height) => row.find('.preview').html(
//     '<div>' +
//     '<img src="' + uri + '" />' +
//     '<div>width=' + width + ', height=' + height + '</div>' +
//     '</div>'
//   ));

//   row.find('.save').click(() => saveSvgAsPng(canvas, 'test.png', saveOptions));
// }





// const $sandbox = $('#sandbox');
// $sandbox.find('.render').click(() => {
//   $sandbox.find('.error').hide().text('');
//   $sandbox.find('.load-target').html($('#sandbox textarea').val());
//   const canvas = $sandbox.find('.load-target svg')[0];
//   try {
//     svgAsPngUri(canvas, null, (uri, width, height) => $sandbox.find('.preview').html(
//       '<div>' +
//       '<img src="' + uri + '" />' +
//       '<div>width=' + width + ', height=' + height + '</div>' +
//       '</div>'
//     ));
//     $sandbox.find('.save').unbind('click').click(() => saveSvgAsPng(canvas, 'test.png'));
//   } catch (err) {
//     $sandbox.find('.error').show().text(err.message);
//     $sandbox.find('.preview').html('');
//   }
// });
