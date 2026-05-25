import React, { useState } from 'react';
import { Check, Lightbulb, HelpCircle } from 'lucide-react';

const FlowerCodeBingo = () => {
  const [revealedCards, setRevealedCards] = useState(new Set());
  const [showVictory, setShowVictory] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [userEquation, setUserEquation] = useState('');
  const [showCardHint, setShowCardHint] = useState(null);
  const [plantNames, setPlantNames] = useState({});

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
      char: "X",
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

  const correctEquation = "48X2+35-12:4";
  const allRevealed = revealedCards.size === 12;

  const confirmFind = (id) => {
    if (plantNames[id] && plantNames[id].trim()) {
      setRevealedCards(new Set([...revealedCards, id]));
    }
  };

  const cancelCard = (id) => {
    const newRevealed = new Set(revealedCards);
    newRevealed.delete(id);
    setRevealedCards(newRevealed);
  };

  const updatePlantName = (id, name) => {
    setPlantNames(prev => ({...prev, [id]: name}));
  };

  const checkEquation = () => {
    const cleanInput = userEquation.replace(/\s/g, '');
    if (cleanInput === correctEquation) {
      setShowVictory(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-teal-100 via-emerald-100 to-purple-50 p-3 pb-20">
      
      <div className="text-center mb-2" style={{ direction: 'rtl' }}>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-teal-500 to-purple-600 mb-1" 
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          בינגו קוד הפרחים
        </h1>
        <p className="text-xs text-gray-700 max-w-md mx-auto">
          מצאו לאורך המסלול את הפריטים המופיעים בלוח הבינגו, צלמו וזהו אותם עם גוגל תמונות
        </p>
      </div>

      <div className="h-4"></div>

      <div className="max-w-md mx-auto mb-4" dir="ltr">
        <div className="bg-white rounded-2xl p-3 shadow-2xl">
          <div className="grid grid-cols-3 gap-0.5">
            {cards.map((card) => {
              const isRevealed = revealedCards.has(card.id);
              return (
                <div
                  key={card.id}
                  className="relative h-40"
                >
                  <div
                    className={`relative h-full transition-all duration-500 ${
                      isRevealed ? 'card-flip' : ''
                    }`}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)'
                    }}
                  >
                    {/* Front */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-1.5 flex flex-col items-center shadow-md border-2 border-purple-700"
                      style={{ backfaceVisibility: 'hidden', direction: 'rtl' }}
                    >
                      <div className="text-white font-bold text-sm mb-1">{card.num}</div>
                      
                      <p className="text-white text-center font-semibold text-xs leading-tight px-1 mb-2 flex-1 flex items-center" 
                         style={{ fontFamily: '"Rubik", "Heebo", sans-serif', fontWeight: '600' }}>
                        {card.text}
                      </p>
                      
                      <input
                        type="text"
                        value={plantNames[card.id] || ''}
                        onChange={(e) => {
                          e.stopPropagation();
                          updatePlantName(card.id, e.target.value);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            confirmFind(card.id);
                          }
                        }}
                        placeholder="שם הצמח"
                        className="w-full text-center text-xs bg-white/30 text-white placeholder-white/70 border border-white/40 rounded px-1 py-0.5 mb-1 focus:outline-none focus:bg-white/40"
                        style={{ direction: 'rtl' }}
                      />
                      
                      <div className="w-full flex justify-between items-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowCardHint(card.id);
                          }}
                          className="bg-white/20 hover:bg-white/30 rounded-full p-1 transition-all"
                        >
                          <HelpCircle className="w-3 h-3 text-white" />
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmFind(card.id);
                          }}
                          disabled={!plantNames[card.id] || !plantNames[card.id].trim()}
                          className={`rounded-full p-1 transition-all ${
                            plantNames[card.id] && plantNames[card.id].trim()
                              ? 'bg-teal-600 hover:bg-teal-700 cursor-pointer'
                              : 'bg-white/20 cursor-not-allowed opacity-40'
                          }`}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    </div>

                    {/* Back */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg p-2 flex flex-col items-center justify-center shadow-md border-2 border-teal-800"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        direction: 'ltr'
                      }}
                    >
                      <div className="text-6xl font-bold text-purple-200 mb-1" style={{ fontFamily: 'monospace' }}>
                        {card.char}
                      </div>
                      <Check className="w-5 h-5 text-purple-200 mb-1" />
                      
                      {plantNames[card.id] && (
                        <div className="text-xs text-purple-100 text-center mb-1" style={{ direction: 'rtl' }}>
                          {plantNames[card.id]}
                        </div>
                      )}
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          cancelCard(card.id);
                        }}
                        className="mt-auto bg-red-500/80 hover:bg-red-600 text-white text-xs px-2 py-0.5 rounded transition-all"
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
              <p className="text-base text-gray-700 mb-1">
                הצלחתם למצוא את כל הצמחים
              </p>
              <p className="text-base text-gray-700 mb-3">
                וסיימתם את לוח הבינגו.
              </p>
              <p className="text-base text-gray-700 mb-4">
                כעת עליכם לגלות איך להיעזר בו
                <br/>
                כדי לפתוח את התיבה.
              </p>
              
              <p className="text-sm text-gray-600 mb-1">לנוחיותכם, אפשר להיעזר בשדה</p>
              <p className="text-sm text-gray-600 mb-3">כדי להזין את הדרך לתשובה:</p>
              
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
                    סדרו את התווים לפי סדר המשבצות (משמאל לימין, מלמעלה למטה)
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
            <h2 className="text-2xl font-bold text-purple-700 mb-4">צדקתם!</h2>
            <p className="text-lg text-gray-700 mb-4">
              זה התרגיל שנחשף בלוח הבינגו.
            </p>
            <div className="text-4xl font-bold text-purple-900 mb-4 font-mono" dir="ltr">
              48X2+35-12:4
            </div>
            <p className="text-xl text-gray-700 font-medium">
              אז מה הוא מרמז לכם בהקשר לפתיחת התיבה?
            </p>
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
