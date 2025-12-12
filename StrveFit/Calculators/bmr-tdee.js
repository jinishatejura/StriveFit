document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', calculateBMRandTDEE);

    function calculateBMRandTDEE() {
        
        const gender = document.getElementById('gender').value;
        const age = parseFloat(document.getElementById('age').value);
        const heightCm = parseFloat(document.getElementById('height').value);
        const weightKg = parseFloat(document.getElementById('weight').value);
        const activityMultiplier = parseFloat(document.getElementById('activity').value);

        if (isNaN(age) || isNaN(heightCm) || isNaN(weightKg) || age <= 0 || heightCm <= 0 || weightKg <= 0) {
            resultDiv.innerHTML = '<p class="error">Please enter valid positive numbers for all fields.</p>';
            return;
        }

        let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);

        if (gender === 'male') {
            bmr += 5;
        } else { 
            bmr -= 161;
        }

        const tdee = bmr * activityMultiplier;

        displayResult(bmr, tdee);
    }

    function displayResult(bmr, tdee) {
        
        const formattedBMR = Math.round(bmr);
        const formattedTDEE = Math.round(tdee);

        resultDiv.innerHTML = `
            <h2>Your Calorie Needs</h2>
            <p><strong>Basal Metabolic Rate (BMR):</strong> ${formattedBMR} calories/day</p>
            <p class="tdee-result"><strong>Total Daily Energy Expenditure (TDEE):</strong> ${formattedTDEE} calories/day</p>
            <p class="note">TDEE is the estimated number of calories you burn, including exercise. This is your maintenance intake.</p>
        `;
      
        resultDiv.className = 'calculator-result'; 
    }
});