(()=>{'use strict';
const {OrbitGame,TAU}=OrbitCore,$=id=>document.getElementById(id);
const canvas=$('game'),ctx=canvas.getContext('2d');
const game=new OrbitGame(),overlay=$('overlay');
const theme=window.SalonTheme;
const memory={};const store={get(key){try{return localStorage.getItem('yorunge.'+key)??memory[key]??null;}catch{return memory[key]??null;}},set(key,value){memory[key]=String(value);try{localStorage.setItem('yorunge.'+key,String(value));}catch{}}};
let best=Math.max(0,Number(store.get('best'))||0),sound=store.get('sound')!=='0';
let state='menu',runBest=best,particles=[],trail=[],last=performance.now(),visualTime=0,deadAt=0,flash=0,messageUntil=0,audio=null;
const R=148,C=220;
$('best').textContent=best;
function audioCue(freq,length=.08,type='sine',vol=.04){
 if(!sound)return;
 try{if(!audio)audio=new(window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')audio.resume();
 const o=audio.createOscillator(),g=audio.createGain();o.type=type;o.frequency.setValueAtTime(freq,audio.currentTime);o.frequency.exponentialRampToValueAtTime(freq*.7,audio.currentTime+length);g.gain.setValueAtTime(vol,audio.currentTime);g.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+length);o.connect(g);g.connect(audio.destination);o.start();o.stop(audio.currentTime+length);}catch{}
}
function updateSound(){ $('sound').classList.toggle('off',!sound);$('sound').setAttribute('aria-label',sound?'Sesi kapat':'Sesi aç');$('sound').setAttribute('aria-pressed',String(sound)); }
$('sound').onclick=()=>{sound=!sound;store.set('sound',sound?'1':'0');updateSound();};updateSound();
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if($('app').requestFullscreen)await $('app').requestFullscreen();else message('Bu tarayıcı tam ekranı desteklemiyor.');}catch{message('Tam ekran açılamadı.');}};
function message(text){$('message').textContent=text;messageUntil=visualTime+2;}
function updateHud(){ $('score').textContent=game.score;$('best').textContent=best;$('direction').textContent=game.direction===1?'↻':'↺';$('multiplier').textContent='×'+game.multiplier; }
function setOverlay(kind){
 overlay.hidden=false;$('legend').hidden=true;$('result').hidden=kind!=='over';
 if(kind==='pause'){
  $('eyebrow').textContent='BİR NEFES AL';$('title').textContent='DURAKLADI';$('description').textContent='Hazır olduğunda aynı noktadan devam et.';$('play').innerHTML='DEVAM ET <span>↗</span>';
 }else{
  $('eyebrow').textContent=game.score>runBest?'YENİ REKOR':'BİR TUR DAHA?';$('title').textContent=String(game.score);$('description').textContent='Kırmızı yayla çarpıştın. Yönünü değiştirerek kaç.';$('play').innerHTML='YENİDEN OYNA <span>↗</span>';
  $('result').replaceChildren();
  for(const [value,label] of [[game.collected,'nokta'],[game.time.toFixed(1)+' sn','süre'],[best,'rekor']]){
   const div=document.createElement('div'),strong=document.createElement('strong'),span=document.createElement('span');strong.textContent=value;span.textContent=label;div.append(strong,span);$('result').append(div);
  }
 }
 $('control').textContent='Dokun / Tıkla / Boşluk → Yön değiştir';
 $('play').focus({preventScroll:true});
}
function start(){game.reset();game.drainEvents();state='playing';runBest=best;particles=[];trail=[];flash=0;overlay.hidden=true;last=performance.now();$('hint').textContent='DOKUN · YÖN DEĞİŞTİR';$('pause').textContent='Ⅱ';updateHud();message('Turkuazı topla · Kırmızıdan kaç');audioCue(440);}
function togglePause(){if(state==='playing'){state='paused';setOverlay('pause');$('pause').textContent='▶';}else if(state==='paused'){state='playing';overlay.hidden=true;last=performance.now();$('pause').textContent='Ⅱ';}}
$('play').onclick=()=>{if(state==='paused')togglePause();else start();};$('pause').onclick=togglePause;
function reverse(){if(state!=='playing')return;game.reverse();audioCue(220,.045,'sine',.022);updateHud();}
canvas.addEventListener('pointerdown',e=>{if(e.isPrimary===false||(e.pointerType==='mouse'&&e.button!==0))return;e.preventDefault();reverse();});
addEventListener('keydown',e=>{
 if(e.code==='Space'){e.preventDefault();if(e.repeat)return;if(state==='playing')reverse();else if(state==='menu'||state==='over')start();else if(state==='paused')togglePause();}
 if((e.code==='KeyP'||e.code==='Escape')&&!e.repeat)togglePause();
});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&state==='playing')togglePause();});
addEventListener('blur',()=>{if(state==='playing')togglePause();});
function resize(){const size=canvas.getBoundingClientRect().width,dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(size*dpr);canvas.height=Math.round(size*dpr);}
addEventListener('resize',resize);resize();
function point(a,r=R){return{x:C+Math.cos(a)*r,y:C+Math.sin(a)*r};}
function burst(angle,color,count){const p=point(angle);for(let i=0;i<count;i++){const a=Math.random()*TAU,s=35+Math.random()*85;particles.push({x:p.x,y:p.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:.6+Math.random()*.3,max:1,color});}}
function draw(){
 ctx.setTransform(canvas.width/440,0,0,canvas.height/440,0,0);ctx.clearRect(0,0,440,440);
 const bg=ctx.createRadialGradient(C,C,10,C,C,210);bg.addColorStop(0,theme.glow);bg.addColorStop(1,theme.bg+'00');ctx.fillStyle=bg;ctx.fillRect(0,0,440,440);
 ctx.lineWidth=1;ctx.strokeStyle=theme.line+'55';
 for(const r of [R-30,R+30]){ctx.beginPath();ctx.arc(C,C,r,0,TAU);ctx.stroke();}
 for(let i=0;i<60;i++){const a=i*TAU/60,p=point(a,R+23),q=point(a,R+(i%5===0?30:26));ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
 ctx.strokeStyle=theme.line;ctx.lineWidth=10;ctx.beginPath();ctx.arc(C,C,R,0,TAU);ctx.stroke();
 ctx.strokeStyle=theme.accent+'17';ctx.lineWidth=1;ctx.beginPath();ctx.arc(C,C,R,0,TAU);ctx.stroke();
 // İç merkez ve yön işareti.
 ctx.strokeStyle=theme.accent+'20';ctx.lineWidth=1;ctx.beginPath();ctx.arc(C,C,44,0,TAU);ctx.stroke();
 ctx.textAlign='center';ctx.strokeStyle=theme.accent;ctx.lineWidth=2.5;ctx.lineCap='round';
 const end=game.direction===1?.8:2.3,start=game.direction===1?-2.3:5.4;
 ctx.beginPath();ctx.arc(C,C,22,start,end,game.direction<0);ctx.stroke();
 const ax=C+Math.cos(end)*22,ay=C+Math.sin(end)*22,tangent=end+game.direction*Math.PI/2;
 ctx.save();ctx.translate(ax,ay);ctx.rotate(tangent);ctx.fillStyle=theme.accent;ctx.beginPath();ctx.moveTo(5,0);ctx.lineTo(-4,-4);ctx.lineTo(-4,4);ctx.closePath();ctx.fill();ctx.restore();
 ctx.font='9px Arial, Helvetica, sans-serif';ctx.fillStyle=theme.muted;ctx.fillText(state==='playing'?'YÖN DEĞİŞTİR':'YÖRÜNGE',C,C+65);
 if(state==='menu'){
  ctx.strokeStyle=theme.danger;ctx.lineWidth=10;ctx.lineCap='round';ctx.beginPath();ctx.arc(C,C,R,.1,.45);ctx.stroke();
 }else{
  for(const h of game.hazards){
   const warn=h.age<h.warning;ctx.save();ctx.lineCap='round';ctx.strokeStyle=warn?theme.warm:theme.danger;ctx.lineWidth=warn?5:11;
   if(warn){ctx.setLineDash([5,7]);ctx.globalAlpha=.55+Math.sin(h.age*12)*.25;}
   else if(!theme.reducedMotion){ctx.shadowColor=theme.danger;ctx.shadowBlur=13;}
   ctx.beginPath();ctx.arc(C,C,R,h.angle-h.width,h.angle+h.width);ctx.stroke();ctx.restore();
   if(warn){const p=point(h.angle,R+17);ctx.fillStyle=theme.warm;ctx.font='600 12px Arial, Helvetica, sans-serif';ctx.fillText('!',p.x,p.y+4);}
  }
 }
 const target=point(game.target),pulse=theme.reducedMotion?1:1+Math.sin(visualTime*4)*.1;
 ctx.strokeStyle=theme.accent+'55';ctx.lineWidth=1;ctx.beginPath();ctx.arc(target.x,target.y,13*pulse,0,TAU);ctx.stroke();
 ctx.fillStyle=theme.accent;ctx.shadowColor=theme.accent;ctx.shadowBlur=theme.reducedMotion?0:15;ctx.beginPath();ctx.arc(target.x,target.y,5.5,0,TAU);ctx.fill();ctx.shadowBlur=0;
 if(!theme.reducedMotion)for(let i=0;i<trail.length;i++){const p=point(trail[i]);ctx.globalAlpha=(i/trail.length)*.3;ctx.fillStyle=theme.text;ctx.beginPath();ctx.arc(p.x,p.y,2.5+i/trail.length*2,0,TAU);ctx.fill();}ctx.globalAlpha=1;
 const player=point(game.angle);ctx.fillStyle=game.alive?theme.text:theme.danger;ctx.shadowColor=game.alive?theme.text:theme.danger;ctx.shadowBlur=theme.reducedMotion?0:17;ctx.beginPath();ctx.arc(player.x,player.y,8,0,TAU);ctx.fill();ctx.shadowBlur=0;
 for(const p of particles){ctx.fillStyle=p.color;ctx.globalAlpha=Math.max(0,p.life);ctx.beginPath();ctx.arc(p.x,p.y,2,0,TAU);ctx.fill();}ctx.globalAlpha=1;
 if(flash>0&&!theme.reducedMotion){ctx.fillStyle='rgba(255,105,125,'+flash*.18+')';ctx.fillRect(0,0,440,440);}
}
function frame(now){
 const dt=Math.min(.05,Math.max(0,(now-last)/1000));last=now;
 if(state!=='paused')visualTime+=dt;
 if(state==='playing'){
  game.update(dt);trail.push(game.angle);if(trail.length>22)trail.shift();
  for(const event of game.drainEvents()){
   if(event.type==='collect'){
    burst(event.angle,theme.accent,theme.reducedMotion?0:12);audioCue(650+game.multiplier*110,.1);
    if(game.score>best){best=game.score;store.set('best',best);}updateHud();
    message('+'+event.gain+(game.collected%5===0&&game.multiplier>1?' · ÇARPAN ×'+game.multiplier:''));
   }else if(event.type==='death'){
    state='dying';deadAt=visualTime;flash=1;burst(game.angle,theme.danger,theme.reducedMotion?0:25);audioCue(140,.3,'triangle',.08);
    if(navigator.vibrate)try{navigator.vibrate(40);}catch{}
   }
  }
 }
 if(state==='dying'&&visualTime-deadAt>.3){state='over';setOverlay('over');}
 if(state!=='paused'){
  for(const p of particles){p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt*1.4;}
  particles=particles.filter(p=>p.life>0);flash=Math.max(0,flash-dt*3);
 }
 $('message').style.opacity=visualTime<messageUntil&&state==='playing'?'1':'0';
 draw();requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
})();
