// Declaring Array to store the elements
const inputArray = [];
const errorMessageArray = [];

const name = document.getElementById('name');
inputArray.push(name);
const errorMessageName = document.createElement("p");
errorMessageArray.push(errorMessageName);
const parentNodeName = name.parentNode;
parentNodeName.appendChild(errorMessageName);


const number = document.getElementById('number');
inputArray.push(number);
const errorMessageNumber = document.createElement("p");
errorMessageArray.push(errorMessageNumber);
const parentNodeNumber = number.parentNode;
parentNodeNumber.appendChild(errorMessageNumber);


const expireMonth = document.getElementById('expire_month');
inputArray.push(expireMonth);
const errorMessageExpireMonth = document.createElement("p");
errorMessageArray.push(errorMessageExpireMonth);
const parentNodeExpireMonth = expireMonth.parentNode;
parentNodeExpireMonth.appendChild(errorMessageExpireMonth);

const expireYear = document.getElementById('expire_year');
inputArray.push(expireYear);
const errorMessageExpireYear = document.createElement("p");
errorMessageArray.push(errorMessageExpireYear);
const parentNodeExpireYear = expireYear.parentNode;
parentNodeExpireYear.appendChild(errorMessageExpireYear);


const cvc = document.getElementById('cvc');
inputArray.push(cvc);
const errorMessageCvc = document.createElement("p");
errorMessageArray.push(errorMessageCvc);
const parentNodeCvc = cvc.parentNode;
parentNodeCvc.appendChild(errorMessageCvc);

//Validating the value of the input from user
function checkName(name) {
    const regexName = /[a-zA-Z][a-zA-z ]{1,19}[a-zA-z]/;
    const matchVar = name.match(regexName);
    // console.log(matchVar);
    if(matchVar[0] === name) {
        return true;
    }
    return false;
}

function checkNumber(number) {
    const regexNumber = /[0-9]{15,16}/;
    const matchVar = number.match(regexNumber);
    // console.log(matchVar);
    if(matchVar !== null) {
        if(matchVar[0] == number) {
            return true;
        }
    }
    return false;
}

function checkMonth(month) {
    // console.log(Math.floor(month));
    if(Math.floor(month) > 12 || Math.floor(month) < 1) {
        return false;
    }
    return true;
}

function checkYear(year) {
    const regexYear = /\d{2}/;
    const matchVar = year.match(regexYear);
    // console.log(matchVar);
    if(matchVar !== null) {
        if(matchVar[0] === year) {
            return true;
        }
    }
    return false;
}

function checkCvc(cvc) {
    const regexCvc = /\d{3,4}/;
    const matchVar = cvc.match(regexCvc);
    // console.log(matchVar);
    if(matchVar !== null) {
        if(matchVar[0] === cvc) {
            return true;
        }
    }
    return false;
}

//Changing style when validating
function validateData(){
    let errorCount = 0;
    
    function createErrorMessage(inputElement, errorMessage){
        const loopAction = () => {
            inputElement.style.border = "2px solid red";
            errorMessage.style.marginBottom = "16px";
            errorCount += 1;

        }
        const changeBack = () => {
            inputElement.style.border = "1px solid black";
            errorMessage.innerHTML = '';
            errorMessage.style.marginBottom = "0px";
        }
        if(inputElement.value === ""){
            errorMessage.innerHTML = "*Information required*";
            loopAction();
        }else if(inputElement === name){
            if(checkName(inputElement.value) === false){
                errorMessage.innerHTML = "*Invalid Name*";
                loopAction();
            }else{
                changeBack();
            }
        }else if(inputElement === number){
            if(checkNumber(inputElement.value) === false){
                errorMessage.innerHTML = "*Invalid Number*";
                loopAction();
            }else{
                changeBack();
            }
        }else if(inputElement === expireMonth){
            if(checkMonth(inputElement.value) === false){
                errorMessage.innerHTML = "*Invalid Months*";
                loopAction();
            }else{
                changeBack();
            }
        }else if(inputElement === expireYear){
            if(checkYear(inputElement.value) === false){
                errorMessage.innerHTML = "*Invalid Year*";
                loopAction();
            }else{
                changeBack();
            }
        }else if(inputElement === cvc){
            if(checkCvc(inputElement.value) === false){
                errorMessage.innerHTML = "*Invalid CVC*";
                loopAction();
            }else{
                changeBack();
            }
        }
        else{
            changeBack();
        }

    }
    
    for(let i = 0; i < inputArray.length; i++) { 
        errorMessageArray[i].style.color = "red";
        errorMessageArray[i].style.fontSize = "16px";
        createErrorMessage(inputArray[i], errorMessageArray[i]);     
        // console.log(errorCount);
    }
    console.log(errorCount);
    //Change screen logic
    const rightSide= document.getElementById("right-side");
    
    //Change card information
    if(errorCount === 0){
        //left side
        const cardName = document.getElementById("example_name");
        cardName.innerHTML = name.value;
        
        const cardCvc = document.getElementById("example_cvc");
        cardCvc.innerHTML = cvc.value;
        
        const cardNumber = document.getElementById("example_number");
        let newCardNumber = number.value;
        newCardNumber = newCardNumber.toString();
        for(let i = 4; i < (newCardNumber.length - 1); i += 5) {
            newCardNumber = newCardNumber.substring(0, i) + " " + newCardNumber.substring(i, newCardNumber.length);
        }
        cardNumber.innerHTML = newCardNumber;

        const monthCol = document.getElementById("monthCol");
        monthCol.innerHTML = expireMonth.value;
        const yearCol = document.getElementById("yearCol");
        yearCol.innerHTML = expireYear.value;

        //right side
        rightSide.innerHTML = '<img id="rightImage" src="assets/images/icon-complete.svg"/> <h2>THANK YOU!</h2> <p>We\'ve added your card details</p> <button id="continue-button" onClick="window.location.reload();">Continue</button>';
        rightSide.style.textAlign = "center"; 
        const rightImage = document.getElementById("rightImage");
        rightImage.style.width = "80px";
        rightImage.style.height = "80px";
        rightImage.style.alignSelf = "center";
        const continueButton = document.getElementById("continue-button");
        continueButton.style.marginLeft = "20px";
        continueButton.style.marginRight = "20px";
    }
}


function init() {
    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', validateData);
}

window.onload = init;