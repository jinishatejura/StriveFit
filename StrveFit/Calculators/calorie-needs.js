document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', calculateTargetCalories);

    function calculateTargetCalories() {
        const tdee = parseFloat(document.getElementById('tdee').value);
        const goal = document.getElementById('goal').value;

        if (isNaN(tdee) || tdee < 1000) {
            resultDiv.innerHTML = '<p class="error">Please enter a valid TDEE value (must be 1000 or greater).</p>';
            return;
        }

        let targetCalories = tdee;
        let deficitOrSurplus = 0;
        let goalText = '';

        switch (goal) {
            case 'lose_aggressive':
                deficitOrSurplus = -750;
                goalText = 'Aggressive Weight Loss (Approx. 1.5 lbs/week)';
                break;
            case 'lose_moderate':
                deficitOrSurplus = -500;
                goalText = 'Moderate Weight Loss (Approx. 1 lb/week)';
                break;
            case 'maintain':
                deficitOrSurplus = 0;
                goalText = 'Maintenance';
                break;
            case 'gain_moderate':
                deficitOrSurplus = 250;
                goalText = 'Moderate Weight Gain (Approx. 0.5 lbs/week)';
                break;
            case 'gain_aggressive':
                deficitOrSurplus = 500;
                goalText = 'Aggressive Weight Gain (Approx. 1 lb/week)';
                break;
        }

        targetCalories = tdee + deficitOrSurplus;

        if (targetCalories < 1200) {
            resultDiv.innerHTML = '<p class="error">Calculated calorie intake is too low. Consult a professional or choose a less aggressive goal.</p>';
            return;
        }

        displayResult(targetCalories, goalText, deficitOrSurplus);
    }

    function displayResult(targetCalories, goalText, deficitOrSurplus) {
        const formattedTarget = Math.round(targetCalories);
        
        let surplusText = deficitOrSurplus === 0 
            ? 'No adjustment needed.' 
            : `${deficitOrSurplus > 0 ? 'Surplus' : 'Deficit'}: ${Math.abs(deficitOrSurplus)} calories`;

        resultDiv.innerHTML = `
            <h2>Your Daily Target: ${formattedTarget} calories</h2>
            <p><strong>Goal:</strong> ${goalText}</p>
            <p><strong>Adjustment:</strong> ${surplusText}</p>
            <p class="note">This target is an estimate. Adjust based on real-world results.</p>
        `;
        resultDiv.className = 'calculator-result'; 
    }
});