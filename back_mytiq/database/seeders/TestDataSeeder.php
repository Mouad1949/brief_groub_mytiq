<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Event;
use App\Models\Ticket;

class TestDataSeeder extends Seeder
{
    public function run()
    {
        // Créer un user
        $user = User::create([
            'name' => 'Test User',
            'email' => 'test@test.com',
            'password' => bcrypt('password'),
            'role' => 'user'
        ]);

        // Créer un event
        $event = Event::create([
            'title' => 'Concert Test',
            'date' => now()->addDays(7),
            'capacite' => 100,
            'prix' => 50,
            'localisation' => 'Paris'
        ]);

        echo "User ID: " . $user->id . "\n";
        echo "Event ID: " . $event->id . "\n";
    }
}