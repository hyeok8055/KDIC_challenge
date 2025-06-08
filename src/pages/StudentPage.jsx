import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Play, 
  Clock, 
  Star, 
  TrendingUp,
  Shield,
  MessageSquare,
  Phone
} from 'lucide-react'
import { allScenarios, userTypes } from '../data/scenarios'

const StudentPage = () => {
  const navigate = useNavigate()
  const userType = userTypes.find(type => type.id === 'student')
  const scenarios = userType.scenarios.map(id => allScenarios[id])

  const getDifficultyColor = (difficulty) => {
    if (difficulty <= 2) return 'bg-green-100 text-green-800'
    if (difficulty <= 3) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getDifficultyText = (difficulty) => {
    if (difficulty <= 2) return '쉬움'
    if (difficulty <= 3) return '보통'
    return '어려움'
  }

  const tips = [
    '문자 링크를 함부로 클릭하지 마세요',
    '개인정보를 요구하는 전화는 의심하세요',
    '확실하지 않으면 부모님이나 선생님께 상의하세요',
    '공식 앱이나 사이트를 이용하세요'
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <motion.div 
        className={`bg-gradient-to-br ${userType.color} rounded-2xl p-6 text-white`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mb-4">
          <GraduationCap className="w-8 h-8 mr-3" />
          <div>
            <h1 className="text-xl font-bold">{userType.title} 교육</h1>
            <p className="text-green-100 text-sm">{userType.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
            <Shield className="w-5 h-5 mx-auto mb-1 text-white/80" />
            <div className="text-lg font-bold">98%</div>
            <div className="text-xs text-white/80">예방 성공률</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
            <TrendingUp className="w-5 h-5 mx-auto mb-1 text-white/80" />
            <div className="text-lg font-bold">2,341명</div>
            <div className="text-xs text-white/80">완료한 학생</div>
          </div>
        </div>
      </motion.div>

      {/* Scenarios */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800">학습 시나리오</h2>
        <div className="space-y-3">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon
            return (
              <motion.div
                key={scenario.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{scenario.title}</h3>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(scenario.difficulty)}`}>
                          {getDifficultyText(scenario.difficulty)}
                        </span>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {scenario.estimatedTime}분
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => navigate(`/scenario/student/${scenario.id}?mode=defender`)}
                    className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center">
                      <Shield className="w-4 h-4 mr-2" />
                      방어 체험
                    </div>
                  </motion.button>
                  <motion.button
                    onClick={() => navigate(`/scenario/student/${scenario.id}?mode=attacker`)}
                    className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center">
                      <Play className="w-4 h-4 mr-2" />
                      공격 이해
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Tips for Students */}
      <motion.div 
        className="bg-blue-50 rounded-xl p-4 border border-blue-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-start space-x-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-800 mb-2">청소년을 위한 안전 수칙</h3>
            <div className="space-y-2">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Star className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-blue-700">{tip}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress */}
      <motion.div 
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="font-semibold text-gray-800 mb-3">학습 진행률</h3>
        <div className="space-y-3">
          {scenarios.map((scenario, index) => (
            <div key={scenario.id} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{scenario.title}</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <motion.div 
                    className="bg-green-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.random() * 100}%` }}
                    transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
                  />
                </div>
                <span className="text-xs text-gray-500">
                  {Math.floor(Math.random() * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default StudentPage 