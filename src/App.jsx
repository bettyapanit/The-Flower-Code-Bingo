import React, { useState } from 'react';
import { Check, Lightbulb } from 'lucide-react';

const FlowerCodeBingo = () => {
  const [revealedCards, setRevealedCards] = useState(new Set());
  const [showConfirm, setShowConfirm] = useState(null);
  const [showVictory, setShowVictory] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [userEquation, setUserEquation] = useState('');

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

  const correctEquation = "48*2+35-12:4";
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

  const checkEquation = () => {
    const cleanInput = userEquation.replace(/\s/g, '');
    if (cleanInput === correctEquation) {
      setShowVictory(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-teal-50 to-emerald-50 p-3 pb-20" 
         style={{ direction: 'rtl' }}>
      
      <div className="text-center mb-3">
        <h1 className="text-3xl font-bold text-purple-700 mb-2">בינגו קוד הפרחים</h1>
        <p className="text-sm text-gray-700">מצאו לאורך המסלול את הפריטים המופיעים בלוח הבינגו, צלמו וזהו אותם עם גוגל תמונות</p>
      </div>

      <div className="max-w-lg mx-auto mb-4 relative">
        <div className="absolute inset-0 grid grid-cols-4 gap-2 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="border-2 border-purple-300 rounded-lg"></div>
          ))}
        </div>
        
        <div className="grid grid-cols-4 gap-2 relative z-10">
          {cards.map((card) => {
            const isRevealed = revealedCards.has(card.id);
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`relative h-28 cursor-pointer transition-all duration-500 ${
                  isRevealed ? 'card-flip' : 'hover:scale-105'
                }`}
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-1.5 flex items-center justify-center shadow-md"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <p className="text-white text-center font-bold text-xs leading-tight">
                    {card.text}
                  </p>
                </div>

                <div 
                  className="absolute inset-0 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-lg p-2 flex flex-col items-center justify-center shadow-md"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    direction: 'ltr'
                  }}
                >
                  <div className="text-5xl font-bold text-purple-900 mb-1">
                    {card.char}
                  </div>
                  <Check className="w-5 h-5 text-purple-700" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {allRevealed && !showVictory && (
        <div className="max-w-md mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-xl border-2 border-purple-400">
            <div className="text-center">
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold text-purple-700 mb-3">בינגו! כל הכבוד!</h2>
              <p className="text-base text-gray-700 mb-4">
                הצלחתם למצוא את כל הפרחים וסיימתם את לוח הבינגו.
                <br/>
                כעת עליכם לגלות איך להיעזר בו כדי לפתוח את התיבה.
              </p>
              
              <p className="text-sm text-gray-600 mb-3">לנוחיותכם, אפשר להיעזר בשדה כדי להזין את הדרך לתשובה:</p>
              
              <input
                type="text"
                value={userEquation}
                onChange={(e) => setUserEquation(e.target.value)}
                placeholder="כתבו כאן..."
                className="w-full text-center text-xl font-mono p-3 border-3 border-purple-400 rounded-lg mb-4 focus:outline-none focus:ring-3 focus:ring-purple-300"
                dir="ltr"
              />

              <button
                onClick={checkEquation}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 w-full"
              >
                אפשר לבדוק
              </button>

              <div className="mt-4 text-right">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-purple-600 hover:text-purple-800 flex items-center gap-1 mr-auto"
                >
                  <Lightbulb className="w-3 h-3" />
                  {showHint ? 'הסתר רמז' : 'רמז'}
                </button>
                
                {showHint && (
                  <div className="bg-purple-50 border border-purple-300 rounded-lg p-2 mt-2 text-xs text-purple-800 text-right">
                    סדרו את התווים לפי סדר המשבצות (משמאל לימין, מלמעלה למטה) ופתרו את התרגיל
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showVictory && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm text-center shadow-2xl border-4 border-purple-500">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">נכון!</h2>
            <p className="text-lg text-gray-700 mb-4">
              זה אכן התרגיל שהתגלה בלוח הבינגו.
            </p>
            <div className="text-4xl font-bold text-purple-900 mb-4 font-mono" dir="ltr">
              48*2+35-12:4
            </div>
            <p className="text-lg text-gray-700 font-medium">
              אז מה הוא מרמז לכם בהקשר לפתיחת התיבה?
            </p>
          </div>
        </div>
      )}

      {showConfirm !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-2xl p-5 max-w-xs shadow-2xl border-2 border-purple-500">
            <p className="text-xl font-bold text-gray-800 text-center mb-5">
              האם מצאתם וצילמתם צמח שמתאים להגדרה?
            </p>
            <div className="flex gap-2">
              <button
                onClick={confirmFind}
                className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-5 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                כן, מצאנו! ✓
              </button>
              <button
                onClick={() => setShowConfirm(null)}
                className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white px-5 py-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                עדיין לא
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .card-flip {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default FlowerCodeBingo;
