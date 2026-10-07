<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecetaController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Rutas Publicas
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Rutas Protegidas
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('logout', [AuthController::class, 'logout']);

    Route::get('bienvenida', [AuthController::class, 'bienvenida']);

    // CRUD RECETAS //
    Route::get('recetas', [RecetaController::class, 'index']);
    Route::get('receta/{id}', [RecetaController::class, 'show']);
    Route::post('receta', [RecetaController::class, 'store']);
    Route::put('receta/{id}', [RecetaController::class, 'update']);
    Route::delete('receta/{id}', [RecetaController::class, 'destroy']);

});