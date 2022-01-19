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
    //space1
    $(".cstm-select").each(function () {
        var classes = $(this).attr("class"),
            id = $(this).attr("id"),
            name = $(this).attr("name");
        var template = '<div class="' + classes + '">';
        template += '<span class="cstm-select-trigger"><span class="cstm-select-selected">' + $(this).attr("placeholder") + '</span></span>';
        template += '<div class="cstm-options">';
        $(this).find("option").each(function () {
            template += '<span class="cstm-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + '</span>';
        });
        template += '</div></div>';

        $(this).wrap('<div class="cstm-select-wrapper"></div>');
        $(this).hide();
        $(this).after(template);
    });
    $(".cstm-option:first-of-type").hover(function () {
        $(this).parents(".cstm-options").addClass("option-hover");
    }, function () {
        $(this).parents(".cstm-options").removeClass("option-hover");
    });
    $(".cstm-select-trigger").on("click", function (e) {
        $('html').one('click', function () {
            $(".cstm-select").removeClass("opened");
        });
        $(this).parents(".cstm-select").toggleClass("opened");
        e.stopPropagation();
    });
    $(".cstm-option").on("click", function () {
        $(this).parents(".cstm-select-wrapper").find("select").val($(this).data("value"));
        $(this).parents(".cstm-options").find(".cstm-option").removeClass("selection");
        $(this).addClass("selection");
        $(this).parents(".cstm-select").removeClass("opened");
        $(this).parents(".cstm-select").find(".cstm-select-trigger").find(".cstm-select-selected").text($(this).text());
    });

    //space1end

    //space4
    var btn = document.getElementsByClassName("bt");
    var i;
    for (i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", function () {
            var panel = this.nextElementSibling;
            if (panel.style.display == "block") {
                $(panel).slideUp(300);
            } else {
                $(panel).slideDown(300);
            }
        })
    }
    //space4end

    //space5start
    $('input[type=checkbox]').change(function () {
        counter = 0;
        clicked = $(this).data('index');
        $('input[type=checkbox]').each(function () {
            if ($(this)[0].checked) {
                counter++;
               $('.block > span').text("ON")
           }else{
               $('.block > span').text("OFF")
           }
        });
        if (counter == 3) {
            toDisable = clicked;
            while (toDisable == clicked) {
                toDisable = Math.round(Math.random() * 2);
            }
            $("input:eq(" + toDisable + ")")[0].checked = false;
        }
    });
    //space5end
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