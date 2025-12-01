<?php

namespace App\Http\Controllers;

use App\Events\NewsEvent;
use App\Models\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Mail\NewsletterSubscribedMail;
use Illuminate\Support\Facades\Mail;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $token = Str::random(32);

        $subscription = Newsletter::create([
            'email' => $request->email,
            'token' => $token,
            'confirmed' => false
        ]);

        NewsEvent::dispatch($subscription);

        $confirmationUrl = url("/newsletter/confirm/{$token}");

        return response()->json([
            'message' => 'Subscription created successfully! Check your email to confirm.',
            'email' => $request->email,
            'confirmation_url' => $confirmationUrl,
            'token' => $token
        ], 201);

        
    return response()->json(['message' => 'You have been subscribed successfully']);
    }

    public function confirm($token)
    {
        $subscription = Newsletter::where('token', $token)->first();

        if (!$subscription) {
            return response()->json([
                'message' => 'Invalid confirmation token'
            ], 404);
        }

        if ($subscription->confirmed) {
            return response()->json([
                'message' => 'Email already confirmed',
                'email' => $subscription->email
            ], 200);
        }

        $subscription->update(['confirmed' => true]);

        return response()->json([
            'message' => 'Email confirmed successfully! You are now subscribed to our newsletter.',
            'email' => $subscription->email,
            'confirmed_at' => now()
        ], 200);
    }
}
