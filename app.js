(() => {
  'use strict';
  const c = window.BIRTHDAY_CONFIG, app = document.querySelector('#app');
  const key = 'birthday-surprise-' + c.version;
  const esc = s => String(s).replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
  const normalize = s => String(s).normalize('NFKC').trim().replace(/\s+/g, '').toUpperCase();
  let stage = 0, unlocked = 0;
  try { unlocked = Math.max(0, Math.min(c.levels.length, Number(localStorage.getItem(key)) || 0)); } catch {}
  function save() { try { localStorage.setItem(key, String(unlocked)); } catch {} }
  function show(html) { app.innerHTML = html; window.scrollTo({top:0,behavior:'instant'}); const h = app.querySelector('h1'); if(h){h.tabIndex=-1;h.focus({preventScroll:true});} }
  function photos(items) { return items.map(p => `<figure class="photo"><img src="${esc(p.src)}" alt="${esc(p.alt || p.caption)}" loading="lazy"><figcaption>${esc(p.caption)}</figcaption></figure>`).join(''); }
  function opening() {
    stage = 0;
    show(`<section class="hero"><div class="hero-copy"><div class="eyebrow">A birthday letter · 一份生日来信</div><h1>有一份惊喜，<br>想<em>亲手交给你。</em></h1><p class="intro">亲爱的 ${esc(c.recipient)}：<br>${esc(c.intro)}</p><button class="primary" id="begin">${unlocked ? '继续拆开来信' : '打开第一封信'} <span aria-hidden="true">↗</span></button><p class="smallnote">四封信 · 一点回忆 · 满满的心意</p></div><div class="envelope-stage" aria-hidden="true"><div class="envelope"><div class="letter-peek">For you, always.<span>A DAY WORTH CELEBRATING</span></div><div class="flap"></div><div class="fold"></div><div class="seal">✦</div></div><span class="annotation">a little mystery, a lot of love.</span></div></section><div class="journey">${['记忆的起点','照片里的秘密','字母的悄悄话','心意的答案'].map((s,i)=>`<span><b>0${i+1}</b>${s}</span>`).join('')}</div>`);
    app.querySelector('#begin').onclick = () => {stage=unlocked+1; render();};
  }
  function render() {
    if(stage > c.levels.length) return finale();
    const l = c.levels[stage-1];
    show(`<section class="puzzle"><div class="progress" aria-label="第 ${stage} 关，共 ${c.levels.length} 关">${c.levels.map((_,i)=>`<span class="step ${i<stage?'done':''}"></span>`).join('')}<span class="progress-label">${String(stage).padStart(2,'0')} / 04</span></div><div class="eyebrow">LETTER ${String(stage).padStart(2,'0')} / ${esc(l.label)}</div><h1>${esc(l.title)}</h1><div class="paper"><p class="question">${esc(l.question)}</p><p class="detail">${esc(l.detail)}</p>${l.images?`<div class="clues">${photos(l.images)}</div>`:''}${l.type==='choice'?`<div class="options">${l.options.map((o,i)=>`<button class="option" data-index="${i}" aria-pressed="false"><b>${String.fromCharCode(65+i)}</b>${esc(o)}</button>`).join('')}</div>`:`<form id="answer-form"><label class="smallnote" for="answer">写下你的答案</label><div class="answer-row"><input id="answer" name="answer" autocomplete="off" maxlength="120" required placeholder="${esc(l.placeholder)}"><button class="primary" type="submit">解锁来信 ↗</button></div></form>`}<p class="feedback" role="status" aria-live="polite"></p><div id="next"></div><details><summary>需要一点小提示？ ＋</summary><p>${esc(l.hint)}</p></details></div></section>`);
    let solved=false;
    function check(ok) {
      if(solved) return;
      const feedback=app.querySelector('.feedback');
      feedback.textContent=ok?'答对了。这份回忆，已经为你打开下一封信。':'还差一点点，再想想。也可以看看下面的小提示。';
      feedback.classList.toggle('success',ok);
      if(ok){solved=true;unlocked=Math.max(unlocked,stage);save();app.querySelector('#next').innerHTML=`<button class="primary" id="continue">${stage===c.levels.length?'收下生日惊喜':'打开下一封信'} ↗</button>`;app.querySelector('#continue').onclick=()=>{stage++;render();}; app.querySelector('#continue').focus();}
    }
    if(l.type==='choice') app.querySelectorAll('.option').forEach(b=>b.onclick=()=>{if(solved)return;app.querySelectorAll('.option').forEach(o=>o.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');check(Number(b.dataset.index)===l.correctIndex);});
    else app.querySelector('form').onsubmit=e=>{e.preventDefault();check(l.answers.some(a=>normalize(a)===normalize(app.querySelector('input').value)));};
  }
  function finale() {
    show(`<section class="final"><div class="eyebrow">ALL LETTERS OPENED · 心意已送达</div><div class="cake" aria-hidden="true">✧</div><h1>生日快乐，<br><em>${esc(c.recipient)}。</em></h1><p class="detail">你解开的不只是谜题，还有我想说的每一句祝福。</p><div class="paper">${c.letter.map(p=>`<p>${esc(p)}</p>`).join('')}<p class="signature">一直站在你这边的<br>${esc(c.sender)}</p></div><h2>把这些瞬间，好好收藏。</h2><p class="detail">OUR LITTLE COLLECTION OF HAPPY DAYS</p><div class="gallery">${photos(c.photos)}</div><div class="final-actions"><button class="primary" id="celebrate">再撒一次快乐 ✧</button></div><p class="smallnote">今天，以及往后的每一天，都值得被好好庆祝。</p></section>`);
    app.querySelector('#celebrate').onclick=confetti;confetti();
  }
  let animation=0;
  function confetti(){
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    cancelAnimationFrame(animation);const canvas=document.querySelector('canvas'),ctx=canvas.getContext('2d');
    const w=canvas.width=innerWidth,h=canvas.height=innerHeight;
    const pieces=Array.from({length:95},()=>({x:Math.random()*w,y:-Math.random()*h,v:1.8+Math.random()*2.5,r:Math.random()*6.28,color:['#819475','#c59075','#d8ba79','#9faea0'][Math.floor(Math.random()*4)]}));let start=performance.now();
    function frame(now){ctx.clearRect(0,0,w,h);for(const p of pieces){p.y+=p.v;p.x+=Math.sin(p.y/60)*.5;p.r+=.025;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.color;ctx.fillRect(-3,-5,6,10);ctx.restore();}if(now-start<6500)animation=requestAnimationFrame(frame);else ctx.clearRect(0,0,w,h);}animation=requestAnimationFrame(frame);
  }
  document.querySelector('#restart').onclick=()=>{if(confirm('要从第一封信重新开始吗？')){unlocked=0;save();opening();}};
  const audio=document.querySelector('#audio'),music=document.querySelector('#music');
  if(c.music)audio.src=c.music;
  music.onclick=async()=>{if(!c.music){music.textContent='♫ 暂未放入音乐';return;}if(!audio.paused){audio.pause();music.textContent='♫ 音乐关闭';music.setAttribute('aria-pressed','false');return;}try{await audio.play();music.textContent='♫ 音乐播放中';music.setAttribute('aria-pressed','true');}catch{music.textContent='♫ 音乐暂时无法播放';music.setAttribute('aria-pressed','false');}};
  audio.addEventListener('error',()=>{music.textContent='♫ 请检查音乐文件';music.setAttribute('aria-pressed','false');});
  opening();
})();
