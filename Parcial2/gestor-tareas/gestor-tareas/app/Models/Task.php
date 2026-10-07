<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    // Campos que se pueden asignar de forma masica desde los formularios.
    protected $fillable = [
        'titulo',
        'descripcion',
        'estado',
        'prioridad',
        'vencimiento'
    ];

    // Convierte el vencimiento a fecha para poder compararlo en las vistas
    protected $casts = [
        'vencimiento' => 'date',
    ];

    // Estados posibles del tablero (valor guardado => texto visible).
    public const ESTADOS = [
        'por_hacer' => 'Por hacer',
        'en_curso' => 'En curso',
        'hecha' => 'Hecha',
    ];

    // Prioridades posibles (valor guardado => texto visible)
    public const PRIORIDADES = [
        'baja' => 'Baja',
        'media' => 'Media',
        'alta' => 'Alta',
    ];

    // Dice si la tarea está vencida: tiene fecha limite pasada y no esta hecha.
    public function estaVencida(): bool
    {
        return $this->vencimiento
            && $this->vencimiento->isPast()
            && $this->estado !== 'hecha';
    }
}
