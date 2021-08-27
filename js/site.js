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

        templateRows += `<tr><td>${month}</td>
                            <td>${loanObj.monthlyPayment.toLocaleString('en-US',{ style: 'currency', currency: 'USD' })}</td>
                            <td>${loanObj.principalPayment.toLocaleString('en-US',{ style: 'currency', currency: 'USD' })}</td>
                            <td>${loanObj.interestPayment.toLocaleString('en-US',{ style: 'currency', currency: 'USD' })}</td>
                            <td>${loanObj.totalInterest.toLocaleString('en-US',{ style: 'currency', currency: 'USD' })}</td>
                            <td>${loanObj.remainingBalance.toLocaleString('en-US',{ style: 'currency', currency: 'USD' })}</td></tr>`
        
    }

    loanObj.totalCost = loanObj.loanAmount + loanObj.totalInterest;

    document.getElementById("monthlyPayment").innerHTML = loanObj.monthlyPayment.toLocaleString('en-US',{ style: 'currency', currency: 'USD' });
    document.getElementById("totalPrincipal").innerHTML = loanObj.loanAmount.toLocaleString('en-US',{ style: 'currency', currency: 'USD' });
    document.getElementById("totalInterest").innerHTML = loanObj.totalInterest.toLocaleString('en-US',{ style: 'currency', currency: 'USD' });
    document.getElementById("totalCost").innerHTML = loanObj.totalCost.toLocaleString('en-US',{ style: 'currency', currency: 'USD' });

    document.getElementById("results").innerHTML = templateRows;
}