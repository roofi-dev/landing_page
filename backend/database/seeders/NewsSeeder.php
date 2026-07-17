<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        News::truncate();

        $articles = [
            [
                'title' => '5 Benefits of a Gluten-Free Diet You Should Know',
                'category' => 'Health Tips',
                'excerpt' => 'Discover how going gluten-free can improve your digestion, energy levels, and overall wellbeing.',
                'image_url' => 'https://images.unsplash.com/photo-1490645935967-10de6d17062e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'published_date' => '2024-06-15',
                'sort_order' => 1,
                'content' => "For many people, going gluten-free isn't just a dietary choice — it's a life-changing decision. Whether you have celiac disease, gluten sensitivity, or simply want to explore a healthier lifestyle, understanding the benefits can help you make an informed choice.\n\nImproved digestion is one of the most immediate benefits people notice. Gluten can cause inflammation in the gut for sensitive individuals, leading to bloating, gas, and discomfort. By switching to gluten-free alternatives like cassava flour, many people report feeling lighter and more comfortable after meals.\n\nSustained energy levels are another significant advantage. Gluten-containing foods, especially refined wheat products, can cause rapid blood sugar spikes followed by crashes. Gluten-free alternatives made from whole foods like cassava provide a steadier release of energy throughout the day.\n\nBetter skin health is often reported by those who eliminate gluten. The connection between gut health and skin is well-documented — when your digestive system is happy, your skin tends to reflect that with a natural, healthy glow.\n\nFinally, going gluten-free encourages a more mindful approach to eating. You become more aware of ingredients, more intentional about your food choices, and more connected to what you put into your body. At Ladang Lima, we believe this mindfulness is the foundation of a healthier life.",
            ],
            [
                'title' => 'Cassava: The Superfood Powering Ladang Lima',
                'category' => 'Ingredients',
                'excerpt' => 'Learn why cassava is considered one of the most versatile and nutritious root vegetables in the world.',
                'image_url' => 'https://images.unsplash.com/photo-1605498335749-7633d50e5791?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'published_date' => '2024-06-10',
                'sort_order' => 2,
                'content' => "Cassava has been a staple food in Indonesia for centuries, but only recently has the world begun to recognize its extraordinary potential. This humble root vegetable is the foundation of everything we create at Ladang Lima.\n\nNaturally gluten-free, cassava is a safe and nutritious alternative for those with celiac disease or gluten sensitivity. Unlike wheat, it contains no gluten proteins, making it ideal for people who need to avoid gluten in their diet.\n\nRich in carbohydrates and fiber, cassava provides sustained energy without the blood sugar spikes associated with refined grains. It's also a good source of vitamin C, folate, and essential minerals like magnesium and potassium.\n\nWhat makes cassava truly special is its versatility. Through fermentation, it becomes mocaf — a flour with characteristics remarkably similar to wheat flour. This means you can bake cakes, make pasta, create cookies, and cook noodles without compromising on taste or texture.\n\nAt Ladang Lima, we've spent over a decade perfecting the art of cassava processing. Our mocaf flour matches wheat flour characteristics, enabling seamless gluten-free baking without compromise. This is why we call cassava the superfood of the future.",
            ],
            [
                'title' => 'Our Commitment to Sustainable Farming Practices',
                'category' => 'Sustainability',
                'excerpt' => 'How Ladang Lima works with local farmers to promote sustainable agriculture and protect the environment.',
                'image_url' => 'https://images.unsplash.com/photo-1625246333195-78d9c38ab4e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'published_date' => '2024-06-05',
                'sort_order' => 3,
                'content' => "Sustainability isn't just a buzzword for us — it's woven into every decision we make. From the farms where our cassava grows to the factories where our products are crafted, we're committed to practices that protect the earth.\n\nWe work directly with local Indonesian farmers, ensuring fair prices and long-term partnerships. This approach not only supports rural communities but also guarantees the highest quality cassava for our products.\n\nCassava is naturally drought-resistant and grows well in Indonesian soil without requiring excessive water or chemical fertilizers. This makes it one of the most environmentally friendly crops available, requiring minimal resources while delivering maximum nutrition.\n\nWe tackle five major agriculture issues through our sustainable practices: soil degradation, water conservation, chemical reduction, biodiversity loss, and farmer welfare. Each of these is addressed through specific initiatives in our supply chain.\n\nOur goal is simple: to create food that nourishes both people and the planet. Every product you enjoy from Ladang Lima represents a chain of conscious decisions — from farm to table — that prioritize sustainability at every step.",
            ],
            [
                'title' => 'Introducing Our New Cassava Pasta Line',
                'category' => 'Product News',
                'excerpt' => "We're excited to launch our newest product — 100% cassava pasta, now available in three varieties.",
                'image_url' => 'https://images.unsplash.com/photo-1551462147-3a8823c819f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'published_date' => '2024-05-28',
                'sort_order' => 4,
                'content' => "We're thrilled to announce the launch of our new cassava pasta line — a breakthrough in gluten-free pasta that doesn't compromise on taste, texture, or nutrition. Available in three varieties: penne, spaghetti, and fusilli.\n\nOur cassava pasta is made from 100% premium mocaf flour, created through our signature fermentation process. This gives the pasta a texture and bite that's remarkably similar to traditional wheat pasta — something that has been difficult to achieve in gluten-free products until now.\n\nEach variety has been carefully tested with home cooks and professional chefs alike. The result is a pasta that holds sauce beautifully, maintains its shape when cooked al dente, and delivers a satisfying, authentic pasta experience.\n\nLike all Ladang Lima products, our cassava pasta is gluten-free, egg-free, and made without artificial preservatives. It's also rich in fiber, making it not just a safe alternative but a genuinely healthier choice for the whole family.\n\nThe new pasta line is now available through our official online stores on Tokopedia, Shopee, and select retail partners nationwide. Try it today and discover what gluten-free pasta should taste like.",
            ],
            [
                'title' => '10 Tips for Perfect Gluten-Free Baking',
                'category' => 'Baking Tips',
                'excerpt' => 'Master the art of gluten-free baking with these expert tips from our Ladang Lima kitchen.',
                'image_url' => 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'published_date' => '2024-05-20',
                'sort_order' => 5,
                'content' => "Gluten-free baking can feel intimidating at first, but with the right techniques and ingredients, you can create baked goods that are just as delicious — if not better — than their wheat-based counterparts.\n\nTip 1: Always use a quality gluten-free flour. Our mocaf flour is designed to mimic wheat flour characteristics, making it the easiest substitution for traditional recipes. Measure by weight for best results.\n\nTip 2: Let your batter rest. Gluten-free flours need more time to absorb liquids. Letting your batter rest for 15-30 minutes before baking improves texture significantly.\n\nTip 3: Add extra moisture. Gluten-free baked goods tend to dry out faster. Adding a bit more fat (butter, oil) or an extra egg can keep your cakes and cookies moist and tender.\n\nTip 4: Don't overmix. While gluten-free batters don't develop gluten, overmixing can still create dense, heavy textures. Mix until just combined for the lightest results. And remember — practice makes perfect. Every oven is different, so don't be afraid to experiment and adjust.",
            ],
            [
                'title' => 'Partnering with Local Farmers for a Better Future',
                'category' => 'Community',
                'excerpt' => 'Our farmer partnership program empowers local communities while ensuring the highest quality cassava.',
                'image_url' => 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                'published_date' => '2024-05-15',
                'sort_order' => 6,
                'content' => "Behind every Ladang Lima product is a network of dedicated farmers who grow our cassava with care and expertise. Our farmer partnership program is the heart of our supply chain — and one of our proudest achievements.\n\nWe work with farmers across East Java, providing them with training, resources, and fair pricing. This ensures that our cassava is grown to the highest standards while supporting the livelihoods of the families who grow it.\n\nOur partnerships are built on trust and long-term commitment. We don't just buy cassava — we invest in the communities that produce it. This includes education programs, sustainable farming training, and infrastructure support.\n\nThe result is a supply chain that benefits everyone. Farmers get stable income and professional development. We get premium quality cassava grown with care. And our customers get products they can feel good about — from farm to table.\n\nWhen you choose Ladang Lima, you're not just choosing healthy food. You're supporting a model of business that puts people and planet first. That's the future we're building, one partnership at a time.",
            ],
        ];

        foreach ($articles as $article) {
            $article['slug'] = Str::slug($article['title']);
            $article['status'] = 'published';
            $article['is_featured'] = false;
            News::create($article);
        }
    }
}
