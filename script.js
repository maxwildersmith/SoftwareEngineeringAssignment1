var input;
numberInit = function () {
    var div = document.getElementById("number-container");
    for (var i = 9; i >= 1; i--)
        div.innerHTML += "<div class=\"button num\" onclick='typeNumber(" + i + ")' id=\"num" + i + "\"><p>" + i + "</p></div>";
    div.innerHTML += "<div class=\"button op\" onclick='typeNumber(\".\")'><p>.</p></div>";
    div.innerHTML += "<div class=\"button num\" id=\"per\" onclick='typeNumber(0)'><p>0</p></div>";
    div.innerHTML += "<div class=\"button op\" onclick='typeNeg()'><p>(-)</p></div>";
};

typeNumber = function (num) {
    if(input.value=='0')
        input.value='';
    input.value+=num;
};

typeNeg = function(){
    if(input.value.substr(-1).match(/[^0-9.]/)!=null)
        input.value+=String.fromCharCode(45);
    else if (input.value=='0')
        input.value=String.fromCharCode(45);
};

typeOp = function(op){
    if(input.value.substr(-1)==String.fromCharCode(45))
        return;
    if(input.value.split(/[^0-9.\x2d]/g).length>=2)
        evalInput();
    switch (op) {
        case '+':
            input.value += '+';
            break;
        case String.fromCharCode(8722):
            input.value += String.fromCharCode(8722);
            break;
        case '*':
            input.value += '*';
            break;
        case '/':
            input.value += '/';
            break;
        case '%':
            input.value += '%';
            break;
    }
};

evalInput = function(){
    var operands = input.value.split(/[^0-9.\x2d]/g);
    for(var i=0;i<operands.length;i++)
        operands[i]=parseFloat(operands[i]);
    var operators = input.value.replace(/[0-9.\x2d]/g,'').split('');
    switch (operators[0]) {
        case '+':
            input.value = operands[0]+operands[1];
            break;
        case String.fromCharCode(8722):
            input.value = operands[0]-operands[1];
            break;
        case '*':
            input.value = operands[0]*operands[1];
            break;
        case '/':
            input.value = operands[0]/operands[1];
            break;
        case '%':
            input.value = operands[0]%operands[1];
            break;
    }
    if(input.value=='Infinity')
        input.value='0'
};

clearInput = function(){
    input.value = '0';
};
back = function(){
    input.value = input.value.substring(0,input.value.length-1);
    if(input.value=='')
        input.value='0';
}
init = function () {
    input = document.getElementById("output");
    input.isContentEditable = false;
    numberInit();
};
