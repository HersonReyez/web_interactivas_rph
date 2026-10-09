<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Crear el administrador por defecto
        User::create([
            'name' => 'Administrador',
            'email' => 'admin@torneos.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);
    }
}
