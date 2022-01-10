<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

interface VehicleInterface
{
    public function show($id);
    public function store(Request $request);
    public function index();
}


class VehicleController extends Controller implements VehicleInterface
{
    private $table = "vehicles";
    public function store(Request $request)
    {
        try {
            $request->validate([
                'year' => 'integer',
                'brand' => 'required|string',
                'model' => 'required|string',
                'color' => 'string',
                'plate' => 'required|string',
                'tyres' => 'required|integer',
                'engine_power' => 'numeric',
                'type_vehicle_id' => 'required|integer',
            ]);
            $data = new Vehicle();
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
            $data = DB::table($this->table . " as v")->select("v.*", "tv.type")->join('type_vehicles as tv', 'v.type_vehicle_id', '=', 'tv.id')->get();
            return response()->json($data, 200);
        } catch (Exception $e) {
            return response()->json([
                'Message' => 'Error: ' . $e->getMessage(),
                'Estatus' => Response::HTTP_BAD_REQUEST
            ]);
        }
    }

    public function show($id)
    {
        try {
            $vehicle = DB::table($this->table . " as v")->where('v.id', '=', $id)->join('type_vehicles', 'v.type_vehicle_id', '=', 'type_vehicles.id')->get();
            return response()->json($vehicle, 200);
        } catch (Exception $ex) {
            return response()->json([
                "message" => "Vehicle does not exist.",
                "error" => $ex->getMessage()
            ], 404);
        }
    }
}
