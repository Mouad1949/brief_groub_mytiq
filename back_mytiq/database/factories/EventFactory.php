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
          'title'        => fake()->sentence(3),
          'description'  => fake()->paragraph(),
          'localisation' => fake()->city(),
          'date'         => fake()->dateTimeBetween('+1 days', '+2 months'),
          'capacite'     => fake()->numberBetween(50, 500),
          'image'        => fake()->imageUrl(640, 480, 'events', true),
          'prix'         => fake()->randomFloat(2, 50, 300),
          'status'       => fake()->randomElement(['pending', 'confirmed', 'cancelled']),
          'admin_id' =>User::where('role','admin')->get('id')->random()
        ];
    }
}
