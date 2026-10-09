<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inscripcion;
use App\Models\Torneo;

class InscripcionController extends Controller
{
    // Jugador: Ver sus propios torneos
    public function misTorneos(Request $request){
        $user = $request->user();
        
        // Obtenemos las inscripciones e incluimos los datos del torneo
        $inscripciones = Inscripcion::with('torneo')->where('user_id', $user->id)->get();
        
        return response()->json($inscripciones, 200);
    }

    // Jugador: Inscribirse a un torneo
    public function inscribir(Request $request, $id){
        $user = $request->user();
        $torneo = Torneo::withCount('inscripcions')->find($id);

        if (!$torneo) {
            return response()->json(['message' => 'Torneo no encontrado'], 404);
        }

        // Requisito 4: Bloquear torneos llenos, cerrados o pasados
        if ($torneo->estado !== 'abierto') return response()->json(['message' => 'El torneo está cerrado.'], 400);
        if ($torneo->fecha < now()->toDateString()) return response()->json(['message' => 'El torneo ya se realizó.'], 400);
        if ($torneo->inscripcions_count >= $torneo->cupo) return response()->json(['message' => 'El cupo de este torneo está lleno.'], 400);

        // Bloquear duplicados
        $yaInscrito = Inscripcion::where('user_id', $user->id)->where('torneo_id', $id)->exists();
        if ($yaInscrito) {
            return response()->json(['message' => 'Ya estás inscrito en este torneo.'], 400);
        }

        $inscripcion = Inscripcion::create([
            'user_id' => $user->id,
            'torneo_id' => $id
        ]);

        return response()->json(['message' => 'Inscripción exitosa', 'inscripcion' => $inscripcion], 201);
    }

    // Jugador: Cancelar su propia inscripción
    public function cancelar(Request $request, $id){
        $user = $request->user();
        $inscripcion = Inscripcion::where('user_id', $user->id)->where('torneo_id', $id)->first();
        
        if(!$inscripcion) {
            return response()->json(['message' => 'No estás inscrito en este torneo.'], 404);
        }

        // Cancelar solo hasta la fecha del evento
        $torneo = Torneo::find($id);
        if($torneo->fecha <= now()->toDateString()){
            return response()->json(['message' => 'Ya no puedes cancelar, la fecha del torneo ya pasó o es hoy.'], 400);
        }

        $inscripcion->delete();
        return response()->json(['message' => 'Inscripción cancelada con éxito, tu plaza ha sido liberada.'], 200);
    }

    // Administrador: Dar de baja a un usuario (Requisito 5)
    public function darDeBaja($id){
        $inscripcion = Inscripcion::find($id);
        
        if(!$inscripcion) {
            return response()->json(['message' => 'Registro de inscripción no encontrado.'], 404);
        }

        $inscripcion->delete();
        return response()->json(['message' => 'Participante dado de baja por el administrador.'], 200);
    }
}