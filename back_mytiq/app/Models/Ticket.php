<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ticket extends Model
{
                use HasFactory;
                protected $fillable = [
                    'qr_code',
                    'pdf_path',
                    'purchase_date',
                    'user_id',
                    'event_id'
    ];
    protected $casts = [
        'purchase_date'=>'datetime',
    ];
    public function user():BelongsTo{
        return $this->belongsTo(User::class);
    }
    public function event():BelongsTo{
        return $this->belongsTo(Event::class);
    }
}
