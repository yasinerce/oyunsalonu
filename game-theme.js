/* Shared presentation tokens. Game rules and save keys stay in each game. */
(() => {
 'use strict';
 const id=document.body.dataset.game;
 const palettes={pota:{accent:'#e4b27b',glow:'#2b2524'},yorunge:{accent:'#87dbd1',glow:'#20313b'},'kule-dengesi':{accent:'#c7b5ed',glow:'#2b293d'},'tek-atis':{accent:'#a6d4a0',glow:'#26342e'}};
 const palette=palettes[id]||palettes.yorunge;
 const preferences=()=>{let motion=!matchMedia('(prefers-reduced-motion: reduce)').matches,contrast=false;try{const m=JSON.parse(localStorage.getItem('salon.motion'));if(typeof m==='boolean')motion=m;contrast=JSON.parse(localStorage.getItem('salon.contrast'))===true;}catch{}document.body.classList.toggle('no-motion',!motion);document.body.classList.toggle('high-contrast',contrast);};
 window.SalonTheme=Object.freeze({...palette,bg:'#11151f',surface:'#171d29',line:'#465061',muted:'#a4a8b2',text:'#f3f4f7',danger:'#f17e8d',warm:'#e7bf83',get reducedMotion(){return document.body.classList.contains('no-motion')||matchMedia('(prefers-reduced-motion: reduce)').matches;}});
 preferences();window.addEventListener('storage',preferences);
})();
