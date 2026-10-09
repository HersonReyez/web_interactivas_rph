<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inscripcion extends Model
{
    //

    protected $fillable = [
        'user_id', 'torneo_id'
    ];

    // Relación: Una inscripción pertenece a un usuario
    public function user(): BelongsTo
    {   
        return $this->belongsTo(User::class);
    }

    // Relación: Una inscripción pertenece a un torneo
    public function torneo(): BelongsTo
    {
        return $this->belongsTo(Torneo::class);
    }
}
