
import React, { useState, useEffect } from 'react'

import { Link, useParams,  useNavigate } from 'react-router-dom'

import axios from 'axios'

import Loading from "../components/Loading.js"

function ParcourEdit() {

    let { id } = useParams() ; 

    const navigate = useNavigate();

    const [inputErrorList, setInputErrorList] = useState({}) 

    const [loading, setLoading] = useState(true) 

    const [parcour, setParcour] = useState({}) 

    useEffect(() => {
        
        axios.get(`http://127.0.0.1:8000/api/parcours/${id}/edit`).then(res => {
            console.log(res)
            setParcour(res.data.parcours); 
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
        setParcour({...parcour, [e.target.name]: e.target.value });
    }

    const updateParcour = (e) => {
        e.preventDefault();
        
        setLoading(true) ;
        const data = {
            nom_par: parcour.nom_par,
            abr_par: parcour.abr_par,
            
        }

        axios.put(`http://127.0.0.1:8000/api/parcours/${id}/edit`, data).then(res => {

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

    if(Object.keys(parcour).length === 0) {
        return (
            <div className="container">
                <h4>Parcours Introuvable</h4>

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
                                <h4> Modifier Parcours
                                     <Link to="/parcours" className="btn btn-danger float-end">Retour</Link>
                                </h4>
                            </div>
                        <div className="card-body"></div>
                             <form onSubmit={updateParcour}>
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

export default ParcourEdit ; 