function changepage(page1, page2, page3) {
    if (page3) {
        window.location.href = "map.html?site=map&category=" + page1 + "," + page2 + "," + page3;
    } else if (page2) {
        window.location.href = "map.html?site=map&category=" + page1 + "," + page2;
    } else if (page1) {
        window.location.href = "map.html?site=map&category=" + page1;
    }
}

function searchmore() {
    var searchURL = window.location.search.split('?');
    var searchdata = searchURL[1].split('&');
    if (searchdata[2]) {
        window.location.href = "search.html?site=search&" + searchdata[1] + '&' + searchdata[2] + "&name=&startime=&endtime=";
    } else {
        window.location.href = "search.html?site=search&" + searchdata[1] + "&position=1000&name=&startime=&endtime=";
    }

}

function changetodetail(UID) {
    window.location.href = "details.html?site=details&UID=" + UID;
}

function newchange() {
    if ($('#checkbox2000').prop('checked')) {
        let cancle_c = 0;
        for (cancle_c; cancle_c < 7; cancle_c++) {
            $('#checkbox' + cancle_c).prop("checked", false);
        }
    }
};

function setfalse() {
    $('#checkbox2000').prop("checked", false);
}