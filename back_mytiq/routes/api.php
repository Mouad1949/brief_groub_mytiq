<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TicketController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::middleware(['auth:sanctum'])->group(function(){
//     Route::apiResource('tickets',TicketController::class);
//     Route::get('/tickets/{ticket}/download',[TicketController::class, 'downloadPdf']);
//     Route::get('/events/{event}/tickets',[TicketController::class , 'getEventTickets']);
// });
// Route temporaire sans auth pour testing
Route::apiResource('tickets', TicketController::class);
Route::get('/tickets/{ticket}/download', [TicketController::class, 'downloadPdf']);
Route::get('/events/{event}/tickets', [TicketController::class, 'getEventTickets']);