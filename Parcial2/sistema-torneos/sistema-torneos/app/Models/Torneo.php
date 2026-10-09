<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Torneo extends Model
{
    //
    protected $fillable = [
        'nombre',
        'deporte',
        'fecha',
        'cupo',
        'descripcion',
        'estado',
    ];

    // Relación: Un torneo tiene muchas inscripciones
    public function inscripcions(): HasMany
    {
        return $this->hasMany(Inscripcion::class);
    }
}
