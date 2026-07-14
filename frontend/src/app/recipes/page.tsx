import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import RecipeCard from "@/components/RecipeCard";
import { getPageContent, getRecipes } from "@/lib/api";

export const metadata: Metadata = {
  title: "Recipes — Ladang Lima",
  description: "Discover healthy and delicious gluten-free recipes using Ladang Lima products.",
};

export default async function RecipesPage() {
  const [content, recipes] = await Promise.all([
    getPageContent(),
    getRecipes(),
  ]);

  const h = content.recipes_header || {};

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <Navbar content={content.navbar} />

      <PageHeader
        title={h.title || "Recipes"}
        subtitle={h.subtitle || "Healthy & delicious gluten-free recipes. Discover how easy it is to cook with Ladang Lima products."}
        backgroundImage={h.background_image || "https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Recipes" }]}
      />

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {recipes.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-forest/50 text-lg">No recipes available yet. Please check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer content={content.footer} />
    </main>
  );
}
