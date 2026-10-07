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
        Schema::create('recetas', function (Blueprint $table) {
            $table->id();

            // Llave foránea que relaciona la receta con el usuario. 
            // onDelete('cascade') borra las recetas si se elimina el usuario.
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('titulo');
            $table->string('categoria');
            $table->integer('tiempo');
            $table->string('dificultad');
            $table->text('ingrendientes');
            $table->text('pasos');
            $table->text('nota')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recetas');
    }
};
