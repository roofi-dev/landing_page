import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { getPageContent, getRecipeBySlug } from "@/lib/api";
import { ArrowLeft, Clock, Users, ChefHat, ListOrdered } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) return { title: "Recipe Not Found — Ladang Lima" };
  return {
    title: `${recipe.title} — Ladang Lima`,
    description: recipe.description || "Ladang Lima recipe",
  };
}

export default async function RecipeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [content, recipe] = await Promise.all([
    getPageContent(),
    getRecipeBySlug(slug),
  ]);

  if (!recipe) notFound();

  const image = recipe.image_url || "https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

  const ingredients = recipe.ingredients_list
    ? recipe.ingredients_list.split("\n").filter((line) => line.trim())
    : [];

  const instructions = recipe.instructions
    ? recipe.instructions.split("\n").filter((line) => line.trim())
    : [];

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <Navbar content={content.navbar} />

      <PageHeader
        title={recipe.title}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Recipes", href: "/recipes" },
          { label: recipe.title },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 text-forest/60 hover:text-[#4a7c59] transition-colors mb-12 text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Recipes
          </Link>

          {recipe.description && (
            <p className="text-forest/70 text-lg md:text-xl leading-relaxed mb-8">{recipe.description}</p>
          )}

          <div className="flex flex-wrap gap-6 mb-12 pb-12 border-b border-forest/10">
            {recipe.prep_time && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-[#4a7c59]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-forest/40 uppercase">Prep Time</p>
                  <p className="font-bold text-forest">{recipe.prep_time}</p>
                </div>
              </div>
            )}
            {recipe.serving_size && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center">
                  <Users className="h-5 w-5 text-[#4a7c59]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-forest/40 uppercase">Serves</p>
                  <p className="font-bold text-forest">{recipe.serving_size}</p>
                </div>
              </div>
            )}
            {recipe.difficulty && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest/5 flex items-center justify-center">
                  <ChefHat className="h-5 w-5 text-[#4a7c59]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-forest/40 uppercase">Difficulty</p>
                  <p className="font-bold text-forest">{recipe.difficulty}</p>
                </div>
              </div>
            )}
          </div>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl mb-16">
            <img src={image} alt={recipe.title} className="w-full h-full object-cover" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {ingredients.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <ListOrdered className="h-5 w-5 text-[#4a7c59]" />
                  <h2 className="text-2xl font-bold text-forest">Ingredients</h2>
                </div>
                <ul className="space-y-3">
                  {ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-3 text-forest/70 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4a7c59] mt-2.5 shrink-0" />
                      {ing.replace(/^[-•]\s*/, "")}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {instructions.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-[#4a7c59]" />
                  <h2 className="text-2xl font-bold text-forest">Instructions</h2>
                </div>
                <ol className="space-y-6">
                  {instructions.map((step, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-forest text-white text-sm font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-forest/70 leading-relaxed pt-1">{step.replace(/^\d+\.\s*/, "")}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer content={content.footer} />
    </main>
  );
}
