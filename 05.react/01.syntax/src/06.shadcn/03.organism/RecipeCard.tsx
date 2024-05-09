import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/06.shadcn/02.molecule/card"
import { Button } from "@/06.shadcn/01.atom/button";

interface Recipe {
    id: string;
    title: string;
    image: string;
    time: number;
    description: string;
    vegan: boolean;
}

export default function RecipeCard(){
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/db.json');
          const data = await response.json();
          setRecipes(data.recipes);
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      };
  
      fetchData();
    }, []);

    return (
        <main>
            {/* tailwind로 grid, flexbox를 써서 카드 정렬 */}
            <div className="grid grid-cols-3 gap-8"> 
                {recipes.map(recipe=> (
                    <Card key={recipe.id} className="flex flex-col justify-between">
                        <CardHeader className="flex-row gap-4 items-center">
                            <div>
                                <CardTitle>{recipe.title}</CardTitle>
                                <CardDescription>{recipe.time}min to cook</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p>{recipe.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button>View Recipe</Button>
                            {recipe.vegan && <Button variant="secondary">Vegan</Button>}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </main>
    )
}