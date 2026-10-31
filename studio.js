/* WisdomRoots Studio 0.0.4 — original vector stickers + booklet catalog. */
(() => {
  'use strict';
  const STICKERS = [
    {id:'01',group:'אור',title:'אור קטן',lines:['אוֹר קָטָן,','דֶּרֶךְ גְּדוֹלָה!'],symbol:'✦',colors:['#243C7B','#52D7DA']},
    {id:'02',group:'אור',title:'דע את עצמך',lines:['דַּע אֶת עַצְמְךָ','וְתַפְתִּיעַ אוֹתְךָ!'],symbol:'◈',colors:['#442F80','#BBA6FF']},
    {id:'03',group:'אור',title:'פקח עין',lines:['פְּקַח עַיִן,','פְּתַח לֵב.'],symbol:'◉',colors:['#0F6572','#8AE4C9']},
    {id:'04',group:'דרך',title:'עולים מדרגה',lines:['עוֹלִים מַדְרֵגָה,','לֹא מְדַלְּגִים.'],symbol:'◇',colors:['#693D8F','#F3C682']},
    {id:'05',group:'דרך',title:'הכול מתחיל בשורש',lines:['הַכֹּל מַתְחִיל','בַּשֹּׁרֶשׁ.'],symbol:'✺',colors:['#205E51','#A4E2A7']},
    {id:'06',group:'יסודות',title:'אש של עשייה',lines:['אֵשׁ שֶׁל עֲשִׂיָּה,','לֹא שֶׁל כַּעַס.'],symbol:'✷',colors:['#7D334A','#FFD18F']},
    {id:'07',group:'יסודות',title:'גמיש כמו מים',lines:['הֱיֵה גָּמִישׁ','כַּמַּיִם.'],symbol:'≈',colors:['#205481','#8CD8F4']},
    {id:'08',group:'יסודות',title:'רוח חדשה',lines:['רוּחַ חֲדָשָׁה,','כַּוָּנָה חֲדָשָׁה.'],symbol:'✧',colors:['#4B398A','#DABAF1']},
    {id:'09',group:'יסודות',title:'אדמה ומחשבה',lines:['יַצִּיב בָּאֲדָמָה,','חָפְשִׁי בַּמַּחֲשָׁבָה.'],symbol:'⬡',colors:['#3C614C','#F0D68A']},
    {id:'10',group:'דרך',title:'יש כיוון',lines:['יֵשׁ כִּוּוּן —','יֵשׁ דֶּרֶךְ.'],symbol:'✥',colors:['#185D75','#F6D48D']},
    {id:'11',group:'דרך',title:'מעשה נשאר',lines:['הַזְּמַן עוֹבֵר;','הַמַּעֲשֶׂה נִשְׁאָר.'],symbol:'⌛',colors:['#65437B','#F5C7A7']},
    {id:'12',group:'דרך',title:'הסוף הוא פתח',lines:['סוֹף הוּא גַּם','פֶּתַח.'],symbol:'∞',colors:['#2C677A','#B4DCD5']},
    {id:'13',group:'לב',title:'ענף של חסד',lines:['עָנָף שֶׁל חֶסֶד,','שֹׁרֶשׁ שֶׁל אֱמֶת.'],symbol:'❦',colors:['#476241','#F6CE9A']},
    {id:'14',group:'לב',title:'איזון הלב',lines:['אַזֵּן אֶת הַלֵּב,','חַדֵּד אֶת הַדַּעַת.'],symbol:'⚖',colors:['#3C518A','#F4C87A']},
    {id:'15',group:'לב',title:'מקשיב משפיע',lines:['מַקְשִׁיב —','מַשְׁפִּיעַ.'],symbol:'♥',colors:['#8E3D71','#FFB8BC']},
    {id:'16',group:'לב',title:'ניגון הנשימה',lines:['תֵּן לַנִּגּוּן','לְהַזְכִּיר לִנְשֹׁם.'],symbol:'♫',colors:['#2F4F89','#B7D6FF']},
    {id:'17',group:'אור',title:'מעגלים של יופי',lines:['מַעְגָּלִים שֶׁל יֹפִי,','דְּרָכִים שֶׁל מַשְׁמָעוּת.'],symbol:'✺',colors:['#54418A','#F0C5FF']},
    {id:'18',group:'אור',title:'סמל מזמין שאלה',lines:['סֵמֶל מַזְמִין','שְׁאֵלָה.'],symbol:'◇',colors:['#286779','#D6DAFF']},
    {id:'19',group:'לב',title:'כבוד קודם לקרבה',lines:['כָּבוֹד קוֹדֵם','לַקִּרְבָה.'],symbol:'♡',colors:['#9A3C5C','#F4B7B6']},
    {id:'20',group:'דרך',title:'קרא בדוק חדש',lines:['קְרָא, בְּדֹק,','חַדֵּשׁ!'],symbol:'✷',colors:['#205D68','#FFE0A0']}
  ];
  const BOOKLETS = [
    {id:'01',title:'אוֹר וְתוֹדָעָה',subtitle:'אור הדעת',description:'מסע מן הניצוץ הראשון אל ההתבוננות, ההבחנה בין סמל לעובדה והפיכת ידיעה למעשה.',pages:8,accent:'#6CE0D2',topics:['אור','התבוננות','חקירה','הרגל'],kind:'A5'},
    {id:'02',title:'שִׁבְעַת שַׁעֲרֵי הַלֵּב',subtitle:'שבע מידות',description:'שבעה שערים, שבע מידות ושבעה צעדים יומיים. ספרון תרגול עם משפטים מנוקדים ואחריות למעשה.',pages:9,accent:'#E8C27A',topics:['יציבות','חסד','אמת','חיבור'],kind:'A5'},
    {id:'03',title:'חֲמֵשֶׁת יְסוֹדוֹת הָאָדָם',subtitle:'איזון המידות',description:'אש, מים, רוח, אדמה ומרחב כמטפורות לתכונות האדם, עם משימות קטנות לבניית איזון.',pages:8,accent:'#D6A6EC',topics:['אש','מים','רוח','אדמה'],kind:'A5'}
  ];
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const symbolPath = (variant, color) => {
    const inner = `<g opacity=".30" stroke="${color}" stroke-width="3" fill="none"><circle cx="400" cy="316" r="117"/><circle cx="400" cy="316" r="88"/><path d="M400 191 V441 M275 316 H525 M312 228 L488 404 M488 228 L312 404"/></g>`;
    return inner + (variant%5===0?`<path d="M400 218 C352 274 340 297 400 363 C460 297 448 274 400 218Z" fill="${color}" opacity=".25"/>`:'');
  };
  const outline = variant => {
    if(variant%3===0)return '<rect x="73" y="77" width="654" height="646" rx="167"/>';
    if(variant%3===1)return '<path d="M400 70 C572 70 732 236 732 399 C732 582 585 731 400 731 C217 731 68 580 68 399 C68 216 229 70 400 70Z"/>';
    return '<path d="M400 65 Q454 73 517 123 L658 198 Q711 234 717 309 L722 475 Q712 550 658 586 L517 676 Q451 722 400 735 Q339 722 286 676 L145 586 Q88 549 79 477 L81 308 Q91 228 144 197 L283 123 Q348 76 400 65Z"/>';
  };
  function svg(sticker){
    const i=Number(sticker.id)-1,[deep,glow]=sticker.colors;
    const frame=outline(i);
    const textRows=sticker.lines.map((row,j)=>{
      const letters=Array.from(row.replace(/[\u0591-\u05C7\s]/g,'')).length;
      const size=Math.min(52,Math.floor(570/(Math.max(letters,8)*.73)));
      return `<text x="400" y="${490+j*72}" font-family="DejaVu Sans,Arial,sans-serif" font-size="${size}" font-weight="900" fill="#FFFFFF" stroke="#172238" stroke-width="5" paint-order="stroke fill" text-anchor="middle" direction="rtl">${esc(row)}</text>`;
    }).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800" role="img" aria-label="${esc(sticker.title)}">
      <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${deep}"/><stop offset=".58" stop-color="#111B34"/><stop offset="1" stop-color="${deep}"/></linearGradient><radialGradient id="glow"><stop stop-color="${glow}" stop-opacity=".32"/><stop offset="1" stop-color="${glow}" stop-opacity="0"/></radialGradient><filter id="shadow" x="-25%" y="-25%" width="150%" height="150%"><feDropShadow dx="0" dy="10" stdDeviation="13" flood-color="#000000" flood-opacity=".44"/></filter></defs>
      <g filter="url(#shadow)"><g fill="url(#bg)" stroke="#FFFFFF" stroke-width="29" stroke-linejoin="round">${frame}</g><g fill="none" stroke="${glow}" stroke-width="7" opacity=".93">${frame}</g></g>
      <ellipse cx="400" cy="335" rx="260" ry="258" fill="url(#glow)"/>
      ${symbolPath(i,glow)}
      <text x="400" y="355" text-anchor="middle" font-size="146" font-family="DejaVu Sans,sans-serif" font-weight="bold" fill="${glow}" stroke="#172238" stroke-width="2" paint-order="stroke fill">${esc(sticker.symbol)}</text>
      <path d="M200 414 H600" fill="none" stroke="${glow}" stroke-width="2" opacity=".75"/>
      ${textRows}
      <text x="400" y="654" text-anchor="middle" fill="${glow}" font-family="Georgia,serif" font-size="20" font-weight="bold" letter-spacing="2">AnLoMinus · WisdomRoots</text>
      <text x="400" y="685" text-anchor="middle" fill="#F7F5EE" opacity=".68" font-family="Arial,sans-serif" font-size="15" letter-spacing="3">STICKER ${sticker.id} / 20</text>
    </svg>`;
  }
  const svgData = item => 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg(item));
  function downloadBlob(blob,name){const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);}
  function download(id,format='png'){
    const item=STICKERS.find(x=>x.id===id);if(!item)return;
    const source=svg(item);
    if(format==='svg'){downloadBlob(new Blob([source],{type:'image/svg+xml;charset=utf-8'}),`WisdomRoots_Sticker_${id}.svg`);return;}
    const image=new Image();const url=URL.createObjectURL(new Blob([source],{type:'image/svg+xml;charset=utf-8'}));
    image.onload=()=>{const canvas=document.createElement('canvas');canvas.width=1600;canvas.height=1600;const ctx=canvas.getContext('2d');ctx.clearRect(0,0,1600,1600);ctx.drawImage(image,0,0,1600,1600);canvas.toBlob(blob=>{if(blob)downloadBlob(blob,`WisdomRoots_Sticker_${id}_1600.png`);URL.revokeObjectURL(url);},'image/png');};
    image.onerror=()=>{URL.revokeObjectURL(url);alert('לא ניתן להכין PNG בדפדפן זה. ניתן להוריד את קובץ SVG.');};image.src=url;
  }
  const bookPdf=id=>`assets/booklets/${id}.pdf`;
  window.WisdomStudio={STICKERS,BOOKLETS,svg,svgData,download,bookPdf};
})();
