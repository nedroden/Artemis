<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'is_banned' => false,
            'primary_group_id' => 1
        ]);

        return $this->returnToken(auth()->login($user));
    }

    public function login(Request $request): JsonResponse
    {
        $token = auth()->attempt($request->only(['email', 'password']));

        if (!$token) {
            return response()->json([
                'error' => 'Unauthorized'
            ], 401);
        }

        return $this->returnToken($token);
    }

    private function returnToken($token): JsonResponse
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
