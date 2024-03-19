import { Routes,Route } from 'react-router-dom'

import Home from "../pages/Home.js"
import About from "../pages/About.js"
import Contact from "../pages/Contact.js"


import FiliereList from '../pages/Filiere.js'
import ParcourList from '../pages/Parcour.js'
import GradeRechercheList from '../pages/GradeRecherche.js'
import GradePedagogiqueList from '../pages/GradePedagogique.js'

import FiliereCreate from '../pages/FiliereCreate.js'  
import ParcourCreate from '../pages/ParcourCreate.js'  
import GradeRechercheCreate from '../pages/GradeRechercheCreate.js' 
import GradePedagogiqueCreate from '../pages/GradePedagogiqueCreate.js' 


import FiliereEdit from '../pages/FiliereEdit.js' 
import ParcourEdit from '../pages/ParcourEdit.js' 
import GradeRechercheEdit from '../pages/GradeRechercheEdit.js' 
import GradePedagogiqueEdit from '../pages/GradePedagogiqueEdit.js' 

function MyRouter() {

    return (
        <Routes>
            <Route path="/" element={<Home /> } /> 
            <Route path="/about-us" element={<About /> } /> 
            <Route path="/contact-us" element={<Contact /> } /> 


            <Route path="/filieres" element={<FiliereList /> } /> 
            <Route path="/parcours" element={<ParcourList /> } /> 
            <Route path="/graderecherches" element={<GradeRechercheList /> } />
            <Route path="/gradepedagogiques" element={<GradePedagogiqueList /> } />


            <Route path="/parcours/create" element={<ParcourCreate /> } /> 
            <Route path="/filieres/create" element={<FiliereCreate /> } /> 
            <Route path="/graderecherches/create" element={<GradeRechercheCreate /> } /> 
            <Route path="/gradepedagogiques/create" element={<GradePedagogiqueCreate /> } /> 


            <Route path="/filieres/:id/edit" element={<FiliereEdit /> } /> 
            <Route path="/parcours/:id/edit" element={<ParcourEdit /> } /> 
            <Route path="/graderecherches/:id/edit" element={<GradeRechercheEdit /> } /> 
            <Route path="/gradepedagogiques/:id/edit" element={<GradePedagogiqueEdit /> } /> 
        </Routes>
    )
}

export default MyRouter ; 