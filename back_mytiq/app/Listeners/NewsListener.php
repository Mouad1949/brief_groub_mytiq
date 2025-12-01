<?php

namespace App\Listeners;

use App\Events\NewsEvent;
use App\Events\NewsEvent as EventsNewsEvent;
use App\Events\NewsEvent as AppEventsNewsEvent;
use App\Mail\NewsletterSubscribedMail;
use App\Models\Newsletter;
use App\Models\NewsletterSubscription;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class NewsListener
{
    /**
     * Create the event listener.
     */
    public $email;
    public function __construct(Newsletter $email)
    {
      $this->email=$email; 
    }

    /**x    
     * Handle the event.
     */
   public function handle(NewsEvent $event): void
    {
        $subscriber = $event->subscription;

        Mail::to($subscriber->email)
            ->send(new NewsletterSubscribedMail($subscriber));
    }
}
