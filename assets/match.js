window.FELIX_ACCOUNTS=[{"id": "leon", "name": "LEON", "sector": "food-drink", "fresh": true, "window": "New CMO", "date": "16 Nov 2026", "lik": "High", "when": "likely within 6 to 12 months", "names": ["leon", "leon restaurants"]}, {"id": "esquires", "name": "Esquires Coffee (Cooks Coffee Company)", "sector": "food-drink", "fresh": false, "window": "New marketing lead", "date": "24 Sep 2026", "lik": "Medium", "when": "likely within 6 to 18 months", "names": ["esquires", "esquires coffee"]}, {"id": "liberty-wines", "name": "Liberty Wines", "sector": "food-drink", "fresh": true, "window": "Ownership change", "date": "13 Nov 2026", "lik": "Medium", "when": "likely within 6 to 12 months", "names": ["liberty wines", "liberty wine"]}, {"id": "noths", "name": "Not On The High Street", "sector": "retail-fashion", "fresh": false, "window": "Ownership change", "date": "29 Jan 2026", "lik": "High", "when": "likely within 6 to 12 months", "names": ["notonthehighstreet", "not on the high street", "noths"]}, {"id": "new-look", "name": "New Look", "sector": "retail-fashion", "fresh": false, "window": "Leadership change", "date": "22 Sep 2026", "lik": "Medium", "when": "likely within 6 to 18 months", "names": ["new look", "newlook"]}, {"id": "very", "name": "The Very Group", "sector": "retail-fashion", "fresh": false, "window": "New marketing lead", "date": "30 Sep 2026", "lik": "Medium", "when": "likely within 6 to 18 months", "names": ["very", "very.co.uk", "the very group", "very group"]}, {"id": "mamas-papas", "name": "Mamas & Papas", "sector": "beauty-home", "fresh": true, "window": "New marketing lead", "date": "5 Nov 2026", "lik": "Medium", "when": "likely within 6 to 12 months", "names": ["mamas & papas", "mamas and papas", "mamas papas"]}, {"id": "heals", "name": "Heal's", "sector": "beauty-home", "fresh": false, "window": "New CEO", "date": "1 Oct 2026", "lik": "Medium", "when": "likely within 6 to 18 months", "names": ["heal's", "heals"]}, {"id": "elemis", "name": "Elemis", "sector": "beauty-home", "fresh": true, "window": "Ownership change", "date": "4 Nov 2026", "lik": "Medium", "when": "likely in the 6 to 12 months after the deal closes", "names": ["elemis"]}, {"id": "british-red-cross", "name": "British Red Cross", "sector": "charity-public", "fresh": false, "window": "New marketing lead", "date": "10 Jun 2026", "lik": "Medium", "when": "likely within 6 to 12 months", "names": ["british red cross", "red cross"]}, {"id": "belfast-city-council", "name": "Belfast City Council", "sector": "charity-public", "fresh": true, "window": "Public tender", "date": "12 Nov 2026", "lik": "Live review", "when": "under way now", "names": ["belfast city council", "belfast council"]}, {"id": "hope-and-homes", "name": "Hope and Homes for Children", "sector": "charity-public", "fresh": false, "window": "Senior marketing hire advertised", "date": "23 Oct 2026", "lik": "Low to medium", "when": "rising once the new director is named", "names": ["hope and homes", "hope and homes for children"]}, {"id": "allsaints", "name": "AllSaints", "sector": "retail-fashion", "fresh": true, "window": "New digital lead", "date": "2 Nov 2026", "lik": "Low to medium", "when": "worth watching over 6 to 18 months", "names": ["allsaints", "all saints"]}, {"id": "sense-international", "name": "Sense International", "sector": "charity-public", "fresh": true, "window": "Senior marketing hire advertised", "date": "13 Nov 2026", "lik": "Low to medium", "when": "rising once the new director is named", "names": ["sense international"]}];
(function(){
  var SECT={'food-drink':'Food and drink','retail-fashion':'Retail and fashion','beauty-home':'Beauty, home and family','charity-public':'Charity and public sector'};
  function norm(x){return (x||'').toLowerCase().replace(/[’']/g,"'").replace(/\s+/g,' ').trim();}
  function esc(x){return String(x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  window.felixTargets=function(){
    var raw=null;
    try{raw=new URLSearchParams(location.search).get('b');}catch(e){}
    if(raw){try{sessionStorage.setItem('felix_targets',raw);}catch(e){}}
    else{try{raw=sessionStorage.getItem('felix_targets');}catch(e){}}
    if(!raw) return [];
    return raw.split('|').map(function(x){return x.trim();}).filter(Boolean).slice(0,3);
  };
  window.felixMatch=function(names){
    var hits=[], misses=[];
    names.forEach(function(n){
      var k=norm(n), hit=null;
      (window.FELIX_ACCOUNTS||[]).forEach(function(a){ if(!hit && a.names.some(function(x){return x===k || (k.length>3 && (x.indexOf(k)===0 || k.indexOf(x)===0));})) hit=a; });
      if(hit) hits.push({asked:n, a:hit}); else misses.push(n);
    });
    return {hits:hits, misses:misses};
  };
  function missLine(m){
    return m.length?'<p class="small" style="margin-top:8px">'+m.map(esc).join(', ')+(m.length>1?' aren\'t':' isn\'t')+' in Felix\'s scored set yet. Felix will check '+(m.length>1?'them':'it')+' and email you what it finds within 2 working days.</p>':'';
  }
  // On a brief page
  window.felixBriefNote=function(sid){
    var names=felixTargets(); if(!names.length) return;
    var r=felixMatch(names), box=document.getElementById('target-note'); if(!box) return;
    var html='';
    if(r.hits.length){
      html='<p><strong>You named '+r.hits.map(function(h){return esc(h.a.name);}).join(' and ')+'.</strong></p><ul>'+r.hits.map(function(h){
        var a=h.a, inThis=a.sector===sid;
        var url=inThis?('#'+a.id):(a.sector+'.html#'+a.id);
        var when='Review likelihood: '+esc(a.lik)+', '+esc(a.when)+'.';
        return '<li><strong>'+esc(a.name)+'</strong>'+(inThis?'':' (in the free '+esc(SECT[a.sector].toLowerCase())+' brief)')+'. '+when+' <a href="'+url+'">See the score and route plan</a></li>';
      }).join('')+'</ul>';
      r.hits.forEach(function(h){var el=document.getElementById(h.a.id); if(el){el.classList.add('target-hit'); var rt=el.querySelector('.route'); if(rt){rt.hidden=false;} var lk=el.querySelector('.route-lock'); if(lk){lk.style.display='none';} var t=document.createElement('p'); t.className='k target-tag'; t.textContent='One of your 3 brands: full route plan included'; el.insertBefore(t, el.firstChild);}});
    } else {
      html='<p><strong>You named '+names.map(esc).join(', ')+'.</strong> '+(names.length>1?'None of them is':'It isn\'t')+' in Felix\'s scored set yet. Felix will check '+(names.length>1?'them':'it')+' and email you what it finds within 2 working days.</p>';
    }
    if(r.hits.length) html+=missLine(r.misses);
    box.innerHTML=html; box.style.display='block';
  };
  // On the thanks page
  window.felixThanksNote=function(){
    var names=felixTargets(); if(!names.length) return;
    var r=felixMatch(names), box=document.getElementById('target-note'); if(!box) return;
    var html;
    if(r.hits.length){
      html='<p><strong>Good news: '+r.hits.map(function(h){return esc(h.a.name);}).join(' and ')+' '+(r.hits.length>1?'are':'is')+' scored in your brief.</strong></p><ul>'+r.hits.map(function(h){
        var a=h.a, when='Review likelihood: '+esc(a.lik)+', '+esc(a.when)+'.';
        return '<li>'+esc(a.name)+'. '+when+' <a href="briefs/'+a.sector+'.html#'+a.id+'">See the score and route plan</a></li>';
      }).join('')+'</ul>'+missLine(r.misses);
    } else {
      html='<p><strong>You named '+names.map(esc).join(', ')+'.</strong> '+(names.length>1?'None of them is':'It isn\'t')+' in Felix\'s scored set yet. Felix will check '+(names.length>1?'them':'it')+' and email you what it finds within 2 working days.</p>';
    }
    box.innerHTML=html; box.style.display='block';
  };
})();
