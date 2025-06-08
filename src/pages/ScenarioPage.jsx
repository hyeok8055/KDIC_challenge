import React, { useState, useEffect } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Check, 
  X, 
  ChevronRight, 
  RotateCcw, 
  Award,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { allScenarios } from '../data/scenarios'

const ScenarioPage = () => {
  const { userType, scenarioId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const mode = searchParams.get('mode') || 'defender'
  const scenario = allScenarios[scenarioId]
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [showExplanation, setShowExplanation] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

  const currentScenario = scenario?.[mode]
  const steps = currentScenario?.steps || []
  const currentStepData = steps[currentStep]

  useEffect(() => {
    if (!scenario) {
      navigate(`/${userType}`)
    }
  }, [scenario, userType, navigate])

  const handleAnswer = (answerIndex) => {
    if (showExplanation) return

    const newAnswers = [...answers]
    newAnswers[currentStep] = answerIndex
    setAnswers(newAnswers)
    setShowExplanation(true)
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setShowExplanation(false)
    } else {
      setIsCompleted(true)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setAnswers([])
    setShowExplanation(false)
    setIsCompleted(false)
  }

  const calculateScore = () => {
    const correctAnswers = answers.filter((answer, index) => 
      answer === steps[index]?.correct
    ).length
    return Math.round((correctAnswers / steps.length) * 100)
  }

  const getGrade = (score) => {
    if (score >= 90) return { grade: 'A', color: 'text-green-600', message: '완벽합니다!' }
    if (score >= 80) return { grade: 'B', color: 'text-blue-600', message: '우수합니다!' }
    if (score >= 70) return { grade: 'C', color: 'text-yellow-600', message: '보통입니다.' }
    return { grade: 'D', color: 'text-red-600', message: '더 연습이 필요합니다.' }
  }

  if (!scenario) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600">시나리오를 찾을 수 없습니다.</p>
      </div>
    )
  }

  if (isCompleted) {
    const score = calculateScore()
    const gradeInfo = getGrade(score)

    return (
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(`/${userType}`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">학습 결과</h1>
        </div>

        {/* Results */}
        <motion.div
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={`w-20 h-20 ${gradeInfo.grade === 'A' ? 'bg-green-500' : gradeInfo.grade === 'B' ? 'bg-blue-500' : gradeInfo.grade === 'C' ? 'bg-yellow-500' : 'bg-red-500'} rounded-full mx-auto mb-4 flex items-center justify-center`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <Award className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{score}점</h2>
            <p className={`text-lg font-semibold ${gradeInfo.color} mb-1`}>
              {gradeInfo.grade}등급
            </p>
            <p className="text-gray-600">{gradeInfo.message}</p>
          </motion.div>
        </motion.div>

        {/* Detailed Results */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">상세 결과</h3>
          {steps.map((step, index) => {
            const userAnswer = answers[index]
            const isCorrect = userAnswer === step.correct
            
            return (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-4 border border-gray-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-800 text-sm">{step.title}</h4>
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-2">{step.question}</p>
                <div className="space-y-1">
                  <div className={`text-xs p-2 rounded ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    선택: {step.options[userAnswer]}
                  </div>
                  {!isCorrect && (
                    <div className="text-xs p-2 rounded bg-blue-50 text-blue-700">
                      정답: {step.options[step.correct]}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <motion.button
            onClick={handleRestart}
            className="flex-1 bg-blue-50 text-blue-600 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center">
              <RotateCcw className="w-4 h-4 mr-2" />
              다시 시도
            </div>
          </motion.button>
          <motion.button
            onClick={() => navigate(`/${userType}`)}
            className="flex-1 bg-gray-50 text-gray-600 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            whileTap={{ scale: 0.98 }}
          >
            목록으로
          </motion.button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(`/${userType}`)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-800">{currentScenario?.title}</h1>
            <p className="text-sm text-gray-600">{currentScenario?.description}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          mode === 'attacker' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {mode === 'attacker' ? '공격자' : '방어자'} 모드
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>진행률</span>
          <span>{currentStep + 1} / {steps.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className="bg-blue-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Current Step */}
      {currentStepData && (
        <motion.div
          className="bg-white rounded-xl p-6 border border-gray-200"
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">{currentStepData.title}</h2>
          <p className="text-gray-700 mb-6">{currentStepData.question}</p>

          <div className="space-y-3">
            {currentStepData.options.map((option, index) => {
              const isSelected = answers[currentStep] === index
              const isCorrect = index === currentStepData.correct
              const showResult = showExplanation

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-lg text-left border-2 transition-all ${
                    showResult
                      ? isCorrect
                        ? 'border-green-500 bg-green-50'
                        : isSelected
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 bg-gray-50'
                      : isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } ${showExplanation ? 'cursor-default' : 'cursor-pointer'}`}
                  whileTap={showExplanation ? {} : { scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{option}</span>
                    {showResult && (
                      <div className="flex items-center">
                        {isCorrect ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : isSelected ? (
                          <X className="w-5 h-5 text-red-500" />
                        ) : null}
                      </div>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <motion.div
              className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">설명</h4>
                  <p className="text-sm text-blue-700">{currentStepData.explanation}</p>
                </div>
              </div>
              
              <motion.button
                onClick={handleNext}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center">
                  {currentStep < steps.length - 1 ? (
                    <>
                      다음 단계
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </>
                  ) : (
                    <>
                      결과 보기
                      <Award className="w-4 h-4 ml-1" />
                    </>
                  )}
                </div>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default ScenarioPage 