import { useState } from "react";

const ALL_QUESTIONS = [
  { id: 1, category: "Road Signs", question: "What does an octagonal red sign mean?", options: ["Yield", "Stop", "Do Not Enter", "Wrong Way"], answer: 1, explanation: "A red octagon always means STOP. You must come to a complete stop at the line." },
  { id: 2, category: "Road Signs", question: "A yellow diamond-shaped sign indicates:", options: ["A law you must obey", "A warning or hazard ahead", "School zone", "Construction zone only"], answer: 1, explanation: "Yellow diamond signs are warning signs alerting you to potential hazards ahead." },
  { id: 3, category: "Road Signs", question: "What does a white rectangular sign indicate?", options: ["Warning", "Guide information", "A regulation or law", "Speed advisory"], answer: 2, explanation: "White rectangular signs indicate regulations — laws you must obey, like speed limits." },
  { id: 4, category: "Road Signs", question: "A pennant-shaped sign means:", options: ["Construction ahead", "No passing zone", "Divided highway ahead", "Pedestrian crossing"], answer: 1, explanation: "The pennant shape is exclusively used for No Passing Zone signs." },
  { id: 5, category: "Road Signs", question: "What color are guide signs on highways?", options: ["Blue", "Green", "White", "Brown"], answer: 1, explanation: "Green signs provide directional and distance information on highways." },
  { id: 6, category: "Road Signs", question: "A red circle with a line through it means:", options: ["Caution", "Proceed with care", "The action shown is prohibited", "Slow down"], answer: 2, explanation: "A red circle with a slash means the action depicted is NOT allowed." },
  { id: 7, category: "Road Signs", question: "What does a flashing yellow light mean?", options: ["Stop, then go", "The light is about to turn red", "Proceed with caution", "Yield to all traffic"], answer: 2, explanation: "A flashing yellow light means slow down and proceed with caution." },
  { id: 8, category: "Road Signs", question: "Orange signs in a construction zone mean:", options: ["Stop ahead", "Detour only", "Workers and equipment ahead", "Speed limit increase"], answer: 2, explanation: "Orange signs indicate construction zones where workers may be present." },
  { id: 9, category: "Speed Limits", question: "What is the typical speed limit in a school zone?", options: ["15 mph", "20 mph", "25 mph", "30 mph"], answer: 2, explanation: "Most states set school zone speed limits at 25 mph when children are present." },
  { id: 10, category: "Speed Limits", question: "The Basic Speed Law means:", options: ["Always drive the posted limit", "Never drive faster than is safe for conditions", "Match surrounding traffic speed", "Minimum speed must be maintained"], answer: 1, explanation: "The Basic Speed Law requires you to drive at a safe speed for current conditions." },
  { id: 11, category: "Right of Way", question: "At a four-way stop, who goes first?", options: ["The largest vehicle", "The vehicle that arrived first", "The vehicle on the left", "The vehicle going straight"], answer: 1, explanation: "At a four-way stop, the vehicle that arrives first has the right of way." },
  { id: 12, category: "Right of Way", question: "When two vehicles arrive at a four-way stop at the same time, who yields?", options: ["The vehicle on the right yields", "The vehicle on the left yields to the right", "Both stop indefinitely", "The smaller vehicle yields"], answer: 1, explanation: "When arriving simultaneously, the vehicle on the LEFT yields to the vehicle on the RIGHT." },
  { id: 13, category: "Right of Way", question: "You must yield to pedestrians:", options: ["Only at marked crosswalks", "Only when a signal says Walk", "At all crosswalks marked or unmarked", "Never"], answer: 2, explanation: "Drivers must yield to pedestrians at ALL crosswalks, whether marked or unmarked." },
  { id: 14, category: "Right of Way", question: "When entering a highway from an on-ramp, you must:", options: ["Have right of way", "Yield to highway traffic", "Stop until clear", "Honk to signal your merge"], answer: 1, explanation: "Vehicles entering a highway must yield to traffic already traveling on it." },
  { id: 15, category: "DUI Laws", question: "The legal BAC limit for drivers 21+ in most states is:", options: ["0.05%", "0.06%", "0.08%", "0.10%"], answer: 2, explanation: "The standard limit is 0.08% BAC for drivers 21 and older." },
  { id: 16, category: "DUI Laws", question: "Refusing a breathalyzer test will result in:", options: ["Nothing", "Automatic license suspension", "A warning only", "A reduced charge"], answer: 1, explanation: "Under implied consent laws, refusing a breathalyzer results in automatic license suspension." },
  { id: 17, category: "DUI Laws", question: "The only thing that removes alcohol from your system is:", options: ["Coffee", "Cold water", "Food", "Time"], answer: 3, explanation: "Only time removes alcohol from your system." },
  { id: 18, category: "DUI Laws", question: "Commercial drivers have a lower BAC limit of:", options: ["0.08%", "0.06%", "0.04%", "0.02%"], answer: 2, explanation: "CDL holders are held to a stricter 0.04% BAC limit." },
  { id: 19, category: "Safe Driving", question: "The recommended following distance in normal conditions is:", options: ["1 second", "2 seconds", "3 seconds", "5 seconds"], answer: 2, explanation: "A 3-second following distance gives you adequate time to react and stop safely." },
  { id: 20, category: "Safe Driving", question: "If your vehicle begins to hydroplane, you should:", options: ["Brake hard", "Accelerate", "Ease off the gas and steer straight", "Turn sharply"], answer: 2, explanation: "Ease off the accelerator gently and steer straight until tires regain contact." },
  { id: 21, category: "Safe Driving", question: "Before changing lanes, you should:", options: ["Just check mirrors", "Signal, check mirrors, check blind spot", "Check blind spot only", "Signal and change immediately"], answer: 1, explanation: "Always signal, check mirrors, then physically check your blind spot." },
  { id: 22, category: "Parking", question: "How far must you park from a fire hydrant?", options: ["5 feet", "10 feet", "15 feet", "20 feet"], answer: 2, explanation: "Most states require parking at least 15 feet from a fire hydrant." },
  { id: 23, category: "Parking", question: "When parking uphill with a curb, your wheels should be turned:", options: ["Toward the curb", "Away from the curb", "Straight ahead", "Toward traffic"], answer: 1, explanation: "Uphill with a curb — turn wheels AWAY from the curb." },
  { id: 24, category: "Parking", question: "When parking downhill with a curb, your wheels should be turned:", options: ["Away from the curb", "Toward the curb", "Straight ahead", "Toward center"], answer: 1, explanation: "Downhill with a curb — turn wheels TOWARD the curb." },
  { id: 25, category: "Traffic Laws", question: "When can you pass a school bus with flashing red lights?", options: ["When no children are visible", "Never — you must stop", "Only on a divided highway", "When the driver waves you through"], answer: 2, explanation: "Stop for a school bus UNLESS on the opposite side of a divided highway." },
  { id: 26, category: "Traffic Laws", question: "You must signal a turn at least how many feet before turning?", options: ["50 feet", "100 feet", "200 feet", "300 feet"], answer: 1, explanation: "Most states require signaling at least 100 feet before a turn." },
  { id: 27, category: "Traffic Laws", question: "When can you make a right turn on red?", options: ["Never", "Always", "After stopping if no sign prohibits it", "Only during daylight"], answer: 2, explanation: "Turn right on red after a complete stop if no sign prohibits it and it's safe." },
  { id: 28, category: "Highway Driving", question: "When merging onto a highway, you should:", options: ["Stop at the ramp end", "Match highway traffic speed", "Merge immediately", "Honk to alert traffic"], answer: 1, explanation: "Accelerate on the ramp to match highway traffic speed before merging." },
  { id: 29, category: "Highway Driving", question: "If you miss your highway exit, you should:", options: ["Reverse to the exit", "Make a U-turn", "Continue to the next exit", "Stop on the shoulder"], answer: 2, explanation: "Never reverse on a highway. Proceed to the next exit." },
  { id: 30, category: "Night Driving", question: "When should you use high beam headlights?", options: ["Always on highways", "When no oncoming traffic within 500 feet", "In foggy conditions", "In city driving"], answer: 1, explanation: "Use high beams when no oncoming traffic is within 500 feet." },
  { id: 31, category: "Night Driving", question: "In fog, you should use:", options: ["High beams", "Low beams or fog lights", "No lights", "Hazard lights only"], answer: 1, explanation: "Low beams or fog lights are best in fog. High beams reflect back." },
  { id: 32, category: "Weather", question: "On icy roads, stopping distance can increase by:", options: ["2 times", "5 times", "10 times or more", "No change"], answer: 2, explanation: "Ice dramatically reduces traction. Stopping distance can increase 10x or more." },
  { id: 33, category: "Weather", question: "Roads are most slippery:", options: ["After an hour of rain", "During the first few minutes of rain", "Only in heavy downpours", "In light drizzle only"], answer: 1, explanation: "The first few minutes of rain mix with oil on the road creating very slippery conditions." },
  { id: 34, category: "Safety Equipment", question: "Seat belts reduce the risk of death by approximately:", options: ["20%", "35%", "45%", "60%"], answer: 2, explanation: "Seat belts reduce the risk of death in crashes by about 45%." },
  { id: 35, category: "Sharing the Road", question: "When passing a cyclist, you should give at least:", options: ["1 foot", "2 feet", "3 feet", "5 feet"], answer: 2, explanation: "Most states require at least 3 feet of clearance when passing a cyclist." },
];

const STATES = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming","Washington D.C."];

const CATEGORIES = ["All Topics", ...new Set(ALL_QUESTIONS.map(q => q.category))];

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Topics");
  const [numQuestions, setNumQuestions] = useState(20);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const startQuiz = () => {
    const pool = selectedCategory === "All Topics" ? ALL_QUESTIONS : ALL_QUESTIONS.filter(q => q.category === selectedCategory);
    const picked = shuffle(pool).slice(0, Math.min(numQuestions, pool.length));
    setQuestions(picked); setCurrent(0); setSelected(null); setAnswers([]); setShowExplanation(false); setScreen("quiz");
  };

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx); setShowExplanation(true);
    setAnswers(prev => [...prev, { question: questions[current], chosen: idx, correct: idx === questions[current].answer }]);
  };

  const nextQuestion = () => {
    if (current + 1 >= questions.length) { setScreen("results"); }
    else { setCurrent(c => c + 1); setSelected(null); setShowExplanation(false); }
  };

  const score = answers.filter(a => a.correct).length;
  const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  const categoryScores = () => {
    const map = {};
    answers.forEach(a => {
      const cat = a.question.category;
      if (!map[cat]) map[cat] = { correct: 0, total: 0 };
      map[cat].total++;
      if (a.correct) map[cat].correct++;
    });
    return map;
  };

  if (screen === "home") return (
    <div style={{ minHeight:"100vh", background:"#0d1117", color:"#e6edf3", fontFamily:"'Segoe UI',system-ui,sans-serif" }}>
      <div style={{ background:"linear-gradient(135deg,#1a2332,#0d1117)", padding:"40px 24px 32px", textAlign:"center", borderBottom:"1px solid #21262d" }}>
        <div style={{ fontSize:48, marginBottom:8 }}>🚗</div>
        <h1 style={{ fontSize:28, fontWeight:800, margin:"0 0 8px", color:"#ffffff" }}>DMV Ace</h1>
        <p style={{ fontSize:15, color:"#8b949e", margin:0 }}>Practice Test — All 50 States</p>
        <div style={{ display:"flex", justifyContent:"center", gap:12, marginTop:16, flexWrap:"wrap" }}>
          {["35 Questions","9 Topics","Explanations"].map(t => (
            <div key={t} style={{ background:"#161b22", border:"1px solid #21262d", borderRadius:20, padding:"4px 12px", fontSize:12, color:"#58a6ff" }}>{t}</div>
          ))}
        </div>
      </div>
      <div style={{ padding:"24px 20px", maxWidth:480, margin:"0 auto" }}>
        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:13, color:"#8b949e", display:"block", marginBottom:6, fontWeight:600 }}>SELECT YOUR STATE</label>
          <select value={selectedState} onChange={e => setSelectedState(e.target.value)} style={{ width:"100%", background:"#161b22", border:"1px solid #30363d", borderRadius:8, padding:"12px 14px", color:selectedState?"#e6edf3":"#6e7681", fontSize:15, outline:"none" }}>
            <option value="">Choose your state...</option>
            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:13, color:"#8b949e", display:"block", marginBottom:6, fontWeight:600 }}>TOPIC</label>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} style={{ width:"100%", background:"#161b22", border:"1px solid #30363d", borderRadius:8, padding:"12px 14px", color:"#e6edf3", fontSize:15, outline:"none" }}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ marginBottom:28 }}>
          <label style={{ fontSize:13, color:"#8b949e", display:"block", marginBottom:10, fontWeight:600 }}>QUESTIONS: <span style={{ color:"#58a6ff" }}>{numQuestions}</span></label>
          <div style={{ display:"flex", gap:8 }}>
            {[10,20,30,35].map(n => (
              <button key={n} onClick={() => setNumQuestions(n)} style={{ flex:1, padding:"10px 0", borderRadius:8, border:`1px solid ${numQuestions===n?"#58a6ff":"#30363d"}`, background:numQuestions===n?"#0d2244":"#161b22", color:numQuestions===n?"#58a6ff":"#8b949e", fontWeight:700, fontSize:15, cursor:"pointer" }}>{n}</button>
            ))}
          </div>
        </div>
        <button onClick={startQuiz} disabled={!selectedState} style={{ width:"100%", padding:"16px", borderRadius:10, border:"none", background:selectedState?"linear-gradient(135deg,#238636,#2ea043)":"#21262d", color:selectedState?"#ffffff":"#484f58", fontSize:17, fontWeight:700, cursor:selectedState?"pointer":"not-allowed" }}>
          {selectedState ? `Start Test — ${selectedState}` : "Select a state to begin"}
        </button>
        <p style={{ textAlign:"center", fontSize:12, color:"#484f58", marginTop:16 }}>Always verify specifics with your local DMV.</p>
      </div>
    </div>
  );

  if (screen === "quiz") {
    const q = questions[current];
    const progress = (current / questions.length) * 100;
    return (
      <div style={{ minHeight:"100vh", background:"#0d1117", color:"#e6edf3", fontFamily:"'Segoe UI',system-ui,sans-serif" }}>
        <div style={{ background:"#161b22", padding:"16px 20px", borderBottom:"1px solid #21262d", position:"sticky", top:0, zIndex:10 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
            <span style={{ fontSize:13, color:"#8b949e", fontWeight:600 }}>{q.category}</span>
            <span style={{ fontSize:13, color:"#8b949e" }}>{current+1} / {questions.length}</span>
          </div>
          <div style={{ height:4, background:"#21262d", borderRadius:4, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(90deg,#238636,#58a6ff)", borderRadius:4, transition:"width 0.4s ease" }} />
          </div>
        </div>
        <div style={{ padding:"24px 20px", maxWidth:520, margin:"0 auto" }}>
          <h2 style={{ fontSize:19, fontWeight:700, lineHeight:1.4, marginBottom:24 }}>{q.question}</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {q.options.map((opt, i) => {
              let bg="#161b22", border="#30363d", color="#e6edf3";
              if (selected !== null) {
                if (i === q.answer) { bg="#0d3321"; border="#238636"; color="#3fb950"; }
                else if (i === selected) { bg="#2d1517"; border="#f85149"; color="#f85149"; }
                else { color="#484f58"; }
              }
              return (
                <button key={i} onClick={() => handleAnswer(i)} style={{ padding:"14px 16px", borderRadius:10, border:`1px solid ${border}`, background:bg, color, fontSize:15, fontWeight:500, textAlign:"left", cursor:selected!==null?"default":"pointer", display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ width:28, height:28, borderRadius:"50%", border:`1px solid ${border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, flexShrink:0 }}>
                    {selected!==null?(i===q.answer?"✓":i===selected?"✗":String.fromCharCode(65+i)):String.fromCharCode(65+i)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
          {showExplanation && (
            <div style={{ marginTop:20, background:"#161b22", border:"1px solid #21262d", borderRadius:10, padding:16 }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#8b949e", marginBottom:6 }}>EXPLANATION</div>
              <p style={{ fontSize:14, color:"#c9d1d9", lineHeight:1.6, margin:0 }}>{q.explanation}</p>
            </div>
          )}
          {selected !== null && (
            <button onClick={nextQuestion} style={{ width:"100%", marginTop:20, padding:15, borderRadius:10, border:"none", background:"linear-gradient(135deg,#1f6feb,#388bfd)", color:"#ffffff", fontSize:16, fontWeight:700, cursor:"pointer" }}>
              {current+1 >= questions.length ? "See Results →" : "Next Question →"}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (screen === "results") {
    const cats = categoryScores();
    return (
      <div style={{ minHeight:"100vh", background:"#0d1117", color:"#e6edf3", fontFamily:"'Segoe UI',system-ui,sans-serif", padding:"24px 20px" }}>
        <div style={{ maxWidth:480, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{ fontSize:56, marginBottom:8 }}>{pct>=80?"🏆":pct>=70?"✅":"📚"}</div>
            <h2 style={{ fontSize:26, fontWeight:800, margin:"0 0 4px" }}>{pct}%</h2>
            <p style={{ color:pct>=70?"#3fb950":"#f85149", fontWeight:700, fontSize:16, margin:"0 0 4px" }}>{pct>=80?"Excellent!":pct>=70?"You Passed!":"Keep Studying"}</p>
            <p style={{ color:"#8b949e", fontSize:14, margin:0 }}>{score} correct out of {questions.length}</p>
          </div>
          <div style={{ background:"#161b22", border:"1px solid #21262d", borderRadius:12, padding:20, marginBottom:20 }}>
            <div style={{ height:8, background:"#21262d", borderRadius:8, overflow:"hidden", marginBottom:12 }}>
              <div style={{ height:"100%", width:`${pct}%`, background:pct>=70?"linear-gradient(90deg,#238636,#3fb950)":"linear-gradient(90deg,#f85149,#ff7b72)", borderRadius:8 }} />
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#484f58" }}>
              <span>0%</span><span style={{ color:"#8b949e", fontWeight:600 }}>Pass: 70%</span><span>100%</span>
            </div>
          </div>
          <div style={{ background:"#161b22", border:"1px solid #21262d", borderRadius:12, padding:20, marginBottom:20 }}>
            <div style={{ fontSize:13, fontWeight:700, color:"#8b949e", marginBottom:14 }}>TOPIC BREAKDOWN</div>
            {Object.entries(cats).map(([cat, data]) => {
              const p = Math.round((data.correct/data.total)*100);
              return (
                <div key={cat} style={{ marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:4 }}>
                    <span style={{ color:"#c9d1d9" }}>{cat}</span>
                    <span style={{ color:p>=70?"#3fb950":"#f85149", fontWeight:600 }}>{data.correct}/{data.total}</span>
                  </div>
                  <div style={{ height:4, background:"#21262d", borderRadius:4 }}>
                    <div style={{ height:"100%", width:`${p}%`, background:p>=70?"#238636":"#da3633", borderRadius:4 }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display:"flex", gap:12 }}>
            <button onClick={startQuiz} style={{ flex:1, padding:14, borderRadius:10, border:"none", background:"linear-gradient(135deg,#238636,#2ea043)", color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer" }}>Retake Test</button>
            <button onClick={() => setScreen("home")} style={{ flex:1, padding:14, borderRadius:10, border:"1px solid #30363d", background:"#161b22", color:"#e6edf3", fontSize:15, fontWeight:700, cursor:"pointer" }}>Home</button>
          </div>
          <p style={{ textAlign:"center", fontSize:12, color:"#484f58", marginTop:20 }}>Always verify your state's specific rules at your local DMV.</p>
        </div>
      </div>
    );
  }
}
