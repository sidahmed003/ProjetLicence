
import React, { useState, useEffect } from 'react'

import { Link, useParams,  useNavigate } from 'react-router-dom'

import axios from 'axios'

import Loading from "../components/Loading.js"

function GradePedagogiqueEdit() {

    let { id } = useParams() ; 

    const navigate = useNavigate();

    const [inputErrorList, setInputErrorList] = useState({}) 

    const [loading, setLoading] = useState(true) 

    const [GradePedagogique, setGradePedagogique] = useState({}) 

    useEffect(() => {
        
        axios.get(`http://127.0.0.1:8000/api/gradepedagogiques/${id}/edit`).then(res => {
            console.log(res)
            setGradePedagogique(res.data.grade_pedagogiques); 
            setLoading(false) ;
        })
        .catch(function (error) {

            if(error.response) {

                if(error.response.status === 404 ) {
                    alert(error.response.data.message) 
                    setLoading(false) ;
              }
                if(error.response.status === 500 ) {
                    alert(error.response.data)  
                    setLoading(false) ;
              }
            }

        });;
        
    }, [id])

    const handleInput = (e) => {
        e.persist();
        setGradePedagogique({...GradePedagogique, [e.target.name]: e.target.value });
    }

    const updateGradePedagogique = (e) => {
        e.preventDefault();
        
        setLoading(true) ;
        const data = {
            abr_grdp: GradePedagogique.abr_grdp,
            nom_grdp: GradePedagogique.nom_grdp,
        }

        axios.put(`http://127.0.0.1:8000/api/gradepedagogiques/${id}/edit`, data).then(res => {

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
                if(error.response.status === 404 ) {
                    alert(error.response.data.message) 
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

    if(Object.keys(GradePedagogique).length === 0) {
        return (
            <div className="container">
                <h4>Grade Pedagogique Introuvable</h4>

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
                                <h4> Modifier Grade Pedagogique
                                     <Link to="/gradepedagogiques" className="btn btn-danger float-end">Retour</Link>
                                </h4>
                            </div>
                        <div className="card-body"></div>
                             <form onSubmit={updateGradePedagogique}>
                                <div className='nb-3'>
                                    <label>Abreviation Grade de Recherche</label>
                                    <input type='text' name='abr_grdp' value={GradePedagogique.abr_grdp} onChange={handleInput} className='form-control' />
                                    <span className="text-danger">{inputErrorList.abr_grdp}</span>
                                </div>
                                <div className="nb-3">
                                    <label>Nom Grade de Recherche</label>
                                    <input type='text' name='nom_grdp' value={GradePedagogique.nom_grdp} onChange={handleInput} className='form-control' />
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

export default GradePedagogiqueEdit ; 