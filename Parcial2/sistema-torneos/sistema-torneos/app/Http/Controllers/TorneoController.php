<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Torneo;

class TorneoController extends Controller
{
    // Mostrar torneos (Comportamiento dinámico según rol)
    public function index(Request $request){
        // Usamos auth('sanctum') porque esta ruta es pública en api.php
        $user = auth('sanctum')->user(); 

        if($user && $user->role === 'admin'){
            // El admin ve TODOS los torneos sin filtros, ordenados por los más recientes
            $torneosAdmin = Torneo::withCount('inscripcions')->orderBy('fecha', 'desc')->get();
            return response()->json($torneosAdmin, 200);
        }

        // Visitantes y Jugadores: Filtro Requisito 3 (Abiertos, fecha futura)
        $torneos = Torneo::where('estado', 'abierto')
                         ->whereDate('fecha', '>=', now())
                         ->withCount('inscripcions')
                         ->orderBy('fecha', 'asc')
                         ->get();

        // Filtramos para mostrar solo los que tienen cupo libre
        $torneosDisponibles = $torneos->filter(function($torneo){
            return $torneo->inscripcions_count < $torneo->cupo;
        })->values();

        if($torneosDisponibles->isEmpty()){
            return response()->json(['message' => 'No hay torneos disponibles en este momento.'], 404);
        }

        return response()->json($torneosDisponibles, 200);
    }

    // Mostrar torneo
    public function show($id){
        $torneo = Torneo::find($id);
        return $torneo;
    }

    // Crear torneo
    public function store(Request $request){
        $torneo = new Torneo();

        $torneo->nombre = $request->nombre;
        $torneo->deporte = $request->deporte;
        $torneo->fecha = $request->fecha;
        $torneo->cupo = $request->cupo;
        $torneo->descripcion = $request->descripcion;
        $torneo->estado = $request->estado;

        $torneo->save();
        return $torneo;
    }

    // Editar torneo
    public function update(Request $request){
        $torneo = Torneo::findOrFail($request->id);

        $torneo->nombre = $request->nombre;
        $torneo->deporte = $request->deporte;
        $torneo->fecha = $request->fecha;
        $torneo->cupo = $request->cupo;
        $torneo->descripcion = $request->descripcion;
        $torneo->estado = $request->estado;

        $torneo->save();
        return $torneo;
    }

    // Borrar torneo
    public function destroy($id){
        $torneo = Torneo::destroy($id);
        return $torneo;
    }

}
