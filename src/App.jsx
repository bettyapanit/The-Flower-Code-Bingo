import React, { useState } from 'react';
import { Check, Flower2, Lock, Lightbulb } from 'lucide-react';

const FlowerCodeBingo = () => {
  const [revealedCards, setRevealedCards] = useState(new Set());
  const [showConfirm, setShowConfirm] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [showVictory, setShowVictory] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const cards = [
    { id: 1, text: "פרח בצבע סגול או כחול", char: "4" },
    { id: 2, text: "מרכז צהוב (פרח עם 'עין' צהובה)", char: "8" },
    { id: 3, text: "פרח עם 5 עלי כותרת בדיוק (ספרו היטב!)", char: "*" },
    { id: 4, text: "עלה בצורת לב", char: "2" },
    { id: 5, text: "צמח שגדל ממש בתוך המים או ממש על הגדה", char: "+" },
    { id: 6, text: "עלה פרוותי, שעיר או בעל מרקם קטיפתי", char: "3" },
    { id: 7, text: "צמח מטפס המתלפף סביב עץ או שיח אחר", char: "5" },
    { id: 8, text: "פרח לבן קטן", char: "-" },
    { id: 9, text: "שיח עם ריח חזק ודומיננטי (מוללו עלה בעדינות)", char: "1" },
    { id: 10, text: "עלה משונן (עם קצוות כמו של מסור)", char: "2" },
    { id: 11, text: "פרח בצבע ורוד עז (חפשו ליד המים)", char: ":" },
    { id: 12, text: "עלה ארוך וצר מאוד", char: "4" }
  ];

  const allRevealed = revealedCards.size === 12;

  const handleCardClick = (id) => {
    if (!revealedCards.has(id)) {
      setShowConfirm(id);
    }
  };

  const confirmFind = () => {
    setRevealedCards(new Set([...revealedCards, showConfirm]));
    setShowConfirm(null);
  };

  const checkCode = () => {
    if (userCode === '126') {
      setShowVictory(true);
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const colors = ['#8B5CF6', '#14B8A6', '#10B981', '#F59E0B'];

    const frame = () => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return;

      const particleCount = 3;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
          position: fixed;
          left: ${Math.random() * 100}%;
          top: -10px;
          width: 10px;
          height: 10px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          animation: fall ${1 + Math.random()}s linear forwards;
        `;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
      }
      requestAnimationFrame(frame);
    };
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fall {
        to {
          transform: translateY(100vh) rotate(${Math.random() * 360}deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    frame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-teal-50 to-emerald-50 p-3 pb-20" 
         style={{ direction: 'rtl' }}>
      
      {/* Compact Header */}
      <div className="text-center mb-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border-2 border-purple-400">
        <h1 className="text-2xl font-bold text-purple-700 mb-1">בינגו קוד הפרחים</h1>
        <p className="text-xs text-gray-600">מצאו לאורך המסלול את הפריטים המופיעים בלוח הבינגו, צלמו וזהו אותם עם גוגל תמונות</p>
      </div>

      {/* Compact Bingo Grid - 3 columns, smaller cards */}
      <div className="grid grid-cols-3 gap-2 mb-4 max-w-md mx-auto">
        {cards.map((card) => {
          const isRevealed = revealedCards.has(card.id);
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`relative h-28 cursor-pointer transition-all duration-500 preserve-3d ${
                isRevealed ? 'rotate-y-180' : 'hover:scale-105'
              }`}
              style={{ 
                transformStyle: 'preserve-3d',
                transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front */}
              <div 
                className="absolute inset-0 backface-hidden bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-2 flex items-center justify-center shadow-md border-2 border-purple-700"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <p className="text-white text-center font-semibold text-xs leading-tight">
                  {card.text}
                </p>
              </div>

              {/* Back */}
              <div 
                className="absolute inset-0 backface-hidden bg-gradient-to-br from-teal-400 to-emerald-400 rounded-lg p-2 flex flex-col items-center justify-center shadow-md border-2 border-teal-600"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="text-5xl font-bold text-purple-900 mb-1">
                  {card.char}
                </div>
                <Check className="w-6 h-6 text-purple-700" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Victory State - Progressive Reveal */}
      {allRevealed && (
        <div className="max-w-md mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border-2 border-purple-500 mb-4">
            <div className="text-center mb-3">
              <div className="text-4xl mb-2">🎉</div>
              <h2 className="text-xl font-bold text-purple-700 mb-2">בינגו! כל הכבוד!</h2>
              <p className="text-sm text-gray-700 mb-3">
                הצלחתם למצוא את כל הפרחים שעונים להגדרות וסיימתם את לוח הבינגו.
                <br/>
                כעת עליכם לגלות איך להיעזר בו כדי לפתוח את התיבה.
              </p>
              
              {!showHint && (
                <button
                  onClick={() => setShowHint(true)}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
                >
                  <Lightbulb className="w-5 h-5" />
                  רמז
                </button>
              )}

              {showHint && (
                <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-3 mb-3 text-sm text-purple-800">
                  <p className="font-semibold">
                    סדרו את התווים שאספתם לפי סדר המשבצות (מימין לשמאל, מלמעלה למטה) ופתרו את התרגיל המתמטי
                  </p>
                </div>
              )}
            </div>
            
            {showHint && (
              <>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Lock className="w-5 h-5 text-purple-600" />
                  <p className="text-sm font-semibold text-gray-800">
                    הקלידו את קוד המנעול התלת-ספרתי:
                  </p>
                </div>
                
                <div className="flex flex-col gap-2 items-center">
                  <input
                    type="number"
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    placeholder="קוד בן 3 ספרות"
                    className="text-center text-xl font-bold p-3 border-4 border-purple-500 rounded-lg w-full max-w-xs focus:outline-none focus:ring-4 focus:ring-purple-300"
                    maxLength={3}
                  />
                  <button
                    onClick={checkCode}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-lg font-bold text-base shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 w-full max-w-xs"
                  >
                    בדקו קוד
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Final Victory Message */}
      {showVictory && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-purple-300 via-teal-300 to-emerald-300 rounded-3xl p-6 max-w-sm text-center shadow-2xl border-4 border-purple-500 animate-bounce-in">
            <div className="text-6xl mb-3">🎉🐎🎉</div>
            <h2 className="text-2xl font-bold text-purple-900 mb-3">פיצחתם את קוד הפרחים!</h2>
            <p className="text-lg text-purple-800 font-semibold mb-2">
              קוד המנעול לקופסת ההפתעות הוא:
            </p>
            <p className="text-5xl font-bold text-purple-900 mb-3">126</p>
            <p className="text-base text-purple-800 font-medium">
              חפשו את הרמז הבא בפנים! 🐎
            </p>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {showConfirm !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-2xl p-5 max-w-xs shadow-2xl border-2 border-purple-500">
            <p className="text-lg font-bold text-gray-800 text-center mb-5">
              האם מצאתם וצילמתם צמח שמתאים להגדרה?
            </p>
            <div className="flex gap-2">
              <button
                onClick={confirmFind}
                className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-5 py-3 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                כן, מצאנו! ✓
              </button>
              <button
                onClick={() => setShowConfirm(null)}
                className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white px-5 py-3 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                עדיין לא
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FlowerCodeBingo;
