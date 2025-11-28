<?php

namespace App\Http\Controllers;

use App\Models\Newslitter;
use App\Http\Requests\StoreNewslitterRequest;
use App\Http\Requests\UpdateNewslitterRequest;
use Symfony\Component\HttpFoundation\Request;

class NewslitterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    
    public function subscribe( StoreNewslitterRequest $request)
    {
        $subscription = Newslitter::create([
            'email' => $request->email,
            'is_active' => true,
            'subscribed_at' => now()
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Inscription à la newsletter réussie',
            'subscription' => $subscription
        ], 201);
    }

    public function unsubscribe(Request $request){
        
    }
    
    
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNewslitterRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Newslitter $newslitter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNewslitterRequest $request, Newslitter $newslitter)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Newslitter $newslitter)
    {
        //
    }
}
