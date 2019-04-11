$(document).ready(function () {
    var jsload_list = {
        jspdf: true,
        saveSvgAsPng: true,
        fontsource: true,
        svg: true,
    }
    var doctemp = {
        docname: "中软培训证书",
        // 请求svg数据 url
        docbguri: "src/soft2",
        datatemp: [
            { valuename: "docid", postiton: { x: 55, y: 40 }, size: 15, sub: "证书编号:" },
            { valuename: "name", postiton: { x: 200, y: 750 }, size: 60 },
            { valuename: "starttime", postiton: { x: 240, y: 840 }, size: 30 },
            { valuename: "endtime", postiton: { x: 690, y: 840 }, size: 30 },
            { valuename: "course", postiton: { x: 350, y: 1095 }, size: 30 },
            { valuename: "teacher", postiton: { x: 340, y: 1240 }, size: 30 },
        ]
    };
    // function load_js(jsname,jsurl, callback) {
    //     if (jsload_list[jsname]) {
    //         console.log("已加载"+jsname);
    //         callback();
    //     } else {
    //         console.log("开始加载"+jsname);
    //         $.getScript(jsurl,callback());
    //         jsload_list[jsname] = 1;
    //         console.log(jsload_list);
    //     };
    // }

    $("#down_pdf").click(function () {
        NProgress.start();
        // load_js("jspdf","js/jspdf.min.js",function(){
        //     NProgress.set(0.5);
        //     load_js("saveSvgAsPng","js/saveSvgAsPng.js",function(){
        //         NProgress.inc();
        //         load_js("zongyi","js/zongyi-normal.js",function(){
        //             createpdf();
        //         })
        //     })
        // });
        createpdf();
        // $.getScript("js/jspdf.min.js", function () {
        //     // jsload_list.jspdf = 1;
        //     //加载进度条
        //     //加载jspdf包 判断是否添加
        //     NProgress.start();
        //     $.getScript("js/saveSvgAsPng.js", function () {
        //         // jsload_list.saveSvgAsPng = 1;
        //         NProgress.set(0.5);
        //         //加载savesvgtopng 判断是否添加
        //         $.getScript("js/zongyi-normal.js", function () {
        //             // jsload_list.zongyi = 1;
        //             //加载证书META信息
        //         });
        //     });
        // });

    })

    function createpdf() {
        if (jsload_list.jspdf) {
            $.getScript("js/jspdf.min.js", function () {
                jsload_list.jspdf = false
                console.log("加载pdf完成");
                NProgress.set(0.4);
                createpdf();
            });
            return;
        };

        if (jsload_list.saveSvgAsPng) {
            $.getScript("js/saveSvgAsPng.js", function () {
                jsload_list.saveSvgAsPng = false
                console.log("加载saveSvgAsPng完成");
                NProgress.set(0.2);
                createpdf();
            });
            return;
        };

        if (jsload_list.svg) {
            $('.load-target').load(doctemp.docbguri, function () {
                jsload_list.svg = false
                console.log("加载svg完成");
                NProgress.set(0.1);
                createpdf();
            });
            return;
        }

        if (jsload_list.fontsource) {
            $.getScript("js/SIMYOU-normal.js", function () {
                jsload_list.fontsource = false
                console.log("加载字体完成");
                NProgress.inc(0.2);
                createpdf();
            });
            return;
        }



        var docrequest = {
            doctype: "doc1",
            docid: "1",
            token: "agweogjweo",
        };
        var resp = {
            docid: "1",
            name: "张三",
            starttime: "2018年1月1日",
            endtime: "2018年1月2日",
            course: "项目管理",
        }


        $.ajax({
            type: 'POST',
            url: 'http://192.168.60.175:666/certificate/data/test',
            datType: 'json',
            data: {
                docrequest
            },
            async: false,
            success: function (event) {
                resp = event;
                return;
            },
            fail: function () {
            }
        });

        
        var $svg = $('.load-target svg')[0];
        svgAsPngUri($svg, { scale: 1 / (window.devicePixelRatio || 1) }, (uri, width, height) => {
            //开始生成pdf
            var doc = new jsPDF('p', 'pt', [width, height]);
            // 根据json数据添加文字到pdf
            var imageData = "" + uri + "";
            // 转png
            doc.addImage(imageData, 'PNG', 0, 0, width, height);
            //加载字体包 判断是否添加
            doc.addFont('SIMYOU-normal.ttf', 'SIMYOU', 'normal');
            doc.setFont('SIMYOU');
            //循环 doctemp.datatemp
            doctemp.datatemp.forEach(element => {
                doc.setFontSize(element.size || 30);
                doc.text(element.postiton.x, element.postiton.y, (element.sub || '') + (resp[element.valuename] || ' '));
            });

            doc.save(doctemp.docname + '.pdf');
            // // 生成成功
            // // 导出pdf
            NProgress.done();
            // 进度条结束
        });
    }

})





