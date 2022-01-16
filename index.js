function bmiCalculator() {
    validateNumberOfInputs(process.argv);

    const weightInKg = parseInt(process.argv[2]);
    const heightInM = parseFloat(process.argv[3]);
    const age = parseInt(process.argv[4]);
    const exercisesDaily = process.argv[5];
    const gender = process.argv[6];

    validateWeightHeightAndAge(weightInKg, heightInM, age);
    validateExercise(exercisesDaily);
    validateGender(gender);

    const BMI = calculateBMI(weightInKg, heightInM);
    const idealWeight = calculateIdealWeight(heightInM);
    const BMR = calculateBMR(weightInKg, heightInM, age, gender);
    const caloriesBurnt = calculateCaloriesBurnt(BMR, exercisesDaily);
    /* const weightToLoseKg = calculateWeightToLose(weightInKg, idealWeight); */
    const weightToLoseKg = weightInKg - idealWeight;
    const weeksToGoal = Math.abs(weightToLoseKg / 0.5);
    /* const caloriesToConsume = weightToLoseKg < 0 ? caloriesBurnt + 500 : caloriesBurnt - 500; */
    const caloriesToConsume = calculateCaloriesToConsume(weightToLoseKg, caloriesBurnt);

    const output = formatOutput(age, gender, heightInM, weightInKg, exercisesDaily, BMI, idealWeight, caloriesBurnt, caloriesToConsume, weeksToGoal);

    const user = {
        age: age,
        gender: gender,
        heightInM: heightInM,
        weightInKg: weightInKg,
        exercisesDaily: exercisesDaily,
        BMI: BMI,
        idealWeight: idealWeight,
        caloriesBurnt: caloriesBurnt,
        caloriesToConsume: caloriesToConsume,
        weeksToGoal: weeksToGoal,
    }

    console.log(user);
    console.log(output);
}

bmiCalculator();

// VALIDATION
function validateNumberOfInputs(input) {
    if (input.length !== 7) {
        console.log(`You have given me the wrong number of inputs. There should be 5 but you gave me ${input.length - 2}.`);
        process.exit();
    }
}

function validateWeightHeightAndAge(weightInKg, heightInM, age) {
    if (isNaN(weightInKg)) {
        console.log(`Your weight should be a number, for example: '92'. Your input was ${weightInKg}.`);
        process.exit();
    } else if (weightInKg < 30 || weightInKg > 300) {
        console.log(`Your weight is outside of the range. It should be between 30 and 300`);
        process.exit();
    } else if (isNaN(heightInM)) {
        console.log(`Your height should be a number, for example: '1.78'. Your input was ${heightInM}.`);
        process.exit();
    } else if (isNaN(age)) {
        console.log(`Your age should be a number, for example: '35'. Your input was ${age}`);
        process.exit();
    } else if (age < 20) {
        console.log(`You are too young, your age should be at least 20. Your input was ${age}`);
        process.exit();
    }
}

function validateExercise(exercisesDaily) {
    if (exercisesDaily !== "yes" && exercisesDaily !== "no") {
        console.log(`The answer to "do you exercise daily?" should be "yes" or "no". Your input was ${exercisesDaily}.`);
        process.exit();
    }
}

function validateGender(gender) {
    if (gender !== "m" && gender !== "f") {
        console.log(`Your gender should be "m" or "f". Your input was ${gender}.`);
        process.exit();
    }
}

// CALCULATION
function calculateBMI(weightInKg, heightInM) {
    return Math.round(weightInKg / (heightInM ** 2));
    /* console.log(weightInKg / (heightInM ** 2)); */ //Why is this not working? It's talking about unreachable code
}

function calculateIdealWeight(heightInM) {
    return Math.round(22.5 * (heightInM ** 2));
}

function calculateBMR(weightInKg, heightInM, age, gender) {
    if (gender === "m") {
        return Math.round((10 * weightInKg) + (6.25 * heightInM * 100) - (5 * age) + 50);
    } else {
        return Math.round((10 * weightInKg) + (6.25 * heightInM * 100) - (5 * age) - 150);
    }
}

function calculateCaloriesBurnt(BMR, exercisesDaily) {
    if (exercisesDaily === "yes") {
        return Math.round(BMR * 1.6);
    } else {
        return Math.round(BMR * 1.4);
    }
}

/* function calculateWeightToLose(weightInKg, idealWeight) {
    return weightInKg - idealWeight;
} */

function calculateCaloriesToConsume(weightToLoseKg, caloriesBurnt) {
    if (weightToLoseKg < 0) {
        return caloriesBurnt + 500;
    } else if (weightToLoseKg > 0) {
        return caloriesBurnt - 500;
    } else {
        return 0;
    }
}

// OUTPUT
function formatOutput(age, gender, heightInM, weightInKg, exercisesDaily, BMI, idealWeight, caloriesBurnt, caloriesToConsume, weeksToGoal) {
    return `
    **************
    BMI CALCULATOR
    **************
    
    Age: ${age} years
    Gender: ${gender}
    Height: ${heightInM} m
    Weight: ${weightInKg} kg
    Exercises Daily: ${exercisesDaily}
    
    ****************
    FACING THE FACTS
    ****************
    
    Your BMI is ${BMI}
    
    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight
    
    Your ideal weight is ${idealWeight} kg
    With a normal lifestyle you burn ${caloriesBurnt} calories a day
    
    **********
    DIET PLAN
    **********
    
    ${caloriesToConsume === 0 ? `Congratulations! You are already at your ideal weight` :
    `If you want to reach your ideal weight of ${idealWeight} kg:
    
    Eat ${caloriesToConsume} calories a day for ${weeksToGoal} weeks`}`
}