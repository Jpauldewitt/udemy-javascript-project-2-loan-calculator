// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
    // Hide results
    document.getElementById('results').style.display = 'none';

    // Show loader
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 1500);

    e.preventDefault();
});

// Calculate Results
function calculateResults() {
    console.log('Calculating...');
    //UI Variables
    const userAmount = document.getElementById('amount');
    const userInterest = document.getElementById('interest');
    const userYears = document.getElementById('years');
    const userMonthlyPayment = document.getElementById('monthly-payment');
    const userTotalPayment = document.getElementById('total-payment');
    const userTotalInterest = document.getElementById('total-interest');

    const principal = parseFloat(userAmount.value);
    const calculatedInterest = parseFloat(userInterest.value) / 100 / 12;
    const calculatedPayments = parseFloat(userYears.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        userMonthlyPayment.value = monthly.toFixed(2);
        userTotalPayment.value = (monthly * calculatedPayments).toFixed(2);
        userTotalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        // Show results
        document.getElementById('results').style.display = 'block';
        // Hide loader
        document.getElementById('loading').style.display = 'none';
    }

    else {
        showError('Please make sure you enter all fields')
    }
}

// Show Error
function showError(error) {
    // Show results
    document.getElementById('loading').style.display = 'none';

    // Show results
    document.getElementById('results').style.display = 'none';
    // Hide loader
    document.getElementById('loading').style.display = 'none';

    // Create a div
    const errorDiv = document.createElement('div');

    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 2.5 seconds - - milliseconds 
    setTimeout(clearError, 2500);

    // Clear error
    function clearError() {
        document.querySelector('.alert').remove();
    }
}