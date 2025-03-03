document.getElementById('predictionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    // Collect form data
    const formData = {};
    const inputs = document.querySelectorAll('#predictionForm input');
    inputs.forEach((input) => {
      if (input.type === 'checkbox') {
        formData[input.name] = input.checked;
      } else {
        formData[input.name] = input.value;
      }
    });
  
    // Clear previous result
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = '';
    resultDiv.className = '';
  
    try {
      // Send POST request to Flask backend
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        resultDiv.textContent = `Predicted Price: $${result.prediction.toFixed(2)}`;
        resultDiv.className = 'success';
      } else {
        resultDiv.textContent = result.error || 'An error occurred';
        resultDiv.className = 'error';
      }
    } catch (err) {
      resultDiv.textContent = 'Failed to connect to the server';
      resultDiv.className = 'error';
    }
  });