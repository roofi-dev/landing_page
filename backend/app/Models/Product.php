<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'slug', 'category', 'description', 'ingredients',
        'nutritional_info', 'buy_now_text', 'buy_now_link',
        'image_url', 'is_new', 'is_featured',
        'status', 'sort_order'
    ];

    protected $casts = [
        'is_new' => 'boolean',
        'is_featured' => 'boolean',
    ];
}
