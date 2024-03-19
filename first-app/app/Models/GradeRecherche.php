<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GradeRecherche extends Model
{
    use HasFactory;

    protected $table = "grade_recherches" ;

    protected $fillable = [
        "nom_grdr" ,
        "abr_grdr"  
    ];
}
