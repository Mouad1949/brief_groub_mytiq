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
        $event = Event::all();
        return response()->json(['users'=>$event]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $uploadImage = Cloudinary::upload(
          $request->file('image')->getRealPath()
        );
        $imageUrl = $uploadImage->getSecurePath();
        $adminId = $request->user()->id;
        $event = Event::create([
          'title'=>$request->title,
          'description'=>$request->description,
          'date'=>$request->date,
          'localisation'=>$request->localisation,
          'capacite'=>$request->capacite,
          'status'=>$request->status,
          'prix'=>$request->prix,
          'image'=>$imageUrl,
          'admin_id'=>$adminId,
        ]);
        return response()->json(['messages'=>'create event is seccussfuly','user'=>$event]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event ,$id)
    {
        $event = Event::find($id);
        return response()->json(['message'=>'detail event','event'=>$event]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event,$id)
    {
        $event = Event::find($id);
        if($request->hasFile('image')){
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
        $event->update();
        return response()->json(['messages'=>'update event is seccussfuly','user'=>$event]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event,$id)
    {
        $event = Event::find($id);
        $event->delete();
        return response()->json(['messages'=>'delete event is seccussfuly','user'=>$event->prenom]);
    }
}
