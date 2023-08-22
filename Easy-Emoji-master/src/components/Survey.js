import React, { useState } from 'react';
import { authService, dbService } from 'fbase'; // Import Firebase Services
import { useHistory } from 'react-router-dom'; // Manage Browser History
import './survey.css';

const Survey = () => {
  // State variables to manage form data
  const [page, setPage] = useState(1);
  const [iconType, setIconType] = useState('');
  const [iconMood, setIconMood] = useState('');
  const [iconColor, setIconColor] = useState('');
  const [iconTypeAnimal, setIconTypeAnimal] = useState('');
  const [iconTypeCharacter, setIconTypeCharacter] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (page === 3 && isDataComplete()) {
      const surveyData = {
        iconType,
        iconMood,
        iconColor,
      };
      await dbService.collection('surveys').doc(authService.currentUser.uid).set(surveyData);
      history.push('/');
    } else {
      alert('모든 항목을 완료해주세요.');
    }
  };

  const isDataComplete = () => {
    switch (page) {
      case 1:
        return iconType !== '' && (iconTypeAnimal !== '' || iconTypeCharacter !== '');
      case 2:
        return iconMood !== '';
      case 3:
        return iconColor !== '';
      default:
        return false;
    }
  };

  const handleAnimalChange = (e) => {
    setIconTypeAnimal(e.target.value);
    setIconTypeCharacter(''); // 캐릭터 선택 초기화
    setIconType(e.target.value);
  };

  const handleCharacterChange = (e) => {
    setIconTypeCharacter(e.target.value);
    setIconTypeAnimal(''); // 동물 선택 초기화
    setIconType(e.target.value);
  };

  const handleNext = () => {
    const nextPage = page + 1;
  
    if (!isDataComplete()) {
      alert('모든 항목을 완료해주세요.');
      return;
    }
  
    setPage(nextPage);
  };
  
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const renderPageContent = () => {
    switch (page) {
      case 1:
        return (
          <div
            style={{
              fontFamily: 'Pretendard, sans-serif',
              backgroundColor: '#f5f5f5',
              borderRadius: '10px',
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                textAlign: 'left',
                fontFamily: 'Pretendard, sans-serif',
                marginBottom: '30px',
              }}
            >
              선호하시는 이모티콘의 종류는 무엇인가요?
            </h2>
            <div
              style={{
                display: 'flex', // Use flex display for alignment
                flexDirection: 'column', // Align items vertically
                alignItems: 'center', // Center items horizontally
              }}
            >
              <label
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  margin: '20px 0', // Increase margin
                  fontSize: '15px',
                  fontWeight: 'bold',
                  color: '#002333',
                }}
              >
                동물    
                <select value={iconTypeAnimal} onChange={handleAnimalChange}>
                  <option value="" disabled>밑의 항목 중에서 선택해주세요</option>
                  <option value="강아지">강아지</option>
                  <option value="고양이">고양이</option>
                  <option value="토끼">토끼</option>
                  <option value="곰">곰</option>
                  <option value="펭귄">펭귄</option>
                </select>
              </label>
              <label
                style={{
                  fontFamily: 'Pretendard, sans-serif',
                  margin: '20px 0', // Increase margin
                  fontSize: '15px',
                  fontWeight: 'bold',
                  color: '#002333',
                }}
              >
                캐릭터   
                <select value={iconTypeCharacter} onChange={handleCharacterChange}>
                  <option value="" disabled>밑의 항목 중에서 선택해주세요</option>
                  <option value="학생">학생</option>
                  <option value="직장인">직장인</option>
                  <option value="아줌마">아줌마</option>
                  <option value="아저씨">아저씨</option>
                  <option value="공주">공주</option>
                  <option value="왕자">왕자</option>
                  <option value="상남자">상남자</option>
                  <option value="상여자">상여자</option>
                </select>
              </label>
            </div>
          </div>

        );
      case 2:
        return (
          <div className="button-container"
            style={{
              fontFamily: 'Pretendard, sans-serif',
              backgroundColor: '#f5f5f5',
              borderRadius: '10px',
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <h2 className="page-title"
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                textAlign: 'left',
                fontFamily: 'Pretendard, sans-serif',
                marginBottom: '30px',
              }}
            >
              선호하는 이모티콘의 분위기는 어떤 것인가요?
            </h2>
            <div className="button-group">
              <button
                className={`button ${iconMood === '귀여운' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setIconMood('귀여운')}}
              >
                귀여운{iconMood === '귀여운' && '✓'}
              </button>
              <button
                className={`button ${iconMood === '재밌는' ? 'active' : ''}`}
                onClick={() => setIconMood('재밌는')}
              >
                재밌는{iconMood === '재밌는' && '✓'}
              </button>
              <button
                className={`button ${iconMood === '시크한' ? 'active' : ''}`}
                onClick={() => setIconMood('시크한')}
              >
                시크한{iconMood === '시크한' && '✓'}
              </button>
              <button
                className={`button ${iconMood === '동화 같은' ? 'active' : ''}`}
                onClick={() => setIconMood('동화 같은')}
              >
                동화 같은{iconMood === '동화 같은' && '✓'}
              </button>
              <button
                className={`button ${iconMood === '사진 같은' ? 'active' : ''}`}
                onClick={() => setIconMood('사진 같은')}
              >
                사진 같은{iconMood === '사진 같은' && '✓'}
              </button>  
              <button
                className={`button ${iconMood === '단순한' ? 'active' : ''}`}
                onClick={() => setIconMood('단순한')}
              >
                단순한{iconMood === '단순한' && '✓'}
              </button>  
              <button
                className={`button ${iconMood === '못생긴' ? 'active' : ''}`}
                onClick={() => setIconMood('못생긴')}
              >
                못생긴{iconMood === '못생긴' && '✓'}
              </button>        
            </div>
          </div>
      );
        
      case 3:
        return (
          <div
            style={{
              fontFamily: 'Pretendard, sans-serif',
              backgroundColor: '#f5f5f5',
              borderRadius: '10px',
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                textAlign: 'left',
                fontFamily: 'Pretendard, sans-serif',
                marginBottom: '30px',
              }}
            >
              이모티콘이 가지는 색감은 어떠한 것을 좋아하시나요?
            </h2>
            <div className="button-group">
              <button
                className={`button ${iconColor === '파스텔' ? 'active' : ''}`}
                onClick={() => setIconColor('파스텔')}
              >
                파스텔{iconColor === '파스텔' && '✓'}
              </button>
              <button
                className={`button ${iconColor === '비비드' ? 'active' : ''}`}
                onClick={() => setIconColor('비비드')}
              >
                비비드{iconColor === '비비드' && '✓'}
              </button>
              <button
                className={`button ${iconColor === '흑백' ? 'active' : ''}`}
                onClick={() => setIconColor('흑백')}
              >
                흑백{iconColor === '흑백' && '✓'}
              </button>   
            </div>
          </div>
      );
      default:
        return <p>잘못된 페이지입니다.</p>;
    }
  };

  const progressPercentage = (page / 3) * 100;

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          backgroundColor: '#f0f0f0',
          height: '15px',
          position: 'relative',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            backgroundColor: '#B4BEC9',
            height: '100%',
            width: `${progressPercentage}%`,  // !!!!
            transition: 'width 0.3s ease-in-out',
          }}
        ></div>
      </div>
      <p
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          fontSize: '18px',
          fontWeight: 'bold',
          fontFamily: 'Pretendard, sans-serif',
          marginTop: '10px',
        }}
      >
        😍 이모티콘 취향 설문 조사 ({page}/3)
      </p>
      {renderPageContent()}
      <div>
        {page > 1 && (
          <button
            type="button"
            style={{
              marginTop: '20px',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#159A9C',
              color: 'white',
              fontSize: '14px',
              cursor: 'pointer',
              width: '100%',
            }}
            onClick={handlePrevious}
          >
            이전
          </button>
        )}
        {page < 3 && (
          <button
            type="button"
            style={{
              marginTop: '20px',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#159A9C',
              color: 'white',
              fontSize: '14px',
              cursor: 'pointer',
              width: '100%',
            }}
            onClick={handleNext}
          >
            다음
          </button>
        )}
        {page === 3 && (
          <button
            type="button"
            style={{
              marginTop: '20px',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#159A9C',
              color: 'white',
              fontSize: '14px',
              cursor: 'pointer',
              width: '100%',
            }}
            onClick={handleSubmit}
          >
            결과 제출
          </button>
        )}
      </div>
    </div>
  );
};

export default Survey;