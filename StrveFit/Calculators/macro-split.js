document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', calculateMacros);

    function calculateMacros() {
        const totalCalories = parseFloat(document.getElementById('calories').value);
        const proteinPercent = parseFloat(document.getElementById('protein').value);
        const carbsPercent = parseFloat(document.getElementById('carbs').value);
        const fatPercent = parseFloat(document.getElementById('fat').value);


        if (isNaN(totalCalories) || totalCalories < 1000) {
            resultDiv.innerHTML = '<p class="error">Please enter a valid daily calorie goal (1000 or more).</p>';
            return;
        }

        const totalPercent = proteinPercent + carbsPercent + fatPercent;
        if (totalPercent !== 100) {
            resultDiv.innerHTML = `<p class="error">The macro percentages must add up to 100%. Current total: ${totalPercent}%</p>`;
            return;
        }
        
    
        const P_CAL = totalCalories * (proteinPercent / 100);
        const C_CAL = totalCalories * (carbsPercent / 100);
        const F_CAL = totalCalories * (fatPercent / 100);

        const P_GRAMS = P_CAL / 4;
        
        const C_GRAMS = C_CAL / 4;
        
        const F_GRAMS = F_CAL / 9;

        displayResult(P_GRAMS, C_GRAMS, F_GRAMS, proteinPercent, carbsPercent, fatPercent);
    }

    function displayResult(pGrams, cGrams, fGrams, pP, cP, fP) {

        const pG = Math.round(pGrams);
        const cG = Math.round(cGrams);
        const fG = Math.round(fGrams);
        
        resultDiv.innerHTML = `
            <h2>Your Daily Macro Grams</h2>
            <div class="macro-results">
                <p><strong>Protein (${pP}%):</strong> ${pG} grams</p>
                <p><strong>Carbohydrates (${cP}%):</strong> ${cG} grams</p>
                <p><strong>Fat (${fP}%):</strong> ${fG} grams</p>
            </div>
            <p class="note">Total daily intake: ${pG + cG + fG} grams at ${pP}:${cP}:${fP} ratio.</p>
        `;
        resultDiv.className = 'calculator-result';
    }
});