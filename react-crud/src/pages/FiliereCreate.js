
import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'

import Loading from "../components/Loading.js"

function FiliereCreate() {

    const navigate = useNavigate();

    const [inputErrorList, setInputErrorList] = useState({}) 

    const [loading, setLoading] = useState(false) 

    const [filiere, setFiliere] = useState({
        abr_fil: '',
        nom_fil: ''
    }) 

    const handleInput = (e) => {
        e.persist();
        setFiliere({...filiere, [e.target.name]: e.target.value });
    }

    const saveFiliere = (e) => {
        e.preventDefault();
        
        setLoading(true) ;
        const data = {
            abr_fil: filiere.abr_fil,
            nom_fil: filiere.nom_fil 
        }

        axios.post('http://127.0.0.1:8000/api/filieres', data).then(res => {

        alert(res.data.message);
        navigate('/filieres');
        setLoading(false) ;
        })
        .catch(function (error) {

            if(error.response) {


                if(error.response.status === 422 ) {
                      setInputErrorList(error.response.data.errors) 
                      setLoading(false) ;
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

    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4> Ajouter une Filiere 
                                     <Link to="/filieres" className="btn btn-danger float-end">Retour</Link>
                                </h4>
                            </div>
                        <div className="card-body"></div>
                             <form onSubmit={saveFiliere}>
                                <div className='nb-3'>
                                    <label>Abreviation Filiere</label>
                                    <input type='text' name='abr_fil' value={filiere.abr_fil} onChange={handleInput} className='form-control' />
                                    <span className="text-danger">{inputErrorList.abr_fil}</span>
                                </div>
                                <div className="nb-3">
                                    <label>Nom Filiere</label>
                                    <input type='text' name='nom_fil' value={filiere.nom_fil} onChange={handleInput} className='form-control' />
                                    <span className="text-danger">{inputErrorList.nom_fil}</span>
                                </div>
                                <div className='nb-3'>
                                    <button type='submit' className="btn btn-primary">Sauvegarder</button>
                                </div>
                             </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default FiliereCreate ; 