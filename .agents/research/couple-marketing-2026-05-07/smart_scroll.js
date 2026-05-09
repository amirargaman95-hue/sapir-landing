const points = [
  { y: 0,     hold: 3.0 },   // hero
  { y: 1480,  hold: 2.5 },   // industries
  { y: 3100,  hold: 2.5 },   // pain
  { y: 5400,  hold: 2.5 },   // videos
  { y: 7700,  hold: 2.5 },   // process
  { y: 9900,  hold: 2.5 },   // about + trust
  { y: 12344, hold: 2.5 },   // faq + cta + footer
];
const trans = 1.4;
let t = 0;
const segs = [];
for (let i = 0; i < points.length; i++) {
  const p = points[i];
  segs.push({ start: t, end: t + p.hold, fromY: p.y, toY: p.y });
  t += p.hold;
  if (i < points.length - 1) {
    const next = points[i+1];
    segs.push({ start: t, end: t + trans, fromY: p.y, toY: next.y });
    t += trans;
  }
}
const total = t;
// Build piecewise-linear expression for ffmpeg crop y(t)
// expression: between(t,a,b) * (fromY + (toY-fromY)*(t-a)/(b-a)) summed
const exprParts = segs.map(s => `between(t\\,${s.start.toFixed(2)}\\,${s.end.toFixed(2)})*(${s.fromY}+(${s.toY}-${s.fromY})*((t-${s.start.toFixed(2)})/(${(s.end-s.start).toFixed(2)})))`);
const fullExpr = exprParts.join('+');
console.log('TOTAL:', total.toFixed(2));
console.log(fullExpr);
