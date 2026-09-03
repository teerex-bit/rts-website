module.exports = String.raw`
.r1620{--ink:#0d2030;--cream:#f7f3ed;--paper:#fbf9f5;--purple:#3f216f;--purple-2:#624294;--gold:#c98b22;--olive:#5f653a;--rail:#101d1c;box-sizing:border-box;color:var(--ink);background:var(--paper);font-family:Arial,Helvetica,sans-serif;line-height:1.42;min-height:100vh}
.r1620 *,.r1620 *::before,.r1620 *::after{box-sizing:border-box}
.r1620 a{color:inherit;text-decoration:none}
.r1620 img{display:block;max-width:100%}
.r1620 h1,.r1620 h2,.r1620 h3,.r1620 p,.r1620 ul,.r1620 ol,.r1620 blockquote{margin-top:0}
.r1620 h1,.r1620--landing h2,.r1620-screen-card h2{font-family:Georgia,'Times New Roman',serif;font-weight:500;line-height:1.05}
.r1620-icon{width:1.5em;height:1.5em;flex:0 0 auto;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.r1620-logo{display:flex;align-items:center;gap:12px;width:238px;padding:15px 22px;color:#162434}
.r1620-logo .r1620-icon{width:58px;height:58px;color:#263927}
.r1620-logo span{font:18px/1.05 Georgia,serif;letter-spacing:.05em;display:grid;grid-template-columns:auto auto}
.r1620-logo em{font-size:16px;font-weight:400;letter-spacing:0;text-align:right;padding-right:5px}
.r1620-logo--light{color:#f7f2e9;border-bottom:1px solid #43514b;width:100%;padding:14px 18px}
.r1620-logo--light .r1620-icon{color:#d0b867}
.r1620-topbar{height:90px;display:flex;align-items:center;border-bottom:1px solid #ddd5cb;background:#fbfaf7;padding:0 28px;position:relative;z-index:5}
.r1620-topbar .r1620-logo{margin-right:auto;padding:0;width:245px}
.r1620-topbar__nav{align-self:stretch;display:flex;gap:54px;align-items:center;margin:0 auto}
.r1620-topbar__nav a{text-transform:uppercase;font-size:14px;font-weight:700;letter-spacing:.04em;height:100%;display:grid;place-items:center;position:relative}
.r1620-topbar__nav a.is-active{color:var(--purple)}
.r1620-topbar__nav a.is-active::after{content:'';position:absolute;bottom:15px;width:78px;height:2px;background:var(--purple)}
.r1620-conversation{border:1px solid var(--purple);border-radius:26px;padding:14px 30px;text-transform:uppercase;color:var(--purple);font-size:13px;font-weight:700;letter-spacing:.06em;margin-left:auto}
.r1620-account{margin-left:24px;width:42px;height:42px;border-radius:50%;background:#0d2030;color:#fff;display:grid;place-items:center}
.r1620-account .r1620-icon{width:24px}
.r1620-rail{background:linear-gradient(165deg,#10281f,#0b251c 56%,#18282a);color:#f8f8f1;width:348px;min-height:100vh;flex:0 0 348px;padding:0 20px 20px}
.r1620-rail__label{color:#c5ad55;text-transform:uppercase;letter-spacing:.14em;font-size:11px;margin:22px 20px 10px}
.r1620-rail__journey>a{display:flex;gap:16px;align-items:center;min-height:72px;padding:12px 18px;border-radius:10px;margin-bottom:5px}
.r1620-rail__journey>a>.r1620-icon{width:34px;height:34px}
.r1620-rail__journey>a>span{display:flex;flex-direction:column;flex:1}
.r1620-rail__journey b{text-transform:uppercase;font-size:13px;letter-spacing:.03em}
.r1620-rail__journey small{font-size:11px;line-height:1.4;margin-top:3px;max-width:145px}
.r1620-rail__journey>a.is-active{background:linear-gradient(100deg,#5f633b,#727749);box-shadow:0 8px 20px rgba(0,0,0,.18)}
.r1620-rail__journey>a>.r1620-icon:last-child{width:20px;height:20px;color:#f2d983}
.r1620-help{border:1px solid rgba(255,255,255,.22);border-radius:10px;padding:15px;margin:34px 4px 0;display:flex;gap:12px;font-size:11px}
.r1620-help>span{display:flex;flex-direction:column;gap:4px}
.r1620-help b{font-size:12px}
.r1620-help small{display:block}
.r1620-help a{color:#d1b45c;text-decoration:underline}
.r1620--reflection{display:flex;min-height:1024px;background:#f8f5ef}
.r1620-reflection__main{min-width:0;flex:1}
.r1620-coursebar{height:116px;border-bottom:1px solid #d9d1c6;display:flex;align-items:center;padding:0 44px;background:#fbf8f3}
.r1620-coursebar>span:first-child{display:flex;flex-direction:column;text-transform:uppercase;letter-spacing:.1em;font-size:13px}
.r1620-coursebar small{text-transform:none;letter-spacing:0;margin-top:4px}
.r1620-coursebar>a{margin-left:auto;font-size:12px}
.r1620-coursebar__tools{display:flex;gap:18px;margin-left:28px}
.r1620-coursebar__tools .r1620-icon{width:28px;height:28px}
.r1620-reflection__content{padding:22px 44px 16px;max-width:1180px}
.r1620-eyebrow{text-transform:uppercase;letter-spacing:.1em;font-size:13px;font-weight:700;color:#4d5732;margin-bottom:6px}
.r1620-reflection__content>h1{font-size:46px;margin-bottom:10px}
.r1620-intro{font-size:14px;line-height:1.3;margin-bottom:16px}
.r1620-anger-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.r1620-anger-column{border-radius:12px;overflow:hidden;background:#eeeae2;border:1px solid #e0d9cf}
.r1620-anger-column h2{text-align:center;text-transform:uppercase;letter-spacing:.04em;font-size:12px;margin:0;padding:7px;background:#f8f5ef;font-family:Arial,sans-serif;font-weight:700}
.r1620-anger-column>img{width:100%;height:210px;object-fit:cover}
.r1620-anger-column ul{list-style:none;padding:4px 12px 8px;margin:0;background:#f6f3ed}
.r1620-anger-column li{display:flex;gap:10px;align-items:center;padding:7px 0;border-bottom:1px solid #ddd5c8;font-size:12px;line-height:1.2}
.r1620-anger-column li:last-child{border-bottom:0}
.r1620-anger-column li .r1620-icon{background:#98966a;border-radius:50%;padding:5px;width:30px;height:30px;color:white}
.r1620-anger-column li span{display:block}
.r1620-anger-column li small{display:block;font-size:10px;color:#252b2d;margin-top:2px}
.r1620-wide-note{display:flex;align-items:center;gap:18px;background:linear-gradient(90deg,#e8e2d6,#f1eee8);border-radius:10px;margin-top:14px;padding:12px 18px;font-size:12px}
.r1620-wide-note .r1620-icon{width:32px;height:32px;color:#76764d}
.r1620-wide-note p{margin:0}
.r1620-pager{display:flex;align-items:center;margin-top:15px;min-height:48px;font-size:12px}
.r1620-pager>a{border:1px solid #ddd5ca;border-radius:24px;padding:10px 20px;background:#fbf9f5}
.r1620-pager__next{background:#253a19!important;color:white;border-color:#253a19!important;margin-left:auto;padding-inline:26px!important}
.r1620-dots{display:flex;gap:13px;margin:auto}
.r1620-dots i{width:10px;height:10px;background:#ddd4c5;border-radius:50%}
.r1620-dots i.is-active{background:#31451e}
.r1620-look-subtitle{font-weight:700;line-height:1.08;margin:-4px 0 14px;font-size:15px}
.r1620-look-rows{display:grid;gap:5px}
.r1620-look-rows article{display:grid;grid-template-columns:1fr 58px 1.35fr 65px;min-height:120px;border:1px solid #ddd7cd;border-radius:12px;background:#fbf9f5;align-items:stretch;overflow:hidden}
.r1620-look-rows article>div{padding:16px 20px}
.r1620-look-rows article>div:nth-of-type(2){background:#f3f1e9}
.r1620-look-rows b{text-transform:uppercase;font-size:12px;color:#aa312d;letter-spacing:.04em}
.r1620-look-rows article>div:nth-of-type(2) b{color:#5d6336}
.r1620-look-rows p{font-size:14px;font-weight:700;margin:4px 0 0;line-height:1.25}
.r1620-look-rows small{display:block;font-size:11px;margin-top:3px}
.r1620-row-arrow{align-self:center;justify-self:center;width:48px;height:48px;border:1px solid #bca777;border-radius:50%;display:grid;place-items:center;font-size:25px;color:#66582f;background:#fbf9f5;z-index:1}
.r1620-book{display:grid;place-items:center;background:#f3f1e9}
.r1620-book .r1620-icon{width:48px;height:48px;background:#64713b;border-radius:50%;padding:10px;color:white}
.r1620--landing{background:#f8f5f1}
.r1620-landing-hero{height:520px;position:relative;overflow:hidden}
.r1620-landing-hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.r1620-landing-hero::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(251,248,243,.99) 0%,rgba(251,248,243,.94) 31%,rgba(251,248,243,.05) 68%,rgba(8,15,36,.18))}
.r1620-landing-copy{position:absolute;z-index:2;left:48px;top:34px;width:430px}
.r1620-landing-copy .r1620-eyebrow{color:#6b469a;display:flex;align-items:center;gap:12px;font-size:14px}
.r1620-landing-copy h1{font-size:74px;color:var(--purple);margin:10px 0 10px}
.r1620-gold-rule{width:55px;height:2px;background:var(--gold);margin:14px 0}
.r1620-landing-copy h2{font-size:25px;line-height:1.3;margin-bottom:18px}
.r1620-landing-copy>p:not(.r1620-eyebrow){font-size:14px;line-height:1.5;margin-bottom:6px}
.r1620-landing-copy>strong{display:block;color:var(--purple);margin-top:8px}
.r1620-actions{display:flex;gap:14px;margin-top:20px}
.r1620-actions a{border:1px solid var(--purple);border-radius:5px;padding:13px 18px;text-transform:uppercase;font-size:12px;font-weight:700;letter-spacing:.04em;background:#faf8f4;color:var(--purple)}
.r1620-actions a:first-child{background:var(--purple);color:#fff}
.r1620-landing-steps{position:absolute;z-index:3;right:27px;top:115px;width:205px;background:rgba(24,24,47,.86);border:1px solid #675b82;border-radius:10px;color:#fff;padding:15px 18px}
.r1620-landing-steps span{display:flex;align-items:center;gap:15px;min-height:78px;border-bottom:1px solid rgba(255,255,255,.25)}
.r1620-landing-steps span:last-child{border-bottom:0}
.r1620-landing-steps .r1620-icon{color:#d99a35;width:32px;height:32px}
.r1620-landing-steps b{font-size:13px;line-height:1.45}
.r1620-way{min-height:132px;display:grid;grid-template-columns:190px 1fr 1.2fr;align-items:center;gap:30px;padding:22px 70px;background:#fffaf5}
.r1620-way__art{width:130px;height:100px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle,#e1d5de,#eee9e3 62%,transparent 64%)}
.r1620-way__art .r1620-icon{width:70px;height:70px;color:#725092}
.r1620-way h2{font-size:23px;line-height:1.35;margin:0}
.r1620-way h2 em{color:var(--purple)}
.r1620-way p{margin:0;border-left:1px solid #d5a258;padding-left:38px;font-size:15px}
.r1620-movements{padding:24px 32px 26px;background:#faf8f4}
.r1620-movements>h2{font:700 18px Arial,sans-serif;color:var(--purple);text-transform:uppercase;text-align:center;letter-spacing:.05em;display:flex;align-items:center;justify-content:center;gap:20px}
.r1620-movements>h2 span{width:45px;height:1px;background:#d09d53}
.r1620-movements__grid{max-width:1150px;margin:auto;display:grid;grid-template-columns:1fr 54px 1fr;background:linear-gradient(90deg,#f1eaf4,#fcf8ef);border-radius:18px;overflow:hidden;min-height:410px;box-shadow:0 8px 25px rgba(45,34,23,.12)}
.r1620-movement{padding:28px 34px;position:relative}
.r1620-movement--1{background:linear-gradient(90deg,rgba(25,45,45,.15),rgba(255,255,255,.7))}
.r1620-movement--2{background:linear-gradient(90deg,rgba(255,255,255,.72),rgba(174,145,86,.15))}
.r1620-movement__heading{display:flex;gap:18px;align-items:flex-start}
.r1620-movement__heading>.r1620-icon{width:62px;height:62px;background:var(--purple);color:#fff;border-radius:50%;padding:13px}
.r1620-movement--2 .r1620-movement__heading>.r1620-icon{background:#be7a20}
.r1620-movement__heading small{text-transform:uppercase;font-weight:700;letter-spacing:.08em}
.r1620-movement__heading h2{font-size:28px;margin:4px 0 12px}
.r1620-movement__heading p{font-size:14px;max-width:230px}
.r1620-movement__steps{display:grid;grid-template-columns:repeat(3,1fr);gap:22px 12px;margin:12px 0 20px}
.r1620-movement--2 .r1620-movement__steps{grid-template-columns:repeat(4,1fr)}
.r1620-movement__steps span{text-align:center;display:flex;flex-direction:column;align-items:center;gap:4px}
.r1620-movement__steps .r1620-icon{width:48px;height:48px;background:#7350a1;color:white;border-radius:50%;padding:11px}
.r1620-movement--2 .r1620-movement__steps .r1620-icon{background:#c89248}
.r1620-movement__steps small{font-size:10px;line-height:1.2}
.r1620-movement>a{text-transform:uppercase;color:var(--purple);font-weight:700;letter-spacing:.04em;margin-left:84px}
.r1620-movement--2>a{color:#b57219}
.r1620-between{width:52px;height:52px;border-radius:50%;border:2px solid #ba7a20;display:grid;place-items:center;align-self:center;justify-self:center;background:#fff;font-size:32px;color:#ad731c;z-index:2}
.r1620-landing-quote{min-height:165px;background:linear-gradient(115deg,#16152f,#232044 60%,#161b36);color:#fff;display:grid;grid-template-columns:1fr 1fr;padding:28px 65px;gap:50px}
.r1620-landing-quote>div,.r1620-landing-quote blockquote{display:flex;align-items:center;gap:28px;margin:0}
.r1620-landing-quote .r1620-icon{width:92px;height:92px;color:#dda33b}
.r1620-landing-quote p{font:20px/1.45 Georgia,serif;margin:0}
.r1620-landing-quote em,.r1620-landing-quote cite{color:#e0a33a}
.r1620-landing-quote blockquote{border-left:1px solid #a77837;padding-left:35px}
.r1620-landing-quote blockquote>b{font-size:70px;color:#6f42a0}
.r1620-landing-quote cite{display:block;text-transform:uppercase;font:700 12px Arial,sans-serif;margin-top:14px;letter-spacing:.08em}
.r1620-principles{margin:0 32px 24px;border-radius:16px;background:#fbfaf7;display:grid;grid-template-columns:repeat(4,1fr);padding:20px 30px;transform:translateY(-1px)}
.r1620-principles>span{display:flex;align-items:center;gap:16px;border-right:1px solid #ded8d0;padding:0 22px}
.r1620-principles>span:last-child{border:0}
.r1620-principles .r1620-icon{width:52px;height:52px;border-radius:50%;background:#3f2a65;color:#fff;padding:12px}
.r1620-principles p{font-size:11px;line-height:1.6;margin:0}
.r1620--lesson{background:#f9f6f1}
.r1620-lesson-shell{display:flex}
.r1620--lesson .r1620-rail{background:linear-gradient(155deg,#17152d,#17192e 55%,#201b3c);width:314px;flex-basis:314px;padding-top:20px}
.r1620--lesson .r1620-rail__journey>a.is-active{background:linear-gradient(100deg,#56366f,#6f4a88)}
.r1620--lesson .r1620-rail__label{color:#e4ad4d}
.r1620--lesson .r1620-help{margin-top:38px;font-size:12px}
.r1620-rail__part{color:#e1aa42;display:flex;flex-direction:column;gap:5px;padding:8px 24px 12px;text-transform:uppercase;font-size:11px}
.r1620-rail__part strong{text-transform:none;font-size:14px}
.r1620-rail__lessons{list-style:none;padding:0 0 10px;margin:0;background:rgba(100,64,130,.32);border-radius:0 0 10px 10px;overflow:hidden}
.r1620-rail__lessons li{display:flex;align-items:center;gap:10px;padding:8px 14px;font-size:11px;color:#d9d0df}
.r1620-rail__lessons li.is-current{background:rgba(147,100,170,.4);color:#fff}
.r1620-rail__lessons li>span{width:21px;height:21px;border:1px solid #aaa0bc;border-radius:50%;display:grid;place-items:center}
.r1620-rail__lessons li.is-current>span{background:#f4eee5;color:#4a2a72;border:0}
.r1620-rail__lessons .r1620-icon{margin-left:auto;color:#e0b052;width:18px}
.r1620-lesson-main{flex:1;min-width:0}
.r1620-lesson-hero{height:425px;position:relative;overflow:hidden}
.r1620-lesson-hero>img,.r1620-pattern-hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.r1620-lesson-hero::after,.r1620-pattern-hero::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#faf8f3 3%,rgba(250,248,243,.96) 43%,rgba(250,248,243,.15) 72%);pointer-events:none}
.r1620-lesson-hero>div{position:absolute;z-index:2;left:48px;top:40px;width:570px}
.r1620-lesson-hero h1{font-size:55px;margin:18px 0}
.r1620-lesson-hero h2{font:700 22px Arial,sans-serif;color:#525937;margin:18px 0}
.r1620-lesson-hero>div>p:last-of-type{font-size:16px;line-height:1.55;max-width:520px}
.r1620-lesson-hero blockquote{position:absolute;z-index:2;right:54px;top:145px;width:210px;background:rgba(20,20,21,.82);color:white;border:1px solid #70684b;border-radius:12px;padding:22px 25px;margin:0}
.r1620-lesson-hero blockquote>b{font-size:54px;color:#e1a234;line-height:.5}
.r1620-lesson-hero blockquote p{font-size:18px;line-height:1.55}
.r1620-lesson-hero blockquote cite{color:#e1a234;text-transform:uppercase;font-weight:700;font-style:normal;border-top:2px solid #c89025;padding-top:12px;display:block}
.r1620-screen-card{margin:0 22px 0;background:#fffdf9;border:1px solid #e1d9cf;border-radius:12px 12px 0 0;padding:24px 22px 0}
.r1620-screen-card>header{display:flex;align-items:center;gap:24px;margin-bottom:20px}
.r1620-screen-card>header>span{width:54px;height:54px;border-radius:50%;background:#4e2b79;color:#fff;border:3px double #fff;outline:1px solid #6b5185;display:grid;place-items:center;font-size:21px}
.r1620-screen-card>header small{text-transform:uppercase;color:#3d2567;font-weight:700;letter-spacing:.06em}
.r1620-screen-card>header h2{font-size:27px;margin:5px 0}
.r1620-screen-columns{display:grid;grid-template-columns:1fr 1fr}
.r1620-screen-columns>article{padding:10px 50px 20px 90px}
.r1620-screen-columns>article+article{border-left:1px solid #ded7ce;padding-left:45px}
.r1620-screen-columns h3{font-size:14px;color:#4e542f}
.r1620-screen-columns p,.r1620-screen-columns li{font-size:13px;line-height:1.5}
.r1620-screen-columns ul{list-style:none;padding:0;margin:8px 0 22px}
.r1620-screen-columns li{display:flex;align-items:center;gap:9px;margin-bottom:8px}
.r1620-screen-columns li .r1620-icon{width:17px;height:17px;color:#b67e28}
.r1620-screen-columns article>aside{background:linear-gradient(90deg,#fbf3e7,#f3efe9);padding:16px 26px;display:flex;align-items:center;gap:18px;border:1px solid #eadbca;border-radius:8px;margin-top:18px}
.r1620-screen-columns article>aside .r1620-icon{width:40px;height:40px;color:#ad6d20}
.r1620-screen-columns article:nth-child(2)>aside{background:linear-gradient(90deg,#f3eef6,#ece8ef);border:0}
.r1620-screen-columns article:nth-child(2)>aside .r1620-icon{color:#7e65a1}
.r1620-life-list{display:grid;grid-template-columns:1fr 1fr;gap:6px 20px}
.r1620-life-list li{border-bottom:1px solid #e8e0d9;padding-bottom:5px}
.r1620-life-list li .r1620-icon{width:27px;height:27px;border:1px solid #79579f;border-radius:50%;padding:5px;color:#6e4b94}
.r1620-lesson-pager{border-top:1px solid #e0d9d0;display:flex;justify-content:space-between;padding:20px 0;margin-top:14px;text-transform:uppercase;font-size:12px;font-weight:700;letter-spacing:.06em}
.r1620-lesson-pager a{border:1px solid #d7cec5;border-radius:12px;padding:14px 20px}
.r1620-lesson-pager a:last-child{background:var(--purple);color:#fff;border-color:var(--purple);padding-inline:34px}
.r1620-pattern-hero{min-height:930px;position:relative;overflow:hidden;padding:38px 355px 0 48px}
.r1620-pattern-hero::after{background:linear-gradient(90deg,#faf8f3 3%,rgba(250,248,243,.97) 58%,rgba(250,248,243,.28) 82%)}
.r1620-pattern-hero>div,.r1620-patterns,.r1620-goal,.r1620-pattern-hero>.r1620-lesson-pager{position:relative;z-index:2}
.r1620-pattern-hero>div>h1{font-size:43px;margin:16px 0}
.r1620-screen-label{text-transform:uppercase;color:#332067;font-weight:700;font-size:13px}
.r1620-pattern-hero>div>h2{font:700 20px/1.4 Arial,sans-serif;color:#50562f;max-width:470px}
.r1620-pattern-hero>div>p:last-child{font-size:14px;max-width:610px}
.r1620-practice{position:absolute;z-index:3;right:50px;top:165px;width:275px;background:rgba(254,252,247,.94);border:1px solid #b59d77;border-radius:18px;padding:28px;color:#172237}
.r1620-practice h2{font:700 15px Arial,sans-serif;text-transform:uppercase;color:#432279;display:flex;align-items:center;gap:13px}
.r1620-practice p{font-size:14px;line-height:1.55}
.r1620-practice hr{border:0;border-top:1px solid #d9c8b8;margin:19px 0}
.r1620-practice h3{color:#432279;font-size:16px}
.r1620-reassurance{display:flex;gap:15px;align-items:center}
.r1620-reassurance .r1620-icon{width:38px;height:38px;color:#b8731c}
.r1620-practice>strong{display:block;color:#432279;font-size:16px;line-height:1.6}
.r1620-patterns{display:grid;grid-template-columns:1fr 62px 1.1fr;max-width:660px;margin-top:30px}
.r1620-patterns section{border-right:1px solid #d8d0c7;padding-right:35px}
.r1620-patterns section:last-child{border:0;padding:0 0 0 12px}
.r1620-chip{display:inline-block;background:#ded8d2;border-radius:16px;padding:5px 14px;text-transform:uppercase;font-size:11px;font-weight:700;margin-bottom:10px}
.r1620-chip--new{background:#e4dbed;color:#3e206e;text-decoration:underline}
.r1620-patterns h3{font-size:13px}
.r1620-patterns ol{list-style:none;padding:0;margin:0}
.r1620-patterns li{display:flex;align-items:center;gap:12px;min-height:47px;font-size:12px}
.r1620-patterns li .r1620-icon,.r1620-patterns li>b{width:35px;height:35px;border-radius:50%;background:#8a847d;color:#fff;padding:8px;display:grid;place-items:center;flex:0 0 auto}
.r1620-patterns section:last-child li>b{background:#fff;color:#3e216c;border:1px solid #5b3584;padding:0;font-size:15px}
.r1620-patterns li span{border-bottom:1px solid #ddd5cc;padding-bottom:10px;flex:1}
.r1620-pattern-arrow{width:48px;height:48px;border:1px solid #b4721d;color:#b4721d;border-radius:50%;display:grid;place-items:center;align-self:center;justify-self:center;font-size:28px;background:#fff}
.r1620-goal{display:flex;align-items:center;gap:26px;max-width:745px;margin:34px 0 12px;padding:17px 26px;background:rgba(251,246,239,.9);border:1px solid #dfc9ad;border-radius:10px}
.r1620-goal>b{font-size:55px;color:#3b1c72;line-height:.5}
.r1620-goal p{margin:0;font-size:13px}
.r1620-goal strong{color:#381b71;font-size:14px}

@media(max-width:1050px){
  .r1620-topbar__nav{gap:18px}.r1620-conversation{padding-inline:14px}.r1620-rail{width:270px;flex-basis:270px}.r1620--lesson .r1620-rail{width:270px;flex-basis:270px}
  .r1620-look-rows article{grid-template-columns:1fr 46px 1.2fr 50px}.r1620-reflection__content{padding-inline:25px}.r1620-coursebar{padding-inline:25px}
  .r1620-landing-copy{left:34px}.r1620-landing-steps{right:20px}.r1620-movements__grid{grid-template-columns:1fr 40px 1fr}.r1620-movement{padding-inline:20px}
  .r1620-lesson-hero>div{left:30px;width:480px}.r1620-lesson-hero h1{font-size:43px}.r1620-screen-columns>article{padding-left:30px;padding-right:25px}
  .r1620-pattern-hero{padding-left:35px;padding-right:300px}.r1620-practice{right:25px;width:250px}.r1620-patterns{max-width:610px}
}
@media(max-width:760px){
  .r1620-topbar{height:auto;min-height:82px;flex-wrap:wrap;padding:10px 16px}.r1620-topbar .r1620-logo{width:190px}.r1620-topbar .r1620-logo .r1620-icon{width:42px;height:42px}.r1620-topbar__nav{order:4;width:100%;justify-content:space-between;height:42px}.r1620-topbar__nav a.is-active::after{bottom:0}.r1620-conversation{font-size:10px;padding:9px}.r1620-account{display:none}
  .r1620--reflection{display:block}.r1620-rail,.r1620--lesson .r1620-rail{width:100%;min-height:auto;display:block;padding:8px}.r1620-rail>.r1620-logo,.r1620-rail__label,.r1620-help{display:none}.r1620-rail__journey{display:grid;grid-template-columns:repeat(4,1fr)}.r1620-rail__journey>a{display:block;text-align:center;min-height:56px;padding:8px 4px}.r1620-rail__journey>a>.r1620-icon{width:22px;height:22px}.r1620-rail__journey small,.r1620-rail__journey>a>.r1620-icon:last-child{display:none}.r1620-rail__lessons,.r1620-rail__part{display:none}
  .r1620-coursebar{height:74px;padding-inline:16px}.r1620-coursebar__tools{display:none}.r1620-reflection__content{padding:18px 16px}.r1620-reflection__content>h1{font-size:36px}.r1620-anger-grid{grid-template-columns:1fr}.r1620-look-rows article{grid-template-columns:1fr 42px}.r1620-look-rows article>div:nth-of-type(2){grid-column:1}.r1620-row-arrow{grid-row:1/3;grid-column:2}.r1620-book{grid-column:2;display:none}.r1620-dots{display:none}
  .r1620-landing-hero{height:720px}.r1620-landing-hero::after{background:linear-gradient(180deg,rgba(251,248,243,.98) 0%,rgba(251,248,243,.87) 62%,rgba(10,15,31,.2))}.r1620-landing-copy{left:22px;right:22px;top:25px;width:auto}.r1620-landing-copy h1{font-size:54px}.r1620-landing-steps{left:22px;right:22px;top:auto;bottom:18px;width:auto;display:grid;grid-template-columns:1fr 1fr}.r1620-landing-steps span{min-height:70px}.r1620-way{grid-template-columns:1fr;padding:25px;text-align:center}.r1620-way__art{margin:auto}.r1620-way p{border:0;padding:0}.r1620-movements__grid{grid-template-columns:1fr}.r1620-between{transform:rotate(90deg)}.r1620-movement--2 .r1620-movement__steps{grid-template-columns:repeat(4,1fr)}.r1620-landing-quote{grid-template-columns:1fr;padding:25px}.r1620-landing-quote blockquote{border-left:0;border-top:1px solid #a77837;padding:25px 0 0}.r1620-principles{grid-template-columns:1fr;margin:0;padding:14px}.r1620-principles>span{border-right:0;border-bottom:1px solid #ddd5cc;padding:14px}
  .r1620-lesson-shell{display:block}.r1620-lesson-hero{height:650px}.r1620-lesson-hero::after{background:linear-gradient(180deg,#faf8f3 3%,rgba(250,248,243,.92) 68%,rgba(250,248,243,.3))}.r1620-lesson-hero>div{left:22px;right:22px;top:22px;width:auto}.r1620-lesson-hero h1{font-size:39px}.r1620-lesson-hero blockquote{right:22px;left:22px;top:auto;bottom:20px;width:auto}.r1620-screen-card{margin:0;border-radius:0;padding-inline:15px}.r1620-screen-columns{grid-template-columns:1fr}.r1620-screen-columns>article{padding:15px}.r1620-screen-columns>article+article{border-left:0;border-top:1px solid #ddd5cc;padding-left:15px}.r1620-life-list{grid-template-columns:1fr}.r1620-lesson-pager a{padding:10px;font-size:10px}
  .r1620-pattern-hero{padding:26px 18px 0;min-height:1500px}.r1620-pattern-hero::after{background:rgba(250,248,243,.88)}.r1620-pattern-hero>div>h1{font-size:36px}.r1620-practice{position:relative;top:auto;right:auto;width:auto;margin:25px 0}.r1620-patterns{grid-template-columns:1fr;margin-top:25px}.r1620-patterns section{border:0;padding:0}.r1620-patterns section:last-child{padding:0}.r1620-pattern-arrow{margin:14px auto;transform:rotate(90deg)}.r1620-goal{margin-top:25px}.r1620-pattern-hero>.r1620-lesson-pager{margin-top:15px}
}
`;
