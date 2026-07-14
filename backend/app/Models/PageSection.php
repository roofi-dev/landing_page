<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageSection extends Model
{
    protected $fillable = ['page', 'section_key', 'title', 'content', 'status', 'sort_order'];

    protected $casts = [
        'content' => 'array',
    ];
}
