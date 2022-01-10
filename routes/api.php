<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TypeVehicleController;
use App\Http\Controllers\VehicleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Type vehicles
Route::prefix('typeVehicles')->middleware('auth:sanctum')->group(function () {
    Route::resource('store', TypeVehicleController::class);
    Route::resource('/', TypeVehicleController::class);
});
// Vehicles
Route::prefix('vehicles')->middleware('auth:sanctum')->group(function () {
    Route::resource('store', VehicleController::class);
    Route::resource('/', VehicleController::class);
    Route::get("/{id}", "App\Http\Controllers\VehicleController@show");
});
