<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TorneoController;
use App\Http\Controllers\InscripcionController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// ==========================================
// RUTAS PÚBLICAS
// ==========================================
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('index', [AuthController::class, 'index']);

Route::get('torneos', [TorneoController::class, 'index']); 
Route::get('torneos/{id}', [TorneoController::class, 'show']);

// ==========================================
// RUTAS PROTEGIDAS (Requieren Token Sanctum)
// ==========================================
Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('bienvenida', [AuthController::class, 'bienvenida']);

    // Acciones de Jugador 
    Route::get('mistorneos', [InscripcionController::class, 'misTorneos']);
    Route::post('torneos/{id}/inscribir', [InscripcionController::class, 'inscribir']);
    Route::delete('torneos/{id}/cancelar', [InscripcionController::class, 'cancelar']);

    // ==========================================
    // RUTAS EXCLUSIVAS ADMIN
    // ==========================================
    Route::middleware('admin')->group(function(){
        Route::get('bienvenidaAdmin', [AuthController::class, 'bienvenidaAdmin']);

        Route::post('torneos', [TorneoController::class, 'store']);
        Route::put('torneos/{id}', [TorneoController::class, 'update']);
        Route::delete('torneos/{id}', [TorneoController::class, 'destroy']);

        // Gestión de inscripciones por parte del admin
        Route::delete('inscripciones/{id}', [InscripcionController::class, 'darDeBaja']);
    });

});