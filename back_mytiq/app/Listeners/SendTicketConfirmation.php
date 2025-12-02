<?php

namespace App\Listeners;

use App\Events\TicketPurchased;
use App\Notifications\PurchaseTicket;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendTicketConfirmation
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
    public function handle(TicketPurchased $event): void
    {
        $event->user->notify(new PurchaseTicket());
    }
}
