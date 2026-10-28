/* Yörünge v0.1 — bağımlılıksız oyun mantığı; tarayıcı ve Node'da ortak. */
(function(root){
'use strict';
const TAU=Math.PI*2;
const wrap=a=>((a%TAU)+TAU)%TAU;
const distance=(a,b)=>Math.abs(Math.atan2(Math.sin(a-b),Math.cos(a-b)));
class OrbitGame{
 constructor(random=Math.random){this.random=random;this.reset();}
 reset(){this.angle=-Math.PI/2;this.direction=1;this.time=0;this.score=0;this.collected=0;this.alive=true;this.hazards=[];this.nextHazard=2.8;this.events=[];this.nextId=1;this.target=wrap(this.angle+1.65);}
 get speed(){return 1.05+Math.min(.85,this.time*.012);}
 get multiplier(){return Math.min(3,1+Math.floor(this.collected/5));}
 reverse(){if(this.alive){this.direction*=-1;this.events.push({type:'reverse'});}}
 safeTarget(){
  for(let i=0;i<60;i++){
   const a=this.random()*TAU;
   if(distance(a,this.angle)<.8)continue;
   if(this.hazards.some(h=>distance(a,h.angle)<h.width+.45))continue;
   return a;
  }
  // Adaylar tükenirse en güvenli boş noktayı bul; tehlikenin üstüne koyma.
  let best=0,clearance=-Infinity;
  for(let i=0;i<72;i++){
   const a=i*TAU/72;
   const d=Math.min(distance(a,this.angle)-.8,...this.hazards.map(h=>distance(a,h.angle)-h.width-.45));
   if(d>clearance){clearance=d;best=a;}
  }
  return best;
 }
 spawnHazard(){
  const max= Math.min(4,1+Math.floor(this.time/18));
  if(this.hazards.length>=max)return;
  for(let i=0;i<40;i++){
   const a=this.random()*TAU;
   if(distance(a,this.angle)<.95||distance(a,this.target)<.42)continue;
   if(this.hazards.some(h=>distance(a,h.angle)<.65))continue;
   this.hazards.push({id:this.nextId++,angle:a,width:.12+Math.min(.12,this.time*.0015),velocity:(this.random()<.5?-1:1)*(.13+this.random()*.12),age:0,warning:1.15,life:4.4});
   this.events.push({type:'warning'});return;
  }
 }
 update(dt){
  if(!this.alive||!Number.isFinite(dt)||dt<=0)return;
  // Alt adımlar hızlı karelerde de yayların içinden geçmeyi önler.
  let remaining=Math.min(dt,.1);
  while(remaining>1e-8&&this.alive){
   const step=Math.min(remaining,1/120);remaining-=step;this.time+=step;
   this.angle=wrap(this.angle+this.direction*this.speed*step);
   for(const h of this.hazards){h.age+=step;h.angle=wrap(h.angle+h.velocity*step);}
   this.hazards=this.hazards.filter(h=>h.age<h.life);
   if(this.time>=this.nextHazard){this.spawnHazard();this.nextHazard=this.time+Math.max(1.65,3.5-this.time*.022);}
   if(this.hazards.some(h=>h.age>=h.warning&&distance(this.angle,h.angle)<h.width+.052)){
    this.alive=false;this.events.push({type:'death'});break;
   }
   if(distance(this.angle,this.target)<.09){
    const gain=10*this.multiplier;this.score+=gain;this.collected++;
    this.events.push({type:'collect',gain,angle:this.target});this.target=this.safeTarget();
   }
  }
 }
 drainEvents(){const events=this.events;this.events=[];return events;}
}
const API={OrbitGame,wrap,distance,TAU};
if(typeof module!=='undefined'&&module.exports)module.exports=API;else root.OrbitCore=API;
})(typeof globalThis!=='undefined'?globalThis:this);
