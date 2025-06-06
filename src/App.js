import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Shield, 
  Zap, 
  Phone, 
  MessageSquare, 
  Smartphone, 
  TrendingUp,
  User,
  Briefcase,
  GraduationCap,
  ChevronRight,
  Star,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Award
} from 'lucide-react';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('userType'); // userType, home, modeSelect, allScenarios, scenario, results
  const [selectedUserType, setSelectedUserType] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState('voice-phishing');
  const [currentStep, setCurrentStep] = useState(0);
  const [scenarioAnswers, setScenarioAnswers] = useState([]);
  const [score, setScore] = useState(0);

  // 사용자 유형 데이터
  const userTypes = [
    {
      id: 'student',
      title: '청소년',
      description: '고등학생 및 대학생을 위한 맞춤형 금융사기 예방 교육',
      icon: <GraduationCap className="w-8 h-8" />,
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'consumer',
      title: '일반 소비자',
      description: '성인을 위한 실생활 금융사기 대응 훈련',
      icon: <User className="w-8 h-8" />,
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'financial',
      title: '금융기관 직원',
      description: '금융업계 종사자를 위한 전문 사기 탐지 교육',
      icon: <Briefcase className="w-8 h-8" />,
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  // 전체 시나리오 데이터
  const allScenarios = {
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
          },
          {
            type: 'choice',
            title: '가짜 사이트 디자인',
            question: '어떤 요소가 가장 중요할까요?',
            options: [
              '실제 택배회사와 유사한 로고와 디자인',
              '화려한 이벤트 배너',
              '복잡한 인증 절차'
            ],
            correct: 0,
            explanation: '실제 사이트와 유사하게 만들어 의심을 줄입니다.'
          },
          {
            type: 'choice',
            title: '개인정보 수집',
            question: '어떤 정보를 먼저 요구할까요?',
            options: [
              '배송 확인을 위한 이름과 전화번호',
              '신용카드 정보',
              '주민등록번호'
            ],
            correct: 0,
            explanation: '처음에는 간단한 정보부터 요구하여 경계심을 낮춥니다.'
          }
        ]
      },
      defender: {
        title: '택배 사칭 스미싱 - 방어자 체험',
        description: '의심스러운 문자메시지 대응법을 학습하세요',
        steps: [
          {
            type: 'choice',
            title: '의심스러운 문자 수신',
            question: '"[CJ대한통운] 택배 배송불가. 주소 재확인 필요: bit.ly/cj123" 이런 문자를 받았습니다. 어떻게 하시겠습니까?',
            options: [
              '택배회사에 직접 전화해서 확인한다',
              '링크를 클릭해서 확인한다',
              '문자를 삭제한다'
            ],
            correct: 0,
            explanation: '의심스러운 링크는 절대 클릭하지 말고 공식 채널로 확인해야 합니다.'
          },
          {
            type: 'choice',
            title: '링크 분석',
            question: '의심스러운 링크의 특징이 아닌 것은?',
            options: [
              'https://로 시작하는 보안 연결',
              '단축 URL 사용 (bit.ly 등)',
              '오타가 포함된 도메인'
            ],
            correct: 0,
            explanation: 'https는 보안 연결이지만, 사기 사이트도 https를 사용할 수 있습니다.'
          },
          {
            type: 'choice',
            title: '신고 방법',
            question: '스미싱 의심 문자를 받았을 때 가장 좋은 대응은?',
            options: [
              '7726번으로 문자 전달하여 신고',
              '친구들에게 주의하라고 공유',
              '경찰서 방문'
            ],
            correct: 0,
            explanation: '7726(스팸)번은 스미싱 신고 전용 번호입니다.'
          }
        ]
      }
    },

    'fake-investment-app': {
      id: 'fake-investment-app',
      title: 'SNS 가짜 투자 앱',
      category: 'investment-scam',
      difficulty: 4,
      estimatedTime: 6,
      icon: Smartphone,
      userTypes: ['student'],
      attacker: {
        title: 'SNS 가짜 투자 앱 - 공격자 체험',
        description: 'SNS를 통한 투자 사기 수법을 체험해보세요',
        steps: [
          {
            type: 'choice',
            title: '타겟 선정',
            question: '어떤 대상이 가장 효과적일까요?',
            options: [
              '용돈을 늘리고 싶어하는 대학생',
              '투자 경험이 많은 직장인',
              '은퇴한 고령자'
            ],
            correct: 0,
            explanation: '경험이 부족하고 돈이 필요한 대학생이 주요 타겟입니다.'
          },
          {
            type: 'choice',
            title: 'SNS 광고 전략',
            question: '어떤 문구가 가장 유혹적일까요?',
            options: [
              '"하루 1만원으로 월 100만원! 대학생 인증 투자법"',
              '"전문가만 아는 비밀 투자법"',
              '"안전한 은행 예금보다 좋은 상품"'
            ],
            correct: 0,
            explanation: '구체적인 금액과 동년배 성공 사례가 가장 현실적으로 느껴집니다.'
          },
          {
            type: 'choice',
            title: '가짜 수익 인증',
            question: '어떤 방식이 가장 신뢰도를 높일까요?',
            options: [
              '실제 대학생처럼 보이는 계좌 캡처 이미지',
              '화려한 그래프와 차트',
              '유명인 추천 영상'
            ],
            correct: 0,
            explanation: '또래의 실제 수익 인증이 가장 강력한 설득력을 갖습니다.'
          }
        ]
      },
      defender: {
        title: 'SNS 가짜 투자 앱 - 방어자 체험',
        description: 'SNS 투자 광고의 함정을 파악하는 법을 학습하세요',
        steps: [
          {
            type: 'choice',
            title: '의심스러운 광고 발견',
            question: '"하루 1만원으로 월 100만원 수익! 대학생 김OO 실제 후기" 라는 광고를 봤습니다. 어떻게 판단하시겠습니까?',
            options: [
              '과도한 수익률 약속은 사기 신호로 판단',
              '실제 후기가 있으니 믿을만하다고 판단',
              '일단 적은 금액부터 시작해본다'
            ],
            correct: 0,
            explanation: '현실적으로 불가능한 고수익은 사기의 대표적인 신호입니다.'
          },
          {
            type: 'choice',
            title: '앱 다운로드 요구',
            question: '투자를 위해 "특별한 앱"을 다운로드하라고 합니다. 어떻게 하시겠습니까?',
            options: [
              '정식 앱스토어에 없는 앱은 설치하지 않는다',
              '수익을 위해 일단 설치해본다',
              '보안 프로그램을 끄고 설치한다'
            ],
            correct: 0,
            explanation: '정식 스토어가 아닌 곳에서 제공하는 앱은 악성코드 위험이 있습니다.'
          },
          {
            type: 'choice',
            title: '투자금 요구',
            question: '시작 자금으로 30만원을 요구합니다. 어떻게 하시겠습니까?',
            options: [
              '금융감독원에 등록된 업체인지 확인한다',
              '일단 10만원부터 시작한다',
              '친구와 함께 투자한다'
            ],
            correct: 0,
            explanation: '모든 투자업체는 금융당국에 등록되어야 하며, 이를 확인하는 것이 기본입니다.'
          }
        ]
      }
    },

    'fake-shopping': {
      id: 'fake-shopping',
      title: '가짜 쇼핑몰 할인 사기',
      category: 'shopping-scam',
      difficulty: 2,
      estimatedTime: 4,
      icon: Smartphone,
      userTypes: ['student'],
      attacker: {
        title: '가짜 쇼핑몰 - 공격자 체험',
        description: '온라인 쇼핑 사기 수법을 체험해보세요',
        steps: [
          {
            type: 'choice',
            title: '상품 선택',
            question: '어떤 상품이 가장 효과적일까요?',
            options: [
              '청소년들이 선호하는 브랜드 의류 90% 할인',
              '생필품 묶음 할인',
              '고가 전자제품 할인'
            ],
            correct: 0,
            explanation: '타겟층이 관심있는 브랜드 상품의 파격 할인이 가장 유혹적입니다.'
          },
          {
            type: 'choice',
            title: '긴급성 조성',
            question: '어떤 방식으로 서두르게 만들까요?',
            options: [
              '"오늘만! 선착순 100명 한정"',
              '"회원가입시 추가 할인"',
              '"리뷰 작성시 적립금 지급"'
            ],
            correct: 0,
            explanation: '시간 제한과 수량 제한으로 급하게 결정하도록 압박합니다.'
          },
          {
            type: 'choice',
            title: '결제 방식',
            question: '어떤 결제 방식을 유도할까요?',
            options: [
              '무통장 입금 (할인 혜택 제공)',
              '신용카드 결제',
              '간편결제 서비스'
            ],
            correct: 0,
            explanation: '무통장 입금은 추적이 어렵고 환불이 거의 불가능합니다.'
          }
        ]
      },
      defender: {
        title: '가짜 쇼핑몰 - 방어자 체험',
        description: '안전한 온라인 쇼핑법을 학습하세요',
        steps: [
          {
            type: 'choice',
            title: '파격 할인 발견',
            question: '평소 30만원인 브랜드 신발이 3만원에 판매되고 있습니다. 어떻게 판단하시겠습니까?',
            options: [
              '가격이 비현실적으로 저렴해서 의심',
              '좋은 기회라고 생각하고 바로 구매',
              '다른 쇼핑몰과 가격 비교'
            ],
            correct: 0,
            explanation: '정가의 90% 이상 할인은 거의 불가능하므로 사기를 의심해야 합니다.'
          },
          {
            type: 'choice',
            title: '쇼핑몰 신뢰도 확인',
            question: '처음 보는 쇼핑몰에서 구매하기 전 어떻게 확인하시겠습니까?',
            options: [
              '사업자등록번호와 고객센터 연락처 확인',
              '할인율이 좋으니 바로 구매',
              '결제 후 문제시 신용카드사에 문의'
            ],
            correct: 0,
            explanation: '사업자등록번호, 연락처, 주소 등 기본 정보 확인이 필수입니다.'
          },
          {
            type: 'choice',
            title: '안전한 결제 방법',
            question: '온라인 쇼핑시 가장 안전한 결제 방법은?',
            options: [
              '신용카드 또는 간편결제 (구매보호 서비스)',
              '무통장 입금 (할인 혜택)',
              '가상계좌 이체'
            ],
            correct: 0,
            explanation: '신용카드와 간편결제는 구매보호 서비스로 피해 시 환불이 가능합니다.'
          }
        ]
      }
    },

    // 일반 소비자 특화 시나리오
    'loan-scam': {
      id: 'loan-scam',
      title: '무담보 대출 사기',
      category: 'loan-scam',
      difficulty: 3,
      estimatedTime: 5,
      icon: TrendingUp,
      userTypes: ['consumer'],
      attacker: {
        title: '무담보 대출 사기 - 공격자 체험',
        description: '대출 사기의 수법을 체험해보세요',
        steps: [
          {
            type: 'choice',
            title: '타겟팅',
            question: '어떤 고객을 주요 타겟으로 할까요?',
            options: [
              '신용등급이 낮아 대출이 어려운 사람',
              '신용등급이 높은 고소득자',
              '대출 경험이 전혀 없는 사람'
            ],
            correct: 0,
            explanation: '정상적인 금융기관에서 대출받기 어려운 사람들이 주요 타겟입니다.'
          },
          {
            type: 'choice',
            title: '광고 문구',
            question: '어떤 광고가 가장 유혹적일까요?',
            options: [
              '"신용불량자도 OK! 당일 5000만원 무담보 대출"',
              '"우량고객 한정 저금리 대출"',
              '"정부지원 서민 대출상품"'
            ],
            correct: 0,
            explanation: '절망적인 상황의 사람들에게 희망을 주는 문구가 가장 효과적입니다.'
          },
          {
            type: 'choice',
            title: '수수료 요구',
            question: '어떤 명목으로 선납금을 요구할까요?',
            options: [
              '"대출 승인을 위한 보증보험료 50만원"',
              '"계좌 개설비 10만원"',
              '"서류 발급비 5만원"'
            ],
            correct: 0,
            explanation: '큰 금액의 대출을 위해서는 적은 보증금이 필요하다고 속입니다.'
          }
        ]
      },
      defender: {
        title: '무담보 대출 사기 - 방어자 체험',
        description: '대출 사기를 구별하는 법을 학습하세요',
        steps: [
          {
            type: 'choice',
            title: '의심스러운 대출 광고',
            question: '"신용불량자도 당일 승인! 5000만원 무담보 대출" 광고를 봤습니다. 어떻게 판단하시겠습니까?',
            options: [
              '신용불량자에게 무담보 고액대출은 불가능하므로 사기',
              '급전이 필요하니 일단 상담받아본다',
              '다른 사람들 후기를 찾아본다'
            ],
            correct: 0,
            explanation: '정상적인 금융기관은 신용불량자에게 무담보 고액대출을 해주지 않습니다.'
          },
          {
            type: 'choice',
            title: '선납금 요구',
            question: '대출 승인을 위해 보증보험료 50만원을 먼저 입금하라고 합니다. 어떻게 하시겠습니까?',
            options: [
              '대출 전 선납금 요구는 사기의 대표적 수법으로 거절',
              '대출금에서 차감하기로 하고 입금',
              '절반만 먼저 입금'
            ],
            correct: 0,
            explanation: '정상적인 대출은 승인 후 실행시 수수료를 차감하며, 선납금을 요구하지 않습니다.'
          },
          {
            type: 'choice',
            title: '안전한 대출 방법',
            question: '급전이 필요할 때 가장 안전한 방법은?',
            options: [
              '금융감독원 등록 정식 금융기관 이용',
              '지인 소개 대부업체 이용',
              '온라인 개인간 대출 서비스 이용'
            ],
            correct: 0,
            explanation: '금융감독원에 등록된 정식 금융기관만이 안전한 대출 서비스를 제공합니다.'
          }
        ]
      }
    },

    'messenger-phishing': {
      id: 'messenger-phishing',
      title: '카카오톡 계정 도용',
      category: 'messenger-phishing',
      difficulty: 3,
      estimatedTime: 5,
      icon: MessageSquare,
      userTypes: ['consumer'],
      attacker: {
        title: '메신저 피싱 - 공격자 체험',
        description: '메신저를 이용한 사기 수법을 체험해보세요',
        steps: [
          {
            type: 'choice',
            title: '계정 탈취',
            question: '어떤 방법으로 계정을 도용할까요?',
            options: [
              '피싱 사이트로 ID/PW 획득 후 인증번호 요청',
              '직접 해킹 프로그램 사용',
              '내부 직원 매수'
            ],
            correct: 0,
            explanation: '가짜 사이트로 로그인 정보를 얻고 인증번호까지 받으면 계정 접근이 가능합니다.'
          },
          {
            type: 'choice',
            title: '지인 사칭',
            question: '어떤 메시지가 가장 자연스러울까요?',
            options: [
              '"급한 일이 생겨서 그런데 잠깐 돈 좀 빌려줄 수 있어?"',
              '"이런 메시지 받았는데 너도 조심해"',
              '"선물 당첨! 링크 클릭해서 받아가세요"'
            ],
            correct: 0,
            explanation: '급한 상황을 연출하여 의심할 시간을 주지 않고 도움을 요청합니다.'
          },
          {
            type: 'choice',
            title: '신뢰도 증가',
            question: '어떻게 의심을 줄일까요?',
            options: [
              '평소 대화 내용과 말투를 흉내내어 자연스럽게',
              '공식적인 문서 형태로 메시지 작성',
              '복잡한 설명으로 신뢰도 증가'
            ],
            correct: 0,
            explanation: '평소 대화 스타일을 모방하면 지인으로 오인하기 쉽습니다.'
          }
        ]
      },
      defender: {
        title: '메신저 피싱 - 방어자 체험',
        description: '메신저 계정 도용 사기를 구별하는 법을 학습하세요',
        steps: [
          {
            type: 'choice',
            title: '지인의 금전 요청',
            question: '평소 친한 친구가 카톡으로 "급한 일이 생겨서 돈 좀 빌려줄 수 있어?"라고 메시지를 보냈습니다. 어떻게 하시겠습니까?',
            options: [
              '전화로 직접 통화하여 본인 확인',
              '얼마나 필요한지 메시지로 물어본다',
              '계좌번호를 물어본다'
            ],
            correct: 0,
            explanation: '금전 관련 요청은 반드시 전화나 직접 만나서 본인 확인을 해야 합니다.'
          },
          {
            type: 'choice',
            title: '계정 도용 의심 신호',
            question: '다음 중 계정 도용을 의심해야 할 신호는?',
            options: [
              '평소와 다른 말투나 어색한 표현',
              '평소보다 긴 메시지',
              '이모티콘 사용'
            ],
            correct: 0,
            explanation: '갑작스런 말투 변화나 부자연스러운 표현은 계정 도용의 신호입니다.'
          },
          {
            type: 'choice',
            title: '대응 방법',
            question: '지인 계정이 도용된 것 같다면 어떻게 하시겠습니까?',
            options: [
              '해당 지인에게 다른 방법으로 연락하여 알려준다',
              '메시지로 계정 도용 의심한다고 알린다',
              '무시한다'
            ],
            correct: 0,
            explanation: '도용된 계정으로는 연락이 안 되므로 다른 방법으로 알려줘야 합니다.'
          }
        ]
      }
    },

    'credit-card-scam': {
      id: 'credit-card-scam',
      title: '신용카드 포인트 사기',
      category: 'credit-card-scam',
      difficulty: 2,
      estimatedTime: 4,
      icon: TrendingUp,
      userTypes: ['consumer'],
      attacker: {
        title: '신용카드 포인트 사기 - 공격자 체험',
        description: '카드 포인트를 이용한 사기 수법을 체험해보세요',
        steps: [
          {
            type: 'choice',
            title: '접촉 방법',
            question: '어떤 방법으로 접근할까요?',
            options: [
              '카드회사를 사칭한 전화로 포인트 소멸 경고',
              '이메일로 포인트 증정 이벤트 안내',
              'SMS로 포인트 교환 제안'
            ],
            correct: 0,
            explanation: '포인트 소멸에 대한 불안감을 이용하여 즉시 행동하도록 유도합니다.'
          },
          {
            type: 'choice',
            title: '긴급성 조성',
            question: '어떻게 서두르게 만들까요?',
            options: [
              '"오늘까지 포인트 소멸 예정, 즉시 조치 필요"',
              '"한정 이벤트, 선착순 100명"',
              '"VIP 고객만을 위한 특별 혜택"'
            ],
            correct: 0,
            explanation: '포인트 손실에 대한 두려움으로 신중한 판단을 방해합니다.'
          },
          {
            type: 'choice',
            title: '정보 수집',
            question: '어떤 정보를 요구할까요?',
            options: [
              '포인트 확인을 위한 카드번호와 CVC번호',
              '주민등록번호만',
              '휴대폰 번호만'
            ],
            correct: 0,
            explanation: '카드번호와 CVC만 있어도 온라인 결제가 가능합니다.'
          }
        ]
      },
      defender: {
        title: '신용카드 포인트 사기 - 방어자 체험',
        description: '카드 관련 사기를 구별하는 법을 학습하세요',
        steps: [
          {
            type: 'choice',
            title: '카드회사 사칭 전화',
            question: '"안녕하세요, OO카드입니다. 고객님의 포인트가 오늘까지 소멸예정이므로 확인차 연락드렸습니다." 어떻게 대응하시겠습니까?',
            options: [
              '카드회사에 직접 전화하여 확인',
              '포인트 확인을 위해 카드번호를 알려준다',
              '포인트가 아까우니 일단 안내를 듣는다'
            ],
            correct: 0,
            explanation: '카드회사는 전화로 카드번호를 요구하지 않으므로 직접 확인해야 합니다.'
          },
          {
            type: 'choice',
            title: '의심 신호 파악',
            question: '다음 중 카드 사기의 의심 신호가 아닌 것은?',
            options: [
              '정확한 카드회사 이름과 고객 이름 언급',
              '전화로 카드번호나 비밀번호 요구',
              '즉시 조치하지 않으면 손해라고 압박'
            ],
            correct: 0,
            explanation: '사기범도 개인정보를 미리 수집하여 정확한 정보를 말할 수 있습니다.'
          },
          {
            type: 'choice',
            title: '안전한 포인트 관리',
            question: '포인트를 안전하게 관리하는 방법은?',
            options: [
              '카드회사 공식 앱이나 홈페이지에서 직접 확인',
              '전화 안내에 따라 즉시 처리',
              '지인에게 대신 확인 요청'
            ],
            correct: 0,
            explanation: '항상 공식 채널을 통해서만 카드 관련 업무를 처리해야 합니다.'
          }
        ]
      }
    },

    // 금융기관 직원 특화 시나리오
    'insider-fraud': {
      id: 'insider-fraud',
      title: '내부자 계정 도용',
      category: 'insider-fraud',
      difficulty: 5,
      estimatedTime: 8,
      icon: User,
      userTypes: ['financial'],
      attacker: {
        title: '내부자 사기 - 공격자 체험',
        description: '내부 시스템 침투 수법을 체험해보세요',
        steps: [
          {
            type: 'choice',
            title: '타겟 선정',
            question: '어떤 직원을 주요 타겟으로 할까요?',
            options: [
              '고객정보 접근권한이 있는 텔러',
              '시스템 관리자',
              '경비원'
            ],
            correct: 0,
            explanation: '일반 텔러는 보안 인식이 상대적으로 낮으면서도 고객정보 접근이 가능합니다.'
          },
          {
            type: 'choice',
            title: '소셜 엔지니어링',
            question: '어떤 방법으로 신뢰를 얻을까요?',
            options: [
              'IT 부서 직원으로 사칭하여 시스템 점검 명목',
              '고객으로 가장하여 직접 접근',
              '택배 기사로 가장하여 물리적 접근'
            ],
            correct: 0,
            explanation: 'IT 부서는 시스템 접근이 당연하므로 의심받지 않고 정보를 요구할 수 있습니다.'
          },
          {
            type: 'choice',
            title: '정보 수집',
            question: '어떤 정보를 우선적으로 얻을까요?',
            options: [
              '직원 로그인 ID와 임시 비밀번호',
              '고객 개인정보',
              '금고 비밀번호'
            ],
            correct: 0,
            explanation: '직원 계정을 얻으면 시스템에 정당한 사용자로 접근하여 더 많은 정보를 얻을 수 있습니다.'
          }
        ]
      },
      defender: {
        title: '내부자 사기 - 방어자 체험',
        description: '내부 보안 위협을 탐지하는 법을 학습하세요',
        steps: [
          {
            type: 'choice',
            title: 'IT 부서 사칭 접촉',
            question: '"IT 부서입니다. 시스템 보안 점검을 위해 로그인 정보를 확인하겠습니다." 라는 전화를 받았습니다. 어떻게 대응하시겠습니까?',
            options: [
              'IT 부서에 직접 확인 후 신원 검증',
              '회사 직원이니 협조한다',
              '상급자에게 먼저 보고'
            ],
            correct: 0,
            explanation: '내부 직원이라도 신원 확인 없이는 중요 정보를 제공하면 안 됩니다.'
          },
          {
            type: 'choice',
            title: '의심스러운 요청',
            question: '평소와 다른 시간에 고객정보 조회 요청이 왔습니다. 어떻게 하시겠습니까?',
            options: [
              '요청 사유와 권한을 재확인',
              '업무이니 즉시 처리',
              '나중에 처리하겠다고 연기'
            ],
            correct: 0,
            explanation: '비정상적인 요청은 반드시 정당한 사유와 권한을 확인해야 합니다.'
          },
          {
            type: 'choice',
            title: '보안 사고 대응',
            question: '계정이 도용된 것 같다면 가장 먼저 해야 할 일은?',
            options: [
              '즉시 비밀번호 변경 및 보안팀 신고',
              '피해 규모 파악',
              '상급자에게 보고'
            ],
            correct: 0,
            explanation: '추가 피해 방지를 위해 즉시 계정을 차단하고 보안팀에 신고해야 합니다.'
          }
        ]
      }
    },

    'apt-email': {
      id: 'apt-email',
      title: 'APT 이메일 공격',
      category: 'apt-attack',
      difficulty: 5,
      estimatedTime: 7,
      icon: MessageSquare,
      userTypes: ['financial'],
      attacker: {
        title: 'APT 이메일 공격 - 공격자 체험',
        description: '지능형 지속 위협 공격 수법을 체험해보세요',
        steps: [
          {
            type: 'choice',
            title: '이메일 위장',
            question: '어떤 발신자로 위장할까요?',
            options: [
              '금융감독원 공문 발송 담당자',
              '일반 고객',
              '광고 업체'
            ],
            correct: 0,
            explanation: '권위 있는 기관의 공문은 의심 없이 열어보게 됩니다.'
          },
          {
            type: 'choice',
            title: '첨부파일 종류',
            question: '어떤 첨부파일이 가장 자연스러울까요?',
            options: [
              '새로운 규정 안내 PDF (실제로는 악성코드)',
              '사진 파일',
              '동영상 파일'
            ],
            correct: 0,
            explanation: 'PDF는 업무상 필수적이므로 의심 없이 열어보게 됩니다.'
          },
          {
            type: 'choice',
            title: '지속성 확보',
            question: '시스템에 지속적으로 접근하려면?',
            options: [
              '백도어 설치 후 정상 업무를 가장하여 탐지 회피',
              '즉시 대량의 데이터 탈취',
              '시스템 전체 마비'
            ],
            correct: 0,
            explanation: 'APT는 오랜 기간 숨어있으면서 지속적으로 정보를 수집하는 것이 목적입니다.'
          }
        ]
      },
      defender: {
        title: 'APT 이메일 공격 - 방어자 체험',
        description: '지능형 이메일 공격을 탐지하는 법을 학습하세요',
        steps: [
          {
            type: 'choice',
            title: '의심스러운 공문',
            question: '금융감독원에서 "긴급! 새로운 보안 규정 시행 안내"라는 제목의 이메일이 왔습니다. 어떻게 하시겠습니까?',
            options: [
              '금융감독원 공식 홈페이지에서 해당 공문 확인',
              '업무 관련이니 첨부파일을 바로 연다',
              '동료들에게 전달'
            ],
            correct: 0,
            explanation: '중요한 공문은 반드시 공식 채널로 재확인해야 합니다.'
          },
          {
            type: 'choice',
            title: '첨부파일 검사',
            question: '첨부파일을 열기 전 어떻게 확인하시겠습니까?',
            options: [
              '백신 프로그램으로 검사 후 격리된 환경에서 실행',
              '파일명만 확인 후 바로 실행',
              '파일 크기 확인'
            ],
            correct: 0,
            explanation: '의심스러운 첨부파일은 반드시 보안 검사를 거쳐야 합니다.'
          },
          {
            type: 'choice',
            title: 'APT 공격 특징',
            question: '다음 중 APT 공격의 특징이 아닌 것은?',
            options: [
              '즉시 눈에 띄는 시스템 손상',
              '장기간에 걸친 은밀한 활동',
              '정교하게 제작된 맞춤형 공격'
            ],
            correct: 0,
            explanation: 'APT는 탐지를 피하기 위해 은밀하게 오랫동안 활동하는 것이 특징입니다.'
          }
        ]
      }
    },

    'social-engineering': {
      id: 'social-engineering',
      title: '고객정보 유출 시도',
      category: 'social-engineering',
      difficulty: 4,
      estimatedTime: 6,
      icon: User,
      userTypes: ['financial'],
      attacker: {
        title: '소셜 엔지니어링 - 공격자 체험',
        description: '심리적 조작을 통한 정보 획득 수법을 체험해보세요',
        steps: [
          {
            type: 'choice',
            title: '신분 위장',
            question: '어떤 신분으로 접근할까요?',
            options: [
              '본점 감사팀 직원으로 사칭',
              '고객으로 가장',
              '청소업체 직원으로 가장'
            ],
            correct: 0,
            explanation: '감사팀은 모든 정보에 접근할 수 있는 권한이 있어 의심받지 않습니다.'
          },
          {
            type: 'choice',
            title: '심리적 압박',
            question: '어떤 방식으로 협조를 얻을까요?',
            options: [
              '"긴급 감사로 즉시 협조하지 않으면 문제가 될 수 있다"',
              '"도움을 주시면 좋은 평가를 해드리겠다"',
              '"단순한 확인 절차일 뿐이다"'
            ],
            correct: 0,
            explanation: '불이익에 대한 두려움이 가장 강력한 동기가 됩니다.'
          },
          {
            type: 'choice',
            title: '정보 수집 단계',
            question: '어떤 순서로 정보를 요구할까요?',
            options: [
              '간단한 업무 정보부터 시작하여 점진적으로 민감한 정보 요구',
              '처음부터 핵심 정보 직접 요구',
              '관련 없는 정보만 수집'
            ],
            correct: 0,
            explanation: '신뢰관계를 구축한 후 점진적으로 민감한 정보를 요구하는 것이 효과적입니다.'
          }
        ]
      },
      defender: {
        title: '소셜 엔지니어링 - 방어자 체험',
        description: '심리적 조작 공격을 막는 법을 학습하세요',
        steps: [
          {
            type: 'choice',
            title: '감사팀 사칭',
            question: '"본점 감사팀입니다. 긴급 감사로 고객 거래내역을 즉시 확인해야 합니다." 어떻게 대응하시겠습니까?',
            options: [
              '상급자 승인 및 공식 문서 확인 요구',
              '감사팀이니 즉시 협조',
              '바쁘다고 나중에 하자고 한다'
            ],
            correct: 0,
            explanation: '아무리 급하다고 해도 정식 절차와 승인 없이는 정보를 제공하면 안 됩니다.'
          },
          {
            type: 'choice',
            title: '심리적 압박 대응',
            question: '"협조하지 않으면 문제가 될 수 있다"고 압박할 때 어떻게 하시겠습니까?',
            options: [
              '규정에 따라 처리한다고 단호하게 거절',
              '문제가 무서워서 협조한다',
              '다른 동료에게 대신 처리 요청'
            ],
            correct: 0,
            explanation: '압박에 굴복하지 말고 정해진 규정과 절차를 고수해야 합니다.'
          },
          {
            type: 'choice',
            title: '소셜 엔지니어링 대응 원칙',
            question: '소셜 엔지니어링 공격을 막는 가장 중요한 원칙은?',
            options: [
              '아무리 급해도 정해진 절차와 규정 준수',
              '상대방의 감정에 공감하며 대응',
              '빠른 업무 처리로 효율성 증대'
            ],
            correct: 0,
            explanation: '감정적 압박이나 긴급상황에도 흔들리지 않고 규정을 지키는 것이 가장 중요합니다.'
          }
        ]
      }
    }
  };

  // 사용자 유형 선택 화면
  const UserTypeSelector = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            두 얼굴의 금융 훈련소
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            금융사기의 공격자와 방어자 역할을 모두 체험하며 배우는 실전 훈련
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center text-yellow-800">
              <AlertTriangle className="w-5 h-5 mr-2" />
              <span className="font-semibold">교육 목적으로만 사용하며, 실제 사기 행위는 법적 처벌을 받습니다</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {userTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => {
                setSelectedUserType(type);
                setCurrentScreen('home');
              }}
              className={`${type.bgColor} border-2 border-transparent hover:border-gray-300 rounded-xl p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${type.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                <div className="text-white">
                  {type.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-3">
                {type.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {type.description}
              </p>
              <div className="flex justify-center mt-4">
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // 홈 대시보드
  const HomeDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto pt-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              환영합니다, {selectedUserType?.title}님!
            </h2>
            <p className="text-gray-600">금융사기 방어 능력을 향상시켜보세요</p>
          </div>
          <div className={`w-12 h-12 bg-gradient-to-r ${selectedUserType?.color} rounded-full flex items-center justify-center`}>
            <div className="text-white">
              {selectedUserType?.icon}
            </div>
          </div>
        </div>

        {/* 진행 상황 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">학습 진행 상황</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-gray-600">완료된 훈련</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">초급</div>
              <div className="text-sm text-gray-600">현재 레벨</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">0점</div>
              <div className="text-sm text-gray-600">총 점수</div>
            </div>
          </div>
        </div>

        {/* 훈련 모드 선택 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div
            onClick={() => {
              setSelectedMode('attacker');
              setSelectedScenario('voice-phishing'); // 기본 시나리오 설정
              setCurrentScreen('modeSelect');
            }}
            className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center mb-4">
              <Zap className="w-8 h-8 mr-3" />
              <h3 className="text-xl font-bold">공격자 체험 모드</h3>
            </div>
            <p className="text-red-100 mb-4">
              사기범의 수법을 체험하며 공격 패턴을 이해하세요
            </p>
            <div className="flex items-center text-red-200">
              <span className="text-sm">시작하기</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          <div
            onClick={() => {
              setSelectedMode('defender');
              setSelectedScenario('voice-phishing'); // 기본 시나리오 설정
              setCurrentScreen('modeSelect');
            }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 mr-3" />
              <h3 className="text-xl font-bold">방어자 체험 모드</h3>
            </div>
            <p className="text-blue-100 mb-4">
              사기 시도를 식별하고 올바른 대응법을 학습하세요
            </p>
            <div className="flex items-center text-blue-200">
              <span className="text-sm">시작하기</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>

        {/* 추천 시나리오 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            {selectedUserType?.title} 맞춤 추천 훈련
          </h3>
          <div className="space-y-3">
            {Object.values(allScenarios)
              .filter(scenario => scenario.userTypes.includes(selectedUserType?.id))
              .slice(0, 4)
              .map((scenario) => {
                const IconComponent = scenario.icon;
                return (
                  <div
                    key={scenario.id}
                    onClick={() => {
                      setSelectedScenario(scenario.id);
                      if (!selectedMode) { // added this line
                        setSelectedMode('defender'); // added this line
                      } // added this line
                      setCurrentScreen('modeSelect');
                    }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center">
                      <IconComponent className="w-5 h-5 text-blue-500 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800">{scenario.title}</div>
                        <div className="text-sm text-gray-600">{scenario.category}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < scenario.difficulty ? 'fill-current' : ''}`} 
                          />
                        ))}
                      </div>
                      <div className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                        {scenario.estimatedTime}분
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          
          {/* 전체 시나리오 보기 버튼 */}
          <button
            onClick={() => setCurrentScreen('allScenarios')}
            className="w-full mt-4 p-3 text-center text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            전체 훈련 보기 ({Object.values(allScenarios).filter(s => s.userTypes.includes(selectedUserType?.id)).length}개)
          </button>
        </div>
      </div>
    </div>
  );

  // 전체 시나리오 목록 화면
  const AllScenariosScreen = () => {
    const userScenarios = Object.values(allScenarios).filter(scenario => 
      scenario.userTypes.includes(selectedUserType?.id)
    );

    const groupedScenarios = userScenarios.reduce((groups, scenario) => {
      const category = scenario.category;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(scenario);
      return groups;
    }, {});

    const categoryNames = {
      'voice-phishing': '보이스피싱',
      'smishing': '스미싱',
      'investment-scam': '투자 사기',
      'shopping-scam': '쇼핑몰 사기',
      'loan-scam': '대출 사기',
      'messenger-phishing': '메신저 피싱',
      'credit-card-scam': '신용카드 사기',
      'insider-fraud': '내부자 사기',
      'apt-attack': 'APT 공격',
      'social-engineering': '소셜 엔지니어링'
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <button
            onClick={() => setCurrentScreen('home')}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-800"
          >
            <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
            홈으로 돌아가기
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {selectedUserType?.title} 전용 훈련 과정
            </h2>
            <p className="text-gray-600">
              총 {userScenarios.length}개의 맞춤형 금융사기 대응 훈련을 제공합니다
            </p>
          </div>

          <div className="space-y-8">
            {Object.entries(groupedScenarios).map(([category, scenarios]) => (
              <div key={category} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded mr-3"></div>
                  {categoryNames[category]}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {scenarios.map((scenario) => {
                    const IconComponent = scenario.icon;
                    return (
                      <div
                        key={scenario.id}
                        onClick={() => {
                          setSelectedScenario(scenario.id);
                          if (!selectedMode) { // added this line
                            setSelectedMode('defender'); // added this line
                          } // added this line
                          setCurrentScreen('modeSelect');
                        }}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md cursor-pointer transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                              <IconComponent className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800">{scenario.title}</h4>
                              <div className="flex items-center space-x-3 mt-1">
                                <div className="flex items-center text-yellow-500">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`w-3 h-3 ${i < scenario.difficulty ? 'fill-current' : ''}`} 
                                    />
                                  ))}
                                  <span className="ml-1 text-xs text-gray-500">
                                    난이도 {scenario.difficulty}/5
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  {scenario.estimatedTime}분
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-center p-2 bg-red-50 rounded-lg">
                            <div className="text-xs text-red-600 font-semibold">공격자 체험</div>
                            <div className="text-xs text-red-500">수법 학습</div>
                          </div>
                          <div className="text-center p-2 bg-blue-50 rounded-lg">
                            <div className="text-xs text-blue-600 font-semibold">방어자 체험</div>
                            <div className="text-xs text-blue-500">대응법 훈련</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  // 모드 선택 화면
  const ModeSelect = () => {
    const selectedScenarioData = allScenarios[selectedScenario];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <button
            onClick={() => setCurrentScreen('allScenarios')}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-800"
          >
            <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
            시나리오 목록으로
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {selectedMode === 'attacker' ? '공격자 체험 모드' : '방어자 체험 모드'}
            </h2>
            <p className="text-gray-600">
              {selectedMode === 'attacker' 
                ? '사기범의 수법을 체험하며 공격 패턴을 이해하세요' 
                : '사기 시도를 식별하고 올바른 대응법을 학습하세요'
              }
            </p>
          </div>

          <div className="grid gap-6">
            <div
              onClick={() => {
                setCurrentStep(0);
                setScenarioAnswers([]);
                setCurrentScreen('scenario');
              }}
              className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 ${
                selectedMode === 'attacker' ? 'hover:border-red-300' : 'hover:border-blue-300'
              }`}
            >
              <div className="flex items-center mb-4">
                <selectedScenarioData.icon className={`w-8 h-8 mr-4 ${selectedMode === 'attacker' ? 'text-red-500' : 'text-blue-500'}`} />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedScenarioData[selectedMode].title}
                  </h3>
                  <p className="text-gray-600">
                    {selectedScenarioData[selectedMode].description}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < selectedScenarioData.difficulty ? 'fill-current' : ''}`} />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">난이도: {selectedScenarioData.difficulty}/5</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <span className="text-sm mr-1">예상 시간: {selectedScenarioData.estimatedTime}분</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 시나리오 실행 화면
  const ScenarioPlayer = () => {
    const currentScenario = allScenarios[selectedScenario][selectedMode];
    const currentStepData = currentScenario.steps[currentStep];
    const isLastStep = currentStep === currentScenario.steps.length - 1;

    const handleAnswer = (answerIndex) => {
      const newAnswers = [...scenarioAnswers, {
        step: currentStep,
        answer: answerIndex,
        correct: answerIndex === currentStepData.correct
      }];
      setScenarioAnswers(newAnswers);

      setTimeout(() => {
        if (isLastStep) {
          // 점수 계산
          const correctAnswers = newAnswers.filter(a => a.correct).length;
          const finalScore = Math.round((correctAnswers / currentScenario.steps.length) * 100);
          setScore(finalScore);
          setCurrentScreen('results');
        } else {
          setCurrentStep(currentStep + 1);
        }
      }, 2000);
    };

    const selectedAnswer = scenarioAnswers.find(a => a.step === currentStep);

    return (
      <div className={`min-h-screen ${selectedMode === 'attacker' ? 'bg-gradient-to-br from-red-50 to-red-100' : 'bg-gradient-to-br from-blue-50 to-blue-100'} p-4`}>
        <div className="max-w-4xl mx-auto pt-8">
          {/* 진행률 */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>진행률</span>
              <span>{Math.round(((currentStep + 1) / currentScenario.steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${selectedMode === 'attacker' ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${((currentStep + 1) / currentScenario.steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {currentStepData.title}
              </h2>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                selectedMode === 'attacker' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {selectedMode === 'attacker' ? '공격자 관점' : '방어자 관점'}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {currentStepData.question}
              </h3>

              <div className="space-y-3">
                {currentStepData.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !selectedAnswer && handleAnswer(index)}
                    disabled={selectedAnswer}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                      selectedAnswer
                        ? index === currentStepData.correct
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : selectedAnswer.answer === index
                            ? 'border-red-500 bg-red-50 text-red-800'
                            : 'border-gray-200 bg-gray-50 text-gray-600'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {selectedAnswer && (
                        <div>
                          {index === currentStepData.correct && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          {selectedAnswer.answer === index && index !== currentStepData.correct && (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {selectedAnswer && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <div className="font-semibold text-yellow-800 mb-1">설명</div>
                      <div className="text-yellow-700">{currentStepData.explanation}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 결과 화면
  const ResultsScreen = () => {
    const getGrade = (score) => {
      if (score >= 90) return { grade: 'S', color: 'text-purple-600', bg: 'bg-purple-100' };
      if (score >= 80) return { grade: 'A', color: 'text-blue-600', bg: 'bg-blue-100' };
      if (score >= 70) return { grade: 'B', color: 'text-green-600', bg: 'bg-green-100' };
      if (score >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
      return { grade: 'D', color: 'text-red-600', bg: 'bg-red-100' };
    };

    const gradeInfo = getGrade(score);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">훈련 완료!</h2>
            <p className="text-gray-600">
              {selectedMode === 'attacker' ? '공격자 관점' : '방어자 관점'}에서의 학습이 완료되었습니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* 점수 */}
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-4">최종 점수</h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">{score}점</div>
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${gradeInfo.bg} ${gradeInfo.color} text-xl font-bold`}>
                {gradeInfo.grade}
              </div>
            </div>

            {/* 분석 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">분석 결과</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">정답률</span>
                  <span className="font-semibold">{Math.round((scenarioAnswers.filter(a => a.correct).length / scenarioAnswers.length) * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">소요 시간</span>
                  <span className="font-semibold">약 3분</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">난이도</span>
                  <div className="flex items-center text-yellow-500">
                    {[1,2,3].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 개선 가이드 */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">개선 가이드</h3>
            <div className="space-y-4">
              {score >= 80 ? (
                <div className="flex items-start p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-semibold text-green-800">훌륭합니다!</div>
                    <div className="text-green-700">
                      {selectedMode === 'attacker' 
                        ? '사기범의 주요 수법들을 잘 이해하고 있습니다. 이제 방어자 모드도 체험해보세요.'
                        : '보이스피싱 대응법을 잘 숙지하고 있습니다. 다른 사기 유형도 학습해보세요.'
                      }
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-semibold text-yellow-800">개선이 필요합니다</div>
                    <div className="text-yellow-700">
                      {selectedMode === 'attacker' 
                        ? '사기범의 심리적 압박 기법을 더 자세히 학습하시기 바랍니다.'
                        : '의심스러운 전화에 대한 대응법을 더 연습하시기 바랍니다.'
                      }
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => {
                setCurrentStep(0);
                setScenarioAnswers([]);
                setCurrentScreen('scenario');
              }}
              className="flex items-center justify-center p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              다시 도전
            </button>
            <button
              onClick={() => {
                setSelectedMode(selectedMode === 'attacker' ? 'defender' : 'attacker');
                setCurrentScreen('modeSelect');
              }}
              className={`flex items-center justify-center p-3 rounded-lg text-white transition-colors ${
                selectedMode === 'attacker' 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              <Zap className="w-5 h-5 mr-2" />
              {selectedMode === 'attacker' ? '방어자 모드' : '공격자 모드'}
            </button>
            <button
              onClick={() => setCurrentScreen('home')}
              className="flex items-center justify-center p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Shield className="w-5 h-5 mr-2" />
              홈으로
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 화면 라우팅
  const renderScreen = () => {
    switch (currentScreen) {
      case 'userType':
        return <UserTypeSelector />;
      case 'home':
        return <HomeDashboard />;
      case 'allScenarios':
        return <AllScenariosScreen />;
      case 'modeSelect':
        return <ModeSelect />;
      case 'scenario':
        return <ScenarioPlayer />;
      case 'results':
        return <ResultsScreen />;
      default:
        return <UserTypeSelector />;
    }
  };

  return (
    <div className="font-sans">
      {renderScreen()}
    </div>
  );
};

export default App;