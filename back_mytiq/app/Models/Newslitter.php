<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Newslitter extends Model
{
    use HasFactory;
    protected $table ='newlittres';
    protected $fillable = [
        'email',
        'is_active'
    ];
    protected $casts = [
        'subscribed_at' => 'datetime',
        'is_active' => 'boolean'
    ];
}
