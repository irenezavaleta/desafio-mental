import React, { useState, useEffect } from 'react'; 
import TrophyResults from './components/TrophyResults.jsx';

const questions = [
  { category: 'TECNOLOGÍA', question: '¿Qué lenguaje se utiliza principalmente para estructurar páginas web?', options: ['Python', 'HTML', 'SQL', 'Java'], correct: 1 },
  { category: 'LÓGICA', question: '¿Qué número continúa la secuencia: 2, 4, 8, 16...?', options: ['20', '24', '32', '36'], correct: 2 },
  { category: 'FINANZAS', question: '¿Qué significa diversificar una inversión?', options: ['Invertir todo en una empresa', 'Repartir el dinero en distintos activos', 'Retirar todos los beneficios', 'No asumir ningún riesgo'], correct: 1 },
  { category: 'CULTURA GENERAL', question: '¿Cuál es el océano más grande del planeta?', options: ['Atlántico', 'Índico', 'Ártico', 'Pacífico'], correct: 3 },
  { category: 'TECNOLOGÍA', question: '¿Qué significan las siglas CPU?', options: ['Central Processing Unit', 'Computer Personal Utility', 'Core Program Upload', 'Central Power User'], correct: 0 },
  { category: 'FINANZAS', question: '¿Qué es la inflación?', options: ['La bajada general de precios', 'El aumento general de precios', 'Un tipo de impuesto', 'Un producto bancario'], correct: 1 },
  { category: 'LÓGICA', question: 'Si todos los Bloops son Razzies y todos los Razzies son Lazzies, ¿todos los Bloops son Lazzies?', options: ['Sí', 'No', 'Solo algunos', 'No se puede saber'], correct: 0 },
  { category: 'CULTURA GENERAL', question: '¿En qué continente se encuentra Perú?', options: ['Europa', 'Asia', 'América del Sur', 'África'], correct: 2 },
  { category: 'TECNOLOGÍA', question: '¿Cuál de estos es un sistema de gestión de bases de datos?', options: ['MySQL', 'Photoshop', 'PowerPoint', 'Figma'], correct: 0 },
  { category: 'CULTURA GENERAL', question: '¿Cuántos lados tiene un hexágono?', options: ['Cinco', 'Seis', 'Siete', 'Ocho'], correct: 1 },
];

export default function App() {
  const [screen, setScreen] = useState('home');
  const [player, setPlayer] = useState('Irene');
  const [roomCode, setRoomCode] = useState('');
  const [createdCode, setCreatedCode] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [players] = useState(['Irene', 'Carlos', 'Lucía']);
  
  const current = questions[questionIndex];
  useEffect(() => {
  if (screen !== 'game' || selected !== null) return;

  if (timeLeft === 0) {
    nextQuestion();
    return;
  }

  const timer = setTimeout(() => {
    setTimeLeft(t => t - 1);
  }, 1000);

  return () => clearTimeout(timer);
}, [screen, selected, timeLeft, questionIndex]);
  

  function createRoom() {
    setCreatedCode(Math.random().toString(36).slice(2, 8).toUpperCase());
    setScreen('lobby');
  }
  function joinRoom() {
    if (!roomCode.trim()) return;
    setCreatedCode(roomCode.trim().toUpperCase());
    setScreen('lobby');
  }
  function startGame() {
  setQuestionIndex(0);
  setSelected(null);
  setScore(0);
  setTimeLeft(20);
  setScreen('game');
}
  function answer(index) {
    if (selected !== null) return;
    setSelected(index);
    if (index === current.correct) setScore(s => s + 10);
  }
  function nextQuestion() {
  if (questionIndex === 9) {
    setScreen('results');
  } else {
    setQuestionIndex(i => i + 1);
    setSelected(null);
    setTimeLeft(20);
  }
}

  return <main className="app-shell">
    <header className="topbar"><div className="brand"><span className="brand-icon">✦</span><span>DESAFÍO<br/>MENTAL</span></div><span className="top-tag">RETO MULTIJUGADOR</span></header>
    {screen === 'home' && <section className="panel hero">
      <div className="eyebrow">PIENSA RÁPIDO · JUEGA INTELIGENTE</div><h1>¿ESTÁS LISTO PARA<br/><em>EL DESAFÍO?</em></h1><p>Demuestra tus conocimientos, reta a tus amigos y conquista la clasificación.</p>
      <div className="category-grid">{[['⌘','Tecnología'],['◇','Lógica'],['€','Finanzas'],['◎','Cultura general']].map(([icon,name])=><div className="category" key={name}><b>{icon}</b>{name}</div>)}</div>
      <label className="field-label" htmlFor="player">Tu nombre de jugador</label><input id="player" value={player} onChange={e=>setPlayer(e.target.value)} placeholder="Escribe tu nombre" />
      <div className="action-row"><button className="primary" onClick={createRoom} disabled={!player.trim()}>＋ Crear una sala</button><button className="secondary" onClick={()=>setScreen('join')}>Unirme a una sala</button></div>
      <div className="features"><span>⚡ 10 preguntas</span><span>◷ 20 segundos</span><span>🏆 10 puntos</span></div>
    </section>}
    {screen === 'join' && <section className="panel narrow"><div className="eyebrow">ENTRA EN LA COMPETICIÓN</div><h2>Unirse a una sala</h2><p>Introduce el código que te ha compartido el anfitrión.</p><label className="field-label" htmlFor="code">Código de sala</label><input id="code" value={roomCode} onChange={e=>setRoomCode(e.target.value)} placeholder="Ej. A7K9PQ" maxLength={8}/><button className="primary full" onClick={joinRoom} disabled={!roomCode.trim()}>Entrar a la sala</button><button className="text-button" onClick={()=>setScreen('home')}>← Volver al inicio</button></section>}
    {screen === 'lobby' && <section className="panel narrow"><div className="eyebrow">SALA DE ESPERA</div><h2>¡Que comience el desafío!</h2><p>Comparte este código con las personas que quieras invitar.</p><div className="room-code">{createdCode}<button onClick={()=>navigator.clipboard?.writeText(createdCode)}>Copiar</button></div><h3>Jugadores en la sala <span className="muted">(vista de demostración)</span></h3><div className="player-list">{players.map((p,i)=><div className="player-row" key={p}><span className="avatar">{p[0]}</span><b>{p}{i===0?' (anfitrión)':''}</b><span className="ready">Preparado</span></div>)}</div><p className="notice">Los jugadores mostrados son de ejemplo. La conexión entre dispositivos se añadirá en la etapa multijugador.</p><button className="primary full" onClick={startGame}>Iniciar demostración</button><button className="text-button" onClick={()=>setScreen('home')}>Salir de la sala</button></section>}
    {screen === 'game' && <section className="panel game-panel"><div className="game-meta"><span className="pill">{current.category}</span><b>Pregunta {questionIndex+1} / 10</b></div><div className="timer"><span>TIEMPO LÍMITE</span><strong>{timeLeft} s</strong></div><div className="progress"><span style={{width:`${(questionIndex+1)*10}%`}}/></div><h2>{current.question}</h2><div className="answers">{current.options.map((option,i)=><button key={option} className={`answer ${selected===i?'selected':''} ${selected!==null&&i===current.correct?'correct':''}`} disabled={selected!==null} onClick={()=>answer(i)}><span>{String.fromCharCode(65+i)}</span>{option}</button>)}</div>{selected!==null&&<div className="feedback">{selected===current.correct?'¡Respuesta correcta! +10 puntos':'Respuesta incorrecta. ¡A por la siguiente!'}</div>}<div className="game-footer"><span>Tu puntuación: <b>{score}</b></span>{selected!==null&&<button className="primary" onClick={nextQuestion}>{questionIndex===9?'Ver clasificación':'Siguiente pregunta →'}</button>}</div></section>}
    {screen === 'results' && <TrophyResults player={player} score={score} onHome={()=>setScreen('home')} onReplay={startGame}/>}
    <footer>DESAFÍO MENTAL <span>·</span> PROTOTIPO 0.1</footer>
  </main>;
}
