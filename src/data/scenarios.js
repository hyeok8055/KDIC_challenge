import { Phone, MessageSquare, Smartphone, TrendingUp } from 'lucide-react'

export const allScenarios = {
  // 공통 시나리오 (모든 사용자 유형)
  'voice-phishing': {
    id: 'voice-phishing',
    title: '검찰청 사칭 보이스피싱',
    category: 'voice-phishing',
    difficulty: 3,
    estimatedTime: 5,
    icon: Phone,
    userTypes: ['student', 'consumer', 'financial'],
    attacker: {
      title: '검찰청 사칭 보이스피싱 - 공격자 체험',
      description: '사기범이 어떤 수법을 사용하는지 체험해보세요',
      steps: [
        {
          type: 'choice',
          title: '전화 시작하기',
          question: '피해자에게 첫 인사를 어떻게 할까요?',
          options: [
            '안녕하세요, 서울중앙지검 수사관입니다.',
            '여보세요, 경찰청에서 연락드렸습니다.',
            '안녕하십니까, 금융감독원입니다.'
          ],
          correct: 0,
          explanation: '권위 있는 기관을 사칭하여 신뢰감을 조성합니다.'
        },
        {
          type: 'choice',
          title: '위기감 조성',
          question: '어떤 방식으로 긴급함을 연출할까요?',
          options: [
            '귀하의 계좌가 범죄에 연루되어 즉시 조치가 필요합니다.',
            '신용카드가 해킹당했으니 확인해주세요.',
            '보험금 지급 관련 연락입니다.'
          ],
          correct: 0,
          explanation: '급박한 상황을 연출하여 냉정한 판단을 어렵게 만듭니다.'
        },
        {
          type: 'choice',
          title: '개인정보 요구',
          question: '어떤 정보를 먼저 요구할까요?',
          options: [
            '신분증 번호로 본인 확인을 하겠습니다.',
            '계좌번호를 말씀해주세요.',
            '핸드폰 인증번호를 받으셨나요?'
          ],
          correct: 0,
          explanation: '신분증 번호는 다른 사기에 활용 가능한 핵심 정보입니다.'
        }
      ]
    },
    defender: {
      title: '검찰청 사칭 보이스피싱 - 방어자 체험',
      description: '의심스러운 전화를 받았을 때 올바른 대응법을 학습하세요',
      steps: [
        {
          type: 'choice',
          title: '수상한 전화 수신',
          question: '"안녕하세요, 서울중앙지검 수사관 김철수입니다. 귀하의 계좌가 범죄에 연루되어 즉시 확인이 필요합니다." 어떻게 대응하시겠습니까?',
          options: [
            '즉시 전화를 끊는다',
            '신분을 증명해달라고 요구한다',
            '어떤 범죄인지 자세히 듣는다'
          ],
          correct: 0,
          explanation: '정부기관은 전화로 개인정보를 요구하지 않습니다. 즉시 전화를 끊는 것이 최선입니다.'
        },
        {
          type: 'choice',
          title: '추가 연락 시도',
          question: '전화를 끊은 후 다시 전화가 왔습니다. "방금 끊으시면 안 됩니다. 정말 급한 사안입니다." 어떻게 하시겠습니까?',
          options: [
            '검찰청에 직접 연락하여 확인한다',
            '일단 이야기를 들어본다',
            '가족에게 상의한다'
          ],
          correct: 0,
          explanation: '공식 기관에 직접 연락하여 사실 여부를 확인하는 것이 가장 안전합니다.'
        },
        {
          type: 'choice',
          title: '최종 대응',
          question: '검찰청에 확인 결과 그런 수사는 없다고 했습니다. 어떻게 하시겠습니까?',
          options: [
            '경찰서에 신고한다',
            '그냥 무시한다',
            'SNS에 경험담을 공유한다'
          ],
          correct: 0,
          explanation: '보이스피싱 시도는 반드시 경찰서에 신고하여 다른 피해를 예방해야 합니다.'
        }
      ]
    }
  },

  // 청소년 특화 시나리오
  'smishing-delivery': {
    id: 'smishing-delivery',
    title: '택배 사칭 스미싱',
    category: 'smishing',
    difficulty: 2,
    estimatedTime: 4,
    icon: MessageSquare,
    userTypes: ['student'],
    attacker: {
      title: '택배 사칭 스미싱 - 공격자 체험',
      description: 'SMS를 이용한 사기 수법을 체험해보세요',
      steps: [
        {
          type: 'choice',
          title: '메시지 작성',
          question: '어떤 메시지가 가장 효과적일까요?',
          options: [
            '[CJ대한통운] 택배 배송불가. 확인: bit.ly/cj123',
            '[알림] 무료 쿠폰이 도착했습니다!',
            '[당첨] 1등 당첨! 즉시 확인하세요'
          ],
          correct: 0,
          explanation: '실제 택배회사를 사칭하여 신뢰도를 높이고 긴급성을 부여합니다.'
        }
      ]
    },
    defender: {
      title: '택배 사칭 스미싱 - 방어자 체험',
      description: '의심스러운 문자를 받았을 때 대응법을 학습하세요',
      steps: [
        {
          type: 'choice',
          title: '의심스러운 문자 수신',
          question: '"[CJ대한통운] 택배 배송불가. 확인: bit.ly/cj123" 문자를 받았습니다. 어떻게 하시겠습니까?',
          options: [
            '링크를 클릭하여 확인한다',
            '택배회사에 직접 전화하여 확인한다',
            '무시한다'
          ],
          correct: 1,
          explanation: '의심스러운 링크는 절대 클릭하지 말고, 공식적인 경로로 확인해야 합니다.'
        }
      ]
    }
  },

  // 일반 소비자 특화 시나리오
  'loan-scam': {
    id: 'loan-scam',
    title: '대출 사기',
    category: 'loan',
    difficulty: 3,
    estimatedTime: 6,
    icon: TrendingUp,
    userTypes: ['consumer'],
    attacker: {
      title: '대출 사기 - 공격자 체험',
      description: '저금리 대출을 미끼로 한 사기 수법을 체험해보세요',
      steps: [
        {
          type: 'choice',
          title: '미끼 던지기',
          question: '어떤 조건으로 관심을 끌까요?',
          options: [
            '연 1% 초저금리 특별 대출 상품',
            '무담보 무보증 즉시 대출',
            '신용등급 상관없이 대출 가능'
          ],
          correct: 0,
          explanation: '현실적으로 불가능한 조건을 제시하여 관심을 끕니다.'
        }
      ]
    },
    defender: {
      title: '대출 사기 - 방어자 체험',
      description: '의심스러운 대출 제안을 받았을 때 대응법을 학습하세요',
      steps: [
        {
          type: 'choice',
          title: '의심스러운 대출 제안',
          question: '"연 1% 초저금리 특별 대출, 지금 신청하면 수수료 면제!" 광고를 봤습니다. 어떻게 하시겠습니까?',
          options: [
            '바로 신청한다',
            '금융감독원이나 은행에 문의한다',
            '조건을 더 자세히 알아본다'
          ],
          correct: 1,
          explanation: '너무 좋은 조건의 대출은 사기일 가능성이 높습니다. 공식 기관에 확인해야 합니다.'
        }
      ]
    }
  },

  // 금융기관 직원 특화 시나리오
  'insider-fraud': {
    id: 'insider-fraud',
    title: '내부자 사기 탐지',
    category: 'internal',
    difficulty: 4,
    estimatedTime: 8,
    icon: Smartphone,
    userTypes: ['financial'],
    attacker: {
      title: '내부자 사기 - 공격자 체험',
      description: '금융기관 직원을 대상으로 한 사기 수법을 체험해보세요',
      steps: [
        {
          type: 'choice',
          title: '신뢰 구축',
          question: '어떤 방식으로 직원의 신뢰를 얻을까요?',
          options: [
            '상급자나 동료를 사칭한다',
            '긴급한 업무라고 강조한다',
            '회사 내부 정보를 언급한다'
          ],
          correct: 2,
          explanation: '내부 정보를 알고 있는 것처럼 위장하여 신뢰를 구축합니다.'
        }
      ]
    },
    defender: {
      title: '내부자 사기 - 방어자 체험',
      description: '의심스러운 내부 요청을 받았을 때 대응법을 학습하세요',
      steps: [
        {
          type: 'choice',
          title: '의심스러운 업무 요청',
          question: '상급자라고 주장하는 사람이 "긴급히 고객 정보 확인이 필요하다"고 연락했습니다. 어떻게 하시겠습니까?',
          options: [
            '즉시 정보를 제공한다',
            '직접 상급자에게 확인한다',
            '나중에 처리하겠다고 한다'
          ],
          correct: 1,
          explanation: '어떤 요청이든 공식적인 절차를 통해 확인해야 합니다.'
        }
      ]
    }
  }
}

export const userTypes = [
  {
    id: 'student',
    title: '청소년',
    description: '고등 및 대학생을 위한 맞춤형 금융사기 예방 교육',
    color: 'from-green-400 to-green-600',
    bgColor: 'bg-green-50',
    scenarios: ['voice-phishing', 'smishing-delivery']
  },
  {
    id: 'consumer',
    title: '일반 소비자',
    description: '성인을 위한 실생활 금융사기 대응 훈련',
    color: 'from-blue-400 to-blue-600',
    bgColor: 'bg-blue-50',
    scenarios: ['voice-phishing', 'loan-scam']
  },
  {
    id: 'financial',
    title: '금융기관 직원',
    description: '금융업계 종사자를 위한 전문 사기 탐지 교육',
    color: 'from-purple-400 to-purple-600',
    bgColor: 'bg-purple-50',
    scenarios: ['voice-phishing', 'insider-fraud']
  }
] 