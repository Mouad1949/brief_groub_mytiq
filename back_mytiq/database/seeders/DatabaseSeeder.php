<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Event;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(1)->create()->each(function($user){
        //   Event::factory(10)->create(['admin_id'=> $user->id]);
        // });
        // $this->call([EventSeeder::class]);

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        // $this->call([TicketSeeder::class]);
$admin = User::factory()->create([
    'role' => 'admin',
]);


$users = User::factory(10)->create();


$events = Event::factory(10)->create([
    'admin_id' => $admin->id,
]);


$events->each(function ($event) use ($users) {
    Ticket::factory(10)->create([
        'event_id' => $event->id,
        'user_id'  => $users->random()->id,
    ]);
});

    }
    

     
}
