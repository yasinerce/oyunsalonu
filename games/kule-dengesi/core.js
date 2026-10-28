/* Kule Dengesi — saf oyun kuralları. Dış bağımlılık yok. */
(function(root){'use strict';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
class StackGame{
 constructor(){this.reset();}
 reset(){this.blocks=[{x:220,width:200,level:0}];this.score=0;this.streak=0;this.bestStreak=0;this.perfects=0;this.alive=true;this.time=0;this.wait=0;this.events=[];this.spawn();}
 get speed(){return 105+Math.min(165,this.score*6);}
 spawn(){const last=this.blocks[this.blocks.length-1],right=this.score%2===1;this.moving={x:right?418-last.width/2:22+last.width/2,width:last.width,level:this.score+1,direction:right?-1:1};}
 update(dt){
  if(!this.alive||!Number.isFinite(dt)||dt<=0)return;
  dt=Math.min(dt,.1);this.time+=dt;
  if(this.wait>0){this.wait=Math.max(0,this.wait-dt);if(this.wait===0)this.spawn();return;}
  const m=this.moving,lo=22+m.width/2,hi=418-m.width/2;m.x+=this.speed*m.direction*dt;
  while(m.x<lo||m.x>hi){if(m.x>hi){m.x=hi-(m.x-hi);m.direction=-1;}else{m.x=lo+(lo-m.x);m.direction=1;}}
 }
 place(){
  if(!this.alive||this.wait>0)return false;
  const moving=this.moving,below=this.blocks[this.blocks.length-1],offset=moving.x-below.x;
  const epsilon=Math.min(4,below.width*.12);
  const perfect=Math.abs(offset)<=epsilon;
  const left=Math.max(moving.x-moving.width/2,below.x-below.width/2),right=Math.min(moving.x+moving.width/2,below.x+below.width/2);
  if(!perfect&&right-left<=0){this.alive=false;this.events.push({type:'death',block:{...moving}});return true;}
  let width=perfect?below.width:right-left,x=perfect?below.x:(left+right)/2;
  if(perfect){this.streak++;this.perfects++;this.bestStreak=Math.max(this.bestStreak,this.streak);}else this.streak=0;
  const cut=Math.max(0,moving.width-width);
  if(cut>.01){const side=offset>0?1:-1;this.events.push({type:'cut',x:side>0?right+cut/2:left-cut/2,width:cut,level:moving.level,side});}
  let restored=0;
  if(perfect&&this.streak%3===0){const max=Math.min(200,2*Math.min(x-22,418-x));const expanded=Math.min(max,width+12);restored=Math.max(0,expanded-width);width+=restored;}
  this.score++;this.blocks.push({x,width,level:this.score});this.wait=.24;
  this.events.push({type:'place',perfect,restored,x,width,level:this.score});return true;
 }
 drainEvents(){const events=this.events;this.events=[];return events;}
}
const API={StackGame,clamp};if(typeof module!=='undefined'&&module.exports)module.exports=API;else root.StackCore=API;
})(typeof globalThis!=='undefined'?globalThis:this);
