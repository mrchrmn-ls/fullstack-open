interface Summary {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: string
}

const ratingDescriptions = ["You have to do better.", "Within the target range", "Exceeding expectations."];

function calculateExercises(dailyHours: Array<number>, target: number): Summary {
  let average = dailyHours.reduce((acc, elem) => acc + elem, 0) / dailyHours.length;
  let achievement = average / target;

  let rating = 2;
  if (achievement > 1.5) {
    rating = 3;
  }
  if (achievement < 0.75) {
    rating = 1;
  }
 
  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter(hours => hours !== 0).length,
    success: average >= target,
    rating,
    ratingDescription: ratingDescriptions[rating - 1],
    target,
    average: average.toFixed(2)
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));