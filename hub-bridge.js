(() => {
 if(window.parent===window)return;
 const $=id=>document.getElementById(id),pota=!!$('i-pause'),origin=location.origin==='null'?'*':location.origin;
 let pausedByHub=false;
 const paused=()=>pota?$('paused').classList.contains('show'):!$('overlay').hidden&&$('title').textContent==='DURAKLADI';
 const playing=()=>pota?!['start','over','paused'].some(id=>$(id).classList.contains('show')):$('overlay').hidden;
 window.addEventListener('message',e=>{if(e.source!==window.parent||e.origin!==location.origin)return;if(e.data?.type==='hub:pause'){if(playing()){(pota?$('i-pause'):$('pause')).click();pausedByHub=paused();}else if(paused())pausedByHub=true;}else if(e.data?.type==='hub:resume'){if(pausedByHub&&paused())(pota?$('resume'):$('play')).click();pausedByHub=false;dispatchEvent(new Event('resize'));}});
 window.addEventListener('keydown',e=>{if(e.code==='Escape'){e.preventDefault();e.stopImmediatePropagation();window.parent.postMessage({type:'hub:menu'},origin);}},true);
})();
