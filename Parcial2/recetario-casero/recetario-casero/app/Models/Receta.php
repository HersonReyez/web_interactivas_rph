<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Receta extends Model
{
    //
    protected $fillable = ['titulo','categoria','tiempo','dificultad', 'ingrendientes', 'pasos', 'nota'];

    // Relación: Una receta pertenece a un usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
