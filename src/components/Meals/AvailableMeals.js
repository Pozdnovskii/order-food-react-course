import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://nepozdno-react-movies-default-rtdb.europe-west1.firebasedatabase.app/meals.json');

      if (!response.ok) {
        throw new Error('Something went wrong');
      };

      const data = await response.json();

      const loadedMeals = [];

      for (const key in data) {
        // console.log(typeof(key))
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false)
    };

    getData().catch(error => {
      setError(error.message);
      setIsLoading(false);
    });
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  let content;

  if (mealsList.length > 0) {
    content = <ul>{mealsList}</ul>;
  };

  if (error) {
    content = <p className={classes.message}>{error}</p>
  }

  if (isLoading) {
    content = <p className={classes.message}>Loading ...</p>;
  };

  return (
    <section className={classes.meals}>
      <Card>
        {content}
      </Card>
    </section>
  );
};

export default AvailableMeals;
