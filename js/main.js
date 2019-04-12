$(document).ready(function () {
    // 调用接口
    var api_list = {
        get_doc_meta: "http://192.168.60.175:666/certificate/data/get_doc_meta",
        get_doc_data: "http://192.168.60.175:666/certificate/data/get_one_user_data",
    }
    // js加载列表项
    var jsload_list = {
        doc_data: true,
        doc_meta: true,
        jspdf: true,
        saveSvgAsPng: true,
        fontsource: true,
        svg: true,
    };
    var doc_meta;
    var doc_data;

    var doc_meta_temp = {
        doc_name: "中软培训证书",
        // 请求svg数据 url
        doc_bg_svg_uri: "src/csst_cert.svg",
        data_templete: [
            { valuename: "docid", postiton: { x: 55, y: 40 }, size: 15, sub: "证书编号:" },
            { valuename: "name", postiton: { x: 200, y: 750 }, size: 60 },
            { valuename: "starttime", postiton: { x: 240, y: 840 }, size: 30 },
            { valuename: "endtime", postiton: { x: 690, y: 840 }, size: 30 },
            { valuename: "course", postiton: { x: 350, y: 1095 }, size: 30 },
            { valuename: "teacher", postiton: { x: 340, y: 1240 }, size: 30 },
        ]
    };
    var doc_meta_temp2 = {
        doc_name: "集成项目经理证书",
        // 请求svg数据 url
        doc_bg_svg_uri: "src/npm_cert.svg",
        data_templete: [
            { valuename: "docid", postiton: { x: 55, y: 40 }, size: 15, sub: "证书编号:" },
            { valuename: "name", postiton: { x: 200, y: 750 }, size: 60 },
            { valuename: "starttime", postiton: { x: 240, y: 840 }, size: 30 },
            { valuename: "endtime", postiton: { x: 690, y: 840 }, size: 30 },
            { valuename: "course", postiton: { x: 350, y: 1095 }, size: 30 },
            { valuename: "teacher", postiton: { x: 340, y: 1240 }, size: 30 },
        ]
    };
    // function arr_out(arr) {
    //     for (var index in arr) {
    //         return arr[index]++;
    //     };
    // };
    var doc_data_request_temp = {
        "doctype": "doc1",
        "docid": "1",
        "token": "agweogjweo",
        "identity": '372924198011293016'
    };

    var doc_data_temp = {
        docid: "1",
        name: "张三",
        starttime: "2018年1月1日",
        endtime: "2018年1月2日",
        course: "项目管理",
    }

    function add_download_event() {

        $(".down_pdf").click(function (e) {
            NProgress.start();
            jsload_list.item = 0;
            docid = $(this).data("downloadpdf");
            createpdf(docid);
        });

    }

    function createpdf(id) {

        if (jsload_list.doc_data) {
            $.ajax({
                type: 'POST',
                url: api_list.get_doc_data,
                datType: 'json',
                data: {
                    docid: id,
                },
                async: false,
                success: function (event) {
                    console.log("ajax_requst success id:" + id);
                    jsload_list.doc_data = false;
                    if (event.error == 0) {
                        doc_data = event;
                    } else {
                        console.log(event.msg);
                        doc_data = doc_data_temp;
                    }
                    return;
                },
                error: function () {
                    console.log("ajax_requst fail id:" + id);
                    jsload_list.doc_data = false;
                    doc_data = doc_data_temp;
                }
            });
        }

        if (jsload_list.doc_meta) {
            $.ajax({
                type: 'POST',
                url: api_list.get_doc_meta,
                datType: 'json',
                data: {
                    docid: $(this).data("downloadpdf"),
                },
                async: false,
                success: function (event) {
                    jsload_list.doc_meta = false;
                    if (event.error == 0) {
                        doc_meta = event;
                    } else {
                        console.log(event.msg);
                        doc_meta = doc_meta_temp;
                    }
                    return;
                },
                error: function () {
                    jsload_list.doc_meta = false;
                    doc_meta = doc_meta_temp;
                }
            });
        }

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
            $('.load-target').load(doc_meta.doc_bg_svg_uri, function () {
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
            // 循环 doc_meta.data_templete
            doc_meta.data_templete.forEach(element => {
                doc.setFontSize(element.size || 30);
                doc.text(element.postiton.x, element.postiton.y, (element.sub || '') + (doc_data[element.valuename] || ' '));
            });

            doc.save(doc_meta.doc_name + '.pdf');
            // 生成成功
            // 导出pdf
            NProgress.done();
            // 进度条结束
        });
    }

})





