<?php

namespace App\Http\Controllers;

use App\Events\SendEvent;
use App\Models\Event;
use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $events = Event::all();
            
            return response()->json([
                'success' => true,
                'events' => $events // CORRIGÉ: 'events' pas 'users'
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des événements: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        try {
            $uploadImage = Cloudinary::upload(
                $request->file('image')->getRealPath()
            );
            $imageUrl = $uploadImage->getSecurePath();
            $adminId = $request->user()->id;
            
            $event = Event::create([
                'title' => $request->title,
                'description' => $request->description,
                'date' => $request->date,
                'localisation' => $request->localisation,
                'capacite' => $request->capacite,
                'status' => $request->status,
                'prix' => $request->prix,
                'image' => $imageUrl,
                'admin_id' => $adminId,
            ]);
            
            return response()->json([
                'success' => true,
                'message' => 'Événement créé avec succès',
                'event' => $event // CORRIGÉ: 'event' pas 'user'
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        try {
            $event = Event::findOrFail($id);
            
            return response()->json([
                'success' => true,
                'event' => $event
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Événement non trouvé'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, $id)
    {
        try {
            $event = Event::findOrFail($id);
            
            if ($request->hasFile('image')) {
                $uploadImage = Cloudinary::upload(
                    $request->file('image')->getRealPath()
                );
                $imageUrl = $uploadImage->getSecurePath();
                $event->image = $imageUrl;
            }
            
            $event->title = $request->title;
            $event->description = $request->description;
            $event->localisation = $request->localisation;
            $event->date = $request->date;
            $event->capacite = $request->capacite;
            $event->status = $request->status;
            $event->prix = $request->prix;
            $event->save();
            
            return response()->json([
                'success' => true,
                'message' => 'Événement mis à jour avec succès',
                'event' => $event // CORRIGÉ: 'event' pas 'user'
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $event = Event::findOrFail($id);
            $eventTitle = $event->title; // Sauvegardez le titre avant suppression
            $event->delete();
            
            return response()->json([
                'success' => true,
                'message' => "Événement '{$eventTitle}' supprimé avec succès"
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression: ' . $e->getMessage()
            ], 500);
        }
    }
}