<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

// Gestiona las tareas: tablero, creación, detalle, edición,
// borrado y cambio rápido de estado.
class TaskController extends Controller
{
    // Muestra el tablero con las tareas agrupadas por estado.
    // Acepta filtros por estado y prioridad, y búsqueda por título.
    public function index(Request $peticion)
    {
        $consulta = Task::query();

        // Solo filtra por valores válidos; ignora el resto.
        if (array_key_exists($peticion->query('estado'), Task::ESTADOS)) {
            $consulta->where('estado', $peticion->query('estado'));
        }

        if (array_key_exists($peticion->query('prioridad'), Task::PRIORIDADES)) {
            $consulta->where('prioridad', $peticion->query('prioridad'));
        }

        if ($peticion->filled('q')) {
            $consulta->where('titulo', 'like', '%'.$peticion->query('q').'%');
        }

        $tareas = $consulta->orderByDesc('created_at')->get()->groupBy('estado');

        return view('tasks.index', [
            'tareasPorEstado' => $tareas,
            'estados' => Task::ESTADOS,
            'prioridades' => Task::PRIORIDADES,
            'filtros' => $peticion->only(['estado', 'prioridad', 'q']),
        ]);
    }

    // Muestra el formulario para crear una tarea.
    public function create()
    {
        return view('tasks.create', [
            'estados' => Task::ESTADOS,
            'prioridades' => Task::PRIORIDADES,
        ]);
    }

    // Guarda la tarea nueva y vuelve al tablero.
    public function store(Request $peticion)
    {
        $datos = $this->validar($peticion);

        Task::create($datos);

        return redirect()->route('tasks.index')->with('exito', 'Tarea creada.');
    }

    // Muestra el detalle de una tarea.
    public function show(Task $task)
    {
        return view('tasks.show', [
            'tarea' => $task,
            'estados' => Task::ESTADOS,
            'prioridades' => Task::PRIORIDADES,
        ]);
    }

    // Muestra el formulario para editar una tarea.
    public function edit(Task $task)
    {
        return view('tasks.edit', [
            'tarea' => $task,
            'estados' => Task::ESTADOS,
            'prioridades' => Task::PRIORIDADES,
        ]);
    }

    // Guarda los cambios de la tarea y vuelve al tablero.
    public function update(Request $peticion, Task $task)
    {
        $datos = $this->validar($peticion);

        $task->update($datos);

        return redirect()->route('tasks.index')->with('exito', 'Tarea actualizada.');
    }

    // Elimina la tarea definitivamente y vuelve al tablero.
    public function destroy(Task $task)
    {
        $task->delete();

        return redirect()->route('tasks.index')->with('exito', 'Tarea eliminada.');
    }

    // Cambia solo el estado desde los botones de la tarjeta.
    public function changeStatus(Request $peticion, Task $task)
    {
        $datos = $peticion->validate(
            ['estado' => 'required|in:por_hacer,en_curso,hecha'],
            ['estado.required' => 'El estado es obligatorio.', 'estado.in' => 'El estado no es válido.']
        );

        $task->update($datos);

        return redirect()->route('tasks.index')->with('exito', 'Estado actualizado.');
    }

    // Reglas de validación comunes a crear y editar, con mensajes en español.
    protected function validar(Request $peticion): array
    {
        return $peticion->validate(
            [
                'titulo' => 'required|string|max:255',
                'descripcion' => 'nullable|string|max:2000',
                'estado' => 'required|in:por_hacer,en_curso,hecha',
                'prioridad' => 'required|in:baja,media,alta',
                'vencimiento' => 'nullable|date',
            ],
            [
                'titulo.required' => 'El título es obligatorio.',
                'titulo.max' => 'El título no puede tener más de 255 caracteres.',
                'descripcion.max' => 'La descripción no puede tener más de 2000 caracteres.',
                'estado.required' => 'El estado es obligatorio.',
                'estado.in' => 'El estado no es válido.',
                'prioridad.required' => 'La prioridad es obligatoria.',
                'prioridad.in' => 'La prioridad no es válida.',
                'vencimiento.date' => 'La fecha de vencimiento no es válida.',
            ]
        );
    }
}