import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Terminal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'اقولون انش اي تي !!!' },
    { type: 'system', text: ' مرت عليش من قبل' },
    { type: 'system', text: ' Birthday Terminal! 🎂' },

    {
  type: 'system',
  text: "   ,-.                     \n" +
        "   | |                     \n" +
        "   | \"--.  ,--.-.,-.--. ,-.--. ,-. ,-. \n" +
        "   | ,-. \\/ ,-. || ,-. \\| ,-. \\| | | | \n" +
        "   | | | |\\ `-' || `-' /| `-' /| `-' | \n" +
        "   `-' `-' `--'-'| .--' | .--'  `--. | \n" +
        "                 | |    | |        | | \n" +
        "                 `-'    `-'        `-' \n" +
        " ,-.     _       ,-.  ,-.        ,-.   \n" +
        " | |    (_)      | |_ | |        | |   \n" +
        " | \"--. ,-.,-.--.|  _)| \"--.  ,--\" | ,--.-.,-. ,-. \n" +
        " | ,-. \\| || ,-./| |  | ,-. \\/ ,-. |/ ,-. || | | | \n" +
        " | `-' /| || |   | |  | | | |\\ `-' |\\ `-' || `-' | \n" +
        " \"-'--' `-'`-'   `-'  `-' `-' `--'-' `--'-' `--. | \n" +
        "                                               | | \n" +
        "                                               `-'  \n"
},
    { type: 'system', text: 'جربي: show cake, show balloons, bestie quiz, or open gift' }
  ]);
  const inputRef = useRef();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

const asciiArt = {
  cake: `
                   )\\
                  (__)
                   /\\
                  [21] 
               @@@[[]]@@@
         @@@@@@@@@[[]]@@@@@@@@@
     @@@@@@@      [[]]      @@@@@@@
 @@@@@@@@@        [[]]        @@@@@@@@@
@@@@@@@           [[]]           @@@@@@@
!@@@@@@@@@                    @@@@@@@@@!
!    @@@@@@@                @@@@@@@    !
!        @@@@@@@@@@@@@@@@@@@@@@        !
!              @@@@@@@@@@@             !
!             ______________           !
!             HAPPY BIRTHDAY           !
!             --------------           !
!!!!!!!                          !!!!!!!
     !!!!!!!                !!!!!!!
         !!!!!!!!!!!!!!!!!!!!!!!
  `,
    balloons: `
    .-'"'-.
   / #     \\      
  : #       :   .-'"'-.
   \\       /   / #     \\
    \\     /   : #       :
     '\'q'\`     \\       / 
       (        \\     /
        ) .-'"'-.\\'q'\`
       ( / #     \\ (  
        ) #       : ) .-'"'-.
       ( \\       / ( / #     \\
          \\     /   ) #       :
           '\'q'\`   ( \\       / 
             (        \\     /
              )        '\'p'\`
             (           )
              )         (
                        )
  
    `,
    gift: `
    🤍 كلمات انتسجتها لمن وهبها الله في حياتي 🤍
    
    ان الهبة كرم و جود من الله يعطي فيه الله العبد على قدر كرمه و جوده و عطفه و تحننه على عبده,
    لا على قدر ما يستحقه العبد على عمله و طاعته
    فانتي كما اسمك هبة من الله وهبني الله اياك رفيقة و قريبة الى الروح و القلب و الفؤاد

    ادامك الله لي بخير و صحة و عافية ... ولا اراني فيك مكروه و لا فقد يا غاليتي

    قد دخلنا عامنا ٢١ اسأل الله ان يعطيكي و يرزقكي فيه من خيره و نعيمه و هباته العظيمة 
    و يحقق كل ما في النفس من امنيات و احلام و يسهل لها الطريق و المسير و يسخر العباد الصالحين
    و يكشف عن وجهك كل هم و غم و حزن و كرب و يبدله بفرح و سرور و نور كجمال نور وجهك

    و ثبت لك قدم صدق و حق على طريق الحق طريق محمد و آل محمد و يجعلك من انصار صاحب الامر
    عجل الله تعالى فرجه و جعل اعمالك من ما تسره و يفرح بها و جعلني و اياك على هذا المسار

    قد وقفت كلماتي لكن اعلمي ان الفؤاد لم يقف عن حبك 
    `
  };

  const quizQuestions = [
    { q: "أحلى نوع كيك عندش ؟", a: "اكييييد كاكوو تفكريني نسيت 😉" },
    { q: "متى عيد ميلادش الهجري ؟", a: "في مولد امير المؤمنين ١٣	 رجب 💚" },
    { q: "شلون اسالش عن اخبارش و احولش ؟", a: "كيفوووو ... ⁉" },
    { q: "لو ما كان اسمش هبة ويش كان بكون ؟", a: "كما ينقل في الروايات انه علوية" },
    { q: "لو الله بيرزقني سفرة وياش وين تبين ؟",  a: "الله يرزقني وياش زيارة لانيس النفوس و عمرة و زيارة محمد و آل محمد" },
  ];

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizMode, setQuizMode] = useState(false);

  const handleCommand = (cmd) => {
    const command = cmd.toLowerCase().trim();
    let response = { type: 'system', text: '' };

    switch (command) {
      case 'show cake':
        response.text = asciiArt.cake;
        break;
      case 'show balloons':
        response.text = asciiArt.balloons;
        break;
      case 'bestie quiz':
        setQuizMode(true);
        setCurrentQuiz(0);
        response.text = `🧠 BESTIE QUIZ TIME!\n\nQuestion 1: ${quizQuestions[0].q}`;
        break;
      case 'open gift':
        response.text = asciiArt.gift;
        break;
      case 'help':
        response.text = 'Available commands:\n- show cake\n- show balloons\n- bestie quiz\n- open gift\n- clear\n- help';
        break;
      case 'clear':
        setHistory([
          { type: 'system', text: '🧹 نظيف نظيف ' },
          { type: 'system', text: 'جربي: show cake, show balloons, bestie quiz, or open gift' }
        ]);
        return;
      default:
        if (quizMode && currentQuiz < quizQuestions.length) {
          response.text = `Answer: ${quizQuestions[currentQuiz].a}\n\n`;
          if (currentQuiz < quizQuestions.length - 1) {
            setCurrentQuiz(currentQuiz + 1);
            response.text += `Question ${currentQuiz + 2}: ${quizQuestions[currentQuiz + 1].q}`;
          } else {
            setQuizMode(false);
            response.text += "🎉 الاختبار كمل...طلعت اعرفش عدل ولااا !؟!";
          }
        } else {
          response.text = `Command not found: ${command}\nType 'help' for available commands.`;
        }
    }

    setHistory(prev => [...prev, { type: 'user', text: `> ${cmd}` }, response]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      className="terminal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="terminal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <div className="terminal-header">
          <span>🎂 Birthday Terminal</span>
          <button onClick={onClose}>✕</button>
        </div>
        
        <div className="terminal-body">
          {history.map((item, index) => (
            <div key={index} className={`terminal-line ${item.type}`}>
              <pre>{item.text}</pre>
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="terminal-input">
          <span>{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter command..."
          />
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Terminal;