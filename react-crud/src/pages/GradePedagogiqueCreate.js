
import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'

import Loading from "../components/Loading.js"

function GradePedagogiqueCreate() {

    const navigate = useNavigate();

    const [inputErrorList, setInputErrorList] = useState({}) 

    const [loading, setLoading] = useState(false) 

    const [gradepedagogique, setgradepedagogique] = useState({
        abr_grdp: '',
        nom_grdp: ''
    }) 

    const handleInput = (e) => {
        e.persist();
        setgradepedagogique({...gradepedagogique, [e.target.name]: e.target.value });
    }

    const savegradepedagogique = (e) => {
        e.preventDefault();
        
        setLoading(true) ;
        const data = {
            abr_grdp: gradepedagogique.abr_grdp,
            nom_grdp: gradepedagogique.nom_grdp 
        }

        axios.post('http://127.0.0.1:8000/api/gradepedagogiques', data).then(res => {

        alert(res.data.message);
        navigate('/gradepedagogiques');
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
                                <h4> Ajouter un Grade Pedagogique
                                     <Link to="/gradepedagogiques" className="btn btn-danger float-end">Retour</Link>
                                </h4>
                            </div>
                        <div className="card-body"></div>
                             <form onSubmit={savegradepedagogique}>
                                <div className='nb-3'>
                                    <label>Abreviation Grade Pedagogique</label>
                                    <input type='text' name='abr_grdp' value={gradepedagogique.abr_grdp} onChange={handleInput} className='form-control' />
                                    <span className="text-danger">{inputErrorList.abr_grdp}</span>
                                </div>
                                <div className="nb-3">
                                    <label>Nom Grade Pedagogique</label>
                                    <input type='text' name='nom_grdp' value={gradepedagogique.nom_grdp} onChange={handleInput} className='form-control' />
                                    <span className="text-danger">{inputErrorList.nom_grdp}</span>
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

export default GradePedagogiqueCreate ; 