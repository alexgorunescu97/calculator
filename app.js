let button0 = document.getElementById('button-0');
let button1 = document.getElementById('button-1');
let button2 = document.getElementById('button-2');
let button3 = document.getElementById('button-3');
let button4 = document.getElementById('button-4');
let button5 = document.getElementById('button-5');
let button6 = document.getElementById('button-6');
let button7 = document.getElementById('button-7');
let button8 = document.getElementById('button-8');
let button9 = document.getElementById('button-9');
let buttonDiv = document.getElementById('button-division');
let buttonMulti = document.getElementById('button-multiplication');
let buttonAdd = document.getElementById('button-addition');
let buttonSub = document.getElementById('button-subtraction');
let buttonEq = document.getElementById('button-equal');
let buttonDel = document.getElementById('button-del');
let op = document.querySelector('.op');
let resultHTML = document.querySelector('.result');
let isEqual = false; //daca am apasat pe egal
let selectOperand1 = true; //selecteaza operanzii
let newOp = true; //daca vreau sa fac o operatie noua
let opOrder = false; //inmultire sau impartire dupa adunare sau scadere -> true
let sub = false; // daca operatia anterioara a fost scadere
let result = 0;
let operation = '';
let operand1 = '';
let operand2 = '';
let temp1 = ''; //rezultat intermediar
let temp2 = ''; //rezultat intermediar

function getOperand(digit) {
  //cazul in care apas pe o cifra dupa ce am apasat pe =
  if (resultHTML.innerHTML !== '' && newOp === true && isEqual === true) {
    op.innerHTML = '';
    resultHTML.innerHTML = '';
    selectOperand1 = true;
  }
  //selectarea operanzilor
  if (selectOperand1 === true) {
    //pt a nu avea nr de genul 0123, 01 ... (nu afiseaza zeroul de la inceput)
    if (operand1 === '0') {
      op.innerHTML = op.innerHTML.slice(0, op.innerHTML.length-1);
      op.innerHTML += digit;
      operand1 = digit;
      temp1 = digit;
    } else {
        operand1 += digit;
        temp1 += digit;
        op.innerHTML += digit;
    }
  } else {
    if (operand2 === '0') {
      op.innerHTML = op.innerHTML.slice(0, op.innerHTML.length-1);
      op.innerHTML += digit;
      operand2 = digit;
      temp2 = digit;
    } else {
        operand2 += digit;
        temp2 += digit;
        op.innerHTML += digit;
    }
  }
}

function add() {
  if (op.innerHTML[op.innerHTML.length-1] === '+' || op.innerHTML[op.innerHTML.length-1] === '-' || op.innerHTML[op.innerHTML.length-1] === '*' || op.innerHTML[op.innerHTML.length-1] === '/' || op.innerHTML === '') {
    return;//pentru a nu putea introduce mai multe semne unul dupa altul
  }
  //pentru cazul in care apas plus dupa ce am facut o adunare sau o scadere
  if (selectOperand1 === false && opOrder === false && (operation == 's' || operation == 'a')) {
    equal();
    operand1 = String(result);
    operand2 = '';
    temp1 = String(result);
    //pentru cazul in care apas pe plus dupa ce am avut inainte ceva de genul a+b*c, a-b*c, a+b/c, a-b/c
  } else if (selectOperand1 === false && opOrder === true) {
      equal();
      if (sub === false) {
          operand1 = String(parseFloat(result) + parseFloat(temp1));
      } else {
        operand1 = String(parseFloat(temp1) - parseFloat(result));
      }
      resultHTML.innerHTML = operand1;
      operand2 = '';
      temp1 = operand1;
      opOrder = false;
      //pentru cazul in care apas pe plus dupa ceva de genul a*b, a/b
  } else if (selectOperand1 === false && opOrder === false && (operation == 'm' || operation == 'd')) {
      equal();
      temp1 = String(result);
      operand1 = String(result);
  }

  operation = 'a';
  selectOperand1 = false;
  //daca apas + dupa =
  if (resultHTML.innerHTML !== '' && isEqual === true) {
    operand1 = resultHTML.innerHTML;
    temp1 = resultHTML.innerHTML;
    op.innerHTML = operand1;
    newOp = false;
  }

  sub = false;
  temp2 = '';
  op.innerHTML += '+';
  isEqual = false;
}

function subtract() {
  //la fel ca la add
  if (op.innerHTML[op.innerHTML.length-1] === '+' || op.innerHTML[op.innerHTML.length-1] === '-' || op.innerHTML[op.innerHTML.length-1] === '*' || op.innerHTML[op.innerHTML.length-1] === '/' || op.innerHTML === '') {
    return;
  }

  if (selectOperand1 === false && opOrder === false && (operation == 's' || operation == 'a')) {
    equal();
    operand1 = String(result);
    operand2 = '';
    temp1 = String(result);
  } else if (selectOperand1 === false && opOrder === true) {
      equal();
      if (sub === false) {
          operand1 = String(parseFloat(result) + parseFloat(temp1));
      } else {
          operand1 = String(parseFloat(temp1) - parseFloat(result));
      }
      resultHTML.innerHTML = operand1;
      operand2 = '';
      temp1 = operand1;
      opOrder = false;
  } else if (selectOperand1 === false && opOrder === false && (operation == 'm' || operation == 'd')) {
      equal();
      temp1 = String(result);
  }

  selectOperand1 = false;
  operation = 's';
  if (resultHTML.innerHTML !== '' && isEqual === true) {
    temp1 = resultHTML.innerHTML;
    operand1 = resultHTML.innerHTML;
    op.innerHTML = operand1;
    newOp = false;
  }
  temp2 = '';
  op.innerHTML += '-';
  isEqual = false;
  sub = true;
}

function divide() {
  if (op.innerHTML[op.innerHTML.length-1] === '+' || op.innerHTML[op.innerHTML.length-1] === '-' || op.innerHTML[op.innerHTML.length-1] === '*' || op.innerHTML[op.innerHTML.length-1] === '/' || op.innerHTML === '') {
    return;
  }
  // daca am apasat pe / dupa ce am avut inmultire sau impartire la operatia anterioara
  if (selectOperand1 === false && (operation == 'm' || operation == 'd' || isEqual === true)) {
    equal();
    operand1 = String(result);
    operand2 = '';
    // daca am apasat pe / dupa o adunare sau scadere
  } else if (selectOperand1 === false && (operation == 'a' || operation == 's') && isEqual === false) {
      opOrder = true;
      operand1 = temp2;
      operand2 = '';
      temp2 = '';
  }
  selectOperand1 = false;
  operation = 'd';
  //daca apas / dupa =
  if (resultHTML.innerHTML !== '' && isEqual === true) {
    operand1 = resultHTML.innerHTML;
    op.innerHTML = operand1;
    newOp = false;
  }
  op.innerHTML += '/';
  isEqual = false;
}

function multiply() {
  // la fel ca la divide
  if (op.innerHTML[op.innerHTML.length-1] === '+' || op.innerHTML[op.innerHTML.length-1] === '-' || op.innerHTML[op.innerHTML.length-1] === '*' || op.innerHTML[op.innerHTML.length-1] === '/' || op.innerHTML === '') {
    return;
  }

  if (selectOperand1 === false && (operation == 'm' || operation == 'd' || isEqual === true)) {
    equal();
    operand1 = String(result);
    operand2 = '';
  } else if (selectOperand1 === false && (operation == 'a' || operation == 's') && isEqual === false) {
      opOrder = true;
      operand1 = temp2;
      operand2 = '';
      temp2 = '';
  }
  selectOperand1 = false;
  operation = 'm';
  if (resultHTML.innerHTML !== ''&& isEqual === true) {
    operand1 = resultHTML.innerHTML;
    op.innerHTML = operand1;
    newOp = false;
  }
  op.innerHTML += '*';
  isEqual = false
}

function del() {
  // sterge cei doi operanzi caracter cu caracter
  if (selectOperand1 == true) {
    operand1 = operand1.slice(0, operand1.length-1);
  } else {
    operand2 = operand2.slice(0, operand2.length-1);
  }
  //nu sterge +, -, *, / sau daca am apasat pe egal
  if (op.innerHTML[op.innerHTML.length-1] != '+' && op.innerHTML[op.innerHTML.length-1] != '-' && op.innerHTML[op.innerHTML.length-1] != '/' && op.innerHTML[op.innerHTML.length-1] != '*' && isEqual === false) {
    op.innerHTML = op.innerHTML.slice(0, op.innerHTML.length-1);
  }
}


function equal() {
  if (op.innerHTML[op.innerHTML.length-1] == '+' || op.innerHTML[op.innerHTML.length-1] == '-' || op.innerHTML[op.innerHTML.length-1] == '/' || op.innerHTML[op.innerHTML.length-1] == '*') {
    isEqual = false;
    return;
  }

  switch (operation) {
    case 'a':
      if (operand1 !== '' && operand2 !== '') {
        result = parseFloat(operand1) + parseFloat(operand2);
        operand1 = '';
        operand2 = '';
        if (isEqual === true) {
            op.innerHTML += "=";
            temp1 = '';
            temp2 = '';
        }
        resultHTML.innerHTML = result;
        newOp = true;
      }
      break;

    case 's':
      if (operand1 !== '' && operand2 !== '') {
        result = parseFloat(operand1) - parseFloat(operand2);
        operand1 = '';
        operand2 = '';
        if (isEqual === true) {
            op.innerHTML += "=";
            temp1 = '';
            temp2 = '';
        }
        resultHTML.innerHTML = result;
        newOp = true;
      }
      break;

    case 'd':
      if (operand1 !== '' && operand2 !== '') {
        result = parseFloat(operand1) / parseFloat(operand2);
        operand1 = '';
        operand2 = '';
        if(opOrder === false) {
          resultHTML.innerHTML = result;
          //daca am a+b/c
        } else if (opOrder === true && isEqual === true && sub === false) {
            resultHTML.innerHTML = result + parseFloat(temp1);
            //a-b/c
        } else if (sub === true) {
            resultHTML.innerHTML = parseFloat(temp1) - result;
        }

        if (isEqual === true) {
          temp1 = '';
          temp2 = '';
          sub = false;
          opOrder = false;
          op.innerHTML += "=";
        }
        newOp = true;
      }
      break;

    case 'm':
    //la fel ca la divide
      if (operand1 !== '' && operand2 !== '') {
        result = parseFloat(operand1) * parseFloat(operand2);
        operand1 = '';
        operand2 = '';

        if(opOrder === false) {
          resultHTML.innerHTML = result;
        } else if (opOrder === true && isEqual === true && sub === false) {
            resultHTML.innerHTML = result + parseFloat(temp1);
        } else if (sub === true) {
            resultHTML.innerHTML = parseFloat(temp1) - result;
        }
        if (isEqual === true) {
          temp1 = '';
          temp2 = '';
          sub = false;
          opOrder = false;
          op.innerHTML += "=";
        }
        newOp = true;
      }
      break;
    default:
      break;
  }
}

function calculator() {
  button0.addEventListener('click', function() {
    getOperand('0');
  });
  button1.addEventListener('click', function() {
    getOperand('1');
  });
  button2.addEventListener('click', function() {
    getOperand('2');
  });
  button3.addEventListener('click', function() {
    getOperand('3');
  });
  button4.addEventListener('click', function() {
    getOperand('4');
  });
  button5.addEventListener('click', function() {
    getOperand('5');
  });
  button6.addEventListener('click', function() {
    getOperand('6');
  });
  button7.addEventListener('click', function() {
    getOperand('7');
  });
  button8.addEventListener('click', function() {
    getOperand('8');
  });
  button9.addEventListener('click', function() {
    getOperand('9');
  });
  buttonAdd.addEventListener('click', function() {
    add();
  });
  buttonSub.addEventListener('click', function() {
    subtract();
  });
  buttonMulti.addEventListener('click', function() {
    multiply();
  });
  buttonDiv.addEventListener('click', function() {
    divide();
  });
  buttonDel.addEventListener('click', function() {
    del();
  });
  buttonEq.addEventListener('click', function() {
    isEqual = true;
    equal();
  });

}

calculator();
