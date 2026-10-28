/* Tek Atış — saf oyun kuralları; dış bağımlılık yok. */
(function(root){'use strict';
class ShotGame{
 constructor(random=Math.random){this.random=random;this.reset();}
 reset(){this.time=0;this.roundTime=0;this.score=0;this.hits=0;this.perfects=0;this.alive=true;this.bullet=null;this.wait=0;this.events=[];this.newTarget(true);}
 newTarget(first=false){this.roundTime=0;this.target={x:220,y:first?130:120+Math.sin(this.hits*1.7)*26,radius:Math.max(14,26-this.hits*.65),amplitude:125+Math.min(20,this.hits*1.2),speed:1.25+Math.min(1.6,this.hits*.085),phase:first?-1.2:this.random()*Math.PI*2};this.moveTarget();}
 moveTarget(){const t=this.target;t.x=220+t.amplitude*Math.sin(t.phase+this.roundTime*t.speed);}
 fire(){if(!this.alive||this.bullet||this.wait>0)return false;this.bullet={x:220,y:355,speed:650};this.events.push({type:'fire'});return true;}
 update(dt){
  if(!this.alive||!Number.isFinite(dt)||dt<=0)return;
  let remaining=Math.min(dt,.1);
  while(remaining>1e-8&&this.alive){
   const step=Math.min(remaining,1/120);remaining-=step;this.time+=step;
   if(this.wait>0){this.wait=Math.max(0,this.wait-step);if(this.wait===0)this.newTarget();continue;}
   this.roundTime+=step;this.moveTarget();
   if(!this.bullet)continue;
   const b=this.bullet,t=this.target;b.y-=b.speed*step;
   if((b.x-t.x)**2+(b.y-t.y)**2<=(t.radius+3)**2){
    const perfect=Math.abs(b.x-t.x)<=t.radius*.28,gain=perfect?20:10;
    this.score+=gain;this.hits++;if(perfect)this.perfects++;
    this.events.push({type:'hit',perfect,gain,x:t.x,y:t.y});this.bullet=null;this.wait=.35;
   }else if(b.y<t.y-t.radius-4){this.alive=false;this.events.push({type:'miss',x:b.x,y:b.y,targetX:t.x,targetY:t.y});}
  }
 }
 drainEvents(){const events=this.events;this.events=[];return events;}
}
if(typeof module!=='undefined'&&module.exports)module.exports={ShotGame};else root.ShotCore={ShotGame};
})(typeof globalThis!=='undefined'?globalThis:this);
