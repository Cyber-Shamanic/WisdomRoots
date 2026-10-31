/* WisdomRoots 0.0.3 — original browser-local, dependency-free interface */
(() => {
  'use strict';
  const DOCS = [
    {file:'README.md',label:'מבוא למאגר',icon:'⌂'},
    {file:'INDEX_HE.md',label:'תוכן עניינים — 119 עמודים',icon:'▦'},
    {file:'ANALYSIS_HE.md',label:'הניתוח המלא של הספר',icon:'☷'},
    {file:'CONTENT_ATLAS_HE.md',label:'אטלס יצירה',icon:'✺'},
    {file:'CARDS_TEXT_HE.md',label:'נוסחי שבעת הקלפים',icon:'✦'},
    {file:'TODO.md',label:'מפת דרכים — 100 משימות',icon:'☑'},
    {file:'CHANGELOG.md',label:'יומן הגרסאות',icon:'↻'}
  ];
  const GATES = [
    {id:'01',title:'שַׁעַר הַבִּטָּחוֹן',plain:'ביטחון',virtue:'יְצִיבוּת',emoji:'🌳',desc:'אחיזה בקרקע, אמון שנבנה בצעדים קטנים ויכולת להתמיד.',quote:'הַבִּטָּחוֹן נִבְנֶה בְּכָל צַעַד.',action:'הַשְׁלֵם הַיּוֹם פְּעֻלָּה אַחַת שֶׁדָּחִיתָ.',source:'17–20'},
    {id:'02',title:'שַׁעַר הַיְּצִירָה',plain:'יצירה',virtue:'פְּתִיחוּת',emoji:'💧',desc:'היכולת לפתוח דרך חדשה ולתת לרעיון קטן לקבל צורה.',quote:'הַיְּצִירָה פּוֹתַחַת דְּרָכִים.',action:'הַקְדֵּשׁ חָמֵשׁ דַּקּוֹת לִיצִירָה חָדָשָׁה.',source:'18–22'},
    {id:'03',title:'שַׁעַר הָאַחֲרָיוּת',plain:'אחריות',virtue:'עֲשִׂיָּה',emoji:'🪜',desc:'להפוך רצון לכיוון, כיוון לצעד וצעד לתוצאה.',quote:'אַחֲרָיוּת הוֹפֶכֶת רָצוֹן לְמַעֲשֶׂה.',action:'בְּחַר פְּעֻלָּה קְטַנָּה וּבַצַּע אוֹתָהּ.',source:'17–21'},
    {id:'04',title:'שַׁעַר הַחֶמְלָה',plain:'חמלה',virtue:'חֶסֶד',emoji:'🌹',desc:'לפנות מקום בלב, לראות את הזולת ולהיטיב במעשה.',quote:'לֵב פָּתוּחַ מַרְבֶּה טוֹבָה.',action:'הַעֲנֵק מַחֲוָה קְטַנָּה שֶׁל חֶסֶד.',source:'17–21'},
    {id:'05',title:'שַׁעַר הַבִּטּוּי',plain:'ביטוי',virtue:'אֱמֶת',emoji:'🔔',desc:'לתת קול לכוונה הפנימית ביושר, בכנות ובכבוד.',quote:'אֱמֶת נֶאֱמֶרֶת בְּכָבוֹד.',action:'אֱמֹר מִשְׁפָּט אֶחָד בְּכֵנוּת וּבְרַכּוּת.',source:'18–22'},
    {id:'06',title:'שַׁעַר הַהִתְבּוֹנְנוּת',plain:'התבוננות',virtue:'חָכְמָה',emoji:'👁️',desc:'להאט, לשאול שאלות ולבחון את המובן מאליו.',quote:'שְׁאֵלָה טוֹבָה פּוֹתַחַת עוֹלָם.',action:'בְּדֹק הַנָּחָה אַחַת לִפְנֵי הַחְלָטָה.',source:'17–22'},
    {id:'07',title:'שַׁעַר הַחִבּוּר',plain:'חיבור',virtue:'אַחְדוּת',emoji:'✨',desc:'לראות את השוני, להקשיב וליצור דבר משותף.',quote:'מִן הַשּׁוֹנִי נוֹלֶדֶת אַחְדוּת.',action:'הַקְשֵׁב לְדֵעָה שׁוֹנָה מִשֶּׁלְּךָ.',source:'17–22'}
  ];
  const TOPICS = [
    ['✨','אור, מוח ואנטומיה סמלית',1,12],['🌌','מישורי קיום ושבעת המרכזים',13,22],
    ['🧠','דע את עצמך וחמשת היסודות',23,32],['🌍','קוסמולוגיה וסמלי שמיים',33,48],
    ['🪐','זמן, שבתאי וגלגול הנשמה',49,58],['🌳','אסטרולוגיה, מספר 12 ועץ החיים',59,70],
    ['🔯','גאומטריה מקודשת ואלקטרומגנטיות',71,82],['💚','הגוף, מוזיקה ותדרים',83,93],
    ['☀️','שמש, נצרות, מצרים והלב',94,100],['🪬','נפש, ידיים, מסדרים וסמליות',101,112],
    ['❤️','מיניות, יחסים ואיזון',113,117],['⚖️','שבעת החוקים ואחרית דבר',118,119]
  ];
  const state = {route:'home',doc:'ANALYSIS_HE.md',mapQuery:'',mapTopic:'all',taskFilter:'all',taskQuery:'',cardTurn:{},selectedCard:null,selectedSide:'front',query:''};
  const contents = {};
  let pages=[],tasks=[];
  let taskOverrides={};
  const $=s=>document.querySelector(s);
  const esc=s=>String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const clean=s=>String(s??'').normalize('NFD').replace(/[\u0591-\u05C7]/g,'').replace(/[\u200e\u200f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
  const img=(side,id)=>`assets/cards/${side}/${id}.png`;
  const fileUrl=file=>`content/${encodeURIComponent(file)}`;
  const stat=n=>new Intl.NumberFormat('en-US').format(n);

  function mdInline(source){
    let s=esc(source);
    s=s.replace(/`([^`]+)`/g,'<code>$1</code>');
    s=s.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
    s=s.replace(/\*([^*]+)\*/g,'<em>$1</em>');
    s=s.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(all,label,href)=>{
      const url=href.replace(/&amp;/g,'&');
      if(!/^(https?:\/\/|\.\.?\/|[a-zA-Z0-9_.-]+(?:\.md)?)$/.test(url))return label;
      const target=/^https?:\/\//.test(url)?' target="_blank" rel="noopener noreferrer"':'';
      return `<a href="${esc(url)}"${target}>${label}</a>`;
    });
    return s;
  }
  function markdownToHtml(md){
    const lines=String(md||'').replace(/\r/g,'').split('\n');
    const out=[];let list=null;let code=false;let codeLines=[];
    const closeList=()=>{if(list){out.push(`</${list}>`);list=null;}};
    for(let i=0;i<lines.length;i++){
      const line=lines[i],trim=line.trim();
      if(trim.startsWith('```')){
        closeList();if(code){out.push(`<pre><code>${esc(codeLines.join('\n'))}</code></pre>`);codeLines=[];code=false;}else code=true;continue;
      }
      if(code){codeLines.push(line);continue;}
      if(!trim){closeList();continue;}
      if(/^---+$/.test(trim)){closeList();out.push('<hr>');continue;}
      let m=trim.match(/^(#{1,6})\s+(.+)$/);
      if(m){closeList();const level=Math.min(m[1].length,4);out.push(`<h${level}>${mdInline(m[2])}</h${level}>`);continue;}
      if(trim.startsWith('|') && i+1<lines.length && /^\|?[\s:|-]*-{3,}/.test(lines[i+1].trim())){
        closeList();const header=trim.slice(1,-1).split('|').map(t=>t.trim());let html='<div class="table-scroll"><table><thead><tr>';
        for(const h of header)html+=`<th>${mdInline(h)}</th>`;
        html+='</tr></thead><tbody>';i++;
        while(i+1<lines.length && lines[i+1].trim().startsWith('|')){
          i++;const row=lines[i].trim().replace(/^\|/,'').replace(/\|$/,'').split('|');
          html+='<tr>';for(const cell of row)html+=`<td>${mdInline(cell.trim())}</td>`;html+='</tr>';
        }
        out.push(html+'</tbody></table></div>');continue;
      }
      if(trim.startsWith('>')){closeList();out.push(`<blockquote>${mdInline(trim.replace(/^>\s?/,''))}</blockquote>`);continue;}
      m=trim.match(/^[-*]\s+\[([ xX])\]\s+(.+)$/);
      if(m){if(list!=='ul'){closeList();out.push('<ul>');list='ul';}out.push(`<li class="checkline">${m[1].toLowerCase()==='x'?'☑':'☐'} ${mdInline(m[2])}</li>`);continue;}
      m=trim.match(/^[-*]\s+(.+)$/);
      if(m){if(list!=='ul'){closeList();out.push('<ul>');list='ul';}out.push(`<li>${mdInline(m[1])}</li>`);continue;}
      m=trim.match(/^\d+\.\s+(.+)$/);
      if(m){if(list!=='ol'){closeList();out.push('<ol>');list='ol';}out.push(`<li>${mdInline(m[1])}</li>`);continue;}
      closeList();out.push(`<p>${mdInline(trim)}</p>`);
    }
    closeList();return out.join('\n');
  }
  function parsePages(){
    pages=[];let group='';
    for(const line of (contents['INDEX_HE.md']||'').split('\n')){
      let m=line.match(/^##\s+(.+)\s+—\s+עמ׳\s+\d/);if(m){group=m[1].trim();continue;}
      m=line.match(/^\|\s*(\d+)\s*\|\s*([^|]+)\|\s*([^|]+)\|/);
      if(m)pages.push({page:Number(m[1]),english:m[2].trim(),hebrew:m[3].trim(),group});
    }
  }
  function parseTasks(){
    tasks=[];let group='';
    for(const line of (contents['TODO.md']||'').split('\n')){
      let m=line.match(/^##\s+\d+\.\s+(.+?)\s+—\s+10\s+משימות/);if(m){group=m[1];continue;}
      m=line.match(/^-\s+\[([ xX])\]\s+(T\d{3})\s+—\s+(.+)$/);
      if(m)tasks.push({checked:m[1].toLowerCase()==='x',id:m[2],text:m[3],group});
    }
    try{taskOverrides=JSON.parse(localStorage.getItem('wisdomroots.tasks.v1')||'{}')||{};}catch{taskOverrides={};}
  }
  function taskDone(t){return Object.prototype.hasOwnProperty.call(taskOverrides,t.id)?!!taskOverrides[t.id]:t.checked;}
  function taskProgress(){return tasks.filter(taskDone).length;}
  function pageName(){return {home:'בית הספרייה',cards:'שבעת שערי הלב',map:'מפת הספר',read:'מחקר וניתוח',atlas:'אטלס היצירה',todo:'מפת המשימות',changes:'יומן גרסאות',about:'אודות וקרדיטים',search:'תוצאות חיפוש'}[state.route]||'בית הספרייה';}
  function header(kicker,title,subtitle){return `<div class="page-heading"><span class="tag">${kicker}</span><h1>${title}</h1><p>${subtitle}</p></div>`;}
  function home(){
    return `<section class="hero"><div class="hero-copy"><span class="kicker">✦ ספריית ידע מתפתחת · גרסה 0.0.3</span><h1>הַחָכְמָה<br><span>מַכָּה שֹׁרֶשׁ</span></h1><p>מסע עברי בין אור, תודעה, סמלים ומידות האדם. מיפוי ביקורתי של 119 עמודי <i>The Book of Wisdom</i> לצד שבעה קלפי חכמה מקוריים וארכיון יצירה מתרחב.</p><div class="actions"><button class="button button-primary" data-route="cards">✦ לגלריית הקלפים</button><button class="button button-outline" data-route="map">▦ למפת 119 העמודים</button></div></div><div class="hero-art"><div class="hero-orbit"></div><img src="${img('front','07')}" alt="קלף שער החיבור: עץ אור וענפים שזורים"></div></section>
      <div class="stats-grid"><div class="stat-card"><span class="stat-icon">📖</span><b>119</b><p>עמודי תוכן מקוטלגים</p></div><div class="stat-card"><span class="stat-icon">✦</span><b>14</b><p>תמונות קלפים, חזית וגב</p></div><div class="stat-card"><span class="stat-icon">☷</span><b>12</b><p>אשכולות ידע ופרשנות</p></div><div class="stat-card"><span class="stat-icon">☑</span><b>100</b><p>משימות במפת הפיתוח</p></div></div>
      <div class="section-heading"><div><h2>שבעת שערי הלב</h2><p>קלפים מקוריים שמחברים סמל, מידה ומעשה יומי.</p></div><button class="link-button" data-route="cards">לכל שבעת הקלפים ←</button></div>
      <div class="card-thumb-list">${GATES.map(g=>`<button class="card-thumb" data-card="${g.id}" aria-label="פתיחת ${esc(g.title)}"><img loading="lazy" src="${img('front',g.id)}" alt="${esc(g.title)}"><span>${g.emoji} ${esc(g.plain)}</span></button>`).join('')}</div>
      <div class="section-heading"><div><h2>12 שערי הלימוד</h2><p>מפת ניווט ל־119 עמודי המקור, עם תרגום כותרות והבחנה בין סמל לעובדה.</p></div><button class="link-button" data-route="read">לעיון בניתוח המלא ←</button></div>
      <div class="topic-grid">${TOPICS.map((t,i)=>`<button class="topic" data-topic="${i}"><span class="topic-emoji">${t[0]}</span><span><strong>${esc(t[1])}</strong><small>עמודים ${t[2]}–${t[3]} · ${t[3]-t[2]+1} מקטעים</small></span></button>`).join('')}</div>
      <div class="section-heading"><div><h2>הגישה שלנו לחכמה</h2><p>לומדים, מפרשים ובודקים — ואז יוצרים משהו שאפשר לקחת לחיים.</p></div></div>
      <div class="panel feature-panel"><div><p class="eyebrow">עיקרון עריכה</p><blockquote>״לֹא כָּל סֵמֶל הוּא רְאָיָה, אֲבָל כָּל סֵמֶל יָכוֹל לִפְתֹּחַ שְׁאֵלָה.״</blockquote><p>נבחין בין ידע מתועד, סמל, טענה בלתי מבוססת וטענה שגויה — כדי לשמור על החופש ליצור ועל האחריות לדייק.</p></div><div class="symbols" aria-hidden="true">✦ ⟡ ✧</div></div>`;
  }
  function cards(){
    return header('7 שערים · 14 איורים','שבעת שערי הלב','לחצו על קלף כדי להפוך אותו. לכל שער חזית וגב משלו, מידה מובילה ופעולה מעשית.')+
      `<div class="card-grid">${GATES.map(g=>`<article class="card-entry"><div class="flip-scene" tabindex="0" role="button" aria-label="היפוך קלף ${esc(g.title)}" aria-pressed="false" data-flip="${g.id}"><div class="flip-inner"><div class="flip-face"><img loading="lazy" src="${img('front',g.id)}" alt="חזית ${esc(g.title)}"></div><div class="flip-face flip-back"><img loading="lazy" src="${img('back',g.id)}" alt="גב ${esc(g.title)}"></div></div></div><div class="card-foot"><div><b>${g.emoji} ${esc(g.title)}</b><p>מידה: ${esc(g.virtue)}</p></div><span class="tag">${g.id} / 07</span></div><div class="card-toolbar"><button class="mini-button" data-flip="${g.id}">↻ היפוך</button><button class="mini-button" data-card="${g.id}">⌕ הגדלה</button><a class="mini-button" href="${img('front',g.id)}" download="wisdomroots-front-${g.id}.png">↓ חזית</a><a class="mini-button" href="${img('back',g.id)}" download="wisdomroots-back-${g.id}.png">↓ גב</a></div></article>`).join('')}</div>
      <div class="rights-note">📐 קובצי המקור הם PNG בגודל 1024×1536 פיקסלים (יחס 2:3). נוסחי הניקוד המדויקים נמצאים במסמך הטקסט. לפני הדפסה מסחרית יש לבצע הגהת ניקוד ועימוד עם שטח גלישה לחיתוך.</div>`;
  }
  function map(){
    const topicOptions=TOPICS.map((t,i)=>`<option value="${i}" ${String(i)===state.mapTopic?'selected':''}>${esc(t[1])} (${t[2]}–${t[3]})</option>`).join('');
    const filtered=pages.filter(p=>{
      const within=state.mapTopic==='all'||(p.page>=TOPICS[Number(state.mapTopic)][2]&&p.page<=TOPICS[Number(state.mapTopic)][3]);
      return within&&clean([p.page,p.hebrew,p.english,p.group].join(' ')).includes(clean(state.mapQuery));
    });
    return header('119 מקטעים · 12 אשכולות','מפת הספר','תוכן עניינים עברי שנבנה מתוך כותרות העמודים המקוריים. לחצו על עמוד כדי לקבל מיקום והסבר.')+
      `<div class="filters"><input class="field" id="mapQuery" type="search" placeholder="חיפוש לפי מונח או מספר עמוד..." value="${esc(state.mapQuery)}" aria-label="חיפוש במפת הספר"><select class="select" id="mapTopic" aria-label="סינון לפי נושא"><option value="all">כל 12 השערים</option>${topicOptions}</select></div><p class="results-count">מציגים ${filtered.length} מתוך ${pages.length} עמודים · עמוד ספר N = עמוד PDF מספר N+3</p>
      ${filtered.length?`<div class="page-map-grid">${filtered.map(p=>`<button class="page-record" data-page="${p.page}"><span class="page-number">${p.page}</span><span><strong>${esc(p.hebrew)}</strong><small>${esc(p.english)}</small><em>${esc(p.group)}</em></span></button>`).join('')}</div>`:'<div class="empty-state"><span>⌕</span>לא נמצאו עמודים התואמים לחיפוש.</div>'}`;
  }
  function reader(file=state.doc){
    const meta=DOCS.find(x=>x.file===file)||DOCS[2];const md=contents[file]||'לא ניתן לטעון את המסמך.';
    return header('מסמכי מקור · Markdown','מחקר, מקורות ופרשנות','כל החומר שהופק עד כה, עם ניווט בין מסמכים ועימוד קריא בעברית מלאה.')+
      `<div class="reading-layout"><nav class="reader-nav" aria-label="בחירת מסמך">${DOCS.map(d=>`<button class="${d.file===file?'selected':''}" data-doc="${d.file}">${d.icon} ${d.label}</button>`).join('')}</nav><article class="doc-article"><div class="doc-meta"><span>📄 ${esc(meta.label)}</span><span>·</span><span>קובץ ${esc(file)}</span><span>·</span><a href="${fileUrl(file)}" download="${file}">↓ הורדת Markdown</a></div><div class="markdown-body">${markdownToHtml(md)}</div></article></div>`;
  }
  function atlas(){return header('60 כיווני יצירה · תכנון פתוח','אטלס היצירה','הצעות לקלפים, סטיקרים, כרזות, ספרונים ושפה גרפית, עם עמודי מקור לכל רעיון.')+`<div class="doc-article markdown-body">${markdownToHtml(contents['CONTENT_ATLAS_HE.md'])}</div>`;}
  function todo(){
    const done=taskProgress(),progress=tasks.length?Math.round(done/tasks.length*100):0;
    const groups=[...new Set(tasks.map(t=>t.group))];
    let count=0;
    const groupHtml=groups.map(group=>{
      const all=tasks.filter(t=>t.group===group),shown=all.filter(t=>{
        const status=taskDone(t);const match=clean([t.id,t.text,t.group].join(' ')).includes(clean(state.taskQuery));
        return match&&(state.taskFilter==='all'||(state.taskFilter==='done'?status:!status));
      });
      if(!shown.length)return '';
      count+=shown.length;
      return `<section class="task-group"><h3>${esc(group)} <span>${all.filter(taskDone).length}/${all.length} הושלמו</span></h3>${shown.map(t=>`<label class="task-line ${taskDone(t)?'done':''}"><input type="checkbox" data-task="${t.id}" ${taskDone(t)?'checked':''}><span><b>${t.id}</b>${esc(t.text)}</span></label>`).join('')}</section>`;
    }).join('');
    return header('100 משימות · 10 תחומים','מפת הדרכים','סמנו משימות שהשלמתם. הסימונים נשמרים באופן מקומי בדפדפן שלכם ואינם משנים את מסמך המקור.')+
      `<div class="task-summary"><div class="progress-circle" style="--progress:${progress}%"><strong>${progress}%</strong></div><div><h3>${done} מתוך ${tasks.length} משימות הושלמו</h3><p>המאגר חי ומתפתח. בכל גרסה נוסיף יצירות ונסמן משימות שבוצעו באופן רשמי.</p><div class="meter"><span style="width:${progress}%"></span></div><button class="button button-small button-outline" data-doc="TODO.md">↗ פתיחת מסמך המשימות המלא</button></div></div>
      <div class="filters"><input class="field" id="taskQuery" type="search" placeholder="חיפוש משימה, נושא או מזהה..." value="${esc(state.taskQuery)}" aria-label="חיפוש משימות"><div class="pill-tabs"><button data-task-filter="all" class="${state.taskFilter==='all'?'active':''}">הכול</button><button data-task-filter="pending" class="${state.taskFilter==='pending'?'active':''}">לביצוע</button><button data-task-filter="done" class="${state.taskFilter==='done'?'active':''}">הושלמו</button></div></div><p class="results-count">${count} משימות בתצוגה</p>${groupHtml||'<div class="empty-state"><span>☑</span>אין משימות במסנן זה.</div>'}`;
  }
  function changes(){return header('מהדורה מתועדת','יומן הגרסאות','היסטוריית השינויים מן ההקמה ועד סדרת שבעת שערי הלב.')+`<div class="doc-article markdown-body">${markdownToHtml(contents['CHANGELOG.md'])}</div>`;}
  function about(){
    return header('הפרויקט והיוצרים','אודות WisdomRoots','מאגר עברי מתפתח לניתוח ביקורתי, פרשנות יצירתית, עיצוב ומעקב אחר תוצרים.')+
      `<div class="about-grid"><section class="about-card"><p class="eyebrow">יוזם ומפתח</p><h3>לאון יעקובוב · AnLoMinus</h3><p>Cyber Shamanic — סייבר, בינה מלאכותית, אוטומציה, חשיבה יצירתית וקוד פתוח. יוזם המהדורה העברית של WisdomRoots.</p><div class="contact-links"><a href="mailto:GlobalElite8200@gmail.com">✉ אימייל</a><a href="https://wa.me/972543285967" target="_blank" rel="noopener noreferrer">✆ 054-328-5967 · WhatsApp</a><a href="https://wa.me/972535366687" target="_blank" rel="noopener noreferrer">✆ 053-536-6687 · WhatsApp</a><a href="https://github.com/Anlominus" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://www.linkedin.com/in/anlominus/" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://www.facebook.com/AnlominusX" target="_blank" rel="noopener noreferrer">Facebook</a><a href="https://codepen.io/Anlominus" target="_blank" rel="noopener noreferrer">CodePen</a></div></section>
      <section class="about-card"><p class="eyebrow">מקור ומסגרת עבודה</p><h3>The Book of Wisdom</h3><p>המחבר המקורי: Revival of Wisdom. מיפוי תוכן, ניתוח ועיבוד עברי: פרויקט WisdomRoots. שבעת קלפי הלב הם טקסטים ואיורים מקוריים שנוצרו בהשראת נושאי הספר, ואינם שכפול של ציורי המקור.</p><p><strong>חשוב:</strong> הספר מערב מקורות שונים וטענות שגויות או לא מאומתות. אנו מבדילים בין סמל, פרשנות, ידע מתועד וטענה שמחייבת בדיקה.</p><button class="button button-small button-outline" data-route="read">📖 למתודולוגיית הניתוח</button></section></div>
      <div class="rights-note"><strong>זכויות יוצרים ופרסום:</strong> הספר המקורי אינו מאוחסן באתר ואינו מופץ כאן. כל זכויות הטקסט והאיורים המקוריים נשמרות לבעליהן. פרפראזות, עיצוב ואיורים חדשים מסומנים כיצירה נפרדת. בעת הוצאת תרגומים מלאים או שימוש בדימויים מקוריים נדרשת בדיקת זכויות מתאימה.</div>`;
  }
  function search(){
    const q=clean(state.query);const results=[];
    if(q){
      for(const p of pages)if(clean([p.hebrew,p.english,p.group,p.page].join(' ')).includes(q))results.push({type:'page',title:`עמ׳ ${p.page} — ${p.hebrew}`,sub:p.english,id:p.page,label:'מפת הספר'});
      for(const g of GATES)if(clean([g.title,g.plain,g.virtue,g.quote,g.desc].join(' ')).includes(q))results.push({type:'card',title:g.title,sub:g.desc,id:g.id,label:'קלף'});
      for(const t of tasks)if(clean([t.id,t.text,t.group].join(' ')).includes(q))results.push({type:'task',title:`${t.id} — ${t.text}`,sub:t.group,id:t.id,label:'משימה'});
      for(const doc of DOCS)for(const line of (contents[doc.file]||'').split('\n')){
        if(line.length>24&&clean(line).includes(q)&&!line.startsWith('|---')){results.push({type:'doc',title:doc.label,sub:line.replace(/^#+\s*/,'').slice(0,230),id:doc.file,label:'מסמך'});if(results.length>250)break;}
      }
    }
    const display=results.slice(0,60);
    return header('חיפוש חוצה ספרייה','תוצאות חיפוש',`נמצאו ${results.length} אזכורים למונח „${esc(state.query)}”. התצוגה מוגבלת ל־60 תוצאות ראשונות.`)+
      `<div class="search-result-list">${display.map(r=>`<button class="search-result" data-result-type="${r.type}" data-result-id="${esc(r.id)}"><small>${r.label}</small><strong>${esc(r.title)}</strong><p>${esc(r.sub)}</p></button>`).join('')||'<div class="empty-state"><span>⌕</span>אין תוצאות. נסו מילה אחרת או חיפוש ללא ניקוד.</div>'}</div>`;
  }
  function render(){
    const main=$('#main');
    main.innerHTML=({home,cards,map,read:reader,atlas,todo,changes,about,search}[state.route]||home)();
    $('#currentCrumb').textContent=pageName();
    document.querySelectorAll('.nav-item').forEach(el=>{el.classList.toggle('active',el.dataset.route===state.route);el.setAttribute('aria-current',el.dataset.route===state.route?'page':'false');});
    if(state.route==='map')bindMapFields();
    if(state.route==='todo')bindTaskFields();
  }
  function navigate(route){state.route=route;const hash=`#/${route}`;if(location.hash!==hash)history.replaceState(null,'',hash);render();window.scrollTo({top:0,behavior:'smooth'});closeMenu();}
  function bindMapFields(){
    $('#mapQuery')?.addEventListener('input',e=>{const pos=e.target.selectionStart;state.mapQuery=e.target.value;render();const input=$('#mapQuery');input.focus();input.setSelectionRange(pos,pos);});
    $('#mapTopic')?.addEventListener('change',e=>{state.mapTopic=e.target.value;render();});
  }
  function bindTaskFields(){
    $('#taskQuery')?.addEventListener('input',e=>{const pos=e.target.selectionStart;state.taskQuery=e.target.value;render();const input=$('#taskQuery');input.focus();input.setSelectionRange(pos,pos);});
  }
  function openCard(id){
    const g=GATES.find(x=>x.id===id);if(!g)return;
    state.selectedCard=id;state.selectedSide='front';
    $('#dialogCardTitle').textContent=g.title;
    $('#dialogCardImage').src=img('front',id);$('#dialogCardImage').alt=`חזית ${g.title}`;
    $('#dialogCardInfo').innerHTML=`<span class="tag">שער ${g.id} מתוך 7</span><h3>${g.emoji} ${esc(g.virtue)}</h3><p>${esc(g.desc)}</p><p class="action-copy">״${esc(g.quote)}״</p><p><strong>פעולה להיום:</strong> ${esc(g.action)}</p><p><small>השראה רעיונית: The Book of Wisdom, עמ׳ ${g.source}. המשפטים והאיור מקוריים.</small></p><div class="actions"><button class="button button-primary" id="dialogFlip">↻ הצגת גב הקלף</button><a class="button button-outline" id="dialogDownload" href="${img('front',id)}" download="wisdomroots-${id}-front.png">↓ הורדת תמונה</a></div>`;
    $('#cardDialog').showModal();
  }
  function flipDialog(){
    if(!state.selectedCard)return;state.selectedSide=state.selectedSide==='front'?'back':'front';
    const g=GATES.find(x=>x.id===state.selectedCard);
    $('#dialogCardImage').src=img(state.selectedSide,g.id);
    $('#dialogCardImage').alt=`${state.selectedSide==='front'?'חזית':'גב'} ${g.title}`;
    $('#dialogFlip').textContent=state.selectedSide==='front'?'↻ הצגת גב הקלף':'↻ הצגת חזית הקלף';
    $('#dialogDownload').href=img(state.selectedSide,g.id);
    $('#dialogDownload').download=`wisdomroots-${g.id}-${state.selectedSide}.png`;
  }
  function showPage(page){
    const p=pages.find(x=>x.page===Number(page));if(!p)return;
    const topic=TOPICS.find(x=>p.page>=x[2]&&p.page<=x[3]);
    const doc=$('#versionDialog');
    doc.querySelector('.dialog-top h2').textContent=`עמוד ${p.page} · ${p.hebrew}`;
    $('#versionContent').innerHTML=`<p class="eyebrow">${topic?topic[0]+' '+esc(topic[1]):'מפת הספר'}</p><h2>הכותרת המקורית</h2><p dir="ltr" style="text-align:right">${esc(p.english)}</p><h2>שם עברי</h2><p>${esc(p.hebrew)}</p><p><strong>הפניה:</strong> עמוד ${p.page} בספר, עמוד ${p.page+3} בקובץ PDF.</p><p>השם הוא תרגום מערכתי שנוצר מתוך הכותרת המקורית. הטענות עצמן מוסברות ונבחנות במסמך הניתוח.</p><p><button class="button button-small" data-doc="ANALYSIS_HE.md">לעיון בניתוח הספר ←</button></p>`;
    doc.showModal();
  }
  function openVersion(){const dlg=$('#versionDialog');dlg.querySelector('.dialog-top h2').textContent='יומן גרסאות';$('#versionContent').innerHTML=markdownToHtml(contents['CHANGELOG.md']||'');dlg.showModal();}
  function closeMenu(){const side=$('#sidebar');side.classList.remove('open');$('#sidebarBackdrop').hidden=true;$('#menuBtn').setAttribute('aria-expanded','false');}
  function handleClick(event){
    const routeBtn=event.target.closest('[data-route]');if(routeBtn){navigate(routeBtn.dataset.route);return;}
    const docBtn=event.target.closest('[data-doc]');if(docBtn){state.doc=docBtn.dataset.doc;if($('#versionDialog').open)$('#versionDialog').close();navigate('read');return;}
    const topicBtn=event.target.closest('[data-topic]');if(topicBtn){state.mapTopic=topicBtn.dataset.topic;state.mapQuery='';navigate('map');return;}
    const pageBtn=event.target.closest('[data-page]');if(pageBtn){showPage(pageBtn.dataset.page);return;}
    const cardBtn=event.target.closest('[data-card]');if(cardBtn){openCard(cardBtn.dataset.card);return;}
    const flipBtn=event.target.closest('[data-flip]');if(flipBtn){const id=flipBtn.dataset.flip;const box=document.querySelector(`.flip-scene[data-flip="${id}"]`);if(box){const flipped=box.classList.toggle('is-flipped');box.setAttribute('aria-pressed',String(flipped));}return;}
    const filterBtn=event.target.closest('[data-task-filter]');if(filterBtn){state.taskFilter=filterBtn.dataset.taskFilter;render();return;}
    const closeBtn=event.target.closest('[data-close]');if(closeBtn){document.getElementById(closeBtn.dataset.close)?.close();return;}
    const resultBtn=event.target.closest('[data-result-type]');if(resultBtn){const type=resultBtn.dataset.resultType,id=resultBtn.dataset.resultId;if(type==='card')openCard(id);else if(type==='page'){navigate('map');showPage(id);}else if(type==='task'){state.taskQuery=id;navigate('todo');}else{state.doc=id;navigate('read');}return;}
    if(event.target.id==='dialogFlip'){flipDialog();return;}
  }
  function bindGlobal(){
    document.addEventListener('click',handleClick);
    document.addEventListener('change',e=>{const box=e.target.closest('[data-task]');if(box){taskOverrides[box.dataset.task]=box.checked;localStorage.setItem('wisdomroots.tasks.v1',JSON.stringify(taskOverrides));render();}});
    document.addEventListener('keydown',e=>{
      if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();$('#globalSearch').focus();}
      if((e.key==='Enter'||e.key===' ')&&e.target.matches('.flip-scene')){e.preventDefault();e.target.click();}
      if(e.key==='Escape')closeMenu();
    });
    $('#globalSearch').addEventListener('input',e=>{state.query=e.target.value;if(clean(state.query).length>=2){navigate('search');}else if(state.route==='search'){navigate('home');}});
    $('#versionBtn').addEventListener('click',openVersion);
    $('#menuBtn').addEventListener('click',()=>{const side=$('#sidebar');const open=!side.classList.contains('open');side.classList.toggle('open',open);$('#sidebarBackdrop').hidden=!open;$('#menuBtn').setAttribute('aria-expanded',String(open));});
    $('#sidebarBackdrop').addEventListener('click',closeMenu);
    $('#themeBtn').addEventListener('click',()=>{const next=document.body.dataset.theme==='light'?'dark':'light';document.body.dataset.theme=next;localStorage.setItem('wisdomroots.theme',next);});
    $('#typeBtn').addEventListener('click',()=>{const scales=[1,1.08,1.16,1.24];const current=Number(localStorage.getItem('wisdomroots.fontScale')||1);const next=scales[(scales.indexOf(current)+1)%scales.length];document.documentElement.style.setProperty('--font-scale',next);localStorage.setItem('wisdomroots.fontScale',String(next));});
    for(const dlg of document.querySelectorAll('dialog'))dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close();});
    window.addEventListener('hashchange',()=>{const route=location.hash.replace(/^#\//,'');if(['home','cards','map','read','atlas','todo','changes','about'].includes(route)){state.route=route;render();}});
  }
  async function init(){
    bindGlobal();
    document.body.dataset.theme=localStorage.getItem('wisdomroots.theme')||'dark';
    document.documentElement.style.setProperty('--font-scale',localStorage.getItem('wisdomroots.fontScale')||'1');
    await Promise.all(DOCS.map(async d=>{try{const r=await fetch(fileUrl(d.file));if(!r.ok)throw Error('HTTP '+r.status);contents[d.file]=await r.text();}catch(e){contents[d.file]=`# קובץ לא זמין\n\nהמסמך ${d.file} לא נטען. נא לפתוח את האתר דרך שרת סטטי ולבדוק שקובצי התוכן קיימים.`;}}));
    parsePages();parseTasks();
    const start=location.hash.replace(/^#\//,'');state.route=['home','cards','map','read','atlas','todo','changes','about'].includes(start)?start:'home';render();
  }
  init();
})();
