# 📋 Tax Pulse Studio | W-2 & Investment Tax Filing Estimator

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

A private, client-side W-2 and investment tax filing simulator tailored for Maryland state and Montgomery County local income tax rules. Designed to provide instant financial clarity on your April tax filing status (Estimated Refund vs. Balance Due) without sharing data with third-party servers.

---

## 🚀 Live Demo

🔗 **[Launch Tax Pulse Studio](https://caspian1988.github.io/tax-pulse-studio/)**

---

## ✨ Features

- **Full W-2 Box Mapping**: Dedicated input fields for W-2 Box 1 (Taxable Wages), Box 2 (Federal Tax Withheld), Boxes 3–6 (FICA Wages & Taxes), Box 17 (MD State Tax Withheld), and Box 19 (Montgomery County Tax Withheld).
- **1099 Investment Income Support**: Calculates tax impacts from dividends and interest (e.g., Fidelity FXAIX / SPAXX distributions).
- **Localized MD & Montgomery County Math**: Applies progressive Maryland state tax brackets and Montgomery County's 3.20% local rate accurately against gross taxable bases.
- **April Refund & Owed Telemetry**: Dynamic visual card showing whether you are due a refund (Green) or owe a tax balance (Red) in real time.
- **100% Local & Private**: Runs entirely in client-side JavaScript. No sensitive income data ever leaves your device.

---

## 🛠️ Tech Stack & Tax Engine

- **Frontend**: HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript (ES6+)
- **Icons**: FontAwesome v6
- **Tax Rules Enforced**: 
  - Progressive Federal Income Tax Brackets
  - Maryland Progressive State Tax Brackets ($2,700 MD Standard Deduction Cap)
  - Montgomery County Local Income Tax (3.20% Flat Rate)
  - FICA Payroll Audit Tracking (6.2% Social Security + 1.45% Medicare)

---

## 💻 Local Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Caspian1988/tax-pulse-studio.git](https://github.com/Caspian1988/tax-pulse-studio.git)
