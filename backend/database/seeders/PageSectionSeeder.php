<?php

namespace Database\Seeders;

use App\Models\PageSection;
use Illuminate\Database\Seeder;

class PageSectionSeeder extends Seeder
{
    public function run(): void
    {
        PageSection::truncate();

        $sections = [
            // ===== HOME PAGE =====
            [
                'page' => 'home',
                'section_key' => 'hero',
                'title' => 'Hero Banner',
                'sort_order' => 1,
                'content' => [
                    'title_line1' => 'FEEDING',
                    'title_line2' => 'THE FUTURE',
                    'subtitle_line1' => 'Stronger Farmer,',
                    'subtitle_line2' => 'Healthy Food for Better Life',
                    'button_text' => 'Read More',
                    'button_link' => '#',
                    'background_image' => 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
                    'background_alt' => 'Ladang Lima Farm',
                ],
                'status' => 'published',
            ],
            [
                'page' => 'home',
                'section_key' => 'intro',
                'title' => 'Intro / Brand Story',
                'sort_order' => 2,
                'content' => [
                    'image' => 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    'image_alt' => 'Our Heritage',
                    'established_label' => 'Est. 2013',
                    'act1_title_line1' => "Indonesia's Pioneer of",
                    'act1_title_line2' => 'Gluten-Free since 2013.',
                    'act1_description' => 'Our journey began with a simple yet profound realization: the future of food lies in our roots. We rediscovered the potential of cassava, a traditional staple, and transformed it into a modern foundation for health.',
                    'act2_label' => 'Our Mission',
                    'act2_title_line1' => 'Saving Nature,',
                    'act2_title_line2' => 'One Bite at a Time.',
                    'act2_description' => 'Ladang Lima provides healthy food to help you save yourself and nature from the junk food cycle. We tackle five major agriculture issues to ensure our products are as sustainable as they are nutritious.',
                    'act3_col1_title' => 'Innovation',
                    'act3_col1_desc' => 'We only produce high-quality flour with characteristics similar to wheat, allowing for seamless gluten-free baking.',
                    'act3_col2_title' => 'Expansion',
                    'act3_col2_desc' => 'From pasta and pastry to delightful cakes, our ecosystem of products redefines what healthy living looks like.',
                    'act3_button_text' => 'Explore Full History',
                    'act3_button_link' => '#',
                ],
                'status' => 'published',
            ],
            [
                'page' => 'home',
                'section_key' => 'cassava',
                'title' => '100% Cassava Section',
                'sort_order' => 3,
                'content' => [
                    'title' => '100% Cassava',
                    'subtitle' => 'Healthy, Natural and Gluten Free',
                    'icons' => [
                        ['name' => 'GLUTEN FREE', 'icon' => '/icons/gluten-free.svg'],
                        ['name' => 'EGG FREE', 'icon' => '/icons/egg-free.svg'],
                        ['name' => 'DAIRY FREE', 'icon' => '/icons/dairy-free.svg'],
                        ['name' => 'NO PRESERVATIVES', 'icon' => '/icons/no-preservatives.svg'],
                        ['name' => 'NATURAL', 'icon' => '/icons/natural.svg'],
                        ['name' => 'HEALTHY', 'icon' => '/icons/healthy.svg'],
                    ],
                    'image' => 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
                    'image_alt' => 'Cassava',
                ],
                'status' => 'published',
            ],
            [
                'page' => 'home',
                'section_key' => 'interactive_cards',
                'title' => 'Interactive Cards (LL TV)',
                'sort_order' => 4,
                'content' => [
                    'cards' => [
                        [
                            'title' => 'OUR COMPANY PROFILE',
                            'subtitle' => 'GET KNOW US BETTER',
                            'image' => 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                            'link' => '#',
                        ],
                        [
                            'title' => 'OUR PRODUCT KNOWLEDGE',
                            'subtitle' => 'GET KNOW US BETTER',
                            'image' => 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                            'link' => '#',
                        ],
                    ],
                ],
                'status' => 'published',
            ],
            [
                'page' => 'home',
                'section_key' => 'gallery_header',
                'title' => 'Product Gallery Header',
                'sort_order' => 5,
                'content' => [
                    'label' => 'Our Collection',
                    'title_line1' => 'Crafted with',
                    'title_line2' => 'Natural Integrity.',
                    'description' => 'Explore our curated selection of gluten-free innovations, made from 100% Indonesian Cassava.',
                ],
                'status' => 'published',
            ],
            [
                'page' => 'home',
                'section_key' => 'why_gluten_free',
                'title' => 'Why Gluten-Free Section',
                'sort_order' => 6,
                'content' => [
                    'title' => 'Why Gluten-Free is a Good Choice',
                    'image' => 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
                    'image_alt' => 'Organic Cassava Flour',
                    'features' => [
                        [
                            'title' => 'Restore the lack of Information',
                            'desc' => 'Some of people really feel about nature issue which we can saving ours and our nature from junk global issue. We produce for satisfy you to consume products which high in baked and more control salt.',
                        ],
                        [
                            'title' => 'Better Digestion',
                            'desc' => 'Gluten-free diet is a way to stay healthy and fit. Our flour has unique characteristic as wheat flour, we produce alternative products such as gluten-free noodles, cookies and flour for pasta, pastry and delightful cakes.',
                        ],
                        [
                            'title' => 'Healthy Choice',
                            'desc' => 'Ladang Lima provide healthy food for you save yourself and nature from junk food. Turning free people from around five from around five agriculture issues without which have similar characteristic as wheat flour.',
                        ],
                    ],
                ],
                'status' => 'published',
            ],
            [
                'page' => 'home',
                'section_key' => 'factory_cta',
                'title' => 'Factory CTA Section',
                'sort_order' => 7,
                'content' => [
                    'label' => 'Market Leader',
                    'title_line1' => '#1 Gluten-Free Product',
                    'title_line2' => 'In Indonesia',
                    'button_text' => 'Read More',
                    'button_link' => '#',
                    'button_subtext' => 'Learn about our factory & standards',
                    'background_image' => 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
                    'background_alt' => 'Factory',
                ],
                'status' => 'published',
            ],
            [
                'page' => 'home',
                'section_key' => 'footer',
                'title' => 'Footer Content',
                'sort_order' => 8,
                'content' => [
                    'brand_name' => 'Ladang Lima',
                    'brand_description' => "Indonesia's Pioneer of Gluten Free food products since 2013. Ladang Lima provides healthy food for help you save yourself and nature from junk food.",
                    'main_office' => 'Rungkut Industri III No.20-B, Surabaya',
                    'factory' => 'Ds. Lengkong, Mojoanyar, Mojokerto',
                    'stores' => [
                        ['name' => 'Tokopedia', 'link' => '#'],
                        ['name' => 'Shopee', 'link' => '#'],
                        ['name' => 'Bukalapak', 'link' => '#'],
                    ],
                    'nav_links' => [
                        ['name' => 'Home', 'link' => '/'],
                        ['name' => 'About Us', 'link' => '/about'],
                        ['name' => 'Products', 'link' => '/products'],
                        ['name' => 'Recipes', 'link' => '/recipes'],
                        ['name' => 'News', 'link' => '/news'],
                        ['name' => 'Contact', 'link' => '/contact'],
                    ],
                ],
                'status' => 'published',
            ],
            [
                'page' => 'home',
                'section_key' => 'navbar',
                'title' => 'Navbar Content',
                'sort_order' => 9,
                'content' => [
                    'brand_name' => 'Ladang Lima',
                    'links' => [
                        ['name' => 'HOME', 'href' => '/'],
                        ['name' => 'ABOUT US', 'href' => '/about'],
                        ['name' => 'OUR PRODUCT', 'href' => '/products'],
                        ['name' => 'NEWS', 'href' => '/news'],
                        ['name' => 'CONTACT US', 'href' => '/contact'],
                    ],
                ],
                'status' => 'published',
            ],

            // ===== OUR PRODUCTS PAGE =====
            [
                'page' => 'products',
                'section_key' => 'products_header',
                'title' => 'Products Page Header',
                'sort_order' => 1,
                'content' => [
                    'label' => 'Our Products',
                    'title_line1' => 'Gluten-Free',
                    'title_line2' => 'Goodness',
                    'description' => 'Discover our full range of gluten-free products made from 100% Indonesian Cassava.',
                    'background_image' => 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
                ],
                'status' => 'published',
            ],
            [
                'page' => 'products',
                'section_key' => 'products_filter',
                'title' => 'Products Filter Info',
                'sort_order' => 2,
                'content' => [
                    'filter_label' => 'Filter by Category',
                    'sort_label' => 'Sort by',
                    'show_all_text' => 'All Products',
                ],
                'status' => 'published',
            ],
            [
                'page' => 'products',
                'section_key' => 'products_cta',
                'title' => 'Products Page CTA',
                'sort_order' => 3,
                'content' => [
                    'title' => 'Can\'t find what you\'re looking for?',
                    'description' => 'Contact us for custom orders and wholesale inquiries.',
                    'button_text' => 'Contact Us',
                    'button_link' => '#contact',
                ],
                'status' => 'published',
            ],

            // ===== ABOUT PAGE =====
            [
                'page' => 'about',
                'section_key' => 'about_header',
                'title' => 'About Page Header',
                'sort_order' => 1,
                'content' => [
                    'title' => 'About Us',
                    'subtitle' => "Indonesia's pioneer of gluten-free food products since 2013. We feed the future with nature's wisdom.",
                    'background_image' => 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
                ],
                'status' => 'published',
            ],
            [
                'page' => 'about',
                'section_key' => 'about_story',
                'title' => 'About Story Section',
                'sort_order' => 2,
                'content' => [
                    'label' => 'Our Story',
                    'title_line1' => 'From Traditional Roots to',
                    'title_line2' => 'Modern Wellness',
                    'description_1' => 'Our journey began with a simple yet profound realization: the future of food lies in our roots. We rediscovered the potential of cassava, a traditional staple, and transformed it into a modern foundation for health.',
                    'description_2' => 'Ladang Lima provides healthy food to help you save yourself and nature from the junk food cycle. We tackle five major agriculture issues to ensure our products are as sustainable as they are nutritious. From pasta and pastry to delightful cakes, our ecosystem of products redefines what healthy living looks like.',
                    'image' => 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                    'image_alt' => 'Ladang Lima Heritage',
                ],
                'status' => 'published',
            ],
            [
                'page' => 'about',
                'section_key' => 'about_values',
                'title' => 'About Core Values',
                'sort_order' => 3,
                'content' => [
                    'label' => 'What We Stand For',
                    'title' => 'Our Core Values',
                    'values' => [
                        ['icon' => 'leaf', 'title' => 'Natural & Sustainable', 'description' => 'We harness the power of cassava, a traditional Indonesian staple, to create food that\'s good for you and the planet.'],
                        ['icon' => 'heart', 'title' => 'Health First', 'description' => 'Every product is crafted with your wellbeing in mind — gluten-free, egg-free, and free from junk.'],
                        ['icon' => 'globe', 'title' => 'Earth Friendly', 'description' => 'We tackle five major agriculture issues to ensure our products are as sustainable as they are nutritious.'],
                        ['icon' => 'award', 'title' => 'Premium Quality', 'description' => 'Our mocaf flour matches wheat flour characteristics, enabling seamless gluten-free baking without compromise.'],
                    ],
                ],
                'status' => 'published',
            ],
            [
                'page' => 'about',
                'section_key' => 'about_timeline',
                'title' => 'About Timeline / Milestones',
                'sort_order' => 4,
                'content' => [
                    'label' => 'Our Journey',
                    'title' => 'Milestones',
                    'timeline' => [
                        ['year' => '2013', 'title' => 'The Beginning', 'description' => 'Ladang Lima was founded with a vision to revolutionize gluten-free food in Indonesia.'],
                        ['year' => '2015', 'title' => 'Mocaf Innovation', 'description' => 'Developed our signature mocaf flour with characteristics similar to wheat flour.'],
                        ['year' => '2018', 'title' => 'Product Expansion', 'description' => 'Expanded from flour to pasta, noodles, cookies, and cake mixes.'],
                        ['year' => '2020', 'title' => 'National Reach', 'description' => 'Products available across Indonesia through major online and offline retailers.'],
                        ['year' => '2024', 'title' => 'Feeding the Future', 'description' => 'Continuing to innovate sustainable, healthy food for generations to come.'],
                    ],
                ],
                'status' => 'published',
            ],

            // ===== RECIPES PAGE =====
            [
                'page' => 'recipes',
                'section_key' => 'recipes_header',
                'title' => 'Recipes Page Header',
                'sort_order' => 1,
                'content' => [
                    'title' => 'Recipes',
                    'subtitle' => 'Healthy & delicious gluten-free recipes. Discover how easy it is to cook with Ladang Lima products.',
                    'background_image' => 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
                ],
                'status' => 'published',
            ],

            // ===== NEWS PAGE =====
            [
                'page' => 'news',
                'section_key' => 'news_header',
                'title' => 'News Page Header',
                'sort_order' => 1,
                'content' => [
                    'title' => 'News',
                    'subtitle' => 'Latest articles, health tips, and updates from the world of Ladang Lima.',
                    'background_image' => 'https://images.unsplash.com/photo-1490645935967-10de6d17062e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
                ],
                'status' => 'published',
            ],

            // ===== CONTACT PAGE =====
            [
                'page' => 'contact',
                'section_key' => 'contact_header',
                'title' => 'Contact Page Header',
                'sort_order' => 1,
                'content' => [
                    'title' => 'Contact Us',
                    'subtitle' => "Have a question or want to collaborate? We'd love to hear from you.",
                    'background_image' => 'https://images.unsplash.com/photo-1423666639041-f1446026475a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
                ],
                'status' => 'published',
            ],
            [
                'page' => 'contact',
                'section_key' => 'contact_info',
                'title' => 'Contact Information',
                'sort_order' => 2,
                'content' => [
                    'label' => "Let's Talk",
                    'title_line1' => 'We\'re Here to',
                    'title_line2' => 'Help',
                    'description' => 'Whether you have a question about our products, want to partner with us, or simply want to say hello — our team is ready to listen.',
                    'info' => [
                        ['icon' => 'map-pin', 'label' => 'Main Office', 'value' => 'Rungkut Industri III No.20-B, Surabaya'],
                        ['icon' => 'phone', 'label' => 'Phone', 'value' => '+62 31 870 1234'],
                        ['icon' => 'mail', 'label' => 'Email', 'value' => 'hello@ladanglima.com'],
                        ['icon' => 'clock', 'label' => 'Business Hours', 'value' => 'Mon – Fri, 08:00 – 17:00 WIB'],
                    ],
                ],
                'status' => 'published',
            ],
            [
                'page' => 'contact',
                'section_key' => 'contact_factory_cta',
                'title' => 'Contact Factory CTA',
                'sort_order' => 3,
                'content' => [
                    'label' => 'Visit Our Factory',
                    'title_line1' => 'See Where the',
                    'title_line2' => 'Magic Happens',
                    'description' => 'Our factory in Mojokerto is where cassava transforms into premium gluten-free products. Schedule a visit and experience the Ladang Lima difference firsthand.',
                    'address' => 'Ds. Lengkong, Mojoanyar, Mojokerto',
                    'background_image' => 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
                ],
                'status' => 'published',
            ],

            // ===== FAQ PAGE =====
            [
                'page' => 'faq',
                'section_key' => 'faq_header',
                'title' => 'FAQ Page Header',
                'sort_order' => 1,
                'content' => [
                    'label' => 'Got Questions?',
                    'title' => 'Frequently Asked Questions',
                    'description' => 'Find answers to common questions about our products, ordering, and gluten-free lifestyle.',
                ],
                'status' => 'published',
            ],
            [
                'page' => 'faq',
                'section_key' => 'faq_general',
                'title' => 'General FAQ',
                'sort_order' => 2,
                'content' => [
                    'items' => [
                        [
                            'question' => 'What is cassava flour?',
                            'answer' => 'Cassava flour is a gluten-free flour made from the whole cassava root. It is a versatile alternative to wheat flour with similar characteristics for baking and cooking.',
                        ],
                        [
                            'question' => 'Are all Ladang Lima products gluten-free?',
                            'answer' => 'Yes, all our products are 100% gluten-free, made from Indonesian cassava. They are also egg-free, dairy-free, and contain no preservatives.',
                        ],
                        [
                            'question' => 'Where can I buy Ladang Lima products?',
                            'answer' => 'Our products are available on Tokopedia, Shopee, and Bukalapak. You can also find them in selected stores across Indonesia.',
                        ],
                        [
                            'question' => 'Do you offer wholesale or bulk orders?',
                            'answer' => 'Yes, we offer wholesale pricing for bulk orders. Please contact us through the contact form or email us directly for more information.',
                        ],
                    ],
                ],
                'status' => 'published',
            ],
            [
                'page' => 'faq',
                'section_key' => 'faq_shipping',
                'title' => 'Shipping & Returns FAQ',
                'sort_order' => 3,
                'content' => [
                    'items' => [
                        [
                            'question' => 'How long does shipping take?',
                            'answer' => 'Shipping typically takes 2-5 business days within Java and 5-7 business days for other islands in Indonesia.',
                        ],
                        [
                            'question' => 'Do you ship internationally?',
                            'answer' => 'Currently, we only ship within Indonesia. International shipping will be available in the future.',
                        ],
                        [
                            'question' => 'What is your return policy?',
                            'answer' => 'Due to the nature of food products, we do not accept returns. However, if you receive a damaged or incorrect item, please contact us within 48 hours for a replacement.',
                        ],
                    ],
                ],
                'status' => 'published',
            ],
            [
                'page' => 'faq',
                'section_key' => 'faq_contact',
                'title' => 'FAQ Contact CTA',
                'sort_order' => 4,
                'content' => [
                    'title' => 'Still have questions?',
                    'description' => 'Our team is here to help. Reach out and we\'ll get back to you as soon as possible.',
                    'button_text' => 'Contact Us',
                    'button_link' => '#contact',
                ],
                'status' => 'published',
            ],
        ];

        foreach ($sections as $section) {
            PageSection::create($section);
        }
    }
}
