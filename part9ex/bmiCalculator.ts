function calculateBMI(heightInCm: number, weightInKg: number): string {
  const BMI = weightInKg / Math.pow(heightInCm / 100, 2);

  let phrase = `BMI: ${BMI.toFixed(2)} - `;
  if (BMI < 18.5) return phrase + "Underweight";
  if (BMI > 24.9) return phrase + "Overweight";
  
  return phrase + "Normal"
}

console.log(calculateBMI(180, 74));
console.log(calculateBMI(192, 78));
console.log(calculateBMI(150, 90));
console.log(calculateBMI(187, 46));