<div class="bg-white p-4 rounded-lg shadow-sm mb-4 border-l-4 {{ $tarea->prioridad === 'alta' ? 'border-red-500' : ($tarea->prioridad === 'media' ? 'border-orange-400' : 'border-teal-500') }}">
    
    <div class="flex justify-between items-start mb-2">
        <!-- Título -->
        <h3 class="font-semibold text-slate-700 leading-tight">{{ $tarea->titulo }}</h3>
        <!-- Etiqueta de Prioridad[cite: 1] -->
        <span class="text-xs font-bold {{ $tarea->prioridad === 'alta' ? 'text-red-500' : ($tarea->prioridad === 'media' ? 'text-orange-500' : 'text-teal-600') }}">
            {{ ucfirst($tarea->prioridad) }}
        </span>
    </div>

    <!-- Vencimiento[cite: 1] -->
    @if($tarea->vencimiento)
        <p class="text-xs mt-1 {{ $tarea->estaVencida() ? 'text-red-600 font-semibold' : 'text-slate-500' }}">
            Vence: {{ $tarea->vencimiento->format('d/m/Y') }} {{ $tarea->estaVencida() ? '(Vencida)' : '' }}
        </p>
    @endif

    <!-- Acciones Rápidas de Estado[cite: 1] -->
    <div class="mt-4 text-xs flex flex-wrap gap-3 text-sky-600 font-medium">
        @if($tarea->estado !== 'por_hacer')
            <form action="{{ route('tasks.change-status', $tarea) }}" method="POST" class="inline">
                @csrf @method('PATCH')
                <input type="hidden" name="estado" value="por_hacer">
                <button type="submit" class="hover:underline">&larr; Por hacer</button>
            </form>
        @endif

        @if($tarea->estado !== 'en_curso')
            <form action="{{ route('tasks.change-status', $tarea) }}" method="POST" class="inline">
                @csrf @method('PATCH')
                <input type="hidden" name="estado" value="en_curso">
                <button type="submit" class="hover:underline">&rarr; En curso</button>
            </form>
        @endif

        @if($tarea->estado !== 'hecha')
            <form action="{{ route('tasks.change-status', $tarea) }}" method="POST" class="inline">
                @csrf @method('PATCH')
                <input type="hidden" name="estado" value="hecha">
                <button type="submit" class="hover:underline">&rarr; Hecha</button>
            </form>
        @endif
    </div>

    <!-- Editar / Eliminar[cite: 1] -->
    <div class="mt-3 pt-3 border-t text-xs flex gap-3 text-slate-400">
        <a href="{{ route('tasks.edit', $tarea) }}" class="hover:text-slate-600 transition">Editar</a>
        <form action="{{ route('tasks.destroy', $tarea) }}" method="POST" class="inline" onsubmit="return confirm('¿Eliminar esta tarea?');">
            @csrf @method('DELETE')
            <button type="submit" class="hover:text-red-500 transition">Eliminar</button>
        </form>
    </div>
</div>