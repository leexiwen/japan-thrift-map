import fs from 'fs';
import {geoAzimuthalEqualArea} from 'd3-geo';
const proj=geoAzimuthalEqualArea().center([138.5,35.7]).rotate([-138.5,-35.7]).scale(1700).translate([2500,-1930]);
const lines=fs.readFileSync('data.txt','utf8').trim().split('\n').map(l=>{
  const p=l.split('|'); const [x,y]=proj([+p[5],+p[4]]);
  return [...p, x.toFixed(1), y.toFixed(1)].join('|');
});
const s2=fs.readFileSync('s2.txt','utf8').trim().split('\n').map(l=>{const p=l.split('|');const [x,y]=proj([+p[9],+p[8]]);return [...p,x.toFixed(1),y.toFixed(1)].join('|')});
let t=fs.readFileSync('template.html','utf8');t=t.replace('__S2__',()=>s2.join('\n'));
const land=fs.readFileSync('land.txt','utf8'), bor=fs.readFileSync('borders.txt','utf8');
t=t.replace('__DATA__',()=>lines.join('\n')).replace('__LAND__',()=>land).replace('__BORDERS__',()=>bor).replace('__EXTRA__',()=>fs.readFileSync('extra.txt','utf8').trim()).replace('__EXTRA2__',()=>fs.readFileSync('extra2.txt','utf8').trim()).replace('__RAIL__',()=>fs.readFileSync('rail.txt','utf8')).replace('__SHIN__',()=>fs.readFileSync('shin.txt','utf8')).replace('__CITYR__',()=>fs.readFileSync('cityr.txt','utf8').trim());
fs.mkdirSync('out',{recursive:true}); fs.writeFileSync('out/index.html',t);
console.log(t.length, lines[0], lines[300]);
