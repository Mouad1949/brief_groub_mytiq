<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable =['title','description','date','image','localisation','capacite','status','prix','admin_id'];

    public function user(){
      $this->belongsTo(User::class);
    }
}
