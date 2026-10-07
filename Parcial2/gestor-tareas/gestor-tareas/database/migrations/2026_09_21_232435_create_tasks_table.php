<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            // Titulo obligatorio de la tarea (max. 255 caracteres)
            $table->string('titulo', 255);
            // Descipcion larga ocpcional
            $table->text('descripcion')->nullable();
            // Estado del tablero: por_hacer, en_curso o hecha
            $table->string('estado', 20)->default('por_hacer')->index();
            // Prioridad: baja, media o alta
            $table->string('prioridad', 10)->default('media')->index();
            // Fecha limite opcional (puede ser pasada: se marca como vencida)
            $table->date('vencimiento')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
