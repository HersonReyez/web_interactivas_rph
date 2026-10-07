<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Receta;
use Illuminate\Support\Facades\Validator;

class RecetaController extends Controller
{
    // Mostrar solo las recetas creadas por el usuario autenticado
    public function index(Request $request){
        // 1. Empezamos la consulta partiendo de la relación del usuario
        // Esto automáticamente agrega un "WHERE user_id = ?" por detrás
        $query = $request->user()->recetas();

        // 2. Ejecutamos la consulta
        $recetas = $query->get();

        // 3. Mensaje si no hay resultados (Regla 5)
        if ($recetas->isEmpty()) {
            return response()->json([
                'message' => 'No se encontraron recetas con esos criterios.',
                'data' => []
            ], 200);
        }

        return response()->json($recetas, 200);
    }

    // Mostrar una sola receta (para editar)
    public function show(Request $request, $id)
    {
        $receta = $request->user()->recetas()->find($id);
        if (!$receta) {
            return response()->json(['message' => 'Receta no encontrada'], 404);
        }
        return response()->json($receta, 200);
    }

    // Crear receta asignada al usuario
    public function store(Request $request)
    {
        // 1. Validar los datos según las reglas obligatorias (Regla 4)
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string|max:255',
            'categoria' => 'required|in:desayuno,almuerzo,cena,postre,bebida',
            'tiempo' => 'required|integer|gt:0', // gt:0 significa greater than 0
            'dificultad' => 'required|in:facil,media,dificil',
            // OJO: Uso "ingrendientes" porque así lo dejaste en tu migración y modelo
            'ingrendientes' => 'required|string', 
            'pasos' => 'required|string',
            'nota' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422); // 422 Unprocessable Entity
        }

        // 2. Crear la receta. 
        // Al usar $request->user()->recetas()->create(...), Laravel inyecta el user_id automáticamente.
        $receta = $request->user()->recetas()->create($validator->validated());

        // 3. Retornar mensaje de éxito (Regla 6)
        return response()->json([
            'message' => '¡Receta creada con éxito!',
            'data' => $receta
        ], 201); // 201 Created
    }

    // Actualizar una receta existente
    public function update(Request $request, $id)
    {
        // 1. Buscar la receta, pero SOLO dentro de las recetas del usuario autenticado
        $receta = $request->user()->recetas()->find($id);

        // Si no la encuentra (no existe o es de otro usuario), devolvemos error
        if (!$receta) {
            return response()->json(['message' => 'Receta no encontrada o no tienes permisos.'], 404);
        }

        // 2. Validar los datos (igual que en store)
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string|max:255',
            'categoria' => 'required|in:desayuno,almuerzo,cena,postre,bebida',
            'tiempo' => 'required|integer|gt:0',
            'dificultad' => 'required|in:facil,media,dificil',
            'ingrendientes' => 'required|string', 
            'pasos' => 'required|string',
            'nota' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // 3. Actualizar la receta
        $receta->update($validator->validated());

        // 4. Retornar respuesta de éxito (Regla 6)
        return response()->json([
            'message' => '¡Receta actualizada con éxito!',
            'data' => $receta
        ], 200);
    }

    // Eliminar una receta
    public function destroy(Request $request, $id)
    {
        // 1. Buscar la receta SOLO dentro de las del usuario autenticado
        $receta = $request->user()->recetas()->find($id);

        // Si no la encuentra
        if (!$receta) {
            return response()->json(['message' => 'Receta no encontrada o no tienes permisos.'], 404);
        }

        // 2. Eliminar la receta
        $receta->delete();

        // 3. Retornar respuesta de éxito (Regla 6)
        return response()->json([
            'message' => '¡Receta eliminada con éxito!'
        ], 200);
    }
}
