<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GradePedagogique extends Model
{
    use HasFactory;

    protected $table = "grade_pedagogiques" ;

    protected $fillable = [
        "nom_grdp" ,
        "abr_grdp"  
    ];
}