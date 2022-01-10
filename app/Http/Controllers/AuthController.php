<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:150',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8'
            ]);

            $user = User::create([
                'name' => $validatedData["name"],
                'email' => $validatedData["email"],
                'password' => Hash::make($validatedData["password"])
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            $dataUser = User::where("email", $validatedData["email"])->firstOrFail();
            $dataUser->fill([
                'token' => $token
            ]);
            $dataUser->save();

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'Estatus' => Response::HTTP_OK
            ]);
        } catch (Exception $e) {

            return response()->json([
                'Message' => 'Error: ' . $e->getMessage(),
                'Estatus' => Response::HTTP_BAD_REQUEST
            ]);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials))
            return response()->json([
                'Message' => 'User and password does not match',
                'Estatus' => Response::HTTP_FORBIDDEN
            ], 401);

        $user = User::where('email', $request['email'])->firstOrFail();

        $tokenResult = $user->createToken('auth_token');

        $user->fill([
            'token' => $tokenResult->plainTextToken,
        ]);
        $user->save();

        return response()->json([
            'access_token' => $tokenResult->plainTextToken,
            'token_type' => 'Bearer',
            'user' => $user,
            'Estatus' => Response::HTTP_OK
        ]);
    }
}
