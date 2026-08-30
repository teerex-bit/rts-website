const fs=require('fs'), path=require('path');
const pages=require('../src/pages'), links=require('../src/links');
const homeContent=require('../src/page-01');
const conversationsContent=require('../src/conversations');
const out=path.join(__dirname,'..','public'); fs.rmSync(out,{recursive:true,force:true}); fs.mkdirSync(out,{recursive:true});
fs.cpSync(path.join(__dirname,'..','src','assets'),path.join(out,'assets'),{recursive:true});
const esc=s=>s.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const journey=stage=>`<nav class="journey" aria-label="Journey stages">${['Awaken','See Clearly','Become','Join'].map((x,i)=>`<a class="${x===stage?'active':''}" href="${[links.awaken,links.seeClearly,links.become,links.join][i]}"><img src="/assets/icon-${['awaken','see','become','join'][i]}.svg" alt="">${x}</a>`).join('')}</nav>`;
const header=()=>`<header class="site-header"><a class="brand" href="${links.home}" aria-label="Reforming the Soul home"><img src="/assets/logo.svg" alt="Reforming the Soul"></a><button type="button" class="menu" aria-expanded="false" aria-controls="main-nav">Menu</button><nav id="main-nav" aria-label="Main navigation"><a href="${links.awaken}">Journey</a><a href="${links.conversations}">Conversations</a><a href="${links.music}">Music</a><a href="${links.books}">Books</a><a class="button small" href="${links.donate}">Give</a></nav></header>`;
const footer=()=>`<footer><img src="/assets/logo-light.svg" alt="Reforming the Soul"><p>Creating safe places for leaders to be honest and whole.</p><nav aria-label="Footer"><a href="${links.review}">Review all pages</a><a href="${links.join}">Join</a><a href="${links.donate}">Give</a></nav><small>© 2026 Reforming the Soul</small></footer>`;
const home=()=>{
 const c=homeContent;
 const action=a=>`<a class="button ${a.style==='outline'?'outline':''}" href="${a.href}">${esc(a.label)}</a>`;
 return `${header()}<main class="home-page">
 <section class="home-hero" aria-labelledby="home-title"><div class="home-hero-panel"><p class="overline">${esc(c.eyebrow)}</p><h1 id="home-title">${esc(c.heading)}</h1><p class="home-intro">${esc(c.introduction)}</p><p>${esc(c.supporting)}</p><div class="home-actions">${c.actions.map(action).join('')}</div></div><aside class="home-message" aria-label="Formation message"><img src="/assets/botanical.svg" alt="">${c.message.map(x=>`<p>${esc(x)}</p>`).join('')}</aside></section>
 <section class="journey-section" aria-labelledby="journey-title"><div class="section-title"><span></span><h2 id="journey-title">A journey of formation</h2><span></span></div><div class="journey-layout"><div class="journey-steps">${c.journey.map((x,i)=>`<div class="journey-step"><a href="${x.href}"><span class="journey-icon"><img src="/assets/icon-${x.icon}.svg" alt=""></span><strong>${esc(x.name)}</strong></a><p>${esc(x.description)}</p></div>${i<c.journey.length-1?'<span class="journey-arrow" aria-hidden="true">→</span>':''}`).join('')}</div><aside class="path-card" aria-label="Journey invitation"><img src="/assets/botanical.svg" alt=""><div><h3>${esc(c.pathCard.heading)}</h3><p>${esc(c.pathCard.copy)}</p><a class="button" href="${c.pathCard.action.href}">${esc(c.pathCard.action.label)}</a></div></aside></div></section>
 <section class="experience" aria-labelledby="experience-title"><h2 id="experience-title">What you’ll experience</h2><div class="experience-layout"><div class="experience-cards">${c.experiences.map(x=>`<article class="experience-${x.image}"><span class="experience-icon" aria-hidden="true">${x.icon}</span><div><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p><a href="${x.action.href}">${esc(x.action.label)}</a></div></article>`).join('')}</div><aside class="home-closing" aria-label="Closing invitation"><img src="/assets/logo-light.svg" alt=""><div><h2>${esc(c.closing.heading)}</h2><h3>${esc(c.closing.emphasis)}</h3><p>${esc(c.closing.copy)}</p><a class="button gold" href="${c.closing.action.href}">${esc(c.closing.action.label)}</a></div></aside></div></section>
 </main>${footer()}`;
};
const conversations=()=>{
 const c=conversationsContent;
 const benefitSymbols={person:'●',heart:'♥',leaf:'◒',people:'●●●'};
 const principleSymbols={eye:'◉',heart:'♡',cross:'†'};
 return `${header()}<main class="conversations-page">
 <div class="conversations-shell">
  <aside class="conversations-rail" aria-label="Formation journey">
   <p class="rail-title">The formation journey</p>
   <ol>${c.journey.map(x=>`<li><a href="${x.href}"><img src="/assets/icon-${x.icon}.svg" alt=""><span><strong>${esc(x.name)}</strong><small>${esc(x.description)}</small></span></a></li>`).join('')}</ol>
   <section class="rail-progress" aria-label="Page progress"><p>Your progress</p><div><span>Conversations</span><span>1 of 1</span></div><progress max="1" value="1">1 of 1</progress></section>
   <section class="rail-support"><h2><span aria-hidden="true">?</span>${esc(c.support.heading)}</h2><p>${esc(c.support.copy)}</p><a href="${c.support.href}">${esc(c.support.label)} <span aria-hidden="true">→</span></a></section>
  </aside>
  <section class="conversations-hero" aria-labelledby="conversations-title">
   <div class="conversations-copy">
    <p class="conversations-eyebrow"><span aria-hidden="true">♧</span>${esc(c.eyebrow)}</p>
    <h1 id="conversations-title">${esc(c.title)}</h1>
    <span class="conversations-rule" aria-hidden="true"></span>
    <h2>Learn what God wants<br>you to hear.</h2>
    <p class="conversations-intro">${esc(c.introduction)}</p>
    <a class="conversations-booking" href="${c.booking.href}"><span class="calendar-icon" aria-hidden="true"></span><span><strong>${esc(c.booking.label)}</strong><small>${esc(c.booking.detail)}</small></span><b aria-hidden="true">→</b></a>
    <div class="conversation-benefits">${c.benefits.map(x=>`<article><span class="benefit-symbol benefit-${x.icon}" aria-hidden="true">${benefitSymbols[x.icon]}</span><h3>${esc(x.title)}</h3><p>${esc(x.copy)}</p></article>`).join('')}</div>
   </div>
   <aside class="conversation-principles" aria-label="Conversation principles"><span class="principles-leaf" aria-hidden="true">♧</span><h2>A different kind<br>of conversation</h2>${c.principles.map(x=>`<div><span aria-hidden="true">${principleSymbols[x.icon]}</span><p>${esc(x.copy)}</p></div>`).join('')}</aside>
  </section>
 </div>
 <section class="conversation-scripture"><div><span aria-hidden="true">“</span><blockquote>${esc(c.scripture)}<cite>— ${esc(c.scriptureReference)}</cite></blockquote></div></section>
 </main>`;
};
function main(p){
 const isHome=p.number===1, stage=p.template==='stage';
 if(isHome) return home();
 if(p.number===38) return conversations();
 const quote=p.template==='reflection'||p.template==='closing'?`<blockquote>“Transformation asks us to tell the truth about where we are, and to remain open to where love may lead.”</blockquote>`:'';
 const cards=p.template==='library'?`<section class="cards" aria-label="Featured resources">${['Begin here','For reflection','Go deeper'].map((x,i)=>`<article><span>0${i+1}</span><h2>${x}</h2><p>A thoughtfully selected resource for attention, growth, and shared conversation.</p><a href="${links.learnMore}">Explore resource →</a></article>`).join('')}</section>`:`<section class="content-grid"><aside aria-label="Page progress"><p class="overline">On this page</p><ol><li>Arrive</li><li>Reflect</li><li>Practice</li></ol><progress max="40" value="${p.number}" aria-label="Journey progress"></progress></aside><article><p class="lead">${esc(p.summary)}</p><h2>An invitation to notice</h2><p>Formation is not a project to complete. It is the ongoing work of becoming more present, more honest, and more able to receive and offer love.</p>${quote}<h2>A practice for today</h2><p>Take a quiet moment. Notice what feels alive in you, what feels resistant, and what invitation you want to carry into the day.</p><a class="text-link" href="${links.next}">Continue the journey →</a></article></section>`;
 return `${header()}<main>${journey(p.stage)}<section class="hero ${isHome?'home':''} ${stage?'stage':''}"><div class="hero-copy"><p class="overline">${esc(p.stage)} · ${String(p.number).padStart(2,'0')}</p><h1>${esc(p.title)}</h1><p>${esc(p.eyebrow)}</p><a class="button" href="${isHome?links.begin:links.next}">${isHome?'Begin the journey':'Explore this movement'}</a></div><div class="scene" role="img" aria-label="A quiet mountain landscape with native plants"><span class="sun"></span><span class="mountain one"></span><span class="mountain two"></span><img src="/assets/botanical.svg" alt="" class="botanical"></div>${isHome?`<aside class="hero-card" aria-label="Welcome message"><p class="overline">A place to begin</p><h2>Your inner life matters.</h2><p>Make room for a more honest, integrated life with God and others.</p><a href="${links.learnMore}">Learn more →</a></aside>`:''}</section>${cards}<section class="closing"><p class="overline">Reforming the Soul</p><h2>Attend to what is forming you.</h2><a class="button gold" href="${links.join}">Join the journey</a></section></main>${footer()}`;
}
function shell(title,body){return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Reforming the Soul — ${esc(title)}"><title>${esc(title)} | Reforming the Soul</title><link rel="stylesheet" href="/assets/styles.css"><script defer src="/assets/site.js"></script></head><body>${body}</body></html>`}
for(const p of pages){const dir=path.join(out,p.route);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),shell(p.title,main(p)))}
const review=`${header()}<main class="review"><p class="overline">Review site</p><h1>All 40 pages</h1><p class="lead">A complete index of the Reforming the Soul journey.</p><ol>${pages.map(p=>`<li><span>${String(p.number).padStart(2,'0')}</span><a href="${p.route}">${esc(p.title)}</a><small>${p.stage} · ${p.template}</small></li>`).join('')}</ol></main>${footer()}`;
fs.mkdirSync(path.join(out,'review'),{recursive:true});fs.writeFileSync(path.join(out,'review/index.html'),shell('Review all pages',review));
fs.mkdirSync(path.join(out,'coming-soon'),{recursive:true});fs.writeFileSync(path.join(out,'coming-soon/index.html'),shell('Coming soon',`${header()}<main class="simple"><p class="overline">Reforming the Soul</p><h1>Coming soon</h1><p class="lead">This destination is being prepared. Continue exploring the formation journey in the meantime.</p><a class="button" href="/review/">View all pages</a></main>${footer()}`));
console.log(`Built ${pages.length+2} routes.`);
