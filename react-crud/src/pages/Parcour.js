import React, {useEffect, useState }from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loading from '../components/Loading.js'

function Parcour() {

    const [loading, setLoading] = useState(true) ; 
    const [parcours, setparcours] = useState([]) ; 

    useEffect(() => {
        
        axios.get('http://127.0.0.1:8000/api/parcours').then(res => {
            console.log(res);
            setparcours(res.data.parcours); 
            setLoading(false) ;
        }) 
        
    }, [])

    const deleteParcour = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;
        thisClicked.immerText = "Suppression En Cours ...";

        axios.delete(`http://127.0.0.1:8000/api/parcours/${id}/delete`).then(res => {

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

    var parcourDetails = "" ;
    parcourDetails = parcours.map((item, index) => { 
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.abr_par}</td>
                <td>{item.nom_par}</td>
                <td>
                    <Link to={`/parcours/${item.id}/edit`} className="btn btn-success">Modifier</Link>
                </td>
                <td>
                    <button type="button" onClick={(e) => deleteParcour(e, item.id)} className="btn btn-danger">Supprimer</button>
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
                            <h4> Liste des parcours 
                                <Link to="/parcours/create" className="btn btn-primary float-end">Ajouter un Parcours</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Abreviation Parcours</th>
                                        <th>Nom Parcours</th>
                                        <th>Modifier</th>
                                        <th>Supprimer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     {parcourDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )  
}

export default Parcour ; 