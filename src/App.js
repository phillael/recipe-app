import React, { useState } from "react";
import recipeStyles from "./recipe.module.scss";
const {
  main,
  btn,
  recipe,
  instructions,
  ingredientList,
  openList,
} = recipeStyles;

const App = () => {
  const [meal, setMeal] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [open, setOpen] = useState(false);

  const apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

  const getMeal = async () => {
    const response = await fetch(apiUrl);
    const foodData = await response.json();
    const mealData = foodData.meals[0];
    await setMeal(mealData);
    getIngredients(mealData);

    console.log(meal);
  };

  const getIngredients = (meal) => {
    const mealIngredients = [];

    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        mealIngredients.push(
          meal[`strIngredient${i}`] + " - " + meal[`strMeasure${i}`]
        );
      } else {
        break;
      }
    }
    setIngredients(mealIngredients);
    // console.log(mealIngredients);
  };

  return (
    <div className={main}>
      <header>
        <h1>Let's cook something!</h1>
        <button className={btn} onClick={getMeal}>
          Get Food!
        </button>
      </header>

      {meal && (
        <div className={recipe}>
          <h2>OMG!!! {meal.strMeal}</h2>

          <div>
            <img src={meal.strMealThumb} alt="here is your meal!" />
            <div className={instructions}>
              <p>{meal.strInstructions}</p>
            </div>
          </div>
          <button onClick={() => setOpen((prev) => !prev)} className={btn}>
            See ingredient list!
          </button>

          <div className={`${ingredientList} ${open && openList}`}>
            <ul>
              {ingredients.map((ingredient) => {
                return <li key={Math.random()}>{ingredient}</li>;
              })}
            </ul>
          </div>
        </div>
      )}
      <footer>
        <p>Copyright Phill Aelony 2021</p>
        <a href="https://www.phillcodes.com">www🍤phillcodes🍤com</a>
      </footer>
    </div>
  );
};

export default App;
