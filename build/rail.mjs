import fs from 'fs';
import {createRequire} from 'module';
import {geoAzimuthalEqualArea} from 'd3-geo';
const require=createRequire(import.meta.url);
const {lines}=require('japan-train-data');
const proj=geoAzimuthalEqualArea().center([138.5,35.7]).rotate([-138.5,-35.7]).scale(1700).translate([2500,-1930]);
const seen=new Set();let d="",pts=0,n=0;
for(const l of lines){
  if(!/^JR/.test(l.name.ja))continue;
  if(/新幹線|モノレール|貨物/.test(l.name.ja))continue;
  const key=l.name.ja+l.stations.length+l.stations[0].id%1000;
  if(seen.has(key))continue;seen.add(key);
  const st=l.stations.filter(s=>s.location&&s.location.lat);
  if(st.length<8)continue;
  let last=null,seg="";
  st.forEach((s,i)=>{const [x,y]=proj([s.location.lng,s.location.lat]);
    if(last&&Math.hypot(x-last[0],y-last[1])<1.6&&i<st.length-1)return;
    seg+=(seg?"L":"M")+x.toFixed(1)+" "+y.toFixed(1);last=[x,y];pts++});
  d+=seg;n++;
}
fs.writeFileSync('rail.txt',d);
const S={
 tk:[[35.681,139.767],[35.507,139.617],[35.256,139.155],[35.104,139.078],[35.127,138.911],[34.972,138.389],[34.704,137.735],[34.763,137.382],[35.171,136.882],[35.316,136.703],[35.315,136.290],[34.986,135.759],[34.733,135.500],[34.708,135.196],[34.827,134.691],[34.666,133.918],[34.489,133.362],[34.397,132.475],[34.147,132.236],[34.052,131.806],[34.093,131.399],[33.886,130.882],[33.590,130.421],[33.372,130.508],[33.316,130.507],[32.790,130.689],[31.584,130.541]],
 th:[[35.681,139.767],[35.714,139.777],[35.906,139.624],[36.312,139.800],[36.559,139.898],[37.398,140.388],[37.754,140.459],[38.260,140.882],[38.934,141.126],[39.701,141.136],[40.512,141.488],[40.827,140.693],[41.905,140.649]],
 jo:[[35.906,139.624],[36.322,139.013],[36.759,138.987],[36.936,138.810],[37.447,138.854],[37.912,139.062]],
 hk:[[36.322,139.013],[36.343,138.634],[36.280,138.482],[36.396,138.255],[36.643,138.188],[36.855,138.368],[37.058,138.256],[37.043,137.862],[36.869,137.446],[36.701,137.213],[36.725,137.021],[36.578,136.648],[36.405,136.452],[36.299,136.337],[36.062,136.223],[35.649,136.062]],
 yg:[[37.754,140.459],[37.916,140.116],[38.248,140.327],[38.763,140.304]],
 ak:[[39.701,141.136],[39.700,140.724],[39.717,140.129]],
 nk:[[33.194,130.016],[32.752,129.869]]
};
let sd="";for(const k in S)sd+=S[k].map((p,i)=>{const [x,y]=proj([p[1],p[0]]);return(i?"L":"M")+x.toFixed(1)+" "+y.toFixed(1)}).join("");
fs.writeFileSync('shin.txt',sd);
console.log(n,'lines',pts,'pts',d.length,'bytes',sd.length);
