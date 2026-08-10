# Mortgage calculator

A JavaScript based app to calculate mortgages according to the french amortization system. Vanilla JS, no framework.

v1.0

 ## Usage
- Try it in: https://viprojekte.github.io/mortgage-calculator-public or open index.html in a browser
- The math lives in js/mortgage.js, if you want to use it directly

```javascript
amortizationSchedule(LOAN, INTEREST, YEARS)
```
- `LOAN` loan amount
- `INTEREST` annual interest rate, expressed as a percentage (i.e. 3.5)
- `YEARS` self explanatory, only whole years
- Function returns {schedule, totalInterest, totalCost}
   -  schedule is an array in which each row contains a breakdown of the monthly payments



This project is licensed under the GNU Affero General Public License v3.0. The full license text is in the LICENSE file at the repo root.


