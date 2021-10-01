/* Dudhichua shift wise entry
*
* Generic Copyright
*
* Plug-ins used: jQuery hi hai abhi 
*/

var date = 'today';
var shift = 1;
var section = 1;

//JSON for data
var dataForPage = {
    'id' : {},
    'coal_shovels_operating' : [], //it's just default, we will increase it later
    'ob_shovels_operating' : [], //it's just default, we will increase it later
    'dumper_wise_data' : {}
};

$(document).ready(function() {
    $(".add_row").on('click', function() {
        var table = $(this).parent().parent().find("table").first();
        $(table).append($(table).find("tr").eq(1).clone());
    });
    $(".delete_row").on('click', function() {
        var table = $(this).parent().parent().find("table").first();
        if ($(table).find("tr").length > 2) {
            $(table).find("tr").last().remove();
        }
    });
    $("#save_shovels").on('click', function() {
        var coal_shovels_operating = [];
        var coal_shovel_operator = [];
        var ob_shovels_operating = [];
        var ob_shovel_operator = [];

        var shovel_table_row = $('#shovel_table > tbody > tr');

        $(shovel_table_row).each(function(index, tr) {
            if ($('select[name="material_type[]"]').eq(index).val() === 'coal') {
                coal_shovels_operating.push($('select[name="shovel_no[]"]').eq(index).val());
                coal_shovel_operator.push($('select[name="shovel_operator[]"]').eq(index).val());
            } else {
                ob_shovels_operating.push($('select[name="shovel_no[]"]').eq(index).val());
                ob_shovel_operator.push($('select[name="shovel_operator[]"]').eq(index).val());
            }
        });

        var dumper_tbody_tr = $('#dumper_table > tbody > tr');
        var dumper_thead_tr = $('#dumper_table > thead > tr');

        $(dumper_thead_tr).each(function(index, tr) {
            $(tr).find("th:gt(1)").remove();
            for (var i = 0; i < coal_shovels_operating.length; i++) {
                $("<th>" + "Coal Shovel " + coal_shovels_operating[i] + " Operator " + coal_shovel_operator[i] + "</th>").insertAfter($(tr).find("th:last"));
            }
            for (i = 0; i < ob_shovels_operating.length; i++) {
                $("<th>" + "OB Shovel " + ob_shovels_operating[i] + " Operator " + ob_shovel_operator[i] + "</th>").insertAfter($(tr).find("th:last"));
            }
        });

        $(dumper_tbody_tr).each(function(index, tr) {
            $(tr).find("td:gt(1)").remove();
            for (var i = 0; i < coal_shovels_operating.length; i++) {
                $(tr).append("<td><input name='coal_shovel_" + coal_shovels_operating[i]  + "_" + coal_shovel_operator[i] +  "[]' required='required' maxlength='128' type='number' value='' min='0' data-rule-required='true' data-msg-required='Please enter a valid number'></td>");
            }
            for (var i = 0; i < ob_shovels_operating.length; i++) {
                $(tr).append("<td><input name='ob_shovel_" + ob_shovels_operating[i]  + "_" + ob_shovel_operator[i] +  "[]' required='required' maxlength='128' type='number' value='' min='0' data-rule-required='true' data-msg-required='Please enter a valid number'></td>");
            }
        });

        //populate JSON
        dataForPage.coal_shovels_operating = coal_shovels_operating.slice();
        dataForPage.ob_shovels_operating = ob_shovels_operating.slice();

    });

    $("#save_dumpers").on('click', function() {
        //populate JSON
        dataForPage['id'] = {
            'unique_id' : $('#date').val() + '_' + $('#shift').val() + '_' + $('#section').val(),
            'date' : $('#date').val(),
            'shift' : $('#shift').val(),
            'section' : $('#section').val()
        };
        dataForPage['dumper_wise_data'] = $('#pageData').populateJSON();
        console.log(dataForPage);
        //return false;
    });

    $.fn.populateJSON = function()
    {
        var obj = {};
        var arr = this.serializeArray();
        $.each(arr, function() {
            if (obj[this.name] !== undefined) {
                if (!obj[this.name].push) {
                    obj[this.name] = [obj[this.name]];
                }
                obj[this.name].push(this.value || '');
            } else {
                obj[this.name] = this.value || '';
            }
        });
        return obj;
    };
});