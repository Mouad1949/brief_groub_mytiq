<?php

namespace App\Http\Controllers;

use App\Events\RegisterEvent;
use App\Http\Requests\AuthRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

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
      return response()->json(['message'=>'register is successfuly','token'=>$token->plainTextToken]);
    }

  
public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|string|min:6',
    ]);

    $user = User::where('email', $request->email)->first();

<<<<<<< HEAD
    if (!$user) {
        return response()->json(['message' => 'Email not found'], 404);
=======
      if(!Auth::attempt($request->only('email','password'))){
        return response()->json([
          'message'=> "invalid login",
        ]);
      }
      $user = User::where('email',$request->email)->firstOrFail();

      $token = $user->createToken('auth_token');
      return response()->json(['messges'=>'login is successfuly' ,'user'=>$user->role ,'token'=>$token->plainTextToken]);
>>>>>>> abf73944e8bd288a62e6c5941747468986f0ae8b
    }

    if (!Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid password'], 401);
    }

    $token = $user->createToken('authToken')->plainTextToken;

    return response()->json([
        'message' => 'Login successful',
        'token' => $token,
        'user' => $user->role
    ]);
}


    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return response()->json([
        "messsage"=>"logout successfuly"]);
    }


    public function verifyToken(Request $request){
    $token = str_replace('Bearer ', '', $request->header('Authorization'));
    $tokenModel = PersonalAccessToken::findToken($token);

    if (!$tokenModel) {
        return response()->json(['valid' => false], 401);
    }
    $user = $tokenModel->tokenable;
    return response()->json([
        'valid' => true,
        'role' => $user->role
    ]);
    }

}
