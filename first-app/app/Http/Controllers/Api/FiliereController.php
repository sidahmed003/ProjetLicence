<?php

namespace App\Http\Controllers\Api;

use App\Models\Filiere ; 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator ; 

class FiliereController extends Controller
{
    public function index() {

        $filieres = Filiere::all() ; 
        
        if ($filieres->count() > 0) {
            return response()->json([
                'status' => 200,
                'filieres' => $filieres
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
               'nom_fil' => 'required|string|max:191',
               'abr_fil' => 'required|string|max:191',
           ]);

           if($validator->fails()) {
               
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ], 422);

           }else{
              $filieres = Filiere::create([
                'nom_fil' => $request->nom_fil , 
                'abr_fil' => $request->abr_fil ,
              ]);

              if($filieres){

                  return response()->json([
                      'status' => 200 ,
                      'message' => "Filiere a ete cree avec succes "
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
        $users = Filiere::find($id) ;

        if (!$users){
            return response()->json([
                'message' => 'Filiere introuvable' 
            ],404);
        }

        return response()->json([
            'users' => $users
        ],200) ;
    }
    
    public function edit($id) {

        $users = Filiere::find($id) ;

        if (!$users){
            return response()->json([
                'message' => 'Filiere introuvable' 
            ],404);
        }

        return response()->json([
            'filieres' => $users
        ],200) ;

    }

    public function update(Request $request, int $id) {
        $validator = Validator::make($request->all(), [
            'nom_fil' => 'required|string|max:191',
            'abr_fil' => 'required|string|max:191',
        ]);

        if($validator->fails()) {
            
         return response()->json([
             'status' => 422,
             'errors' => $validator->messages()
         ], 422);

        }else{

           $filieres = Filiere::find($id);

           

           if($filieres){

            $filieres->update([
                'nom_fil' => $request->nom_fil , 
                'abr_fil' => $request->abr_fil ,
              ]);

               return response()->json([
                   'status' => 200 ,
                   'message' => "Filiere a ete modifie avec succes "
               ],200);
           }else{
             return response()->json([
                 'status' => 404 ,
                 'message' => "Filiere introuvable"
             ],404);
           }
        }

    }

    public function destroy($id) {

        $filieres = Filiere::find($id) ;
        if($filieres) {
            $filieres->delete() ;     
            return response()->json([
                'status' => 200 ,
                'message' => "Filiere a ete supprime avec succes ! "
            ],200);
        }else{
            return response()->json([
                'status' => 404 , 
                'message' => "Filiere n'existe pas"
            ],404) ; 
        }

    }

    
}

