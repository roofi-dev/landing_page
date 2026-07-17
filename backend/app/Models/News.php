<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = [
        'title', 'slug', 'category', 'excerpt', 'content',
        'image_url', 'published_date', 'is_featured',
        'status', 'sort_order'
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'published_date' => 'date',
    ];
}
