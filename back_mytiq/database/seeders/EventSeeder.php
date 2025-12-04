<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use Carbon\Carbon;

class EventSeeder extends Seeder
{
    public function run()
    {
        $events = [
            [
                'title' => 'React Conference 2025',
                'description' => 'The biggest React conference with world-class speakers covering latest advancements in React ecosystem.',
                'date' => '2025-03-15 09:00:00',
                'localisation' => 'San Francisco, CA',
                'capacite' => 300,
                'status' => 'confirmed',
                'prix' => 299,
                'admin_id' => 1,
                'image' => '/images/events/event1.webp',
            ],
            [
                'title' => 'Web Development Bootcamp',
                'description' => 'Complete full-stack web development training for beginners to advanced developers.',
                'date' => '2025-04-10 10:00:00',
                'localisation' => 'New York, NY',
                'capacite' => 150,
                'status' => 'confirmed',
                'prix' => 479,
                'admin_id' => 1,
                'image' => '/images/events/event2.jpg',
            ],
            [
                'title' => 'JavaScript Workshop',
                'description' => 'Advanced JavaScript techniques and modern ES6+ features workshop.',
                'date' => '2025-05-20 14:00:00',
                'localisation' => 'Austin, TX',
                'capacite' => 100,
                'status' => 'confirmed',
                'prix' => 199,
                'admin_id' => 1,
                'image' => '/images/events/event3.webp',
            ],
            [
                'title' => 'Cloud Computing Summit',
                'description' => 'Learn about cloud technologies, AWS, Azure and Google Cloud Platform.',
                'date' => '2025-04-22 11:00:00',
                'localisation' => 'Los Angeles, CA',
                'capacite' => 250,
                'status' => 'confirmed',
                'prix' => 399,
                'admin_id' => 1,
                'image' => '/images/events/event4.webp',
            ],
            [
                'title' => 'AI & ML Expo',
                'description' => 'Artificial Intelligence and Machine Learning exhibition with industry leaders.',
                'date' => '2025-05-03 10:00:00',
                'localisation' => 'New York, NY',
                'capacite' => 200,
                'status' => 'confirmed',
                'prix' => 549,
                'admin_id' => 1,
                'image' => '/images/events/event5.webp',
            ],
            [
                'title' => 'Cybersecurity Summit',
                'description' => 'Latest trends in cybersecurity and protection against digital threats.',
                'date' => '2025-02-19 08:30:00',
                'localisation' => 'Seattle, WA',
                'capacite' => 180,
                'status' => 'confirmed',
                'prix' => 199,
                'admin_id' => 1,
                'image' => '/images/events/event6.jpg',
            ],
        ];

        foreach ($events as $event) {
            Event::create(array_merge($event, [
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]));
        }

        $this->command->info(count($events) . ' événements créés avec vos images !');
    }
}