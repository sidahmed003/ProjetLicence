
import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'

import Loading from "../components/Loading.js"

function ParcourCreate() {

    const navigate = useNavigate();

    const [inputErrorList, setInputErrorList] = useState({}) 

    const [loading, setLoading] = useState(false) 

    const [parcour, setparcour] = useState({
        abr_par: '',
        nom_par: ''
    }) 

    const handleInput = (e) => {
        e.persist();
        setparcour({...parcour, [e.target.name]: e.target.value });
    }

    const saveparcour = (e) => {
        e.preventDefault();
        
        setLoading(true) ;
        const data = {
            abr_par: parcour.abr_par,
            nom_par: parcour.nom_par 
        }

        axios.post('http://127.0.0.1:8000/api/parcours', data).then(res => {

        alert(res.data.message);
        navigate('/parcours');
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
                                <h4> Ajouter un Parcours
                                     <Link to="/parcours" className="btn btn-danger float-end">Retour</Link>
                                </h4>
                            </div>
                        <div className="card-body"></div>
                             <form onSubmit={saveparcour}>
                                <div className='nb-3'>
                                    <label>Abreviation Parcours</label>
                                    <input type='text' name='abr_par' value={parcour.abr_par} onChange={handleInput} className='form-control' />
                                    <span className="text-danger">{inputErrorList.abr_par}</span>
                                </div>
                                <div className="nb-3">
                                    <label>Nom Parcours</label>
                                    <input type='text' name='nom_par' value={parcour.nom_par} onChange={handleInput} className='form-control' />
                                    <span className="text-danger">{inputErrorList.nom_par}</span>
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

export default ParcourCreate ; 