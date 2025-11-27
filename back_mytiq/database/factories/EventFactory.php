<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
                return [
                    'qr_code' => 'TICKET-' . strtoupper(fake()->bothify('??##??##??')) . '-' . time(),
                    'pdf_path' => 'tickets/ticket-' . fake()->uuid . '.pdf',
                    'purchase_date' => fake()->dateTimeBetween('-1 month', 'now'),
                    'user_id' => User::factory(1)->create(), // Crée un user automatiquement
                    'event_id' => Event::factory(2)->create(),
                ];
    }
}
