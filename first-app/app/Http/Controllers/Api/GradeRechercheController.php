<?php

namespace App\Http\Controllers\Api;

use App\Models\GradeRecherche ; 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator ; 

class GradeRechercheController extends Controller
{
    public function index() {

        $graderecherches = GradeRecherche::all() ; 
        
        if ($graderecherches->count() > 0) {
            return response()->json([
                'status' => 200,
                'graderecherches' => $graderecherches
            ], 200);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Aucun Element'
            ], 404);
        }
        
    }

    public function store(Request $request) {
           $validator = Validator::make($request->all(), [
               'nom_grdr' => 'required|string|max:191',
               'abr_grdr' => 'required|string|max:191',
           ]);

           if($validator->fails()) {
               
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);

           }else{
              $graderecherches = GradeRecherche::create([
                'nom_grdr' => $request->nom_grdr , 
                'abr_grdr' => $request->abr_grdr ,
              ]);

              if($graderecherches){

                  return response()->json([
                      'status' => 200 ,
                      'message' => "Grade de Recherche a ete cree avec succes "
                  ],200);
              }else{
                return response()->json([
                    'status' => 500 ,
                    'message' => "Erreur Detectee : Veuillez recommencer"
                ],500);
              }
           }
    }

    public function show($id)
    {
        $users = GradeRecherche::find($id) ;

        if (!$users){
            return response()->json([
                'message' => 'Grade de Recherche introuvable' 
            ],404);
        }

        return response()->json([
            'grade_recherches' => $users
        ],200) ;
    }
    
    public function edit($id) {

        $users = GradeRecherche::find($id) ;

        if (!$users){
            return response()->json([
                'message' => 'Grade de recherche introuvable' 
            ],404);
        }

        return response()->json([
            'grade_recherches' => $users
        ],200) ;

    }

    public function update(Request $request, int $id) {
        $validator = Validator::make($request->all(), [
            'nom_grdr' => 'required|string|max:191',
            'abr_grdr' => 'required|string|max:191',
        ]);

        if($validator->fails()) {
            
         return response()->json([
             'status' => 422,
             'errors' => $validator->messages()
         ], 422);

        }else{

           $graderecherches = GradeRecherche::find($id);

           

           if($graderecherches){

            $graderecherches->update([
                'nom_grdr' => $request->nom_grdr , 
                'abr_grdr' => $request->abr_grdr ,
              ]);

               return response()->json([
                   'status' => 200 ,
                   'message' => "Grade de Recherche a ete modifie avec succes "
               ],200);
           }else{
             return response()->json([
                 'status' => 404 ,
                 'message' => "Grade de Recherche introuvable"
             ],404);
           }
        }

    }

    public function destroy($id) {

        $graderecherches = GradeRecherche::find($id) ;
        if($graderecherches) {
            $graderecherches->delete() ;     
            return response()->json([
                'status' => 200 ,
                'message' => "Grade de Recherche a ete supprime avec succes ! "
            ],200);
        }else{
            return response()->json([
                'status' => 404 , 
                'message' => "Grade de Recherche n'existe pas"
            ],404) ; 
        }

    }

    
}


