<?php

namespace App\Http\Controllers\Api;

use App\Models\GradePedagogique ; 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator ; 

class GradePedagogiqueController extends Controller
{
    public function index() {

        $gradepedagogiques = GradePedagogique::all() ; 
        
        if ($gradepedagogiques->count() > 0) {
            return response()->json([
                'status' => 200,
                'gradepedagogiques' => $gradepedagogiques
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
               'nom_grdp' => 'required|string|max:191',
               'abr_grdp' => 'required|string|max:191',
           ]);

           if($validator->fails()) {
               
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);

           }else{
              $gradepedagogiques = GradePedagogique::create([
                'nom_grdp' => $request->nom_grdp , 
                'abr_grdp' => $request->abr_grdp ,
              ]);

              if($gradepedagogiques){

                  return response()->json([
                      'status' => 200 ,
                      'message' => "Grade Pedagogique a ete cree avec succes "
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
        $users = GradePedagogique::find($id) ;

        if (!$users){
            return response()->json([
                'message' => 'Grade Pedagogique introuvable' 
            ],404);
        }

        return response()->json([
            'grade_pedagogiques' => $users
        ],200) ;
    }
    
    public function edit($id) {

        $users = GradePedagogique::find($id) ;

        if (!$users){
            return response()->json([
                'message' => 'Grade Pedagogique introuvable' 
            ],404);
        }

        return response()->json([
            'grade_pedagogiques' => $users
        ],200) ;

    }

    public function update(Request $request, int $id) {
        $validator = Validator::make($request->all(), [
            'nom_grdp' => 'required|string|max:191',
            'abr_grdp' => 'required|string|max:191',
        ]);

        if($validator->fails()) {
            
         return response()->json([
             'status' => 422,
             'errors' => $validator->messages()
         ], 422);

        }else{

           $gradepedagogiques = GradePedagogique::find($id);

           

           if($gradepedagogiques){

            $gradepedagogiques->update([
                'nom_grdp' => $request->nom_grdp , 
                'abr_grdp' => $request->abr_grdp ,
              ]);

               return response()->json([
                   'status' => 200 ,
                   'message' => "Grade Pedagogique a ete modifie avec succes "
               ],200);
           }else{
             return response()->json([
                 'status' => 404 ,
                 'message' => "Grade Pedagogique introuvable"
             ],404);
           }
        }

    }

    public function destroy($id) {

        $gradepedagogiques = GradePedagogique::find($id) ;
        if($gradepedagogiques) {
            $gradepedagogiques->delete() ;     
            return response()->json([
                'status' => 200 ,
                'message' => "Grade Pedagogique a ete supprime avec succes ! "
            ],200);
        }else{
            return response()->json([
                'status' => 404 , 
                'message' => "Grade Pedagogique n'existe pas"
            ],404) ; 
        }

    }

    
}


