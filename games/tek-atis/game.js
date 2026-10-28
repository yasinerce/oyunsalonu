(()=>{'use strict';
const {ShotGame}=ShotCore,$=id=>document.getElementById(id),canvas=$('game'),ctx=canvas.getContext('2d'),game=new ShotGame(),overlay=$('overlay');
const theme=window.SalonTheme,memory={};
const store={get(k){try{return localStorage.getItem('tekatis.'+k)??memory[k]??null;}catch{return memory[k]??null;}},set(k,v){memory[k]=String(v);try{localStorage.setItem('tekatis.'+k,String(v));}catch{}}};
let best=Math.max(0,Number(store.get('best'))||0),sound=store.get('sound')!=='0',state='menu',runBest=best,last=performance.now(),clock=0,sparks=[],audio=null,flash=0,msgUntil=0,deathAt=0,targetTrail=[];
$('best').textContent=best;
function cue(freq,duration=.08,volume=.035){if(!sound)return;try{if(!audio)audio=new(window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')audio.resume();const o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.setValueAtTime(freq,audio.currentTime);g.gain.setValueAtTime(volume,audio.currentTime);g.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+duration);o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+duration);}catch{}}
function soundUi(){$('sound').classList.toggle('off',!sound);$('sound').setAttribute('aria-label',sound?'Sesi kapat':'Sesi aç');$('sound').setAttribute('aria-pressed',String(sound));}
$('sound').onclick=()=>{sound=!sound;store.set('sound',sound?'1':'0');soundUi();};soundUi();
function message(text){$('message').textContent=text;msgUntil=clock+1.7;}
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if($('app').requestFullscreen)await $('app').requestFullscreen();else message('Tam ekran desteklenmiyor.');}catch{message('Tam ekran açılamadı.');}};
function hud(){$('score').textContent=game.score;$('best').textContent=best;$('multiplier').textContent=game.hits+' İSABET';}
function show(kind){overlay.hidden=false;$('legend').hidden=true;$('result').hidden=kind!=='over';
 if(kind==='pause'){$('eyebrow').textContent='HEDEF SENİ BEKLER';$('title').innerHTML='DURAKLADI';$('description').textContent='Hazır olduğunda devam et.';$('play').innerHTML='DEVAM ET <span>↑</span>';}
 else{$('eyebrow').textContent=game.score>runBest?'YENİ REKOR':'BİR ATIŞ DAHA?';$('title').textContent=String(game.score);$('description').textContent='Iskaladın. Mermi ulaşırken hedef hareket etmeye devam eder.';$('play').innerHTML='YENİDEN OYNA <span>↑</span>';$('result').replaceChildren();for(const [v,l] of [[game.hits,'isabet'],[game.perfects,'merkezden'],[game.time.toFixed(1)+' sn','süre']]){const d=document.createElement('div'),n=document.createElement('strong'),t=document.createElement('span');n.textContent=v;t.textContent=l;d.append(n,t);$('result').append(d);}}
 $('play').focus({preventScroll:true});}
function start(){game.reset();game.drainEvents();state='playing';runBest=best;sparks=[];targetTrail=[];flash=0;overlay.hidden=true;last=performance.now();$('pause').textContent='Ⅱ';hud();message('Hedef hareket ederken mermi de yol alır.');cue(420);}
function pause(){if(state==='playing'){state='paused';show('pause');$('pause').textContent='▶';}else if(state==='paused'){state='playing';overlay.hidden=true;last=performance.now();$('pause').textContent='Ⅱ';}}
$('play').onclick=()=>state==='paused'?pause():start();$('pause').onclick=pause;
function place(){if(state==='playing')game.fire();}
canvas.addEventListener('pointerdown',e=>{if(e.isPrimary===false||(e.pointerType==='mouse'&&e.button!==0))return;e.preventDefault();place();});
addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();if(e.repeat)return;if(state==='playing')place();else if(state==='paused')pause();else if(state==='menu'||state==='over')start();}if((e.code==='Escape'||e.code==='KeyP')&&!e.repeat)pause();});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&state==='playing')pause();});addEventListener('blur',()=>{if(state==='playing')pause();});
function resize(){const size=canvas.getBoundingClientRect().width,dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(size*dpr);canvas.height=Math.round(size*dpr);}addEventListener('resize',resize);resize();
function draw(){
 ctx.setTransform(canvas.width/440,0,0,canvas.height/440,0,0);ctx.clearRect(0,0,440,440);
 const glow=ctx.createRadialGradient(220,200,10,220,200,240);glow.addColorStop(0,theme.glow);glow.addColorStop(1,theme.bg+'00');ctx.fillStyle=glow;ctx.fillRect(0,0,440,440);
 ctx.save();ctx.strokeStyle=theme.accent+'19';ctx.lineWidth=1;ctx.setLineDash([2,7]);ctx.beginPath();ctx.moveTo(220,55);ctx.lineTo(220,345);ctx.stroke();ctx.restore();
 const t=game.target;
 ctx.strokeStyle=theme.line+'55';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(50,t.y);ctx.lineTo(390,t.y);ctx.stroke();
 for(const x of [50,390]){ctx.beginPath();ctx.moveTo(x,t.y-8);ctx.lineTo(x,t.y+8);ctx.stroke();}
 if(game.wait===0){
  if(!theme.reducedMotion)for(let i=0;i<targetTrail.length;i++){ctx.globalAlpha=i/targetTrail.length*.15;ctx.strokeStyle=theme.accent;ctx.beginPath();ctx.arc(targetTrail[i].x,targetTrail[i].y,t.radius,0,Math.PI*2);ctx.stroke();}ctx.globalAlpha=1;
  ctx.fillStyle=game.alive?theme.surface:'#413329';ctx.strokeStyle=game.alive?theme.accent:theme.warm;ctx.lineWidth=3;
  ctx.beginPath();ctx.arc(t.x,t.y,t.radius,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.strokeStyle=theme.accent+'55';ctx.lineWidth=1;ctx.beginPath();ctx.arc(t.x,t.y,t.radius*.67,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle=theme.warm;ctx.beginPath();ctx.arc(t.x,t.y,t.radius*.28,0,Math.PI*2);ctx.fill();
 }
 if(game.bullet){const b=game.bullet;ctx.strokeStyle=theme.text;ctx.lineWidth=4;ctx.lineCap='round';ctx.shadowBlur=theme.reducedMotion?0:12;ctx.shadowColor=theme.accent;ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.lineTo(b.x,b.y+15);ctx.stroke();ctx.shadowBlur=0;}
 // Sabit namlu. Doluyken parlak, mermi yoldayken sönük.
 const ready=game.alive&&!game.bullet&&game.wait===0;
 ctx.fillStyle=theme.surface;ctx.beginPath();ctx.arc(220,374,28,Math.PI,0);ctx.fill();
 ctx.fillStyle=ready?theme.accent:theme.line;ctx.fillRect(213,349,14,28);ctx.fillStyle=theme.text;ctx.fillRect(217,349,6,5);
 ctx.strokeStyle=theme.accent;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(190,380);ctx.lineTo(250,380);ctx.stroke();
 ctx.textAlign='center';ctx.fillStyle=theme.muted;ctx.font='10px Arial, Helvetica, sans-serif';ctx.fillText(state==='playing'?(ready?'DOKUN · ATEŞ ET':game.wait>0?'YENİ HEDEF':'MERMİ YOLDA'):'TEK ATIŞ',220,414);
 for(const p of sparks){ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,3,3);}ctx.globalAlpha=1;
 if(flash>0&&!theme.reducedMotion){ctx.fillStyle='rgba(154,230,173,'+flash*.12+')';ctx.fillRect(0,0,440,440);}
}
function frame(now){const dt=Math.min(.05,Math.max(0,(now-last)/1000));last=now;if(state!=='paused')clock+=dt;
 if(state==='playing'){
  game.update(dt);if(game.wait===0){targetTrail.push({x:game.target.x,y:game.target.y});if(targetTrail.length>12)targetTrail.shift();}else targetTrail=[];
  for(const e of game.drainEvents()){
   if(e.type==='fire')cue(190,.08,.055);
   if(e.type==='hit'){
    if(game.score>best){best=game.score;store.set('best',best);}hud();flash=1;cue(e.perfect?950:600,.13);message(e.perfect?'MERKEZDEN! +20':'İSABET +10');
    if(!theme.reducedMotion)for(let i=0;i<18;i++){const a=Math.random()*Math.PI*2,v=35+Math.random()*80;sparks.push({x:e.x,y:e.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:1,color:e.perfect?theme.warm:theme.accent});}
   }
   if(e.type==='miss'){state='dying';deathAt=clock;cue(120,.3,.06);message('ISKALADIN');if(navigator.vibrate)try{navigator.vibrate(40);}catch{}}
  }
 }
 if(state==='dying'&&clock-deathAt>.4){state='over';show('over');}
 if(state!=='paused'){for(const p of sparks){p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt*1.5;}sparks=sparks.filter(p=>p.life>0);flash=Math.max(0,flash-dt*3);}
 $('message').style.opacity=clock<msgUntil&&(state==='playing'||state==='dying')?'1':'0';draw();requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
})();
