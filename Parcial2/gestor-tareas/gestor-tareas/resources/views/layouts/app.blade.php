<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gestor de tareas</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-slate-100 text-slate-800 min-h-screen">
    <header class="bg-slate-900 text-white shadow">
        <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="{{ route('tasks.index') }}" class="text-xl font-bold">Gestor de tareas</a>
            <!-- Botón Nueva Tarea[cite: 1, 2] -->
            <a href="{{ route('tasks.create') }}" class="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded font-semibold transition">Nueva tarea</a>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-8">
        @if (session('exito'))
            <div class="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-6 shadow-sm">
                {{ session('exito') }}
            </div>
        @endif

        @yield('contenido')
    </main>
</body>
</html>