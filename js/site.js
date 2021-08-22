//Get all values from the page
function getValues(){

    let loanObj = {};

    loanObj.loanAmount = parseInt(document.getElementById("loanAmount").value);
    loanObj.termMonths = document.getElementById("termMonths").value;
    loanObj.interestRate = document.getElementById("interestRate").value;

    loanObj.monthlyPayment = loanObj.loanAmount * ((loanObj.interestRate/1200) / (1 - Math.pow((1 + (loanObj.interestRate/1200)),-loanObj.termMonths)));
    displayNumbers(loanObj);
}


//Calculate the Math
function calculateLoan(loanObj){

    
}


//Display the numbers
function displayNumbers(loanObj){

    loanObj.remainingBalance = loanObj.loanAmount;
    loanObj.totalInterest = 0;
    loanObj.interestPayment = 0;
    loanObj.principalPayment = 0;
    loanObj.totalCost = 0;

    let templateRows = "";

    for (let month = 1; month <= loanObj.termMonths; month++) {
        
        loanObj.interestPayment = loanObj.remainingBalance * (loanObj.interestRate/1200);
        loanObj.principalPayment = loanObj.monthlyPayment - loanObj.interestPayment;
        loanObj.totalInterest += loanObj.interestPayment;
        loanObj.remainingBalance -= loanObj.principalPayment;

        templateRows += `<tr><td>${month}</td><td>${loanObj.monthlyPayment}</td><td>${loanObj.principalPayment}</td><td>${loanObj.interestPayment}</td><td>${loanObj.totalInterest}</td><td>${loanObj.remainingBalance}</td></tr>`
        
    }

    loanObj.totalCost = loanObj.loanAmount + loanObj.totalInterest;

    document.getElementById("monthlyPayment").innerHTML = loanObj.monthlyPayment;
    document.getElementById("totalPrincipal").innerHTML = loanObj.loanAmount;
    document.getElementById("totalInterest").innerHTML = loanObj.totalInterest;
    document.getElementById("totalCost").innerHTML = loanObj.totalCost;

    document.getElementById("results").innerHTML = templateRows;
}