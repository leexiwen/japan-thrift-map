import fs from 'fs';
import * as topo from 'topojson-client';
import {presimplify,simplify,quantile} from 'topojson-simplify';
import {geoPath,geoAzimuthalEqualArea} from 'd3-geo';
let t=JSON.parse(fs.readFileSync('node_modules/jpn-atlas/japan/japan.json'));
const proj=geoAzimuthalEqualArea().center([138.5,35.7]).rotate([-138.5,-35.7]).scale(1700).translate([2500,-1930]);
// validate
const F=topo.feature(t,t.objects.prefectures).features;
const gp=geoPath();
for(const [id,ll,n] of [['13',[139.69,35.69],'Tokyo'],['27',[135.52,34.69],'Osaka'],['02',[140.74,40.82],'Aomori'],['35',[131.47,34.19],'Yamaguchi']]){
  const f=F.find(x=>x.id===id);console.log(n,'centroid',gp.centroid(f).map(v=>+v.toFixed(1)),'proj',proj(ll).map(v=>+v.toFixed(1)));
}
t=presimplify(t);
const mw=0.25;
t=simplify(t,mw);
const sel=t.objects.prefectures.geometries;
const obj={type:'GeometryCollection',geometries:sel};
const land=topo.merge(t,sel);
const borders=topo.mesh(t,obj,(a,b)=>a!==b);
const p=geoPath().digits?geoPath().digits(1):geoPath();
const landD=p(land),borD=p(borders);
console.log('land',landD.length,'borders',borD.length);
fs.writeFileSync('land.txt',landD);fs.writeFileSync('borders.txt',borD);
