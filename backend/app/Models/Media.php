<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = ['name', 'file_path', 'file_url', 'public_id', 'mime_type', 'resource_type', 'size'];
}
