import type { Drink } from "../types"
import { useAppStore } from "../stores/useAppStore"

type DrinkCartProps = {
    drink: Drink
}

export default function DrinkCart({drink}: DrinkCartProps) {

  const selectRecipe = useAppStore((state) => state.selectRecipe)
  return (
    <div className="border-none shadow-lg">
        <div className="overflow-hidden">
            <img 
                src={drink.strDrinkThumb} 
                alt={`Imagen de ${drink.strDrink}`}
                className="hover:scale-125 transition-transform hover:rotate-2"
            />
        </div>

        <div className="p-5">
            <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>

            <button
                className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg cursor-pointer transition-colors"
                type="button"
                onClick={() => selectRecipe(drink.idDrink)}
            >Ver receta</button>
        </div>
    </div>
  )
}
