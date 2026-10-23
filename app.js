document.addEventListener('DOMContentLoaded', () => {
    calculateTaxFiling();
});

function calculateTaxFiling() {
    // 1. Get Filing Inputs & W-2 Boxes
    const filingStatus = document.getElementById('filing-status').value;
    
    // Income Boxes
    const w2Box1 = parseFloat(document.getElementById('w2-box1').value) || 0;
    const investIncome = parseFloat(document.getElementById('investment-income').value) || 0;
    const totalGross = w2Box1 + investIncome;

    // Withholding Boxes
    const fedWithheld = parseFloat(document.getElementById('w2-box2').value) || 0;
    const ssWithheld = parseFloat(document.getElementById('w2-box4').value) || 0;
    const medWithheld = parseFloat(document.getElementById('w2-box6').value) || 0;
    const stateWithheld = parseFloat(document.getElementById('w2-box17').value) || 0;
    const countyWithheld = parseFloat(document.getElementById('w2-box19').value) || 0;

    const totalFicaPaid = ssWithheld + medWithheld;

    // 2. Federal Tax Calculation
    const fedStandardDeduction = filingStatus === 'joint' ? 32200 : 16100;
    const fedTaxableIncome = Math.max(0, totalGross - fedStandardDeduction);

    let fedTaxOwed = 0;
    if (filingStatus === 'single') {
        if (fedTaxableIncome <= 12400) {
            fedTaxOwed = fedTaxableIncome * 0.10;
        } else if (fedTaxableIncome <= 50400) {
            fedTaxOwed = 1240 + (fedTaxableIncome - 12400) * 0.12;
        } else if (fedTaxableIncome <= 105700) {
            fedTaxOwed = 5800 + (fedTaxableIncome - 50400) * 0.22;
        } else {
            fedTaxOwed = 17966 + (fedTaxableIncome - 105700) * 0.24;
        }
    } else {
        if (fedTaxableIncome <= 24800) {
            fedTaxOwed = fedTaxableIncome * 0.10;
        } else if (fedTaxableIncome <= 100800) {
            fedTaxOwed = 2480 + (fedTaxableIncome - 24800) * 0.12;
        } else if (fedTaxableIncome <= 211400) {
            fedTaxOwed = 11600 + (fedTaxableIncome - 100800) * 0.22;
        } else {
            fedTaxOwed = 35932 + (fedTaxableIncome - 211400) * 0.24;
        }
    }

    // 3. Maryland State Tax Calculation
    const mdStandardDeduction = filingStatus === 'joint' ? 5400 : 2700;
    const mdTaxableIncome = Math.max(0, totalGross - mdStandardDeduction);

    let stateTaxOwed = 0;
    if (mdTaxableIncome > 0) {
        if (mdTaxableIncome <= 1000) {
            stateTaxOwed = mdTaxableIncome * 0.02;
        } else if (mdTaxableIncome <= 2000) {
            stateTaxOwed = 20 + (mdTaxableIncome - 1000) * 0.03;
        } else if (mdTaxableIncome <= 3000) {
            stateTaxOwed = 50 + (mdTaxableIncome - 2000) * 0.04;
        } else if (mdTaxableIncome <= 100000) {
            stateTaxOwed = 90 + (mdTaxableIncome - 3000) * 0.0475;
        } else if (mdTaxableIncome <= 125000) {
            stateTaxOwed = 4697.50 + (mdTaxableIncome - 100000) * 0.05;
        } else {
            stateTaxOwed = 5947.50 + (mdTaxableIncome - 125000) * 0.0525;
        }
    }

    // 4. Montgomery County Tax (3.20%)
    const countyTaxOwed = totalGross * 0.032;

    // 5. Total Liability vs Total Income Tax Withheld
    const totalTaxLiability = fedTaxOwed + stateTaxOwed + countyTaxOwed;
    const totalWithheld = fedWithheld + stateWithheld + countyWithheld;
    const netDifference = totalWithheld - totalTaxLiability;

    // 6. Update UI Status Card
    const statusCard = document.getElementById('refund-status-card');
    const statusTitle = document.getElementById('status-title');
    const statusVal = document.getElementById('final-balance-val');
    const statusSub = document.getElementById('status-subtext');

    if (netDifference >= 0) {
        statusCard.className = 'result-highlight refund-positive';
        statusTitle.innerText = 'ESTIMATED REFUND DUE TO YOU';
        statusVal.innerText = `+$${netDifference.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        statusSub.innerText = 'You overpaid your income taxes. IRS & Maryland will issue a refund!';
    } else {
        statusCard.className = 'result-highlight refund-negative';
        statusTitle.innerText = 'ESTIMATED TAX BALANCE DUE';
        statusVal.innerText = `-$${Math.abs(netDifference).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        statusSub.innerText = 'Your withholdings were less than your tax bill. Balance due in April.';
    }

    // Helper function
    const updateEl = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    };

    const formatDiff = (owed, withheld) => {
        const diff = withheld - owed;
        if (diff >= 0) {
            return `$${owed.toFixed(2)} owed | $${withheld.toFixed(2)} paid (+$${diff.toFixed(2)})`;
        } else {
            return `$${owed.toFixed(2)} owed | $${withheld.toFixed(2)} paid (-$${Math.abs(diff).toFixed(2)})`;
        }
    };

    updateEl('total-gross-val', `$${totalGross.toLocaleString()}`);
    updateEl('fed-deduction-val', `$${fedStandardDeduction.toLocaleString()}`);
    updateEl('fed-diff-val', formatDiff(fedTaxOwed, fedWithheld));
    updateEl('state-diff-val', formatDiff(stateTaxOwed, stateWithheld));
    updateEl('county-diff-val', formatDiff(countyTaxOwed, countyWithheld));
    updateEl('fica-paid-val', `$${totalFicaPaid.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`);
    updateEl('total-liability-val', `$${totalTaxLiability.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`);
    updateEl('total-withheld-val', `$${totalWithheld.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`);
}