import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Floating background elements
const FloatingBackground = () => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const count = 50;
    const newElements = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      type: Math.random() > 0.7 ? 'sparkle' : 'heart',
      emoji: Math.random() > 0.7 ? '✨' : '💖'
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="floating-background">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className={`floating-element ${el.type}`}
          initial={{
            x: `${el.left}vw`,
            y: '120vh',
            opacity: 0,
            scale: 0
          }}
          animate={{
            y: '-20vh',
            opacity: [0, 0.8, 0],
            scale: [0, el.scale, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {el.emoji}
        </motion.div>
      ))}
    </div>
  );
};

const SuccessView = () => {
  return (
    <motion.div
      className="success-view-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="big-heart-container"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
      >
        <div className="big-heart">💝</div>
      </motion.div>

      <motion.h1
        className="success-title"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        YAAAY!
      </motion.h1>

      <motion.p
        className="success-message"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        I knew you'd say yes, Zainab! <br />
        Love YOU 🥂✨
      </motion.p>
    </motion.div>
  );
};

const MessagePage = ({ title, content, onNext, emoji }) => (
  <motion.div
    className="glass-card message-card"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
  >
    <div className="page-emoji">{emoji}</div>
    <h2 className="message-title">{title}</h2>
    <p className="message-content" style={{ textAlign: 'center' }}>{content}</p>
    <button className="next-button" onClick={onNext}>
      Continue <span>&rarr;</span>
    </button>
  </motion.div>
);

const TypewriterLetterPage = ({ title, content, onNext, emoji }) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < content.length) {
        setDisplayedContent((prev) => prev + content.charAt(index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 120);

    return () => clearInterval(timer);
  }, [content]);

  return (
    <motion.div
      className="glass-card message-card"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="page-emoji">{emoji}</div>
      <h2 className="message-title">{title}</h2>

      <div className="letter-container" style={{ position: 'relative', width: '100%', marginBottom: '20px' }}>
        <div className="message-content" style={{ textAlign: 'left', minHeight: '120px', whiteSpace: 'pre-line', lineHeight: '1.6' }}>
          {displayedContent}
          {isTyping && (
            <motion.span
              className="pencil-cursor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: [0, 10, 0] }}
              transition={{ rotate: { repeat: Infinity, duration: 0.2 } }}
              style={{ display: 'inline-block', marginLeft: '5px', fontSize: '1.2rem' }}
            >
              ✏️
            </motion.span>
          )}
        </div>
      </div>

      <motion.button
        className="next-button"
        onClick={onNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: isTyping ? 0 : 1 }}
        style={{ pointerEvents: isTyping ? 'none' : 'auto' }}
      >
        Continue <span>&rarr;</span>
      </motion.button>
    </motion.div>
  );
};

// ❤️ NEW: Floating heart effect component
const FloatingHeart = ({ id }) => (
  <motion.div
    key={id}
    initial={{ opacity: 1, y: 0, scale: 0.5 }}
    animate={{ opacity: 0, y: -60, scale: 1 }}
    transition={{ duration: 1 }}
    style={{
      position: "absolute",
      left: Math.random() * 40 + "%",
      top: -10,
      fontSize: "1.5rem",
      pointerEvents: "none"
    }}
  >
    💖
  </motion.div>
);

const ProposalPage = ({ onAccept, noBtnPos, moveNoBtn, yesScale, shake }) => (
  <motion.div
    className="glass-card proposal-card"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.8 }}
  >
    <motion.div
      className="card-header"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <span className="subtitle">One Last Question...</span>
    </motion.div>

    <motion.h1
      className="recipient-name"
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      Zainab
    </motion.h1>

    <div className="main-question">
      <motion.div
        className="question-text"
        animate={{
          textShadow: [
            "0 0 20px rgba(255, 107, 157, 0.2)",
            "0 0 40px rgba(255, 107, 157, 0.5)",
            "0 0 20px rgba(255, 107, 157, 0.2)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Be My Valentine?
      </motion.div>
    </div>

    <div className="action-buttons">

      {/* ❤️ YES BUTTON WITH SHAKE + PULSE + GROW */}
      <motion.button
        className="yes-button"
        onClick={onAccept}

        animate={{
          scale: yesScale,
          rotate: shake ? [0, -5, 5, -5, 5, 0] : 0, // NEW SHAKE ANIMATION
        }}
        transition={{ duration: 0.3 }}

        whileHover={{ scale: yesScale * 1.1 }}
        whileTap={{ scale: yesScale * 0.95 }}
      >
        Yes, I Will! 💖
      </motion.button>

      <motion.button
        className="no-button"
        animate={{ x: noBtnPos.x, y: noBtnPos.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseEnter={moveNoBtn}
        onClick={moveNoBtn}
        whileTap={{ scale: 0.9 }}
      >
        No 😅
      </motion.button>
    </div>
  </motion.div>
);

function App() {
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState(false);

  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const [yesScale, setYesScale] = useState(1);  // YES grows slowly
  const [shake, setShake] = useState(false);     // YES shakes
  const [hearts, setHearts] = useState([]);      // YES pops hearts

  const moveNoButton = () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoButtonPos({ x, y });

    // YES grows slowly
    setYesScale(prev => Math.min(prev + 0.1, 2));

    // YES shakes briefly
    setShake(true);
    setTimeout(() => setShake(false), 300);

    // Pop a heart
    const id = Math.random();
    setHearts(prev => [...prev, id]);

    // Remove heart after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h !== id));
    }, 1000);
  };

  const handleNext = () => setStep(prev => prev + 1);

  const affirmationData = {
    title: "Hi Ashabi...",
    content: "You are smart, beautiful, and kinda weird (but in a good way). You make even the ordinary days feel extraordinary. That's true love right there.",
    emoji: "🌸"
  };

  const letterData = {
    title: "Dear Monisola,",
    content: "  Been thinking about how lucky I am to have you around.\nYour laugh, your little quirks, and yes… even the way you annoy me constantly — somehow, it all makes me adore you even more.\nI love our silly jokes, our random adventures, and even the playful chaos you bring.\nYou’re my favorite human, my partner in trouble, and honestly, I can’t imagine life without you.\n\nSo, let’s keep making memories, mischief, and teasing each other forever.",
    emoji: "💌"
  };

  return (
    <div className="app-container">
      <div className="gradient-bg"></div>
      <FloatingBackground />

      {/* Floating hearts */}
      {hearts.map(id => <FloatingHeart key={id} id={id} />)}

      <AnimatePresence mode="wait">
        {!accepted ? (
          <>
            {step === 0 && (
              <MessagePage
                key="step-0"
                title={affirmationData.title}
                content={affirmationData.content}
                emoji={affirmationData.emoji}
                onNext={handleNext}
              />
            )}

            {step === 1 && (
              <TypewriterLetterPage
                key="step-1"
                title={letterData.title}
                content={letterData.content}
                emoji={letterData.emoji}
                onNext={handleNext}
              />
            )}

            {step === 2 && (
              <ProposalPage
                key="proposal"
                onAccept={() => setAccepted(true)}
                noBtnPos={noButtonPos}
                moveNoBtn={moveNoButton}
                yesScale={yesScale}
                shake={shake}
              />
            )}
          </>
        ) : (
          <SuccessView key="success" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
