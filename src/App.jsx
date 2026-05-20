import React, { useState } from 'react';
import { Check, Flower2, Lock } from 'lucide-react';

const FlowerCodeBingo = () => {
  const [revealedCards, setRevealedCards] = useState(new Set());
  const [showConfirm, setShowConfirm] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [showVictory, setShowVictory] = useState(false);

  const cards = [
    { id: 1, text: "פרח בצבע סגול או כחול", char: "5" },
    { id: 2, text: "מרכז צהוב (פרח עם 'עין' צהובה)", char: "0" },
    { id: 3, text: "פרח עם 5 עלי כותרת בדיוק (ספרו היטב!)", char: "*" },
    { id: 4, text: "עלה בצורת לב", char: "2" },
    { id: 5, text: "צמח שגדל ממש בתוך המים או ממש על הגדה", char: "+" },
    { id: 6, text: "עלה פרוותי, שעיר או בעל מרקם קטיפתי", char: "3" },
    { id: 7, text: "צמח מטפס המתלפף סביב עץ או שיח אחר", char: "0" },
    { id: 8, text: "פרח לבן קטן", char: "-" },
    { id: 9, text: "שיח עם ריח חזק ודומיננטי (מוללו עלה בעדינות)", char: "8" },
    { id: 10, text: "עלה משונן (עם קצוות כמו של מסור)", char: ":" },
    { id: 11, text: "פרח בצבע ורוד עז (חפשו ליד המים)", char: "2" },
    { id: 12, text: "עלה ארוך וצר מאוד", char: "" }
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
    const colors = ['#FFD700', '#FF69B4', '#98D8C8', '#F7DC6F'];

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
    <div className="min-h-screen bg-gradient-to-br from-olive-100 via-amber-50 to-green-50 p-4 pb-20" 
         style={{ 
           backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(107, 142, 35, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(160, 120, 80, 0.05) 0%, transparent 50%)',
           direction: 'rtl'
         }}>
      
      {/* Header */}
      <div className="text-center mb-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-green-600">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Flower2 className="w-8 h-8 text-green-700" />
          <h1 className="text-3xl font-bold text-green-800">קוד הפרחים</h1>
          <Flower2 className="w-8 h-8 text-green-700" />
        </div>
        <p className="text-lg text-green-700 font-medium">משימת הבינגו</p>
        <p className="text-sm text-gray-700 mt-2">חפשו את הפריטים במסלול, צלמו, ואספו את חלקי הקוד</p>
      </div>

      {/* Bingo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 max-w-4xl mx-auto">
        {cards.map((card) => {
          const isRevealed = revealedCards.has(card.id);
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`relative h-40 cursor-pointer transition-all duration-500 preserve-3d ${
                isRevealed ? 'rotate-y-180' : 'hover:scale-105'
              }`}
              style={{ 
                transformStyle: 'preserve-3d',
                transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Front */}
              <div 
                className="absolute inset-0 backface-hidden bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-4 flex items-center justify-center shadow-lg border-2 border-green-800"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <p className="text-white text-center font-semibold text-sm leading-tight">
                  {card.text}
                </p>
              </div>

              {/* Back */}
              <div 
                className="absolute inset-0 backface-hidden bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl p-4 flex flex-col items-center justify-center shadow-lg border-2 border-amber-600"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="text-6xl font-bold text-green-900 mb-2">
                  {card.char || "✓"}
                </div>
                <Check className="w-8 h-8 text-green-700" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Equation Display */}
      {allRevealed && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-amber-600 mb-6">
            <h2 className="text-2xl font-bold text-green-800 text-center mb-4">התרגיל שלכם:</h2>
            <div className="text-5xl font-bold text-center text-green-900 mb-6 font-mono tracking-wider">
              50*2+30-8:2
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <Lock className="w-6 h-6 text-amber-700" />
              <p className="text-lg font-semibold text-gray-800">
                פתרו את התרגיל והקלידו את קוד המנעול התלת-ספרתי:
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <input
                type="number"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                placeholder="הקלידו קוד בן 3 ספרות"
                className="text-center text-2xl font-bold p-4 border-4 border-green-600 rounded-xl w-full sm:w-64 focus:outline-none focus:ring-4 focus:ring-amber-400"
                maxLength={3}
              />
              <button
                onClick={checkCode}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                בדקו קוד
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Victory Message */}
      {showVictory && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 rounded-3xl p-8 max-w-lg text-center shadow-2xl border-4 border-yellow-600 animate-bounce-in">
            <div className="text-6xl mb-4">🎉🐎🎉</div>
            <h2 className="text-3xl font-bold text-green-900 mb-4">פיצחתם את קוד הפרחים!</h2>
            <p className="text-xl text-green-800 font-semibold mb-2">
              קוד המנעול לקופסת ההפתעות הוא:
            </p>
            <p className="text-5xl font-bold text-green-900 mb-4">126</p>
            <p className="text-lg text-green-800 font-medium">
              חפשו את הרמז הבא בפנים! 🐎
            </p>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {showConfirm !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-2xl p-6 max-w-sm shadow-2xl border-2 border-green-600">
            <p className="text-xl font-bold text-gray-800 text-center mb-6">
              האם מצאתם וצילמתם צמח שמתאים להגדרה?
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmFind}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                כן, מצאנו! ✓
              </button>
              <button
                onClick={() => setShowConfirm(null)}
                className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
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
