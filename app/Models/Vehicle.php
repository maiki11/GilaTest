<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'year',
        'brand',
        'model',
        'color',
        'plate',
        'tyres',
        'engine_power',
        'type_vehicle_id'
    ];
}
