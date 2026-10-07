@extends('layouts.app')

@section('contenido')
<div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 max-w-3xl mx-auto">
    <!-- Título del formulario[cite: 2] -->
    <h2 class="text-2xl font-bold mb-6 text-slate-800">Nueva tarea</h2>
    
    <form action="{{ route('tasks.store') }}" method="POST">
        @csrf
        
        <!-- Campo Título[cite: 2] -->
        <div class="mb-5">
            <label class="block text-sm text-slate-600 mb-2">Título</label>
            <input type="text" name="titulo" value="{{ old('titulo') }}" class="w-full border-slate-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border" required>
            @error('titulo') <span class="text-red-500 text-xs">{{ $message }}</span> @enderror
        </div>

        <!-- Campo Descripción[cite: 2] -->
        <div class="mb-5">
            <label class="block text-sm text-slate-600 mb-2">Descripción (opcional)</label>
            <textarea name="descripcion" rows="4" class="w-full border-slate-300 rounded-md shadow-sm focus:border-sky-500 focus:ring-sky-500 p-2 border">{{ old('descripcion') }}</textarea>
            @error('descripcion') <span class="text-red-500 text-xs">{{ $message }}</span> @enderror
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <!-- Campo Estado[cite: 2] -->
            <div>
                <label class="block text-sm text-slate-600 mb-2">Estado</label>
                <select name="estado" class="w-full border-slate-300 rounded-md shadow-sm bg-slate-50 p-2 border">
                    @foreach($estados as $key => $val)
                        <option value="{{ $key }}" {{ old('estado') == $key ? 'selected' : '' }}>{{ $val }}</option>
                    @endforeach
                </select>
                @error('estado') <span class="text-red-500 text-xs">{{ $message }}</span> @enderror
            </div>
            
            <!-- Campo Prioridad[cite: 2] -->
            <div>
                <label class="block text-sm text-slate-600 mb-2">Prioridad</label>
                <select name="prioridad" class="w-full border-slate-300 rounded-md shadow-sm p-2 border">
                    @foreach($prioridades as $key => $val)
                        <option value="{{ $key }}" {{ (old('prioridad') ?? 'media') == $key ? 'selected' : '' }}>{{ $val }}</option>
                    @endforeach
                </select>
                @error('prioridad') <span class="text-red-500 text-xs">{{ $message }}</span> @enderror
            </div>
            
            <!-- Campo Vencimiento[cite: 2] -->
            <div>
                <label class="block text-sm text-slate-600 mb-2">Vence (opcional)</label>
                <input type="date" name="vencimiento" value="{{ old('vencimiento') }}" class="w-full border-slate-300 rounded-md shadow-sm p-2 border text-slate-600">
                @error('vencimiento') <span class="text-red-500 text-xs">{{ $message }}</span> @enderror
            </div>
        </div>

        <!-- Botones de Acción[cite: 2] -->
        <div class="flex gap-4 items-center">
            <button type="submit" class="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-md font-semibold transition shadow-sm">Guardar</button>
            <a href="{{ route('tasks.index') }}" class="text-sky-600 hover:text-sky-800 text-sm transition">Cancelar</a>
        </div>
    </form>
</div>
@endsection