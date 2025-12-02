<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\NewsletterController;
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

Route::middleware(['auth:sanctum'])->group(function () {
Route::apiResource('tickets', TicketController::class);
Route::get('/tickets/{ticket}/download', [TicketController::class, 'downloadPdf']);
Route::get('/events/{event}/tickets', [TicketController::class, 'getEventTickets']);
    
});

Route::post('/users/register',[AuthController::class , 'register']);
Route::post('/users/login',[AuthController::class , 'login']);
Route::post('/users/logout',[AuthController::class , 'logout'])->middleware('auth:sanctum');


Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('evenements/create', [EventController::class, 'store']);
    Route::put('evenements/{id}/edit', [EventController::class, 'update']);
    Route::delete('evenements/{id}/delete', [EventController::class, 'destroy']);
    
});

Route::get('evenements',[EventController::class ,'index']);
Route::get('evenements/{id}/show', [EventController::class, 'show']);


Route::post('/newsletter/subscribe', [NewsletterController::class, 'subscribe']);
Route::get('/newsletter/confirm/{token}', [NewsletterController::class, 'confirm']);
