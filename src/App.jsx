import React, { useState } from 'react';
import { Check, Lightbulb, HelpCircle } from 'lucide-react';

const FlowerCodeBingo = () => {
  const [revealedCards, setRevealedCards] = useState(new Set());
  const [showConfirm, setShowConfirm] = useState(null);
  const [showVictory, setShowVictory] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [userEquation, setUserEquation] = useState('');
  const [showCardHint, setShowCardHint] = useState(null);

  const cards = [
    { 
      id: 1, 
      num: "1",
      text: "פרח בצבע סגול או כחול", 
      char: "4",
      hint: "חפשו למשל: שיח אברהם, עדעד כחול, קיפודן מצוי, חלמית מצויה"
    },
    { 
      id: 2, 
      num: "2",
      text: "צמח מטפס המתלפף סביב עץ", 
      char: "8",
      hint: "חפשו למשל: קיסוסית קוצנית, זלזלת, פואה מצויה"
    },
    { 
      id: 3, 
      num: "3",
      text: "עלה פרוותי או קטיפתי", 
      char: "*",
      hint: "חפשו למשל: מרווה משולשת, לוטם שעיר"
    },
    { 
      id: 4, 
      num: "4",
      text: "שיח עם ריח חזק כשממוללים את העלה", 
      char: "2",
      hint: "חפשו למשל: זעתר (אזוב מצוי), פיגם מצוי, מרווה משולשת"
    },
    { 
      id: 5, 
      num: "5",
      text: "עלה משונן דמוי מסור", 
      char: "+",
      hint: "חפשו למשל: אלון מצוי, פטל קדוש"
    },
    { 
      id: 6, 
      num: "6",
      text: "צמח יבש עם שערות ארוכות, כמו מברשת או זנב", 
      char: "3",
      hint: "חפשו למשל: שעורת התבור"
    },
    { 
      id: 7, 
      num: "7",
      text: "עלה דמוי מחט", 
      char: "5",
      hint: "חפשו למשל: עץ אורן"
    },
    { 
      id: 8, 
      num: "8",
      text: "פרח שכולו צהוב לחלוטין", 
      char: "-",
      hint: "חפשו למשל: שלהבית דביקה, קחוון מצוי, נופר צהוב, צבר מצוי"
    },
    { 
      id: 9, 
      num: "9",
      text: "תפרחת לבנה - הרבה פרחים קטנים לבנים", 
      char: "1",
      hint: "חפשו למשל: גזר קיפח, אמיתה גדולה"
    },
    { 
      id: 10, 
      num: "10",
      text: "צמח קוץ", 
      char: "2",
      hint: "חפשו למשל: גדילן מצוי, דרדר מצוי, רתמה קוצנית, שברק קוצני"
    },
    { 
      id: 11, 
      num: "11",
      text: "צמח שצומח מתוך סדק של סלע", 
      char: ":",
      hint: "חפשו למשל: טבורית נטויה, זעתר, גלונית, קערורית סגולה"
    },
    { 
      id: 12, 
      num: "12",
      text: "פרח עם 5 עלי כותרת בדיוק", 
      char: "4",
      hint: "חפשו למשל: ציפורן נקוד, פשתה, הרדוף הנחלים, חוטמית זיפנית"
    }
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

  const cancelCard = (id) => {
    const newRevealed = new Set(revealedCards);
    newRevealed.delete(id);
    setRevealedCards(newRevealed);
  };

  const checkEquation = () => {
    const cleanInput = userEquation.replace(/\s/g, '');
    if (cleanInput === correctEquation) {
      setShowVictory(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-teal-50 to-emerald-50 p-4 pb-20">
      
      <div className="text-center mb-2" style={{ direction: 'rtl' }}>
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-teal-500 to-emerald-500 mb-2" 
            style={{ fontFamily: 'Impact, "Arial Black", sans-serif', letterSpacing: '1px' }}>
          בינגו קוד הפרחים
        </h1>
        <p className="text-sm text-gray-700 max-w-md mx-auto">
          מצאו לאורך המסלול את הפריטים המופיעים בלוח הבינגו, צלמו וזהו אותם עם גוגל תמונות
        </p>
      </div>

      <div className="h-6"></div>

      <div className="max-w-md mx-auto mb-4" dir="ltr">
        <div className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
          <div className="grid grid-cols-3 gap-3">
            {cards.map((card) => {
              const isRevealed = revealedCards.has(card.id);
              return (
                <div
                  key={card.id}
                  className="relative h-40"
                >
                  <div
                    onClick={() => handleCardClick(card.id)}
                    className={`relative h-full cursor-pointer transition-all duration-500 ${
                      isRevealed ? 'card-flip' : 'hover:scale-105'
                    }`}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* Front */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-2 flex flex-col items-center justify-center shadow-md border-2 border-purple-700"
                      style={{ backfaceVisibility: 'hidden', direction: 'rtl' }}
                    >
                      <div className="absolute top-1 right-1 bg-white/30 rounded-full w-6 h-6 flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{card.num}</span>
                      </div>
                      
                      <p className="text-white text-center font-semibold text-sm leading-tight mb-2" 
                         style={{ fontFamily: '"Rubik", "Heebo", sans-serif', fontWeight: '600' }}>
                        {card.text}
                      </p>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowCardHint(card.id);
                        }}
                        className="mt-auto bg-white/20 hover:bg-white/30 rounded-full px-2 py-1 flex items-center gap-1 transition-all"
                      >
                        <HelpCircle className="w-3 h-3 text-white" />
                        <span className="text-white text-xs">רמז</span>
                      </button>
                    </div>

                    {/* Back */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-lg p-2 flex flex-col items-center justify-center shadow-md border-2 border-teal-600"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        direction: 'ltr'
                      }}
                    >
                      <div className="text-7xl font-bold text-purple-900 mb-2" style={{ fontFamily: 'monospace' }}>
                        {card.char}
                      </div>
                      <Check className="w-6 h-6 text-purple-700 mb-2" />
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          cancelCard(card.id);
                        }}
                        className="mt-auto bg-red-500/80 hover:bg-red-600 text-white text-xs px-2 py-1 rounded transition-all"
                        style={{ direction: 'rtl' }}
                      >
                        בטל
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {allRevealed && !showVictory && (
        <div className="max-w-md mx-auto" style={{ direction: 'rtl' }}>
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-xl border-2 border-purple-400">
            <div className="text-center">
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
          <div className="bg-white rounded-3xl p-8 max-w-sm text-center shadow-2xl border-4 border-purple-500" style={{ direction: 'rtl' }}>
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
          <div className="bg-white rounded-2xl p-5 max-w-xs shadow-2xl border-2 border-purple-500" style={{ direction: 'rtl' }}>
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

      {showCardHint !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
             onClick={() => setShowCardHint(null)}>
          <div className="bg-white rounded-xl p-5 max-w-xs shadow-2xl border-2 border-teal-500" 
               style={{ direction: 'rtl' }}
               onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-5 h-5 text-teal-600" />
              <h3 className="text-lg font-bold text-teal-700">רמז</h3>
            </div>
            <p className="text-base text-gray-700 leading-relaxed">
              {cards.find(c => c.id === showCardHint)?.hint}
            </p>
            <button
              onClick={() => setShowCardHint(null)}
              className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition-all"
            >
              סגור
            </button>
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
