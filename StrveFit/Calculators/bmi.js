document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('result');
    const unitSwitch = document.getElementById('unit-switch');

    const heightCmInput = document.getElementById('height-cm');
    const heightFtInput = document.getElementById('height-ft');
    const heightInInput = document.getElementById('height-in');
    const weightInput = document.getElementById('weight');
    
   
    const heightLabel = document.getElementById('height-label');
    const weightLabel = document.getElementById('weight-label');
    const heightMetricDiv = document.getElementById('height-metric');
    const heightImperialDiv = document.getElementById('height-imperial');

    let isImperial = false; 

    
    unitSwitch.addEventListener('change', () => {
        isImperial = unitSwitch.checked;
        updateUI();
        clearInputsAndResult();
    });

    updateUI(); 

    function updateUI() {
        if (isImperial) {
          
            heightLabel.textContent = 'Height (ft/in):';
            weightLabel.textContent = 'Weight (lbs):';
            heightMetricDiv.style.display = 'none';
            heightImperialDiv.style.display = 'flex'; 
        } else {
            
            heightLabel.textContent = 'Height (cm):';
            weightLabel.textContent = 'Weight (kg):';
            heightMetricDiv.style.display = 'block';
            heightImperialDiv.style.display = 'none';
        }
    }

    function clearInputsAndResult() {
        heightCmInput.value = '';
        heightFtInput.value = '';
        heightInInput.value = '';
        weightInput.value = '';
        resultDiv.innerHTML = '';
        resultDiv.className = '';
    }

  
    calculateBtn.addEventListener('click', calculateBMI);

    function calculateBMI() {
        let weight, heightInMeters;

        if (isImperial) {
           
            const weightLbs = parseFloat(weightInput.value);
            const heightFt = parseFloat(heightFtInput.value) || 0;
            const heightIn = parseFloat(heightInInput.value) || 0;

            if (isNaN(weightLbs) || weightLbs <= 0 || (heightFt === 0 && heightIn === 0)) {
                resultDiv.innerHTML = '<p class="error">Please enter valid weight and height in imperial units.</p>';
                return;
            }

           
            const totalInches = (heightFt * 12) + heightIn;
            heightInMeters = totalInches * 0.0254;
            weight = weightLbs * 0.453592; 
        } else {
            
            const heightCm = parseFloat(heightCmInput.value);
            const weightKg = parseFloat(weightInput.value);

            if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
                resultDiv.innerHTML = '<p class="error">Please enter valid height and weight in metric units.</p>';
                return;
            }

            heightInMeters = heightCm / 100; 
            weight = weightKg;
        }

     
        const bmi = weight / (heightInMeters * heightInMeters);

        displayResult(bmi);
    }

    function displayResult(bmi) {
        const bmiValue = bmi.toFixed(2);
        let category = '';
        let resultClass = '';

        if (bmi < 18.5) {
            category = 'Underweight';
            resultClass = 'result-underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal weight';
            resultClass = 'result-normal-weight';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
            resultClass = 'result-overweight';
        } else {
            category = 'Obesity';
            resultClass = 'result-obesity';
        }

        resultDiv.innerHTML = `
            <h2>Your BMI: ${bmiValue}</h2>
            <p>Category: <strong>${category}</strong></p>
        `;
        resultDiv.className = `calculator-result ${resultClass}`;
    }
});