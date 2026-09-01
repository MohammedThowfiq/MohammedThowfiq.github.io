const menu=document.querySelector('[data-menu]');
const nav=document.querySelector('[data-nav]');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1,rootMargin:'0px 0px -35px'});
document.querySelectorAll('.reveal').forEach(item=>observer.observe(item));

const glow=document.querySelector('.cursor-glow');
if(matchMedia('(pointer:fine)').matches){addEventListener('pointermove',event=>{glow.animate({left:`${event.clientX}px`,top:`${event.clientY}px`},{duration:650,fill:'forwards'})})}

document.querySelectorAll('.credential').forEach(card=>card.addEventListener('pointermove',event=>{if(!matchMedia('(pointer:fine)').matches)return;const box=card.getBoundingClientRect();const x=(event.clientX-box.left)/box.width-.5;const y=(event.clientY-box.top)/box.height-.5;card.style.setProperty('--rx',`${-y*5}deg`);card.style.setProperty('--ry',`${x*5}deg`)}));
document.querySelector('[data-year]').textContent=new Date().getFullYear();
