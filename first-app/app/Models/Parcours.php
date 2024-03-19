<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parcours extends Model
{
    use HasFactory;

    protected $table = "parcours" ;

    protected $fillable = [
        "nom_par" ,
        "abr_par"  
    ];
}
