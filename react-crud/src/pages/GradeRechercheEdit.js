
import React, { useState, useEffect } from 'react'

import { Link, useParams,  useNavigate } from 'react-router-dom'

import axios from 'axios'

import Loading from "../components/Loading.js"

function GradeRechercheEdit() {

    let { id } = useParams() ; 

    const navigate = useNavigate();

    const [inputErrorList, setInputErrorList] = useState({}) 

    const [loading, setLoading] = useState(true) 

    const [GradeRecherche, setGradeRecherche] = useState({}) 

    useEffect(() => {
        
        axios.get(`http://127.0.0.1:8000/api/graderecherches/${id}/edit`).then(res => {
            console.log(res)
            setGradeRecherche(res.data.grade_recherches); 
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
        setGradeRecherche({...GradeRecherche, [e.target.name]: e.target.value });
    }

    const updateGradeRecherche = (e) => {
        e.preventDefault();
        
        setLoading(true) ;
        const data = {
            abr_grdr: GradeRecherche.abr_grdr,
            nom_grdr: GradeRecherche.nom_grdr,
        }

        axios.put(`http://127.0.0.1:8000/api/graderecherches/${id}/edit`, data).then(res => {

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

    if(Object.keys(GradeRecherche).length === 0) {
        return (
            <div className="container">
                <h4>GradeRecherche Introuvable</h4>

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
                                <h4> Modifier Grade de Recherche 
                                     <Link to="/graderecherches" className="btn btn-danger float-end">Retour</Link>
                                </h4>
                            </div>
                        <div className="card-body"></div>
                             <form onSubmit={updateGradeRecherche}>
                                <div className='nb-3'>
                                    <label>Abreviation Grade de Recherche</label>
                                    <input type='text' name='abr_grdr' value={GradeRecherche.abr_grdr} onChange={handleInput} className='form-control' />
                                    <span className="text-danger">{inputErrorList.abr_grdr}</span>
                                </div>
                                <div className="nb-3">
                                    <label>Nom Grade de Recherche</label>
                                    <input type='text' name='nom_grdr' value={GradeRecherche.nom_grdr} onChange={handleInput} className='form-control' />
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

export default GradeRechercheEdit ; 