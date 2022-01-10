<?php

namespace App\Http\Controllers;

use App\Models\TypeVehicle;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TypeVehicleController extends Controller
{
    public function store(Request $request)
    {
        try {
            $request->validate([
                'type' => 'required|string',
            ]);
            $data = new TypeVehicle();
            $data->fill($request->all());
            $data->save();
            return response()->json($data, 200);
        } catch (Exception $e) {
            return response()->json([
                'Message' => 'Error: ' . $e->getMessage(),
                'Estatus' => Response::HTTP_BAD_REQUEST
            ]);
        }
    }

    public function index()
    {
        try {
            $data = TypeVehicle::all('id', 'type');
            return response()->json($data, 200);
        } catch (Exception $e) {
            return response()->json([
                'Message' => 'Error: ' . $e->getMessage(),
                'Estatus' => Response::HTTP_BAD_REQUEST
            ]);
        }
    }
}
