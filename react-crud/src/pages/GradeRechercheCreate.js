
import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'

import Loading from "../components/Loading.js"

function GradeRechercheCreate() {

    const navigate = useNavigate();

    const [inputErrorList, setInputErrorList] = useState({}) 

    const [loading, setLoading] = useState(false) 

    const [graderecherche, setgraderecherche] = useState({
        abr_grdr: '',
        nom_grdr: ''
    }) 

    const handleInput = (e) => {
        e.persist();
        setgraderecherche({...graderecherche, [e.target.name]: e.target.value });
    }

    const savegraderecherche = (e) => {
        e.preventDefault();
        
        setLoading(true) ;
        const data = {
            abr_grdr: graderecherche.abr_grdr,
            nom_grdr: graderecherche.nom_grdr 
        }

        axios.post('http://127.0.0.1:8000/api/graderecherches', data).then(res => {

        alert(res.data.message);
        navigate('/graderecherches');
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
                                <h4> Ajouter un Grade de Recherche 
                                     <Link to="/graderecherches" className="btn btn-danger float-end">Retour</Link>
                                </h4>
                            </div>
                        <div className="card-body"></div>
                             <form onSubmit={savegraderecherche}>
                                <div className='nb-3'>
                                    <label>Abreviation Grade de Recherche</label>
                                    <input type='text' name='abr_grdr' value={graderecherche.abr_grdr} onChange={handleInput} className='form-control' />
                                    <span className="text-danger">{inputErrorList.abr_grdr}</span>
                                </div>
                                <div className="nb-3">
                                    <label>Nom Grade de Recherche</label>
                                    <input type='text' name='nom_grdr' value={graderecherche.nom_grdr} onChange={handleInput} className='form-control' />
                                    <span className="text-danger">{inputErrorList.nom_grdr}</span>
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

export default GradeRechercheCreate ; 