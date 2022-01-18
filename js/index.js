var init = function () {
    //alert("aaa");
    $("#show_sakila").unbind().on("click", function () {
        var params = {};
        params["ajax_mode"] = "get_film";
        var next_action = function (json) {
            var data = JSON.parse(json);
            var html = make_sakila_table(data);
            $("#sakila_table").addClass("show");
            $("#sakila_table > table").empty().append(html);
            cf.hide_loading();
        };
        cf.show_loading(function () {
            cf.send_ajax("", params, next_action);
        });
    });

}

var make_sakila_table = function (data) {
    var html = '';
    html += '<thead>';
    html += '<tr>';
    for (var key in data[0]) {
        key = key.replace(/_/g, ' ');
        html += '<th>' + key + '</th>';
    }
    html += '</tr>';
    html += '</thead>';


    html += '<tbody>';
    for (var i in data) {
        var row = data[i];
        html += '<tr>';
        for (var key in row) {
            var str = row[key];
            html += '<td>';
            if (typeof str === 'string') {
                html += str.replace(/,/g, ',<br>');
            }
            html += '</td>';
        }
        html += '</tr>';
    }
    html += '</tbody>';
    html += '</table>';
    return html;
}
init();