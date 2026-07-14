<?php

namespace Database\Seeders;

use App\Models\Recipe;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RecipeSeeder extends Seeder
{
    public function run(): void
    {
        $recipes = [
            [
                'title' => 'Gluten-Free Cassava Pasta',
                'prep_time' => '25 MINS',
                'difficulty' => 'BEGINNER',
                'image_url' => 'https://images.unsplash.com/photo-1551462147-3a8823c819f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'status' => 'published',
                'sort_order' => 1,
            ],
            [
                'title' => 'Blackmond Dark Brownies',
                'prep_time' => '45 MINS',
                'difficulty' => 'INTERMEDIATE',
                'image_url' => 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'status' => 'published',
                'sort_order' => 2,
            ],
            [
                'title' => 'Spicy Cassava Noodles',
                'prep_time' => '15 MINS',
                'difficulty' => 'BEGINNER',
                'image_url' => 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'status' => 'published',
                'sort_order' => 3,
            ],
        ];

        foreach ($recipes as $recipe) {
            $recipe['slug'] = Str::slug($recipe['title']);
            Recipe::create($recipe);
        }
    }
}
