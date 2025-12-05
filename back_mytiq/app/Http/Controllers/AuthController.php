<?php

namespace App\Http\Controllers;

use App\Events\RegisterEvent;
use App\Http\Requests\AuthRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    // function register
    public function register(AuthRequest $request){
      $user = new User();
      $user->nom = $request->nom;
      $user->prenom = $request->prenom;
      $user->email = $request->email;
      $user->password = $request->password;
      $user->save();
      $token = $user->createToken('auth_token');
      // RegisterEvent::dispatch($user);
      return response()->json(['message'=>'register is successfuly',$user,'token'=>$token->plainTextToken]);
    }

    // function login

    public function login(Request $request){
      $request->validate([
        'email'=>'required|email|string',
        'password'=>'required|string',
      ]);

      if(!Auth::attempt($request->only('email','password'))){
        return response()->json([
          'message'=> "invalid login",
        ]);
      }
      $user = User::where('email',$request->email)->firstOrFail();

      $token = $user->createToken('auth_token');
      return response()->json(['messges'=>'login is successfuly' ,'user'=>$user->role ,'token'=>$token->plainTextToken]);
    }

    // function logout

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return response()->json([
        "messsage"=>"logout successfuly"]);
    }

}
