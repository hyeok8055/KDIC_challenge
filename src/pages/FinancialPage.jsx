import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Briefcase, 
  Play, 
  Clock, 
  Star, 
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  Users
} from 'lucide-react'
import { allScenarios, userTypes } from '../data/scenarios'

const FinancialPage = () => {
  const navigate = useNavigate()
  const userType = userTypes.find(type => type.id === 'financial')
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

  const professionalTips = [
    '의심스러운 거래는 반드시 상급자에게 보고하세요',
    '고객 확인 절차를 철저히 준수하세요',
    '내부 규정을 벗어난 요청은 거절하세요',
    '정기적인 사기 탐지 교육을 받으세요'
  ]

  const threatLevels = [
    { level: '높음', count: 12, color: 'bg-red-500', description: '즉시 대응 필요' },
    { level: '보통', count: 8, color: 'bg-yellow-500', description: '주의 관찰' },
    { level: '낮음', count: 3, color: 'bg-green-500', description: '일반 모니터링' }
  ]

  const recentAlerts = [
    { title: '내부자 정보 유출 시도 탐지', severity: 'high', time: '30분 전' },
    { title: '의심스러운 계좌 이체 패턴', severity: 'medium', time: '2시간 전' },
    { title: '시스템 접근 권한 남용 의심', severity: 'high', time: '4시간 전' }
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
          <Briefcase className="w-8 h-8 mr-3" />
          <div>
            <h1 className="text-xl font-bold">{userType.title} 교육</h1>
            <p className="text-purple-100 text-sm">{userType.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
            <Shield className="w-5 h-5 mx-auto mb-1 text-white/80" />
            <div className="text-lg font-bold">99.7%</div>
            <div className="text-xs text-white/80">탐지 정확도</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
            <Users className="w-5 h-5 mx-auto mb-1 text-white/80" />
            <div className="text-lg font-bold">1,234명</div>
            <div className="text-xs text-white/80">교육 완료 직원</div>
          </div>
        </div>
      </motion.div>

      {/* Threat Level Dashboard */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-bold text-gray-800">위협 수준 현황</h2>
        <div className="grid grid-cols-3 gap-3">
          {threatLevels.map((threat, index) => (
            <motion.div
              key={threat.level}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className={`w-8 h-8 ${threat.color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">{threat.count}</span>
              </div>
              <div className="font-semibold text-gray-800 text-sm">{threat.level}</div>
              <div className="text-xs text-gray-500 mt-1">{threat.description}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Alerts */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-bold text-gray-800">최근 알림</h2>
        <div className="space-y-2">
          {recentAlerts.map((alert, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="flex items-center space-x-3">
                {alert.severity === 'high' ? (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                ) : (
                  <Eye className="w-4 h-4 text-yellow-500" />
                )}
                <span className="font-medium text-gray-800 text-sm">{alert.title}</span>
              </div>
              <span className="text-xs text-gray-500">{alert.time}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Scenarios */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800">전문 교육 시나리오</h2>
        <div className="space-y-3">
          {scenarios.map((scenario, index) => {
            const Icon = scenario.icon
            return (
              <motion.div
                key={scenario.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
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
                    onClick={() => navigate(`/scenario/financial/${scenario.id}?mode=defender`)}
                    className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center">
                      <Shield className="w-4 h-4 mr-2" />
                      탐지 훈련
                    </div>
                  </motion.button>
                  <motion.button
                    onClick={() => navigate(`/scenario/financial/${scenario.id}?mode=attacker`)}
                    className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center">
                      <Play className="w-4 h-4 mr-2" />
                      수법 분석
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Professional Guidelines */}
      <motion.div 
        className="bg-purple-50 rounded-xl p-4 border border-purple-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <div className="flex items-start space-x-3">
          <div className="bg-purple-500 p-2 rounded-lg">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-purple-800 mb-2">금융기관 직원 행동수칙</h3>
            <div className="space-y-2">
              {professionalTips.map((tip, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                >
                  <Star className="w-3 h-3 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-purple-700">{tip}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Compliance Information */}
      <motion.div 
        className="bg-gray-50 rounded-xl p-4 border border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-start space-x-3">
          <div className="bg-gray-600 p-2 rounded-lg">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 mb-2">컴플라이언스 정보</h3>
            <div className="space-y-1">
              <div className="text-sm text-gray-700">• 고객확인제도(CDD) 준수 필수</div>
              <div className="text-sm text-gray-700">• 의심거래보고(STR) 즉시 제출</div>
              <div className="text-sm text-gray-700">• 개인정보보호법 엄격 준수</div>
              <div className="text-sm text-gray-700">• 내부통제기준 정기 점검</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default FinancialPage 