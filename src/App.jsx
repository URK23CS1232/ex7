import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");
  const [statusClass, setStatusClass] = useState("");

  const calculateBMI = () => {
    // Enhanced validation
    if (height.trim() === "" || weight.trim() === "") {
      alert("Please enter both height and weight!");
      return;
    }

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (isNaN(heightNum) || isNaN(weightNum)) {
      alert("Please enter valid numbers for height and weight!");
      return;
    }

    if (heightNum <= 0 || weightNum <= 0) {
      alert("Height and weight must be positive numbers!");
      return;
    }

    if (heightNum < 50 || heightNum > 250) {
      alert("Please enter a valid height between 50cm and 250cm!");
      return;
    }

    if (weightNum < 10 || weightNum > 300) {
      alert("Please enter a valid weight between 10kg and 300kg!");
      return;
    }

    // Calculate BMI - FIXED FORMULA
    const heightInMeters = heightNum / 100;
    const bmiValue = weightNum / (heightInMeters * heightInMeters);
    const roundedBMI = bmiValue.toFixed(1);

    setBmi(roundedBMI);

    // Determine BMI status
    const bmiNum = parseFloat(roundedBMI);
    if (bmiNum < 18.5) {
      setStatus("Underweight");
      setStatusClass("underweight");
    } else if (bmiNum >= 18.5 && bmiNum <= 24.9) {
      setStatus("Normal Weight");
      setStatusClass("normal");
    } else if (bmiNum >= 25 && bmiNum <= 29.9) {
      setStatus("Overweight");
      setStatusClass("overweight");
    } else {
      setStatus("Obese");
      setStatusClass("obese");
    }
  };

  const resetCalculator = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
    setStatus("");
    setStatusClass("");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center py-3">
              <h2 className="mb-0 fw-bold">
                <i className="fas fa-calculator me-2"></i>
                BMI Calculator
              </h2>
              <small className="opacity-75">Body Mass Index Calculator</small>
            </div>
            
            <div className="card-body p-4">
              {/* Height Input */}
              <div className="mb-4">
                <label htmlFor="height" className="form-label fw-semibold">
                  <i className="fas fa-ruler-vertical me-2 text-primary"></i>
                  Height (cm)
                </label>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter height in cm"
                  min="50"
                  max="250"
                  step="0.1"
                />
                <div className="form-text">
                  Enter your height in centimeters (50-250cm)
                </div>
              </div>

              {/* Weight Input */}
              <div className="mb-4">
                <label htmlFor="weight" className="form-label fw-semibold">
                  <i className="fas fa-weight me-2 text-primary"></i>
                  Weight (kg)
                </label>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight in kg"
                  min="10"
                  max="300"
                  step="0.1"
                />
                <div className="form-text">
                  Enter your weight in kilograms (10-300kg)
                </div>
              </div>

              {/* Buttons */}
              <div className="d-grid gap-3">
                <button
                  className="btn btn-primary btn-lg fw-bold"
                  onClick={calculateBMI}
                >
                  <i className="fas fa-calculator me-2"></i>
                  Calculate BMI
                </button>
                <button
                  className="btn btn-outline-secondary btn-lg"
                  onClick={resetCalculator}
                >
                  <i className="fas fa-redo me-2"></i>
                  Reset
                </button>
              </div>

              {/* Results Section */}
              {bmi !== null && (
                <div className="mt-4 results-section fade-in">
                  <div className="card border-0 bg-light">
                    <div className="card-header bg-transparent text-center">
                      <h4 className="mb-0 text-dark fw-bold">
                        <i className="fas fa-chart-line me-2"></i>
                        Your Results
                      </h4>
                    </div>
                    <div className="card-body text-center py-4">
                      {/* BMI Value */}
                      <div className={`bmi-value ${statusClass} display-4 fw-bold mb-3`}>
                        {bmi}
                      </div>
                      
                      {/* Status Badge */}
                      <div className={`status-badge ${statusClass} mb-4`}>
                        {status}
                      </div>

                      {/* BMI Scale Visualization */}
                      <div className="bmi-scale-container mb-3">
                        <div className="bmi-scale">
                          <div className={`scale-section underweight ${parseFloat(bmi) < 18.5 ? 'active' : ''}`}>
                            Underweight
                          </div>
                          <div className={`scale-section normal ${parseFloat(bmi) >= 18.5 && parseFloat(bmi) <= 24.9 ? 'active' : ''}`}>
                            Normal
                          </div>
                          <div className={`scale-section overweight ${parseFloat(bmi) >= 25 && parseFloat(bmi) <= 29.9 ? 'active' : ''}`}>
                            Overweight
                          </div>
                          <div className={`scale-section obese ${parseFloat(bmi) >= 30 ? 'active' : ''}`}>
                            Obese
                          </div>
                        </div>
                      </div>

                      {/* BMI Classification Guide */}
                      <div className="classification-guide">
                        <small className="text-muted">
                          <strong>BMI Classification:</strong>
                          <div className="d-flex justify-content-between mt-1">
                            <span className="text-warning">Underweight: &lt; 18.5</span>
                            <span className="text-success">Normal: 18.5 - 24.9</span>
                            <span className="text-warning">Overweight: 25 - 29.9</span>
                            <span className="text-danger">Obese: ≥ 30</span>
                          </div>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Instructions when no results */}
              {bmi === null && (
                <div className="mt-4 text-center">
                  <div className="card border-0 bg-light">
                    <div className="card-body">
                      <h5 className="text-muted">
                        <i className="fas fa-info-circle me-2"></i>
                        How to Use
                      </h5>
                      <p className="text-muted small mb-0">
                        Enter your height in centimeters and weight in kilograms, 
                        then click "Calculate BMI" to see your results.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;