import React from 'react';
import trophyImage from '../assets/trophy-results.png';

export default function TrophyResults({ player, score, onHome, onReplay }) {
  const ranking = [
    { name: player || 'Jugador', points: score, simulated: false },
    { name: 'Carlos', points: 80, simulated: true },
    { name: 'Lucía', points: 70, simulated: true },
    { name: 'Andrés', points: 60, simulated: true },
  ].sort((a, b) => b.points - a.points);

  const winner = ranking[0];

  return (
    <section className="panel results-panel">
      <div className="eyebrow">PARTIDA FINALIZADA</div>
      <h2>¡Tenemos un ganador!</h2>

      <img
        className="trophy-art"
        src={trophyImage}
        alt="Copa de campeón de Desafío Mental"
      />

      <div className="winner-card">
        <span>🏆</span>
        <div>
          <small>CAMPEÓN DE LA PARTIDA</small>
          <h2>{winner.name}</h2>
          <b>{winner.points} puntos</b>
        </div>
      </div>

      <h3>Clasificación final</h3>

      <div className="ranking">
        {ranking.map((p, i) => (
          <div className={`rank-row rank-${i + 1}`} key={p.name}>
            <b>{i + 1}.</b>
            <span>{p.name}</span>
            {p.simulated && <small className="demo-label"> DEMO</small>}
            <strong>{p.points} puntos</strong>
          </div>
        ))}
      </div>

      <div className="action-row">
        <button className="secondary" onClick={onHome}>
          ⌂ Volver al inicio
        </button>
        <button className="primary" onClick={onReplay}>
          Nueva partida
        </button>
      </div>

      <p className="notice">
        Clasificación local de demostración.
      </p>
    </section>
  );
}
