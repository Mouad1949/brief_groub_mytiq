<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\Event;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Events\TicketPurchased;
use GrahamCampbell\ResultType\Success;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use SimpleSoftwareIO\QrCode\Generator;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $user = Auth::user();
            if ($user -> role === 'admin'){
                $tickets = Ticket::with(['event','user'])
                ->orderBy('purchase_date','desc')
                ->get();
            } else{
                $tickets = Ticket::with('event')
                ->where('user_id', $user->id)
                ->orderBy('purchase_date','desc')
                ->get();
            }
            return response()->json([
                'success'=> true,
                'tickets'=>$tickets
            ]);
        } catch (\Exception $e){
            return response ()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des billets: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTicketRequest $request)
    {
        try {
           $user = Auth::user();
            $event = Event::findOrFail($request->event_id);
             if (!$event) {
                return response()->json([
                    'success' => false,
                    'message' => 'Événement non trouvé'
                ], 404);
            }
            $ticketsCount = Ticket::where('event_id', $event->id)->count();
            if ($ticketsCount >= $event->capacite){
                return response()->json([
                    'success' => false,
                    'message' => 'evenement complet.'
                ],400);
            }
            $existingTicket = Ticket::where('user_id',$user->id)
            ->where('event_id',$event->id)
            ->first();
            if ($existingTicket){
                return response()->json([
                    'success' => false,
                    'message' => 'vous avez deja un billet pour cet evenement '
                ],400);
            }
          $qrCode = 'TICKET-' . Str::upper(Str::random(10)) . '-' . time();

          $ticket = Ticket::create([
            'qr_code' => $qrCode,
            'purchase_date' => now(),
            'user_id' => $user->id,
            'event_id' => $event->id,
            'pdf_path' => null
        ]);

        // $qrData = "TICKET-{$ticket->id} | USER-{$ticket->user_id} | EVENT-{$ticket->event_id}";
        // $qrPath = "qr/ticket_{$ticket->id}.png";

        // $qr = new Generator;
        // $qrImage = $qr->format('png')->size(300)->generate($qrData); // ✔ Forces GD → No Imagick

        // \Storage::disk('public')->put($qrPath, $qrImage);

        // $ticket->update([
        //     'qr_code' => $qrPath,
        // ]);



            $ticket->load('event');
            // event(new TicketPurchased($ticket,$user));
            return response()->json([
                'success' => true,
                'message' => 'Billet achete avec succes!',
                'ticket' => $ticket->load('event')
            ],201);

        }catch(\Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'achat :' . $e->getMessage()
            ],500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        try {
            $user = Auth::user();
            if ( $user -> role !== 'admin'  && $ticket->user_id !== $user->id){
                return response()->json([
                    'success'=> false,
                    'message' => 'Access non autorise'
                ],403);
            }
            return response()->json([
                'success'=> true,
                'ticket' => $ticket->load(['event', 'user'])
            ]);
        } catch (\Exception $e){
            return response()->json([
                'success' => false,
                'message' =>'Erreur: ' . $e->getMessage()
            ],500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        // 
    }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(Ticket $ticket)
    // {
    //     try {
    //         $user = Auth::user();
    //        if (!$user){
    //         return response()->json([
    //             'success' =>false ,
    //             'message' => 'Utilisateur non connecté'
    //         ],401);
    //        }

    //         if ($user->role !== 'admin'){
    //             return response()->json([
    //                 'success'=>false,
    //                 'message' => 'action non autorisee'
    //             ],403);
    //         }
    //         if ($ticket->pdf_path  && Storage::exists($ticket->pdf_path) ){
    //             Storage::delete($ticket->pdf_path);
    //         }
    //         $ticket->delete();
    //         return response()->json([
    //             'success'=> true,
    //             'message'=> 'billet supprime avec succes'
    //         ]);

    //     }catch (\Exception $e){
    //         return response()->json([
    //             'success' => false ,
    //             'message' => 'Erreur lors de la suppression: ' . $e->getMessage()
    //         ],500);
    //     }
    // }
    public function downloadPdf(Ticket $ticket)
    {
        try{
            $user = Auth::user();
            if ( $user -> role !== 'admin'  && $ticket->user_id !== $user->id){
                return response ()->json([
                    'success' => false,
                    'message' => 'acces non autorise'
                ],403);
            }
            if ( !$ticket ->pdf_path || !Storage::exists($ticket->pdf_path)){
                $pdfPath = $this->generatePdf($ticket);
                $ticket->update(['pdf_path'=> $pdfPath]);
            }
            return response()->download(storage_path('app/' . $ticket->pdf_path));
        } catch (\Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'erreur telechargement '  . $e->getMessage()
            ],500);
        }
    }
    public function getEventTickets($eventId)
    {
        try {
           $user = Auth::user();
           if (!$user){
            return response()->json([
                'success' =>false ,
                'message' => 'Utilisateur non connecté'
            ],401);
           }
            if ($user -> role !== 'admin'){
                return response()->json([
                    'success' => false,
                    'message' => 'acces reserve aux administrateurs'
                ],403);
            }
            $tickets = Ticket::with('user')
            ->where('event_id' , $eventId)
            ->orderBy('purchase_date','desc')
            ->get();

            return response()->json([
                'success' => true,
                'tickets' => $tickets,
                'count' => $tickets->count()
            ]);
        }catch (\Exception $e){
            return response()->json([
                'success' => false,
                'message' => 'Erreur: ' . $e->getMessage()
            ],500);
        }
    }
    private function generatePdf(Ticket $ticket){
        $ticket->load(['event', 'user']);
        $content = "
        BILLET D'ENTRÉE
        ===============
        
        Événement: {$ticket->event->title}
        Date: {$ticket->event->date}
        Lieu: {$ticket->event->localisation}
        
        Détails du billet:
        ------------------
        Code QR: {$ticket->qr_code}
        Numéro: #{$ticket->id}
        Acheté le: {$ticket->purchase_date->format('d/m/Y H:i')}
        
        Porteur:
        --------
        Nom: {$ticket->user->nom} {$ticket->user->prenom}
        Email: {$ticket->user->email}
        
        IMPORTANT: Présentez ce billet à l'entrée
        ";

        $filename = 'tickets/ticket-' . $ticket->qr_code . '.txt';
        Storage::put($filename, $content);
         return $filename;
    }
}
