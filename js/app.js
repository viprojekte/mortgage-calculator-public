// Copyright (C) viprojekte 2026
// Licensed under the GNU Affero General Public License v3.0.
// See LICENSE file for details, or <https://www.gnu.org/licenses/>.
const priceInput = document.getElementById("propertyPrice");
const downPaymentEuroInput = document.getElementById("downPaymentEuro");
const downPaymentPercentInput = document.getElementById("downPaymentPercent");
const rateInput = document.getElementById("rate");
const termInput = document.getElementById("term");
const formInput = document.getElementById("mortgageForm");
const resultMonthlyPayment = document.getElementById("resultMonthlyPayment");
const resultTotalInterest = document.getElementById("resultTotalInterest");
const resultTotalCost = document.getElementById("resultTotalCost");
const resultLTV = document.getElementById("resultLTV");
const scheduleBody = document.getElementById("scheduleBody")

downPaymentEuroInput.addEventListener("input", () => {
    if (!isNaN(priceInput.valueAsNumber)){
        downPaymentPercentInput.valueAsNumber = (downPaymentEuroInput.valueAsNumber / priceInput.valueAsNumber) * 100;
    } else{
        downPaymentPercentInput.value = "";
    }

    updateDownPaymentValidity();
});

downPaymentPercentInput.addEventListener("input", () => {
    if (!isNaN(priceInput.valueAsNumber)){
        downPaymentEuroInput.valueAsNumber = (downPaymentPercentInput.valueAsNumber * priceInput.valueAsNumber / 100);
    } else{
        downPaymentEuroInput.value = "";
    }

    updateDownPaymentValidity();
})

priceInput.addEventListener("input", () => {
    if (!isNaN(downPaymentEuroInput.valueAsNumber)){
        downPaymentPercentInput.valueAsNumber = (downPaymentEuroInput.valueAsNumber / priceInput.valueAsNumber) * 100;
    } else{
        downPaymentPercentInput.value = "";
    }

    updateDownPaymentValidity();
})

function checkDownPayment(){
    if (downPaymentEuroInput.valueAsNumber > priceInput.valueAsNumber || downPaymentPercentInput.valueAsNumber > 100){
        return false;
    } else {
        return true;
    }
}

function updateDownPaymentValidity() {
    if (!checkDownPayment()){
        priceInput.setCustomValidity("Property price can't be lower than down payment");
        downPaymentEuroInput.setCustomValidity("Down payment can't be higher than property price");
        downPaymentPercentInput.setCustomValidity("Down payment can't be higher than property price");
    } else {
        downPaymentEuroInput.setCustomValidity("");
        downPaymentPercentInput.setCustomValidity("");
        priceInput.setCustomValidity("");
    }
}

formInput.addEventListener("submit", (event) => {
    event.preventDefault();
    const principal = priceInput.valueAsNumber - downPaymentEuroInput.valueAsNumber;
    const payment = monthlyPayment(principal, rateInput.valueAsNumber, termInput.valueAsNumber);

    const{schedule, totalInterest, totalCost} = amortizationSchedule(principal, rateInput.valueAsNumber, termInput.valueAsNumber);
    const ltv = principal / priceInput.valueAsNumber * 100;

    resultMonthlyPayment.textContent = payment.toFixed(2) + "€";
    resultTotalInterest.textContent = totalInterest.toFixed(2) + "€";
    resultTotalCost.textContent = totalCost.toFixed(2) + "€";
    resultLTV.textContent = ltv.toFixed(4) + "%";

    console.time("render table");
    scheduleBody.innerHTML = "";

    for (const row of schedule){
        const auxRow = document.createElement("tr");
        
        const monthTd = document.createElement("td");
        const paymentTd = document.createElement("td");
        const interestTd = document.createElement("td");
        const principalTd = document.createElement("td");
        const balanceTd = document.createElement("td");

        monthTd.textContent = row.month;
        paymentTd.textContent = row.payment.toFixed(2);
        interestTd.textContent = row.interest.toFixed(2);
        principalTd.textContent = row.principal.toFixed(2);
        balanceTd.textContent = row.remainingBalance.toFixed(2);

        auxRow.appendChild(monthTd);
        auxRow.appendChild(paymentTd);
        auxRow.appendChild(interestTd);
        auxRow.appendChild(principalTd);
        auxRow.appendChild(balanceTd);

        scheduleBody.appendChild(auxRow);
    }
    
    console.timeEnd("render table");
})