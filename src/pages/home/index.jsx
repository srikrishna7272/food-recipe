import { useContext } from "react";
import { GlobalContext } from "../../context";
import RecipeItem from "../../components/recipe-Item";

export default function Home() {
  const { loading, recipeList } = useContext(GlobalContext);
  if (loading) {
    return <h2>Loading Data ! Please Wait</h2>;
  }
  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {recipeList && recipeList.length > 0 ? (
        recipeList.map((item) => <RecipeItem item={item} />)
      ) : (
        <div>
          <p className="lg: text-4xl text-xl text-center text-black font-extrabold">
            Nothing to show ! Please search something
          </p>
        </div>
      )}
    </div>
  );
}
