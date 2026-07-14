<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $fillable = [
        'title', 'slug', 'description', 'image_url', 'prep_time',
        'difficulty', 'ingredients_list', 'instructions', 'serving_size',
        'status', 'sort_order'
    ];
}
