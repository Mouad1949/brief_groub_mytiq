<?php

namespace App\Listeners;

use App\Events\RegisterEvent;
use App\Notifications\SendEmailRegister;

class EventListener
{

    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(RegisterEvent $event): void
    {
        $user = $event->user;
        $event->user->notify(new SendEmailRegister($user));
    }
}
