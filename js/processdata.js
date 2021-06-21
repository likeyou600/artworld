$(function() {

    var searchURL = window.location.search;
    searchURL = searchURL.split('?');
    var all = searchURL[1].split('&');

    var now_site = all[0].split("=")[1];
    if (now_site == 'map' || now_site == 'search') {
        if (all[1]) {
            var categoryid = all[1].split("=")[1].split(",");
        }
        if (all[2]) {
            var position = all[2].split("=")[1];
        }
        if (all[3]) {
            var searchingname = decodeURI(all[3].split("=")[1]);
        }
        if (all[4]) {
            var urlstarttime = all[4].split("=")[1];
        }
        if (all[5]) {
            var urlendtime = all[5].split("=")[1];
        }
    }
    if (now_site == 'details') {
        if (all[1]) {
            var now_UID = all[1].split("=")[1];
        }
    }

    var taiwan_en = ["taipei", "keelung", "newtaipei", "taoyuan", "hsinchu", "miaoli", "taichung", "nantou", "changhua", "yunlin", "chiayi", "tainan", "kaohsiung", "pingtung", "yilan", "hualien", "taitung"];
    var taiwan = ["臺北", "基隆", "新北", "桃園", "新竹", "苗栗", "臺中", "南投", "彰化", "雲林", "嘉義", "臺南", "高雄", "屏東", "宜蘭", "花蓮", "臺東"];
    var category = ["音樂", "表演", "親子", "展演", "電影", "競賽", "其他"];
    var now_category;
    var categoryyy = [1, 2, 4, 6, 8, 13, 15];
    if (now_site == "map") {
        var c_c = 0;
        for (c_c; c_c < 7; c_c++) {
            if (categoryid[0] == categoryyy[c_c]) {
                $("#button" + (c_c + 1)).css("background-color", "#ffc107");
                now_category = category[c_c];
                break;
            }
        }

        for (let t_c = 0; t_c < taiwan_en.length; t_c++) {
            $("#" + taiwan_en[t_c]).click(function() {
                $("#" + taiwan_en[t_c]).css("fill", "#ffc107");
                var now = window.location.search.split("&");
                window.location.href = now[0] + '&' + now[1] + "&position=" + t_c;
            });
        }
    }


    //撈json資料
    var openUrl = "	https://bakerychu.ddns.net/artworld/material/SearchShowAction.json";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", openUrl, true);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {

            var data = JSON.parse(this.responseText);

            //如果現在網站是詳細資料
            if (now_site == 'details') {
                var now_selectdata = [];
                $.each(data, function(i, v) {
                    if (data[i].UID == now_UID) { //用UID去檢索
                        now_selectdata = data[i];
                        return false;
                    }

                });

                //將詳細資料輸出在網頁上
                $("#name").text(now_selectdata.title);
                $("#position").text(now_selectdata.showInfo[0].location.substring(0, 2));
                $("#site_name").text(now_selectdata.showInfo[0].locationName);
                $("#site").text(now_selectdata.showInfo[0].location);

                $("#time").text(now_selectdata.startDate + "~" + now_selectdata.endDate);

                if (now_selectdata.showInfo[0].onSales == 'Y') { var sale = now_selectdata.showInfo[0].price; } else { var sale = '免費性質'; }

                $("#sale").text(sale);

                $("#showUnit").text(now_selectdata.showUnit);

                if (now_selectdata.sourceWebPromote != '') {
                    $("#urlsite").html("<a href=" + "'" + now_selectdata.sourceWebPromote + "'" + ">點擊前往</a>");
                } else {
                    $("#urlsite").text("沒有相關網址");

                }


                $("#descri").text(now_selectdata.descriptionFilterHtml);
                //將詳細資料輸出在網頁上


            }
            //如果現在網站是詳細資料


            //如果現在網站是搜尋

            if (now_site == 'search') {
                //根據目前檢索的內容更新網址
                $("#searchnew").click(function() {
                    var s = '';
                    $("[name=searchcategory]:checkbox:checked").each(function() {
                        s += $(this).val() + ',';
                    });
                    var searchposition = $('#searchposition option:selected').val()
                    var searchname = document.getElementById("searchname").value;
                    var starttime = document.getElementById("searchtimefrom").value;
                    var endtime = document.getElementById("searchtimeto").value;
                    if (Date.parse(starttime) > Date.parse(endtime)) {
                        var temp = endtime;
                        endtime = starttime;
                        starttime = temp;
                    }
                    window.location.href = "search.html?site=search&category=" + s + "&position=" + searchposition + "&name=" + searchname + "&startime=" + starttime + "&endtime=" + endtime;
                });
                //根據目前檢索的內容更新網址

                //檢索網址 更新在頁面上
                if (all[2]) {
                    $('#searchposition').val(position);
                }

                if (all[3]) {
                    $('#searchname').val(searchingname);
                }

                if (all[4]) {
                    $('#searchtimefrom').val(urlstarttime);
                }
                if (all[5]) {
                    $('#searchtimeto').val(urlendtime);
                }
                //檢索網址 更新在頁面上

                //檢索網址 更新選取種類
                if (all[1]) {
                    let cccc = 0
                    while (cccc < categoryid.length) {
                        switch (categoryid[cccc]) {
                            case "1":
                            case "5":
                            case "17":
                                document.getElementById("checkbox2000").checked = false;
                                document.getElementById("checkbox0").checked = true;
                                break;
                            case "2":
                            case "3":
                            case "11":
                                document.getElementById("checkbox2000").checked = false;
                                document.getElementById("checkbox1").checked = true;
                                break;
                            case "4":
                                document.getElementById("checkbox2000").checked = false;
                                document.getElementById("checkbox2").checked = true;
                                break;
                            case "6":
                            case "7":
                            case "200":
                                document.getElementById("checkbox2000").checked = false;
                                document.getElementById("checkbox3").checked = true;
                                break;
                            case "8":
                                document.getElementById("checkbox2000").checked = false;
                                document.getElementById("checkbox4").checked = true;
                                break;
                            case "13":
                            case "14":
                                document.getElementById("checkbox2000").checked = false;
                                document.getElementById("checkbox5").checked = true;
                                break;
                            case "15":
                                document.getElementById("checkbox2000").checked = false;
                                document.getElementById("checkbox6").checked = true;
                                break;
                        }
                        cccc++
                    }
                }
                //檢索網址 更新選取種類






                //如果有種類 檢索JSON檔裡面的資料
                if (all[1]) {
                    let filterdata_count = 0;
                    var filterdata = [];
                    var i = 0;
                    var now = Date.parse(new Date().toDateString());
                    if (categoryid[0] == 2000) {
                        categoryid = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 17, 200];
                    }
                    while (i < data.length) {
                        for (categoryid_c = 0; categoryid_c < categoryid.length; categoryid_c++) {
                            if (data[i].category == categoryid[categoryid_c]) {
                                var start = Date.parse(data[i].startDate);
                                var end = Date.parse(data[i].endDate);

                                var checkstart = now - 2628000000;
                                var checkstart2 = now + 2628000000;
                                if (urlendtime == '') {

                                    if (urlstarttime) {
                                        checkstart = Date.parse(urlstarttime);
                                        if (
                                            end >= now && //結束日大於今天
                                            start >= checkstart
                                        ) {
                                            filterdata[filterdata_count] = data[i];
                                            filterdata_count++;
                                        }
                                    } else {
                                        if (
                                            end >= now && //結束日大於今天
                                            start >= checkstart &&
                                            start <= checkstart2
                                        ) {
                                            filterdata[filterdata_count] = data[i];
                                            filterdata_count++;
                                        }
                                    }
                                } else {
                                    checkend = Date.parse(urlendtime);
                                    if (urlstarttime) {
                                        checkstart = Date.parse(urlstarttime);
                                        if (
                                            end <= checkend &&
                                            start >= checkstart
                                        ) {
                                            filterdata[filterdata_count] = data[i];
                                            filterdata_count++;
                                        }
                                    } else {
                                        if (
                                            end <= checkend && //結束日大於enddate
                                            start > checkstart &&
                                            start < checkstart2
                                        ) {
                                            filterdata[filterdata_count] = data[i];
                                            filterdata_count++;
                                        }
                                    }
                                }


                            }
                        }
                        i++;
                    }
                    //依時間排序
                    function comp(a, b) {
                        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
                    }
                    filterdata.sort(comp);

                    if (position) {
                        var newposidata = [];
                        let nposi_c = 0;
                        let filter_c = 0;
                        let posi_c = 0;
                        if (position == 1000) {
                            for (filter_c; filter_c < filterdata.length; filter_c++) {
                                for (posi_c = 0; posi_c < 17; posi_c++) {
                                    if (filterdata[filter_c].showInfo[0].location.substring(0, 2) == taiwan[posi_c]) {

                                        newposidata[nposi_c] = filterdata[filter_c];
                                        nposi_c++;
                                    }
                                }
                            }
                        } else {
                            for (filter_c; filter_c < filterdata.length; filter_c++) {
                                if (filterdata[filter_c].showInfo[0].location.substring(0, 2) == taiwan[position]) {

                                    newposidata[nposi_c] = filterdata[filter_c];
                                    nposi_c++;
                                }
                            }
                        }
                        filterdata = newposidata;
                    }
                    //如果有名稱 去JSON搜尋名稱
                    if (searchingname) {
                        let name_c = 0
                        var newnamedata = [];
                        let newnamedata_c = 0;
                        for (name_c; name_c < filterdata.length; name_c++) {
                            if (filterdata[name_c].title.includes(searchingname)) {

                                newnamedata[newnamedata_c] = filterdata[name_c];
                                newnamedata_c++;
                            }
                        }
                        filterdata = newnamedata;
                    }
                    //如果有名稱 去JSON搜尋名稱

                    let fi = 0;
                    var filterdata_category;
                    while (fi < filterdata.length) {

                        switch (filterdata[fi].category) {
                            case "1":
                            case "5":
                            case "17":
                                filterdata_category = "音樂";
                                break;
                            case "2":
                            case "3":
                            case "11":
                                filterdata_category = "表演";
                                break;
                            case "4":
                                filterdata_category = "親子";
                                break;
                            case "6":
                            case "7":
                            case "200":
                                filterdata_category = "展演";
                                break;
                            case "8":
                                filterdata_category = "電影";
                                break;
                            case "13":
                            case "14":
                                filterdata_category = "競賽";
                                break;
                            case "15":
                                filterdata_category = "其他";
                                break;
                        }

                        show += "<tr>                    <th scope=row data-th=" + "序號" + ">" + (fi + 1) + "</th>                    <td data-th=" + "類別" + ">" + filterdata_category + "</td>                    <td data-th=" + "日期" + ">" + filterdata[fi].startDate + "~" + filterdata[fi].endDate + "</td>                    <td data-th=" + "活動名稱" + ">" + "<a href=" + "'" + "javascript:void(0)" + "'" + "onclick=changetodetail('" + filterdata[fi].UID + "')" + ">" + filterdata[fi].title + "</a>" + "</td>                    <td data-th=" + "縣市" + ">" + filterdata[fi].showInfo[0].location.substring(0, 3) + "</td>                    <td data-th=" + "地點" + ">" + filterdata[fi].showInfo[0].locationName + "</td>+<td data-th=" + "地址" + ">" + filterdata[fi].showInfo[0].location + "</td>                 </tr>";
                        fi++;

                    }
                    //最後在TABLE輸出
                    if (show == null) {
                        $("#tableshow").html("<tr>                    <th scope=row>無</th>                    <td>無</td>                    <td>無</td>                    <td>無</td>                    <td>無</td>                    <td>無</td>                  </tr>");
                    }
                    //最後在TABLE輸出
                    $("#tableshow").html(show);
                }
                // 
            }
            //如果現在網站是搜尋



            //如果現在網站是地圖

            if (now_site == 'map') {
                //(1開始) 根據 categoryid[] 長度  先對全部資料篩選 再依 結束日大於今天、開始日在今天前後7天 排序  存入filterdata[]
                var now = Date.parse(new Date().toDateString());
                let filterdata_count = 0;
                var filterdata = [];
                var i = 0;
                while (i < data.length) {
                    for (categoryid_c = 0; categoryid_c < categoryid.length; categoryid_c++) {
                        if (data[i].category == categoryid[categoryid_c]) {
                            var start = Date.parse(data[i].startDate);
                            var end = Date.parse(data[i].endDate);
                            if (
                                end > now &&
                                start < now + 604800000 &&
                                start > now - 604800000
                            ) {
                                filterdata[filterdata_count] = data[i];
                                filterdata_count++;
                            }
                        }
                    }
                    i++;
                }
                //(1結束) 根據 categoryid[] 長度  先對全部資料篩選 再依 結束日大於今天、開始日在今天前後7天 排序  存入filterdata[]



                //(2開始) filterdata[] 依照.startDate 降幕排序
                function comp(a, b) {
                    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
                }
                filterdata.sort(comp);
                //(2結束) filterdata[] 依照.startDate 降幕排序





                //(3開始) 創立新的東西南北陣列  從filterdata[]裡的.showInfo[0].location.substring(0, 2) 遍歷搜尋 如果縣市名稱是那方位的 就存入新方位陣列
                var north_filterdata = [];
                var west_filterdata = [];
                var east_filterdata = [];
                var south_filterdata = [];
                var area = ["north_filterdata", "west_filterdata", "east_filterdata", "south_filterdata"];
                let fi = 0,
                    n_c = 0,
                    w_c = 0,
                    e_c = 0,
                    s_c = 0;

                while (fi < filterdata.length) {
                    var fd = filterdata[fi].showInfo[0].location.substring(0, 2);
                    switch (fd) {
                        case "臺北":
                        case "新北":
                        case "基隆":
                        case "新竹":
                        case "桃園":
                        case "宜蘭":
                            north_filterdata[n_c] = filterdata[fi];
                            n_c++;
                            break;

                        case "臺中":
                        case "苗栗":
                        case "彰化":
                        case "南投":
                        case "雲林":
                            west_filterdata[w_c] = filterdata[fi];
                            w_c++;
                            break;

                        case "花蓮":
                        case "臺東":
                            east_filterdata[e_c] = filterdata[fi];
                            e_c++;
                            break;

                        case "高雄":
                        case "臺南":
                        case "嘉義":
                        case "屏東":
                        case "澎湖":
                            south_filterdata[s_c] = filterdata[fi];
                            s_c++;
                            break;

                        default:
                            break;
                    };



                    fi++;
                }
                //(3結束) 創立新的東西南北陣列  從filterdata[]裡的.showInfo[0].location.substring(0, 2) 遍歷搜尋 如果縣市名稱是那方位的 就存入新方位陣列
                var cssfi = 0;

                while (cssfi < filterdata.length) {
                    var css_c = 0;
                    for (css_c; css_c < taiwan_en.length; css_c++) {
                        if (filterdata[cssfi].showInfo[0].location.substring(0, 2) == taiwan[css_c]) {
                            $("#" + taiwan_en[css_c]).css("fill", "#4b94e2");
                            break;
                        }
                    }
                    cssfi++;
                }
                $("#" + taiwan_en[position]).css("fill", "#ffc107");

                //(4開始) 將東西南北陣列[0](最新消息) 顯示在4個card上面       
                var newposidata = [];

                function show(infor) {
                    let card_c = 0;
                    if (infor == area) {
                        document.getElementById("myselect").innerHTML = '您選擇的類型是:' + '<p class="myselect">' + now_category + '</p>';
                        for (card_c; card_c < 4; card_c++) {
                            if (eval(infor[card_c]).length != 0) {
                                // eval(infor[card_c])[0].UID
                                document.getElementById("img" + (card_c + 1)).src = eval(infor[card_c])[0].imageUrl;
                                document.getElementById("card" + (card_c + 1) + "_title").innerHTML = "【" + eval(infor[card_c])[0].showInfo[0].location.substring(0, 3) + "-" + eval(infor[card_c])[0].showInfo[0].location.substring(3, 6) + "】 " + eval(infor[card_c])[0].title + '<br>' + "活動日期:" + eval(infor[card_c])[0].startDate + "~" + eval(infor[card_c])[0].endDate;
                                $("#card" + (card_c + 1) + "_value").attr('onclick', 'changetodetail(' + "'" + eval(infor[card_c])[0].UID + "'" + ')');

                                // document.getElementById("card"+(card_c+1)+"_text").innerHTML="活動介紹:"+eval(infor[card_c])[0].descriptionFilterHtml;

                            } else {
                                document.getElementById("card" + (card_c + 1) + "_title").innerHTML = "此區目前沒有活動哦~";
                            }
                        }
                    } else {
                        var infor_c = eval(infor).length;

                        var in_c = 0;
                        document.getElementById("myselect").innerHTML = '您選擇的類型是:' + '<p class="myselect">' + now_category + '</p>' + '，選擇的城市是' + '<p class="myselect">' + taiwan[position] + '</p>';
                        for (card_c; card_c < 4; card_c++) {
                            document.getElementById("card" + (card_c + 1) + "_header").innerHTML = '<p class="myselect">' + "【" + taiwan[position] + "】" + '</p>' + "最新消息"

                            if (in_c < infor_c) {
                                document.getElementById("img" + (card_c + 1)).src = eval(infor)[in_c].imageUrl;
                                document.getElementById("card" + (card_c + 1) + "_title").innerHTML = "【" + eval(infor)[in_c].showInfo[0].location.substring(3, 6) + "】 " + eval(infor)[in_c].title + '<br>' + "活動日期:" + eval(infor)[in_c].startDate + "~" + eval(infor)[in_c].endDate;
                                $("#card" + (card_c + 1) + "_value").attr('onclick', 'changetodetail(' + "'" + eval(infor)[in_c].UID + "'" + ')');
                                // document.getElementById("card"+(card_c+1)+"_text").innerHTML="活動介紹:"+eval(infor)[in_c].descriptionFilterHtml;
                                in_c++;
                            } else {
                                document.getElementById("card" + (card_c + 1) + "_title").innerHTML = "此縣市目前沒有更多活動哦~";
                            }
                        }
                    }
                }
                //(4結束) 將東西南北陣列[0](最新消息) 顯示在4個card上面       


                //(5開始) 如果有position 顯示該縣市最新消息  如果沒有position 顯示東西南北最新消息 
                if (position) {

                    let nposi_c = 0;
                    let filter_c = 0;

                    for (filter_c; filter_c < filterdata.length; filter_c++) {
                        if (filterdata[filter_c].showInfo[0].location.substring(0, 2) == taiwan[position]) {

                            newposidata[nposi_c] = filterdata[filter_c];
                            nposi_c++;
                        }
                    }
                    show(newposidata);
                } else {
                    show(area);
                }
                //(5結束) 如果有position 顯示該縣市最新消息  如果沒有position 顯示東西南北最新消息 



            }
            $("#loadingup").hide(500);
            $("#loading").hide(500);
            //如果現在網站是搜尋
        }

    };
    //讀取進度
    xhr.addEventListener("progress", updateProgress);

    function updateProgress(event) {
        if (event.lengthComputable) {
            var completedPercent = (event.loaded / event.total * 100).toFixed(2);
            progress.style.width = completedPercent + '%';
            progress.innerHTML = completedPercent + '%';

            if (completedPercent > 90) {
                progress.classList.add('green');
            }
        }
    }

});