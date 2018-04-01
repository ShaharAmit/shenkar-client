$(function() {
    var clear=$(".clear").last();

    addData();

    var add=$("#addBt"),
    del=$("#delBt"),
    calc=$("#calcBt"),
    screen=$(".screen"),
    numberInput=$("#nInput"),
    method=$("#method"),
    func=$("#func");
    calc.click(function(){
        var strOrig = screen[0].value;
        if(strOrig !== '') {
            var strArr = strOrig.split(',');
            if(strArr.length>0) {
                var dataString='';
                dataString = "func="+func[0].value+"&size="+strArr.length;
                for(var i=0; i<strArr.length; i++) {
                    dataString+="&num"+i+"="+strArr[i];
                }

                $.ajax({
                    url: "http://shenkar.html5-book.co.il/2017-2018/dcs/dev_34/services/calcController.php",
                    datatype: 'json',
                    type: method[0].value,
                    data: dataString,
                    success: function (data){
                        screen[0].value = data.result;
                    }, error: function (data) {
                        console.error(data);
                    }
                });
            }
        }
        
    });

    add.click(function(){
        if(screen[0].value === '') {
            screen[0].value = numberInput[0].value;
        } else {
            screen[0].value += ','+numberInput[0].value;
        }
    });

    del.click(function(){
        var strOrig = screen[0].value;
        if(strOrig !== '') {
            var strArr = strOrig.split(',');
            if(strArr.length>0) {
                screen[0].value = strOrig.slice(0,strOrig.length - (strArr[strArr.length-1].length) - 1);
            }
        }
    });

    function addData() {
        clear.before("<div class='calc'>" + 
            "<textarea name='screen' class='screen'></textarea>" +
            "<div class='buttunsCont'>" +
                "<label for='method'>method:</label>" +
                "<select name='method' class='buttons' id='method'>" + 
                    "<option value='POST'>post</option>" +
                    "<option value='PUT'>put</option>" +
                    "<option value='GET'>get</option>" +
                "</select>" +
                "<label for='func'>function:</label>" +
                "<select name='func' class='buttons' id='func'>" + 
                    "<option value='avg'>avg</option>" +
                    "<option value='mult'>mult</option>" +
                    "<option value='sum'>sum</option>" +
                "</select>" +
                "<button type='button' class='buttons' id='addBt'>Add number</button>" +
                "<button type='button' class='buttons' id='delBt'>Delete last</button>" +
            "</div>" +
            "<div class='numInpCont'>" +
                "<label for='nInput' class='numberLab'>numbers input:</label>" +
                "<input type='number' name='nInput' value='0' class='numberInp' id='nInput'>" +
                "<button type='button' class='btOk' id='calcBt'>Calc</button>" +
            "</div>" +
        "</div>"
    )}
});
