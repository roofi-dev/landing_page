<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'slug', 'category', 'description', 'ingredients',
        'nutritional_info', 'image_url', 'is_new', 'is_featured',
        'status', 'sort_order'
    ];

    protected $casts = [
        'is_new' => 'boolean',
        'is_featured' => 'boolean',
    ];
}
