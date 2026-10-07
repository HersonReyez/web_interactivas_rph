<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

// La portada redirige al tablero de tareas.
Route::get('/', function () {
    return redirect()->route('tasks.index');
});

// Tablero con las tareas agrupadas por estado (con filtros y buscador)
Route::get('tasks', [TaskController::class, 'index'])->name('tasks.index');

// Formulario para crear un tarea
Route::get('tasks/crear', [TaskController::class, 'create'])->name('tasks.create');

// Guardar la tarea nueva
Route::post('tasks', [TaskController::class, 'store'])->name('tasks.store');

// Cambio rapido de estado desde los botones de cada tarjeta
Route::patch('tasks/{task}/estado', [TaskController::class, 'changeStatus'])->name('tasks.change-status');

// Detalle de una tarea
Route::get('tasks/{task}', [TaskController::class, 'show'])->name('tasks.show');

// Formulario para editar una tarea
Route::get('tasks/{task}/editar', [TaskController::class, 'edit'])->name('tasks.edit');

// Guarda los cambios de la tarea
Route::match(['put', 'patch'], 'tasks/{task}', [TaskController::class, 'update'])->name('tasks.update');

// Elimina la tarea definitivamente
Route::delete('tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');