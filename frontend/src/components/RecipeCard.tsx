import Image from "next/image";
import Link from "next/link";
import { Clock, Users, ArrowRight } from "lucide-react";
import type { Recipe } from "@/lib/api";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const image =
    recipe.image_url ||
    "https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all flex flex-col"
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <Image
          src={image}
          alt={recipe.title}
          width={800}
          height={500}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {recipe.difficulty && (
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-forest-light text-white rounded-full text-xs font-bold">
              {recipe.difficulty}
            </span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center text-forest/40 text-sm mb-3 space-x-4">
          {recipe.prep_time && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {recipe.prep_time}
            </div>
          )}
          {recipe.serving_size && (
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {recipe.serving_size}
            </div>
          )}
        </div>
        <h3 className="text-lg font-bold text-forest mb-2 group-hover:text-forest-light transition-colors">
          {recipe.title}
        </h3>
        {recipe.description && (
          <p className="text-forest/60 text-sm mb-4 line-clamp-2 flex-1">{recipe.description}</p>
        )}
        <div className="flex items-center text-forest-light font-bold text-sm group-hover:gap-3 transition-all">
          Read Recipe
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
