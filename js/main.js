
// 添加 data-downloadpdf 元素的下载事件
$(document).ready(function () {
    $("#down_pdf").click(function () {
        $.getScript("js/jspdf.min.js", function () {
            //加载进度条
            //加载jspdf包 判断是否添加
            NProgress.start();
            $.getScript("src/saveSvgAsPng.js", function () {
                NProgress.set(0.5);
                //加载savesvgtopng 判断是否添加
                $.getScript("src/zongyi-normal.js", function () {
                    NProgress.inc();
                    //加载字体包 判断是否添加
                    $.getScript("js/index.js", function () {
                        //请求json数据
                        //开始生成pdf
                        // 转png
                        // 根据json数据添加文字到pdf
                        // 生成成功
                        // 导出pdf
                       
                    });
                });
            });
        });

    })

})




//加载字体包 判断是否添加
//请求json数据
//请求svg数据 url

//开始生成pdf
// 转png
// png生成底图到pdf
// 根据json数据添加文字到pdf
// 生成成功
// 导出pdf

// 进度条结束


