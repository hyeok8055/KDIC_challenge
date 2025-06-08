import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Award,
  GraduationCap,
  User,
  Briefcase,
  ChevronRight
} from 'lucide-react'
import { userTypes } from '../data/scenarios'

const HomePage = () => {
  const navigate = useNavigate()

  const stats = [
    { label: '교육 완료자', value: '12,483명', icon: Users, color: 'text-blue-600' },
    { label: '사기 예방률', value: '94.2%', icon: Shield, color: 'text-green-600' },
    { label: '월 평균 증가', value: '+23%', icon: TrendingUp, color: 'text-purple-600' }
  ]

  const features = [
    {
      title: '실전 시뮬레이션',
      description: '실제 사기 상황을 체험하며 대응 능력을 키우기',
      icon: Shield,
      color: 'bg-blue-500'
    },
    {
      title: '맞춤형 교육',
      description: '사용자 유형별 특화된 금융사기 예방 교육',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: '성과 분석',
      description: '학습 결과를 분석하여 부족한 부분을 개선',
      icon: Award,
      color: 'bg-purple-500'
    }
  ]

  const getUserIcon = (userType) => {
    switch (userType.id) {
      case 'student': return GraduationCap
      case 'consumer': return User
      case 'financial': return Briefcase
      default: return User
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center mb-4">
          <Shield className="w-8 h-8 mr-3" />
          <div>
            <h1 className="text-xl font-bold">금융사기 예방 교육</h1>
            <p className="text-blue-100 text-sm">실전 체험으로 배우는 사기 대응법</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <stat.icon className="w-5 h-5 mx-auto mb-1 text-white/80" />
              <div className="text-sm font-bold">{stat.value}</div>
              <div className="text-xs text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800">주요 기능</h2>
        <div className="space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-start space-x-3">
                <div className={`${feature.color} p-2 rounded-lg`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* User Types Quick Access */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800">사용자 유형별 교육</h2>
        <div className="space-y-3">
          {userTypes.map((userType, index) => {
            const Icon = getUserIcon(userType)
            return (
              <motion.button
                key={userType.id}
                onClick={() => navigate(`/${userType.id}`)}
                className={`w-full ${userType.bgColor} rounded-xl p-4 text-left border border-gray-200 hover:shadow-md transition-all`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`bg-gradient-to-r ${userType.color} p-2 rounded-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{userType.title}</h3>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                        {userType.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Safety Tips */}
      <motion.div 
        className="bg-amber-50 rounded-xl p-4 border border-amber-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-start space-x-3">
          <div className="bg-amber-500 p-2 rounded-lg">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-amber-800 mb-2">안전 수칙</h3>
            <ul className="text-xs text-amber-700 space-y-1">
              <li>• 의심스러운 전화나 문자는 즉시 끊거나 삭제</li>
              <li>• 개인정보나 금융정보는 절대 타인에게 제공 금지</li>
              <li>• 확실하지 않은 것은 공식 기관에 직접 확인</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default HomePage 