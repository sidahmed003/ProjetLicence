<?php

namespace App\Http\Controllers\Api;

use App\Models\Parcours ; 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator ; 

class ParcoursController extends Controller
{
    public function index() {

        $parcours = Parcours::all() ; 
        
        if ($parcours->count() > 0) {
            return response()->json([
                'status' => 200,
                'parcours' => $parcours
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
               'nom_par' => 'required|string|max:191',
               'abr_par' => 'required|string|max:191',
           ]);

           if($validator->fails()) {
               
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);

           }else{
              $parcours = Parcours::create([
                'nom_par' => $request->nom_par , 
                'abr_par' => $request->abr_par ,
              ]);

              if($parcours){

                  return response()->json([
                      'status' => 200 ,
                      'message' => "Parcours a ete cree avec succes "
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
        $users = Parcours::find($id) ;

        if (!$users){
            return response()->json([
                'message' => 'Parcours introuvable' 
            ],404);
        }

        return response()->json([
            'users' => $users
        ],200) ;
    }
    
    public function edit($id) {

        $users = Parcours::find($id) ;

        if (!$users){
            return response()->json([
                'message' => 'Parcours introuvable' 
            ],404);
        }

        return response()->json([
            'parcours' => $users
        ],200) ;

    }

    public function update(Request $request, int $id) {
        $validator = Validator::make($request->all(), [
            'nom_par' => 'required|string|max:191',
            'abr_par' => 'required|string|max:191',
        ]);

        if($validator->fails()) {
            
         return response()->json([
             'status' => 422,
             'errors' => $validator->messages()
         ], 422);

        }else{

           $parcours = Parcours::find($id);

           

           if($parcours){

            $parcours->update([
                'nom_par' => $request->nom_par , 
                'abr_par' => $request->abr_par ,
              ]);

               return response()->json([
                   'status' => 200 ,
                   'message' => "Parcours a ete modifie avec succes "
               ],200);
           }else{
             return response()->json([
                 'status' => 404 ,
                 'message' => "Parcours introuvable"
             ],404);
           }
        }

    }

    public function destroy($id) {

        $parcours = Parcours::find($id) ;
        if($parcours) {
            $parcours->delete() ;     
            return response()->json([
                'status' => 200 ,
                'message' => "Parcours a ete supprime avec succes ! "
            ],200);
        }else{
            return response()->json([
                'status' => 404 , 
                'message' => "Parcours n'existe pas"
            ],404) ; 
        }

    }

    
}


