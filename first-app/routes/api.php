<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FiliereController ; 
use App\Http\Controllers\Api\ParcoursController ; 
use App\Http\Controllers\Api\GradeRechercheController ; 
use App\Http\Controllers\Api\GradePedagogiqueController ; 

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Filieres

Route::get('filieres', [FiliereController::class, 'index']) ; 

Route::post('filieres', [FiliereController::class, 'store']) ; 

Route::get('filieres/{id}', [FiliereController::class, 'show']) ; 

Route::get('filieres/{id}/edit', [FiliereController::class, 'edit']) ; 

Route::put('filieres/{id}/edit', [FiliereController::class, 'update']) ; 

Route::delete('filieres/{id}/delete', [FiliereController::class, 'destroy']) ;


//Parcours

Route::get('parcours', [ParcoursController::class, 'index']) ; 

Route::post('parcours', [ParcoursController::class, 'store']) ; 

Route::get('parcours/{id}', [ParcoursController::class, 'show']) ; 

Route::get('parcours/{id}/edit', [ParcoursController::class, 'edit']) ; 

Route::put('parcours/{id}/edit', [ParcoursController::class, 'update']) ; 

Route::delete('parcours/{id}/delete', [ParcoursController::class, 'destroy']) ; 


//Grades de recherches

Route::get('graderecherches', [GradeRechercheController::class, 'index']) ; 

Route::post('graderecherches', [GradeRechercheController::class, 'store']) ; 

Route::get('graderecherches/{id}', [GradeRechercheController::class, 'show']) ; 

Route::get('graderecherches/{id}/edit', [GradeRechercheController::class, 'edit']) ; 

Route::put('graderecherches/{id}/edit', [GradeRechercheController::class, 'update']) ; 

Route::delete('graderecherches/{id}/delete', [GradeRechercheController::class, 'destroy']) ; 


//Grades Pedagogiques 

Route::get('gradepedagogiques', [GradePedagogiqueController::class, 'index']) ; 

Route::post('gradepedagogiques', [GradePedagogiqueController::class, 'store']) ; 

Route::get('gradepedagogiques/{id}', [GradePedagogiqueController::class, 'show']) ; 

Route::get('gradepedagogiques/{id}/edit', [GradePedagogiqueController::class, 'edit']) ; 

Route::put('gradepedagogiques/{id}/edit', [GradePedagogiqueController::class, 'update']) ; 

Route::delete('gradepedagogiques/{id}/delete', [GradePedagogiqueController::class, 'destroy']) ; 



