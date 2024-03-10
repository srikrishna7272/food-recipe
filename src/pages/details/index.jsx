/* eslint-disable react/jsx-key */
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Details() {
  const params = useParams();
  const { recipeDetailsData, setRecipedetailsData, handleaddToFavorite, favoritesList } = useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${params.id}`);
      const data = await response.json();
      if (data.data) {
        setRecipedetailsData(data?.data);
      }
    }
    getRecipeDetails();
  }, []);
  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg: grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData?.recipe?.image_url}
            className="
            w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">{recipeDetailsData?.recipe?.publisher}</span>
        <h3 className="font-bold text-2xl truncate text-black">{recipeDetailsData?.recipe?.title}</h3>
        <div>
          <button
            onClick={() => handleaddToFavorite(recipeDetailsData?.recipe)}
            className="text-sm p-3 px-8 rounded-lg uppercase font-medium tracking-wider inline-block shadow-md mt-5 bg-black text-white"
          >
            {favoritesList &&
            favoritesList.length > 0 &&
            favoritesList.findIndex((item) => item.id === recipeDetailsData?.recipe?.id) !== -1
              ? "Remove From Favorites"
              : "Add to Favorites"}
          </button>
        </div>
        <div>
          <span className="text-2xl font-semibold text-black">Ingredients:</span>
          <ul className="flex flex-col gap-3">
            {recipeDetailsData?.recipe?.ingredients.map((ingredient) => (
              <li>
                <span className="text-2xl font-semibold text-black mr-2">
                  {ingredient.quantity} {ingredient.unit}
                </span>

                <span className="text-2xl font-semibold text-black">{ingredient.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
