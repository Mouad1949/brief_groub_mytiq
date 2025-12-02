<?php

namespace App\Providers;

use App\Events\NewsEvent;
use App\Events\RegisterEvent;
use App\Events\TicketPurchased;
use App\Listeners\EventListener;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
use App\Listeners\SendTicketConfirmation;
=======
use App\Listeners\NewsListener;
>>>>>>> main
=======
use App\Listeners\SendTicketConfirmation;
use App\Listeners\NewsListener;
>>>>>>> main
=======
use App\Listeners\SendTicketConfirmation;
use App\Listeners\NewsListener;
>>>>>>> 53e2ddb2b982ada72918a21c1dae28bc098ecb70
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        RegisterEvent::class => [EventListener::class],
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        TicketPurchased::class => [SendTicketConfirmation::class]
=======

        NewsEvent::class=>[NewsListener::class],
>>>>>>> main
=======
        TicketPurchased::class => [SendTicketConfirmation::class]

        NewsEvent::class=>[NewsListener::class],
>>>>>>> main
=======
        TicketPurchased::class => [SendTicketConfirmation::class]

        NewsEvent::class=>[NewsListener::class],
>>>>>>> 53e2ddb2b982ada72918a21c1dae28bc098ecb70
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
