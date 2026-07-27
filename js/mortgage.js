// Copyright (C) viprojekte 2026
// Licensed under the GNU Affero General Public License v3.0.
// See LICENSE file for details, or <https://www.gnu.org/licenses/>.
function amortizationSchedule(principal, annualRate, years) {
    const payment = monthlyPayment(principal, annualRate, years);
    const months = years * 12;
    let balance = principal;
    const schedule =[];
    //const row = {month: 1, payment: x, interest: y, principal: z, remainingBalance: w};
    const monthlyRate = annualRate / (100 * 12);
    
    for (let month =1; month <= months; month++) {
        const paidInterest = monthlyRate * balance;
        const paidPrincipal = payment - paidInterest;
        balance = balance - paidPrincipal;
        const row = {month, payment, interest: paidInterest, principal: paidPrincipal, remainingBalance: balance};
        schedule.push(row);
    }
    let totalInterest = 0;

    for (const row of schedule){
        totalInterest += row.interest;
    }

    let totalCost = totalInterest + principal;
    return {schedule, totalInterest, totalCost};
}


function monthlyPayment(principal, annualRate, years){
    const monthlyRate = annualRate / (100 * 12);
    const months = years * 12;
    return (principal * monthlyRate) / (1 - (1 + monthlyRate)**(-months));
}
