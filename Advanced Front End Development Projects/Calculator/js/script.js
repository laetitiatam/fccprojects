$(document).ready(function() {
    var testNumLength = function(number) {
        if (number.length > 9) {
            totaldiv.text(number.substr(number.length - 9, 9));
            if (number.length > 15) {
                number = "";
                totaldiv.text("Too long...");
            }
        }
    };
    var number = "";
    var oldnumber = "";
    var operator = "";
    var totaldiv = $("#display");
    totaldiv.text("0");

    // on number click, save var number and display
    $(".numbers").not("#clear,#clearall").click(function() {
        number += $(this).text();
        totaldiv.text(number);
        testNumLength(number);
    });

    // on operator click, store old var number as var oldnumber
    $(".operators").not("#equals").click(function() {
        operator = $(this).text();
        oldnumber = number;
        number = "";
        totaldiv.text(operator);
    });
    $("#clear,#clearall").click(function() {
        number = "";
        totaldiv.text("0");
        if ($(this).attr("id") === "clearall") {
            oldnumber = "";
        }
    });
    $("#equals").click(function() {

        if (operator === "+") {
            number = (Number(number) + Number(oldnumber)).toString(10);
            console.log(number);
        } else if (operator === "-") {
            number = (Number(oldnumber) - Number(number)).toString(10);
              console.log(number);
        }  else if (operator === "x") {
            number = (Number(number) * Number(oldnumber)).toString(10);
              console.log(number);
        } else if (operator != "equals") { //can't match &#247 ...why?
            number = (Number(oldnumber) / Number(number));
            number = number.toFixed(7 - Math.floor(number/10));
        }
        totaldiv.text(number);
        testNumLength(number);
        oldnumber = "";
    });

});
