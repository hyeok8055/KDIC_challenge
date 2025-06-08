import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import StudentPage from './pages/StudentPage'
import ConsumerPage from './pages/ConsumerPage'
import FinancialPage from './pages/FinancialPage'
import ScenarioPage from './pages/ScenarioPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/consumer" element={<ConsumerPage />} />
            <Route path="/financial" element={<FinancialPage />} />
            <Route path="/scenario/:userType/:scenarioId" element={<ScenarioPage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  )
}

export default App 