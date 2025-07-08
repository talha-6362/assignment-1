'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Skill {
  name: string;
  proficiency: number;
}

const skills: Skill[] = [
  { name: 'JavaScript', proficiency: 90 },
  { name: 'Python', proficiency: 80 },
  { name: 'TypeScript', proficiency: 85 },
  { name: 'C++', proficiency: 75 },
  { name: 'MERN Stack', proficiency: 90 },
  { name: 'UI Design', proficiency: 85 },
  { name: 'Networking', proficiency: 70 },
  { name: 'APIs', proficiency: 80 },
  { name: 'Version Control', proficiency: 85 },
  { name: 'Authentication', proficiency: 75 },
  { name: 'Framer Motion', proficiency: 80 },
  { name: 'Deployment', proficiency: 85 },
];

export default function RotatingPieChart() {
  const [isPaused, setIsPaused] = useState(false);

  const total = skills.reduce((sum, s) => sum + s.proficiency, 0);
  const radius = 100;
  const center = 150;

  let cumulativePercent = 0;

  function getCoordinatesForPercent(percent: number) {
    const x = center + radius * Math.cos(2 * Math.PI * percent - Math.PI / 2);
    const y = center + radius * Math.sin(2 * Math.PI * percent - Math.PI / 2);
    return [x, y];
  }

  const slices = skills.map((skill, i) => {
    const percent = skill.proficiency / total;
    const start = cumulativePercent;
    cumulativePercent += percent;

    const [startX, startY] = getCoordinatesForPercent(start);
    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
    const largeArcFlag = percent > 0.5 ? 1 : 0;

    const pathData = `
      M ${center} ${center}
      L ${startX} ${startY}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
      Z
    `;

    const colors = [
      '#6366f1', '#ec4899', '#8b5cf6', '#f87171', '#facc15',
      '#60a5fa', '#eab308', '#f97316', '#9ca3af', '#10b981', '#3b82f6', '#d946ef'
    ];

    return (
      <path
        key={i}
        d={pathData}
        fill={colors[i % colors.length]}
        stroke="#fff"
        strokeWidth={1}
      />
    );
  });

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 bg-[#0f172a] p-6 rounded-xl text-white">
      <motion.svg
        width={300}
        height={300}
        viewBox="0 0 300 300"
        className="shadow-lg rounded-full"
        animate={isPaused ? {} : { rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slices}
      </motion.svg>

      <div className="bg-white/10 p-4 rounded-lg backdrop-blur-md">
        <h2 className="text-lg font-bold mb-2 text-center">Skill Proficiency</h2>
        <ul className="text-sm space-y-1">
          {skills.map((skill, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: `hsl(${(i * 30) % 360}, 70%, 60%)` }} />
              <span>{skill.name} — <strong>{skill.proficiency}%</strong></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
