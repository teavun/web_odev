var ogrenciNo = "G141210011";
var sonHane = ogrenciNo[ogrenciNo.length - 1];
var mod = sonHane % 5;

function getDomNode(id) {
    return document.getElementById(id)
}

var tabloDersGovde = getDomNode("tablo_ders_govde");

var kokDizin = document.location;
var ajaxDizin = kokDizin + "/ajax/";

function listele() {
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest(); //readystate = 0
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var stringResponse = xhr.response;
            var jsonResponse = JSON.parse(stringResponse);

            for (var i in jsonResponse) {
                var item = jsonResponse[i];
                var htmlItemCode = "";
                if (item.siraNo.toString() === mod.toString()) {
                    htmlItemCode += "<tr id='" + item.siraNo + "'>";
                    htmlItemCode += "<th scope='row'> <a href='javascript:void(0)'>"
                        + item.siraNo + "</a> </th>";
                    htmlItemCode += "<td class='td_kod'>" + item.dersKod + " </td>";
                    htmlItemCode += "<td class='td_dersAd'>" + item.dersAd + "</td>";
                    htmlItemCode += "</tr>";

                } else {
                    htmlItemCode += "<tr id='" + item.siraNo + "'>";
                    htmlItemCode += "<th scope='row'>" + item.siraNo;
                    htmlItemCode += "</th>";
                    htmlItemCode += "<td>" + item.dersKod + "</td>";
                    htmlItemCode += "<td>" + item.dersAd + "</td>";
                    htmlItemCode += "</tr>";
                }


                tabloDersGovde.innerHTML += htmlItemCode;
            }
        }
    }

    xhr.open("GET", ajaxDizin + "getDersler.php", true);
    xhr.send();
}

listele();

var tiklanmaSayisi = 0;
$("tbody").on("click", "tr", function () {
    var id = this.id;

    if (mod.toString() === id.toString()) {
        sutunDetay(id);
        tiklanmaSayisi++;
    }
});

function sutunDetay(id) {
    if (tiklanmaSayisi % 2 == 0) {
        var eklenecek = "";
        eklenecek += "<tr id='eklenilen'>";
        eklenecek += "<td colspan='3'>";
        eklenecek += "<div class='form-horizontal'";

        eklenecek += "<div class='form-group'>";
        eklenecek += "<label class='col-sm-2'>Ders Kodu:</label>";
        eklenecek += "<input type='text' class='col-sm-6' id='input_ders_kod'/>";
        eklenecek += "</div>"

        eklenecek += "<div class='form-group'>";
        eklenecek += "<label class='col-sm-2'>Ders Adı:</label>";
        eklenecek += "<input type='text' class='col-sm-6' id='input_ders_ad'/>";
        eklenecek += "</div>"

        eklenecek += "<div class='form-group'>";
        eklenecek += "<label class='col-sm-2'>Ders İçeriği:</label>";
        eklenecek += "<input type='text' class='col-sm-6' id='input_ders_icerik'/>";
        eklenecek += "</div>"

        eklenecek += "<button class='btn btn-default' id='show_xml_button'> XML Göster </button>";
        eklenecek += "<button class='btn btn-default' id='show_json_button'> JSON Göster </button>";
        eklenecek += "<div style='display:block'>  <textarea id='show_area' class='form-control' rows='5' ></textarea> </div>";
        eklenecek += "</div>"
        eklenecek += "</td>";
        eklenecek += "</tr>";

        $("#" + id).after(eklenecek);
        doldur(id);
    } else {
        $("#eklenilen").remove();
    }
}

function doldur(id) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var responseJson = JSON.parse(xhr.responseText);
            $("#input_ders_kod").val(responseJson.dersKod);
            $("#input_ders_ad").val(responseJson.dersAd);
            $("#input_ders_icerik").val(responseJson.dersIcerik);
        }
    }
    xhr.open("GET", ajaxDizin + 'getDers.php?id=' + id, true);
    xhr.send();


    $("#input_ders_kod").on('keyup', function () {
        var val = $(this).val();
        var type = 'dersKod';

        update(val, type, id);
    });

    $("#input_ders_ad").on('keyup', function () {
        var val = $(this).val();
        var type = 'dersAd';

        update(val, type, id);
    });

    $("#input_ders_icerik").on('keyup', function () {
        var val = $(this).val();
        var type = 'dersIcerik';

        update(val, type, id);
    });

    $("#show_xml_button").on('click', function () {
        goster('xml', id);
    });

    $("#show_json_button").on('click', function () {
        goster('json', id);
    });

}

function update(val, type, id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
        }
    }
    xhr.open("GET", ajaxDizin + 'setDers.php?id=' + id +
        "&type=" + type + "&val=" + val, true);
    xhr.send();
    yenile(id);
}

function yenile(id) {
    var kod = $("#input_ders_kod").val();
    var ad = $("#input_ders_ad").val();

    $("#" + id + " .td_kod").text(kod);
    $("#" + id + " .td_dersAd").text(ad);
}


function goster(type) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            if (type === 'json') {
                $("#show_area").val(xhr.responseText);
            } else if (type === 'xml') {
                var doc = $.parseXML("<xml/>")
                var json = JSON.parse(xhr.responseText);
                var xml = doc.getElementsByTagName("xml")[0]
                var key, elem

                for (key in json) {
                    if (json.hasOwnProperty(key)) {
                        elem = doc.createElement(key)
                        $(elem).text(json[key])
                        xml.appendChild(elem)
                    }
                }

                $("#show_area").val(xml.outerHTML);
            }
        }
    }
    xhr.open("GET", ajaxDizin + 'getDers.php?id=0', true);
    xhr.send();
}

// readyState : nesne oluştu -> 0
// open -> 1
// send -> 2
// yanıt alınmaya başlandı -> 3
// yanıt alınma tamamlandır -> 4

// status
// 200 -> sayfa başarıyla gönderildi
// 404 -> sayfa bulunamadı
// 403 -> erişim izni yok
// 500 -> dahili sunucu hatası
// 304 -> değiştirilmemiş, önbellekten alınmış

