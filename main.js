const menu=document.querySelector('[data-menu]');
const nav=document.querySelector('[data-nav]');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1,rootMargin:'0px 0px -35px'});
document.querySelectorAll('.reveal').forEach(item=>observer.observe(item));

const glow=document.querySelector('.cursor-glow');
if(matchMedia('(pointer:fine)').matches){addEventListener('pointermove',event=>{glow.animate({left:`${event.clientX}px`,top:`${event.clientY}px`},{duration:650,fill:'forwards'})})}

document.querySelectorAll('.credential').forEach(card=>card.addEventListener('pointermove',event=>{if(!matchMedia('(pointer:fine)').matches)return;const box=card.getBoundingClientRect();const x=(event.clientX-box.left)/box.width-.5;const y=(event.clientY-box.top)/box.height-.5;card.style.setProperty('--rx',`${-y*5}deg`);card.style.setProperty('--ry',`${x*5}deg`)}));

const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const workSection=document.querySelector('.work');
const workCards=[...document.querySelectorAll('.work-card')];

workCards.forEach((card,index)=>{
  card.style.setProperty('--reveal-delay',`${index*70}ms`);
  if(!reducedMotion&&matchMedia('(pointer:fine)').matches){
    card.addEventListener('pointermove',event=>{
      const box=card.getBoundingClientRect();
      const x=(event.clientX-box.left)/box.width-.5;
      const y=(event.clientY-box.top)/box.height-.5;
      card.style.setProperty('--work-x',`${x*-12}px`);
      card.style.setProperty('--work-y',`${y*-10}px`);
    });
    card.addEventListener('pointerleave',()=>{
      card.style.setProperty('--work-x','0px');
      card.style.setProperty('--work-y','0px');
    });
  }
});

let scrollFrame=0;
const updateDynamicWork=()=>{
  scrollFrame=0;
  if(!workSection||reducedMotion)return;
  const viewport=innerHeight;
  const sectionBox=workSection.getBoundingClientRect();
  const progress=Math.max(0,Math.min(1,(viewport-sectionBox.top)/(sectionBox.height+viewport)));
  workSection.style.setProperty('--work-progress',progress.toFixed(3));
  workCards.forEach(card=>{
    const box=card.getBoundingClientRect();
    const distance=(box.top+box.height/2-viewport/2)/viewport;
    const shift=Math.max(-12,Math.min(12,distance*-10));
    card.style.setProperty('--scroll-shift',`${shift}px`);
  });
};
const requestDynamicWork=()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateDynamicWork)};
addEventListener('scroll',requestDynamicWork,{passive:true});
addEventListener('resize',requestDynamicWork,{passive:true});
requestDynamicWork();

const navLinks=[...document.querySelectorAll('header nav a[href^="#"]')];
const trackedSections=navLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`));
  });
},{rootMargin:'-32% 0px -58%',threshold:0});
trackedSections.forEach(section=>sectionObserver.observe(section));

document.querySelector('[data-year]').textContent=new Date().getFullYear();
