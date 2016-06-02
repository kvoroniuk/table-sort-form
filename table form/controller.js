/**
 * Created by Kateryna on 01.07.2016.
 */
document.addEventListener("DOMContentLoaded", function(event) {
    $('select').material_select();
});
window.addEventListener('load', function () {
    Change();

    //button to add records in a table
    var btn = document.getElementsByClassName('btn')[0];
    btn.addEventListener('click', function (e) {
        if (Validate()) {
            var person = GetValues();
            SetValues (person);
        }
    });
    //firstname
    var fn = document.getElementById("fn");
    fn.addEventListener('click',function(){
        SortWord();
    });
    //second name
    var sn = document.getElementById("sn");
    sn.addEventListener('click',function(){
        SortWord();
    });
    //number sort (age)
    var nm = document.getElementById("nm");
    nm.addEventListener('click',function(){
        f_nm *= -1; // toggle the sorting order
        var n = $(this).prevAll().length;
        sortTable(f_nm,n);
    });
});
//sortable ;
var f_nm = 1;
var f_sl = 1

function SortWord () {
    f_sl *= -1; // toggle the sorting order
    var n = $(this).prevAll().length;
    sortTable(f_sl,n);
}
function Change () {
    for (var i=0; i<5; i++) {
        var form = document.getElementById('form').getElementsByTagName('input')[i];
        form.addEventListener('focus', function () {
            this.classList.remove('invalid');
        })
        form.addEventListener('blur', function () {
            if (this.value == "" ) {
                this.classList.add('invalid');
            }
            else {
                this.classList.remove('invalid');
            }
        })
    }
}
function GetValues () {
    var person = [];
    for (var i=0; i<5; i++) {
        var form = document.getElementById('form').getElementsByTagName('input')[i];
        person[i] = form.value;
    }
    return person;
}
function SetValues (NewRow) {
    var table = document.getElementsByTagName('tbody')[0];
    var row = document.createElement('tr');
    // var td = document.createElement('td');
    for (var i=0; i<NewRow.length; i++) {
        var CellText = row.insertCell(i);
        CellText.innerHTML = NewRow[i];
        if (i==NewRow.length-1) {
            CellText.innerHTML = NewRow[i] + '<div class="chip" onclick="deleteRow(this)">Delete</div>'
        }
    }
    table.appendChild(row);
}
function Validate () {
    var notVal = 0;
    for (var i=0; i<5; i++) {
        var form = document.getElementById('form').getElementsByTagName('input')[i];
        if (form.value == "") {
            form.classList.add('invalid');
            notVal++;
        }
    }
    return notVal>0?false:true;
}


function sortTable(f,n){
    var rows = $('tbody  tr').get();

    rows.sort(function(a, b) {

        var A = getVal(a);
        var B = getVal(b);

        if(A < B) {
            return -1*f;
        }
        if(A > B) {
            return 1*f;
        }
        return 0;
    });

    function getVal(elm){
        var v = $(elm).children('td').eq(n).text().toUpperCase();
        if($.isNumeric(v)){
            v = parseInt(v,10);
        }
        return v;
    }

    $.each(rows, function(index, row) {
        $('table').children('tbody').append(row);
    });
}


function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementsByTagName("table")[0].deleteRow(i);
}