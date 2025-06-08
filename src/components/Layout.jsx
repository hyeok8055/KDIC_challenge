import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  GraduationCap, 
  User, 
  Briefcase, 
  Shield 
} from 'lucide-react'

const Layout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    {
      id: 'home',
      path: '/',
      icon: Home,
      label: '홈',
      color: 'text-blue-500'
    },
    {
      id: 'student',
      path: '/student',
      icon: GraduationCap,
      label: '청소년',
      color: 'text-green-500'
    },
    {
      id: 'consumer',
      path: '/consumer',
      icon: User,
      label: '일반인',
      color: 'text-blue-500'
    },
    {
      id: 'financial',
      path: '/financial',
      icon: Briefcase,
      label: '금융기관',
      color: 'text-purple-500'
    }
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 safe-area-top">
        <div className="flex items-center justify-center">
          <Shield className="w-6 h-6 mr-2" />
          <h1 className="text-lg font-bold">KDIC 금융사기 예방</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {children}
          <div className="h-20"></div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 safe-area-bottom">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            
            return (
              <motion.button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  active 
                    ? `${item.color} bg-gray-50` 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <Icon 
                  className={`w-5 h-5 mb-1 ${active ? 'text-current' : ''}`} 
                />
                <span className={`text-xs font-medium ${
                  active ? 'text-current' : ''
                }`}>
                  {item.label}
                </span>
                {active && (
                  <motion.div
                    className={`w-1 h-1 rounded-full mt-1 ${item.color.replace('text-', 'bg-')}`}
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Layout 