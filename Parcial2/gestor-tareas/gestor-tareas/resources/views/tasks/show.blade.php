@extends('layouts.app')

@section('contenido')
<div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 max-w-3xl mx-auto">
    
    <!-- Encabezado y botón volver -->
    <div class="flex justify-between items-start mb-6">
        <h2 class="text-2xl font-bold text-slate-800">{{ $tarea->titulo }}</h2>
        <a href="{{ route('tasks.index') }}" class="text-slate-500 hover:text-slate-700 text-sm font-medium transition">&larr; Volver al tablero</a>
    </div>

    <!-- Caja de descripción -->
    <div class="bg-slate-50 p-5 rounded-lg border border-slate-100 mb-6">
        <h3 class="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Descripción</h3>
        <!-- whitespace-pre-wrap respeta los saltos de línea que el usuario haya escrito -->
        <p class="text-slate-700 whitespace-pre-wrap leading-relaxed">{{ $tarea->descripcion ?: 'Sin descripción provista.' }}</p>
    </div>

    <!-- Metadatos -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-t border-slate-100 pt-6">
        <div>
            <span class="block text-sm text-slate-500 mb-1">Estado actual</span>
            <span class="font-medium text-slate-700 bg-slate-200 px-3 py-1 rounded-full text-sm">
                {{ $estados[$tarea->estado] ?? $tarea->estado }}
            </span>
        </div>
        
        <div>
            <span class="block text-sm text-slate-500 mb-1">Nivel de Prioridad</span>
            <span class="font-bold {{ $tarea->prioridad === 'alta' ? 'text-red-500' : ($tarea->prioridad === 'media' ? 'text-orange-500' : 'text-teal-600') }}">
                {{ $prioridades[$tarea->prioridad] ?? ucfirst($tarea->prioridad) }}
            </span>
        </div>
        
        <div>
            <span class="block text-sm text-slate-500 mb-1">Fecha límite</span>
            @if($tarea->vencimiento)
                <span class="font-medium {{ $tarea->estaVencida() ? 'text-red-600' : 'text-slate-700' }}">
                    {{ $tarea->vencimiento->format('d / m / Y') }}
                    @if($tarea->estaVencida()) 
                        <span class="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded ml-2">Vencida</span> 
                    @endif
                </span>
            @else
                <span class="text-slate-400 italic">No asignada</span>
            @endif
        </div>
    </div>

    <!-- Acciones de edición y borrado -->
    <div class="flex gap-5 items-center border-t border-slate-100 pt-6">
        <a href="{{ route('tasks.edit', $tarea) }}" class="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-md font-semibold transition shadow-sm">
            Editar tarea
        </a>
        
        <form action="{{ route('tasks.destroy', $tarea) }}" method="POST" onsubmit="return confirm('¿Estás seguro de que deseas eliminar esta tarea de forma permanente?');">
            @csrf
            @method('DELETE')
            <button type="submit" class="text-red-500 hover:text-red-700 font-medium text-sm transition">
                Eliminar tarea
            </button>
        </form>
    </div>
</div>
@endsection