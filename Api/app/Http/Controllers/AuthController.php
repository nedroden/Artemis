<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'unique:users', 'min:3', 'max:30'],
            'email' => ['required', 'unique:users', 'max:60', 'email'],
            'password' => ['required', 'min:10', 'max:255', 'confirmed']
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'is_banned' => false,
            'primary_group_id' => 3
        ]);

        return $this->returnToken(auth()->login($user), 201);
    }

    public function login(Request $request): JsonResponse
    {
        $token = auth()->attempt($request->only(['email', 'password']));

        if (!$token) {
            return response()->json([
                'errors' => ['No user exists with the specified email address and password.']
            ], 401);
        }

        return $this->returnToken($token);
    }

    private function returnToken($token, int $statusCode = 200): JsonResponse
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ], $statusCode);
    }
}
