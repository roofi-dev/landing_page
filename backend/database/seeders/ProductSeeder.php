<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Mac & Cheese',
                'category' => 'Instant Meal',
                'image_url' => 'https://images.unsplash.com/photo-1543332164-6e82f355badc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'is_new' => true,
                'is_featured' => false,
                'status' => 'published',
                'sort_order' => 1,
            ],
            [
                'name' => 'Gluten Free Flour',
                'category' => 'Baking Essentials',
                'image_url' => 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'is_new' => false,
                'is_featured' => false,
                'status' => 'published',
                'sort_order' => 2,
            ],
            [
                'name' => 'Blackmond Cookies',
                'category' => 'Superfood Cookies',
                'image_url' => 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'is_new' => false,
                'is_featured' => false,
                'status' => 'published',
                'sort_order' => 3,
            ],
            [
                'name' => 'Veggie Noodle',
                'category' => 'Healthy Noodle',
                'image_url' => 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'is_new' => true,
                'is_featured' => false,
                'status' => 'published',
                'sort_order' => 4,
            ],
            [
                'name' => 'Mocaf Premium',
                'category' => 'Special Flour',
                'image_url' => 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'is_new' => false,
                'is_featured' => false,
                'status' => 'published',
                'sort_order' => 5,
            ],
            [
                'name' => 'Cassava Pasta',
                'category' => 'Pantry',
                'image_url' => 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'is_new' => true,
                'is_featured' => false,
                'status' => 'published',
                'sort_order' => 6,
            ],
        ];

        foreach ($products as $product) {
            $product['slug'] = Str::slug($product['name']);
            Product::create($product);
        }
    }
}
