import React, {useEffect, useState }from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading.js'

function GradeRecherche() {

    const [loading, setLoading] = useState(true) ; 
    const [graderecherches, setgraderecherches] = useState([]) ; 

    useEffect(() => {
        
        axios.get('http://127.0.0.1:8000/api/graderecherches').then(res => {
            console.log(res);
            setgraderecherches(res.data.graderecherches); 
            setLoading(false) ;
        }) 
        
    }, [])

    const deleteGradeRecherche = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.immerText = "Suppression En Cours ...";

        axios.delete(`http://127.0.0.1:8000/api/graderecherches/${id}/delete`).then(res => {

        alert(res.data.message);
        thisClicked.closest("tr").remove();
        })
        .catch(function (error) {

            if(error.response) {

                if(error.response.status === 404 ) {
                    alert(error.response.data.message) ;
                    thisClicked.immerText = "Delete" ; 
              }
                if(error.response.status === 500 ) {
                    alert(error.response.data)  
                    setLoading(false) ;
              }
            }

        });

    }

    if(loading) {
        return (
            <div>
                <Loading /> 
            </div>
        )
    }

    var gradeRechercheDetails = "" ;
    gradeRechercheDetails = graderecherches.map((item, index) => { 
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.abr_grdr}</td>
                <td>{item.nom_grdr}</td>
                <td>
                    <Link to={`/graderecherches/${item.id}/edit`} className="btn btn-success">Modifier</Link>
                </td>
                <td>
                    <button type="button" onClick={(e) => deleteGradeRecherche(e, item.id)} className="btn btn-danger">Supprimer</button>
                </td>
            </tr>
        )
    }); 

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4> Liste des Grades de Recherche
                                <Link to="/graderecherches/create" className="btn btn-primary float-end">Ajouter un Grade de Recherche</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Abreviation Grade de Recherche</th>
                                        <th>Nom Grade de Recherche</th>
                                        <th>Modifier</th>
                                        <th>Supprimer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     {gradeRechercheDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )  
}

export default GradeRecherche ; 