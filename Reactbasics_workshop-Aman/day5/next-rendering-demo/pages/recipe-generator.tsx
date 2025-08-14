import { useState } from 'react';
import { GetStaticProps } from 'next';
import { fruits as fruitList } from '../data/fruits';
import styles from '../styles/Home.module.css';

// defined types for our state
type Recipe = {
  title: string;
  ingredients: string[];
  instructions: string[];
};

interface Props {
  availableFruits: string[];
}

const RecipeGeneratorPage = ({ availableFruits }: Props) => {
  const [selectedFruits, setSelectedFruits] = useState<Set<string>>(new Set());
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFruitToggle = (fruit: string) => {
    const newSelection = new Set(selectedFruits);
    if (newSelection.has(fruit)) {
      newSelection.delete(fruit);
    } else {
      newSelection.add(fruit);
    }
    setSelectedFruits(newSelection);
  };

  const generateRecipe = async () => {
    if (selectedFruits.size === 0) {
        setError('Please select at least one fruit.');
        return;
    }
    setIsLoading(true);
    setError('');
    setRecipe(null);

    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fruits: Array.from(selectedFruits) }),
      });

      if (!response.ok) {
        throw new Error('Failed to get a recipe from the server.');
      }
      
      const data: Recipe = await response.json();
      setRecipe(data);

    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>AI Recipe Suggester</h1>
        <p className={styles.description}>Select the fruits you have, and let AI create a recipe!</p>

        <div>
          {availableFruits.map((fruit) => (
            <label key={fruit} style={{ marginRight: '15px', textTransform: 'capitalize' }}>
              <input
                type="checkbox"
                checked={selectedFruits.has(fruit)}
                onChange={() => handleFruitToggle(fruit)}
              />
              {fruit}
            </label>
          ))}
        </div>

        <button onClick={generateRecipe} disabled={isLoading} style={{marginTop: '20px'}}>
          {isLoading ? 'Crafting Recipe...' : 'Generate Recipe'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {recipe && (
          <div className={styles.card} style={{textAlign: 'left', marginTop: '30px'}}>
            <h2>{recipe.title}</h2>
            <h4>Ingredients:</h4>
            <ul>{recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}</ul>
            <h4>Instructions:</h4>
            <ol>{recipe.instructions.map(inst => <li key={inst}>{inst}</li>)}</ol>
          </div>
        )}
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      availableFruits: fruitList,
    },
  };
};

export default RecipeGeneratorPage;