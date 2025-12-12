document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');

    calculateBtn.addEventListener('click', calculateOneRepMax);

    function calculateOneRepMax() {
    
        const weight = parseFloat(document.getElementById('weight').value);
        const reps = parseFloat(document.getElementById('reps').value);

        if (isNaN(weight) || isNaN(reps) || weight <= 0 || reps < 2 || reps > 15) {
            resultDiv.innerHTML = '<p class="error">Please enter valid weight and reps (2 to 15 reps are ideal for accuracy).</p>';
            return;
        }

        const oneRepMax = weight * (1 + (reps / 30));

        displayResult(oneRepMax, weight, reps);
    }

    function displayResult(oneRepMax, weight, reps) {
        
        const formatted1RM = oneRepMax.toFixed(1);

        const chartData = [
            { reps: 1, percent: 1.00 },
            { reps: 2, percent: 0.97 },
            { reps: 5, percent: 0.88 },
            { reps: 8, percent: 0.80 },
            { reps: 10, percent: 0.75 },
            { reps: 12, percent: 0.70 }
        ];

        let chartHTML = chartData.map(item => {
            const calculatedWeight = (oneRepMax * item.percent).toFixed(1);
            return `
                <tr>
                    <td>${item.reps}</td>
                    <td>${(item.percent * 100).toFixed(0)}%</td>
                    <td>${calculatedWeight}</td>
                </tr>
            `;
        }).join('');

        resultDiv.innerHTML = `
            <h2>Estimated 1RM:</h2>
            <p class="tdee-result"><strong>${formatted1RM} kg/lbs</strong></p>
            <p class="note">Based on ${weight} kg/lbs for ${reps} reps.</p>

            <h3 style="margin-top:20px; color:#333;">Estimated Rep Range Chart</h3>
            <table class="rep-chart">
                <thead>
                    <tr>
                        <th>Reps</th>
                        <th>% of 1RM</th>
                        <th>Weight</th>
                    </tr>
                </thead>
                <tbody>
                    ${chartHTML}
                </tbody>
            </table>
        `;
        resultDiv.className = 'calculator-result';
    }
});