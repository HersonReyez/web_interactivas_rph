@extends('layouts.app')

@section('contenido')
<!-- Barra de Filtros[cite: 1] -->
<div class="bg-white p-5 rounded-lg shadow-sm mb-6 border border-slate-200">
    <form action="{{ route('tasks.index') }}" method="GET" class="flex flex-wrap md:flex-nowrap gap-4 items-end">
        <div>
            <label class="block text-sm text-slate-500 mb-1">Estado</label>
            <select name="estado" class="border-slate-300 rounded text-sm p-2 w-full md:w-32">
                <option value="">Todos</option>
                @foreach($estados as $key => $val)
                    <option value="{{ $key }}" {{ request('estado') == $key ? 'selected' : '' }}>{{ $val }}</option>
                @endforeach
            </select>
        </div>
        <div>
            <label class="block text-sm text-slate-500 mb-1">Prioridad</label>
            <select name="prioridad" class="border-slate-300 rounded text-sm p-2 w-full md:w-32">
                <option value="">Todas</option>
                @foreach($prioridades as $key => $val)
                    <option value="{{ $key }}" {{ request('prioridad') == $key ? 'selected' : '' }}>{{ $val }}</option>
                @endforeach
            </select>
        </div>
        <div class="flex-1">
            <label class="block text-sm text-slate-500 mb-1">Buscar</label>
            <input type="text" name="q" value="{{ request('q') }}" placeholder="Texto del título..." class="border-slate-300 rounded text-sm p-2 w-full">
        </div>
        <div class="flex gap-3">
            <button type="submit" class="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded text-sm font-semibold transition">Filtrar</button>
            <a href="{{ route('tasks.index') }}" class="text-slate-500 hover:text-slate-700 py-2 text-sm transition">Limpiar</a>
        </div>
    </form>
</div>

<!-- Columnas del Tablero[cite: 1] -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    @foreach($estados as $llave_estado => $texto_estado)
        <div class="bg-slate-200/50 rounded-xl p-4 border border-slate-200">
            <h2 class="font-bold mb-4 text-slate-700 flex justify-between items-center">
                {{ $texto_estado }} 
                <span class="text-xs bg-slate-300 text-slate-600 py-1 px-2 rounded-full">
                    {{ isset($tareasPorEstado[$llave_estado]) ? $tareasPorEstado[$llave_estado]->count() : 0 }}
                </span>
            </h2>
            
            @if(isset($tareasPorEstado[$llave_estado]))
                @foreach($tareasPorEstado[$llave_estado] as $tarea)
                    <!-- Aquí mandamos llamar al componente que creamos arriba -->
                    <x-task-card :tarea="$tarea" />
                @endforeach
            @endif
        </div>
    @endforeach
</div>
@endsection