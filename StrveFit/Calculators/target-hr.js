document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', calculateTHR);

    function calculateTHR() {

        const age = parseFloat(document.getElementById('age').value);
        const rhr = parseFloat(document.getElementById('rhr').value);
        const zoneValue = document.getElementById('zone').value;
        if (isNaN(age) || isNaN(rhr) || age < 10 || rhr < 30) {
            resultDiv.innerHTML = '<p class="error">Please enter valid values for Age and Resting Heart Rate.</p>';
            return;
        }
        
        const mhr = 220 - age;

        const hrr = mhr - rhr;
        
        const [lowP, highP] = zoneValue.split('-').map(p => parseFloat(p) / 100);
        const thrLow = (hrr * lowP) + rhr;
        
        const thrHigh = (hrr * highP) + rhr;

        displayResult(thrLow, thrHigh, mhr, rhr, zoneValue);
    }

    function displayResult(thrLow, thrHigh, mhr, rhr, zoneName) {
        
        const low = Math.round(thrLow);
        const high = Math.round(thrHigh);

        resultDiv.innerHTML = `
            <h2>Your Target Heart Rate Zone</h2>
            <p class="tdee-result"><strong>${low} - ${high} BPM</strong></p>
            <p>To reach the **${zoneName}%** intensity zone, aim to keep your heart rate between these two numbers.</p>
            <hr style="border: 0; border-top: 1px dashed #ccc; margin: 10px 0;">
            <p><small>Maximum Heart Rate (MHR): ${mhr} BPM</small></p>
            <p><small>Resting Heart Rate (RHR): ${rhr} BPM</small></p>
        `;
        resultDiv.className = 'calculator-result'; 
    }
});