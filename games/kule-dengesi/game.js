(()=>{'use strict';
const {StackGame}=StackCore,$=id=>document.getElementById(id),canvas=$('game'),ctx=canvas.getContext('2d'),game=new StackGame(),overlay=$('overlay');
const theme=window.SalonTheme,memory={};
const store={get(k){try{return localStorage.getItem('kule.'+k)??memory[k]??null;}catch{return memory[k]??null;}},set(k,v){memory[k]=String(v);try{localStorage.setItem('kule.'+k,String(v));}catch{}}};
let best=Math.max(0,Number(store.get('best'))||0),sound=store.get('sound')!=='0',state='menu',runBest=best,last=performance.now(),clock=0,camera=0,falling=[],sparks=[],audio=null,flash=0,msgUntil=0,deathAt=0;
const H=24,BASE=378;
$('best').textContent=best;
function cue(freq,duration=.08,volume=.035){if(!sound)return;try{if(!audio)audio=new(window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')audio.resume();const o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.setValueAtTime(freq,audio.currentTime);g.gain.setValueAtTime(volume,audio.currentTime);g.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+duration);o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+duration);}catch{}}
function soundUi(){$('sound').classList.toggle('off',!sound);$('sound').setAttribute('aria-label',sound?'Sesi kapat':'Sesi aç');$('sound').setAttribute('aria-pressed',String(sound));}
$('sound').onclick=()=>{sound=!sound;store.set('sound',sound?'1':'0');soundUi();};soundUi();
function message(text){$('message').textContent=text;msgUntil=clock+1.7;}
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if($('app').requestFullscreen)await $('app').requestFullscreen();else message('Tam ekran desteklenmiyor.');}catch{message('Tam ekran açılamadı.');}};
function hud(){$('score').textContent=game.score;$('best').textContent=best;$('multiplier').textContent=game.streak+' SERİ';}
function show(kind){overlay.hidden=false;$('legend').hidden=true;$('result').hidden=kind!=='over';
 if(kind==='pause'){$('eyebrow').textContent='KULE SENİ BEKLER';$('title').innerHTML='DURAKLADI';$('description').textContent='Hazır olduğunda devam et.';$('play').innerHTML='DEVAM ET <span>↑</span>';}
 else{$('eyebrow').textContent=game.score>runBest?'YENİ REKOR':'BİR KAT DAHA?';$('title').textContent=game.score+' KAT';$('description').textContent='Blok alttakiyle örtüşmedi. Bir sonraki kule daha yüksek olabilir.';$('play').innerHTML='YENİDEN OYNA <span>↑</span>';$('result').replaceChildren();for(const [v,l] of [[game.perfects,'kusursuz'],[game.bestStreak,'en iyi seri'],[game.time.toFixed(1)+' sn','süre']]){const d=document.createElement('div'),n=document.createElement('strong'),t=document.createElement('span');n.textContent=v;t.textContent=l;d.append(n,t);$('result').append(d);}}
 $('play').focus({preventScroll:true});}
function start(){game.reset();game.drainEvents();state='playing';runBest=best;falling=[];sparks=[];camera=0;flash=0;overlay.hidden=true;last=performance.now();$('pause').textContent='Ⅱ';hud();message('Hizala · Dokun · Yüksel');cue(420);}
function pause(){if(state==='playing'){state='paused';show('pause');$('pause').textContent='▶';}else if(state==='paused'){state='playing';overlay.hidden=true;last=performance.now();$('pause').textContent='Ⅱ';}}
$('play').onclick=()=>state==='paused'?pause():start();$('pause').onclick=pause;
function place(){if(state==='playing')game.place();}
canvas.addEventListener('pointerdown',e=>{if(e.isPrimary===false||(e.pointerType==='mouse'&&e.button!==0))return;e.preventDefault();place();});
addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();if(e.repeat)return;if(state==='playing')place();else if(state==='paused')pause();else if(state==='menu'||state==='over')start();}if((e.code==='Escape'||e.code==='KeyP')&&!e.repeat)pause();});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&state==='playing')pause();});addEventListener('blur',()=>{if(state==='playing')pause();});
function resize(){const size=canvas.getBoundingClientRect().width,dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(size*dpr);canvas.height=Math.round(size*dpr);}addEventListener('resize',resize);resize();
function color(level,light=64){return 'hsl('+((265+level*5)%360)+' 38% '+light+'%)';}
function block(b,y,alpha=1){if(y>470||y<-60)return;ctx.globalAlpha=alpha;const x=b.x-b.width/2,w=b.width;ctx.fillStyle=color(b.level,58);ctx.fillRect(x,y,w,H-2);ctx.fillStyle=color(b.level,74);ctx.fillRect(x,y,w,4);ctx.fillStyle='rgba(20,15,45,.22)';ctx.fillRect(x,y+H-7,w,5);ctx.globalAlpha=1;}
function draw(){ctx.setTransform(canvas.width/440,0,0,canvas.height/440,0,0);ctx.clearRect(0,0,440,440);
 const glow=ctx.createRadialGradient(220,260,10,220,260,250);glow.addColorStop(0,theme.glow);glow.addColorStop(1,theme.bg+'00');ctx.fillStyle=glow;ctx.fillRect(0,0,440,440);
 ctx.strokeStyle=theme.accent+'0d';ctx.lineWidth=1;for(let x=40;x<440;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,440);ctx.stroke();}for(let y=((camera%40)+40)%40;y<440;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(440,y);ctx.stroke();}
 const baseY=BASE+camera;ctx.fillStyle=theme.line;if(baseY<440)ctx.fillRect(75,baseY+H,290,5);
 for(const b of game.blocks.slice(-20))block(b,BASE-b.level*H+camera);
 if(state==='playing'||state==='paused'){
  const m=game.moving,y=BASE-m.level*H+camera;
  if(game.wait===0){const below=game.blocks[game.blocks.length-1];ctx.save();ctx.setLineDash([4,5]);ctx.strokeStyle=theme.accent+'35';for(const side of [-1,1]){const x=below.x+side*below.width/2;ctx.beginPath();ctx.moveTo(x,y-25);ctx.lineTo(x,y+H+7);ctx.stroke();}ctx.restore();block(m,y);ctx.fillStyle='#fff4';ctx.fillRect(m.x-m.width/2,y,m.width,1);}
 }
 for(const b of falling){ctx.save();ctx.translate(b.x,BASE-b.level*H+camera+b.dy);ctx.rotate(b.rotation);block({...b,x:0},0,Math.max(0,b.life));ctx.restore();}
 for(const p of sparks){ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=theme.warm;ctx.fillRect(p.x,BASE-p.level*H+camera+p.dy,3,3);}ctx.globalAlpha=1;
 if(state==='menu'){const showcase=[{x:220,width:180,level:1},{x:228,width:164,level:2},{x:220,width:148,level:3},{x:234,width:120,level:4}];for(const b of showcase)block(b,BASE-b.level*H);}
 if(flash>0&&!theme.reducedMotion){ctx.strokeStyle='rgba(255,208,138,'+flash*.5+')';ctx.lineWidth=4;const b=game.blocks[game.blocks.length-1];ctx.strokeRect(b.x-b.width/2-2,BASE-b.level*H+camera-2,b.width+4,H);}
}
function frame(now){const dt=Math.min(.05,Math.max(0,(now-last)/1000));last=now;if(state!=='paused')clock+=dt;
 if(state==='playing'){
  game.update(dt);
  for(const e of game.drainEvents()){
   if(e.type==='cut')falling.push({...e,dy:0,vy:0,vx:e.side*55,rotation:0,spin:e.side*1.7,life:1});
   if(e.type==='place'){
    if(game.score>best){best=game.score;store.set('best',best);}hud();cue(e.perfect?700+Math.min(game.streak,8)*65:350+game.score*8,e.perfect?.12:.07);
    if(e.perfect){flash=1;message(e.restored>0?'KUSURSUZ ×'+game.streak+' · +'+e.restored.toFixed(0)+' GENİŞLİK':'KUSURSUZ'+(game.streak>1?' ×'+game.streak:''));if(!theme.reducedMotion)for(let i=0;i<12;i++)sparks.push({x:e.x+(Math.random()-.5)*e.width,level:e.level,dy:0,vy:-35-Math.random()*50,life:.9});}
   }
   if(e.type==='death'){state='dying';deathAt=clock;falling.push({...e.block,dy:0,vy:0,vx:0,rotation:0,spin:1,life:1});cue(130,.3,.065);if(navigator.vibrate)try{navigator.vibrate(40);}catch{}}
  }
 }
 if(state==='dying'&&clock-deathAt>.5){state='over';show('over');}
 if(state!=='paused'){
  const target=Math.max(0,(game.score-7)*H);camera+=(target-camera)*(1-Math.exp(-dt*7));
  for(const f of falling){f.vy+=600*dt;f.dy+=f.vy*dt;f.x+=f.vx*dt;f.rotation+=f.spin*dt;f.life-=dt*.7;}falling=falling.filter(f=>f.life>0);
  for(const p of sparks){p.vy+=150*dt;p.dy+=p.vy*dt;p.life-=dt*1.7;}sparks=sparks.filter(p=>p.life>0);flash=Math.max(0,flash-dt*2.5);
 }
 $('message').style.opacity=clock<msgUntil&&state==='playing'?'1':'0';draw();requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
})();
