/* Prisma Learning Map SPA */
(function () {
  'use strict';

  const app = document.getElementById('app');
  let DATA = null;          // data.json：config + docs + refTrees
  let SEARCH = null;        // search.json：path -> 純文字（惰性載入）
  let mermaidReady = null;  // mermaid 惰性載入 promise

  // ---------- 小工具 ----------
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const docTitle = p => (DATA.docs[p] && DATA.docs[p].title) || p.split('/').pop().replace(/\.md$/, '');
  const topicNo = p => { const m = p.split('/').pop().match(/^(\d+)/); return m ? m[1] : ''; };

  function slugify(raw) {
    // 對齊 GitHub 錨點演算法：去標點後每個空白 1:1 轉 '-'（不合併），
    // 教材作者手寫的 GitHub 式目錄錨點（含雙連字號）才對得上
    return String(raw).toLowerCase().trim()
      .replace(/<[^>]+>/g, '')
      .replace(/[^\p{L}\p{N}\s_-]/gu, '')
      .replace(/\s/g, '-');
  }

  function safeDecode(s) {
    try { return decodeURIComponent(s); } catch { return s; }
  }

  // ---------- 導覽脈絡與序列 ----------
  function roleSeq(role) {
    const seq = [];
    if (role.outline) seq.push(role.outline);
    (role.days || []).forEach(d => d.topics.forEach(t => seq.push(t.file)));
    if (role.deep) seq.push(...role.deep.files);
    return seq;
  }
  function generalSeq() {
    const seq = [DATA.config.generalOutline];
    DATA.config.generalTracks.forEach(t => seq.push(...t.files));
    return seq;
  }
  function flattenTree(node, out = []) {
    node.files.forEach(f => out.push(f));
    node.children.forEach(c => flattenTree(c, out));
    return out;
  }
  // 回傳文件所屬脈絡：決定側欄與上下頁
  function findContext(path) {
    for (const role of DATA.config.roles) {
      if (role.type === 'path' && roleSeq(role).includes(path)) return { kind: 'role', role, seq: roleSeq(role) };
      if (role.type === 'doc' && role.doc === path) return { kind: 'roledoc', role, seq: DATA.config.roles.filter(r => r.type === 'doc').map(r => r.doc) };
    }
    if (generalSeq().includes(path)) return { kind: 'general', seq: generalSeq() };
    for (const sec of DATA.config.refSections) {
      if (path.startsWith(sec.dir + '/')) return { kind: 'ref', sec, seq: flattenTree(DATA.refTrees[sec.id]) };
    }
    return { kind: 'none', seq: [path] };
  }

  // ---------- 路由 ----------
  function route() {
    closeSearch();
    if (!DATA) return;
    const hash = safeDecode(location.hash.replace(/^#/, '')) || '/';
    let m;
    if (hash === '/' || hash === '') return renderHome();
    if (hash === '/general') return renderGeneralIndex();
    if (hash === '/roles') return renderRolesIndex();
    if ((m = hash.match(/^\/role\/([\w-]+)$/))) return renderRole(m[1]);
    if ((m = hash.match(/^\/ref\/([\w-]+)$/))) return renderRefSection(m[1]);
    if ((m = hash.match(/^\/doc\/(.+)$/))) {
      const [path, anchor] = m[1].split('#');
      return renderDoc(path, anchor);
    }
    renderError('找不到這個頁面', hash);
  }

  function renderError(msg, detail) {
    app.innerHTML = `<div class="err-page"><b>${esc(msg)}</b><div>${esc(detail || '')}</div><p><a href="#/">回首頁</a></p></div>`;
  }

  // ---------- 首頁 ----------
  function countTree(node) {
    return node.files.length + node.children.reduce((n, c) => n + countTree(c), 0);
  }
  function renderHome() {
    const cfg = DATA.config;
    const tracks = cfg.generalTracks.map(t => `
      <div class="track">
        <h4>${esc(t.icon)} ${esc(t.title)}</h4>
        ${t.files.map(f => `<a href="#/doc/${f}">${esc(docTitle(f))}</a>`).join('')}
      </div>`).join('');

    const roles = cfg.roles.map(roleCard).join('');

    const refs = cfg.refSections.map(sec => {
      const tree = DATA.refTrees[sec.id];
      const top = tree.files.slice(0, 5).map(f => `<a href="#/doc/${f}">${esc(docTitle(f))}</a>`).join('');
      const groups = tree.children.map(c =>
        `<div class="rgrp">${esc(c.label)}</div><a href="#/ref/${sec.id}">${esc(c.label)} 相關文檔（${countTree(c)} 篇）</a>`).join('');
      return `
      <div class="ref">
        <div class="rhead"><span class="ric">${esc(sec.icon)}</span><a href="#/ref/${sec.id}"><b>${esc(sec.title)}</b></a><em>${countTree(tree)} 篇</em></div>
        ${top}${groups}
        <a class="more" href="#/ref/${sec.id}">全部文件 →</a>
      </div>`;
    }).join('');

    app.innerHTML = `
      <div class="hero">
        <h1>${esc(cfg.tagline)}</h1>
        <span class="underline"></span>
        <p>${esc(cfg.heroText)}</p>
      </div>
      <div class="home-sec">
        <div class="sec-title">① 通用核心能力 <small>所有角色的共同起點，穿插在各路徑的 Day 1–3</small></div>
        <div class="general-band">
          <div class="row"><h3>📚 General Learning Map</h3><a href="#/general">全部主題 →</a></div>
          <div class="tracks">${tracks}</div>
        </div>
      </div>
      <div class="home-sec">
        <div class="sec-title">② 選擇你的角色 <small>點擊卡片進入該角色的學習路徑</small></div>
        <div class="roles">${roles}</div>
      </div>
      <div class="home-sec">
        <div class="sec-title">③ 參考資料庫 <small>不用循序讀，需要時查閱</small></div>
        <div class="reflib">${refs}</div>
      </div>`;
    document.title = cfg.siteName;
    window.scrollTo(0, 0);
  }

  function roleCard(r) {
    const href = r.type === 'path' ? `#/role/${r.id}` : `#/doc/${r.doc}`;
    return `
      <a class="role" href="${href}">
        <div class="ic">${esc(r.icon)}</div>
        <h3>${esc(r.title)}</h3>
        <div class="en">${esc(r.en)}</div>
        <p>${esc(r.blurb)}</p>
        <div class="meta">${r.meta.map(x => `<em>${esc(x)}</em>`).join('')}</div>
      </a>`;
  }

  // ---------- 角色路徑 目錄頁 ----------
  function renderRolesIndex() {
    app.innerHTML = `
      <div class="ref-index">
        <div class="crumb"><a href="#/">首頁</a> / 角色路徑</div>
        <h1>👥 角色路徑</h1>
        <div class="lead">選擇你的角色，進入對應的學習路徑。</div>
        <div class="roles">${DATA.config.roles.map(roleCard).join('')}</div>
      </div>`;
    document.title = `角色路徑｜${DATA.config.siteName}`;
    window.scrollTo(0, 0);
  }

  // ---------- 角色路徑頁 ----------
  function renderRole(id) {
    const role = DATA.config.roles.find(r => r.id === id);
    if (!role) return renderError('找不到這個角色', id);
    if (role.type === 'doc') { location.hash = '#/doc/' + role.doc; return; }

    const days = role.days.map(d => `
      <div class="day">
        <h2>${esc(d.label)} <small>${esc(d.sub)}</small></h2>
        ${d.topics.map(t => {
          const tags = ((DATA.docs[t.file] || {}).tags || []).slice(0, 4);
          return `
          <div class="topic" data-doc="${t.file}">
            <div class="no">${esc(topicNo(t.file))}</div>
            <div class="tt">
              <b>${esc(docTitle(t.file))}</b><span>${esc(t.desc)}</span>
              ${tags.length ? `<div class="ttags">${tags.map(x => `<i>${esc(x)}</i>`).join('')}</div>` : ''}
            </div>
            <div class="dur">${esc(t.dur)}</div>
          </div>`;
        }).join('')}
      </div>`).join('');

    const deep = role.deep ? `
      <div class="deep">
        <h3>🔬 ${esc(role.deep.label)}</h3>
        <div class="chips">${role.deep.files.map(f => `<a class="chip" href="#/doc/${f}">${esc(docTitle(f))}</a>`).join('')}</div>
      </div>` : '';

    app.innerHTML = `
      <div class="path-wrap">
        <div class="crumb"><a href="#/">首頁</a> / <a href="#/roles">角色路徑</a> / ${esc(role.title)}</div>
        <div class="path-head">
          <div class="ic">${esc(role.icon)}</div>
          <div>
            <h1>${esc(role.title)} 學習路徑</h1>
            <p>${esc(role.intro)}</p>
            ${role.outline ? `<p><a href="#/doc/${role.outline}">📄 完整大綱</a></p>` : ''}
          </div>
        </div>
        ${days}
        ${role.note ? `<div class="path-note">📌 ${esc(role.note)}</div>` : ''}
        ${deep}
      </div>`;
    document.title = `${role.title}｜${DATA.config.siteName}`;

    app.querySelectorAll('.topic').forEach(el => {
      el.addEventListener('click', () => { location.hash = '#/doc/' + el.dataset.doc; });
    });
    window.scrollTo(0, 0);
  }

  // ---------- 目錄頁共用：檔案卡片（標題 + 簡介 + tags） ----------
  function docItem(f) {
    const m = DATA.docs[f] || {};
    const sum = String(m.summary || '').replace(/\s+/g, ' ').trim();
    const tags = (m.tags || []).slice(0, 6);
    return `
      <a class="doc-item" href="#/doc/${f}">
        <b>${esc(m.title || docTitle(f))}</b>
        ${sum ? `<p>${esc(sum.length > 200 ? sum.slice(0, 200) + '…' : sum)}</p>` : ''}
        <div class="dmeta">${tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
      </a>`;
  }

  // ---------- 通用核心能力 目錄頁 ----------
  function renderGeneralIndex() {
    const cfg = DATA.config;
    const groups = [`
      <div class="ref-group">
        <h2>總覽</h2>
        <div class="doc-grid">${docItem(cfg.generalOutline)}</div>
      </div>`];
    cfg.generalTracks.forEach(t => groups.push(`
      <div class="ref-group">
        <h2>${esc(t.icon)} ${esc(t.title)}</h2>
        <div class="doc-grid">${t.files.map(docItem).join('')}</div>
      </div>`));
    app.innerHTML = `
      <div class="ref-index">
        <div class="crumb"><a href="#/">首頁</a> / 通用核心能力</div>
        <h1>📚 通用核心能力</h1>
        <div class="lead">所有角色的共同起點，穿插在各路徑的 Day 1–3。</div>
        ${groups.join('')}
      </div>`;
    document.title = `通用核心能力｜${cfg.siteName}`;
    window.scrollTo(0, 0);
  }

  // ---------- 參考資料庫 目錄頁 ----------
  function renderRefSection(id) {
    const sec = DATA.config.refSections.find(s => s.id === id);
    if (!sec) return renderError('找不到這個分類', id);
    const tree = DATA.refTrees[id];

    const groups = [];
    if (tree.files.length) groups.push(`<div class="ref-group"><h2>總覽</h2><div class="doc-grid">${tree.files.map(docItem).join('')}</div></div>`);
    // 每個頂層子資料夾一組，巢狀子資料夾（如 PrismaVision 下的 Smart Insight Engine）併入同組
    tree.children.forEach(c => {
      const files = flattenTree(c);
      if (files.length) groups.push(`<div class="ref-group"><h2>${esc(c.label)}</h2><div class="doc-grid">${files.map(docItem).join('')}</div></div>`);
    });

    app.innerHTML = `
      <div class="ref-index">
        <div class="crumb"><a href="#/">首頁</a> / <a href="#/">參考資料庫</a> / ${esc(sec.title)}</div>
        <h1>${esc(sec.icon)} ${esc(sec.title)}</h1>
        <div class="lead">共 ${countTree(tree)} 篇，查閱型參考資料。</div>
        ${groups.join('')}
      </div>`;
    document.title = `${sec.title}｜${DATA.config.siteName}`;
    window.scrollTo(0, 0);
  }

  // ---------- 文章頁 ----------
  function markedFor(docPath) {
    const dir = docPath.split('/').slice(0, -1).join('/');
    const resolve = href => {
      try { return new URL(href, 'http://x/' + (dir ? dir + '/' : '')).pathname.replace(/^\//, ''); }
      catch { return href; }
    };
    const slugCount = {};
    const renderer = new marked.Renderer();
    renderer.heading = (text, level, raw) => {
      let id = slugify(raw || text);
      if (slugCount[id] != null) { slugCount[id]++; id += '-' + slugCount[id]; } else slugCount[id] = 0;
      return `<h${level} id="${id}">${text}</h${level}>`;
    };
    renderer.code = (code, lang) => {
      if ((lang || '').trim() === 'mermaid') return `<div class="mermaid-src" data-code="${encodeURIComponent(code)}"></div>`;
      return `<pre><code>${esc(code)}</code></pre>`;
    };
    renderer.link = (href, title, text) => {
      const t = title ? ` title="${esc(title)}"` : '';
      if (/^https?:\/\//.test(href)) return `<a class="ext" href="${esc(href)}"${t} target="_blank" rel="noopener">${text}</a>`;
      if (href.startsWith('#')) return `<a href="#" data-anchor="${esc(slugify(safeDecode(href.slice(1))))}"${t}>${text}</a>`;
      const [file, anchor] = href.split('#');
      const target = resolve(file);
      if (/\.md$/i.test(target)) return `<a href="#/doc/${esc(target)}${anchor ? '%23' + esc(anchor) : ''}"${t}>${text}</a>`;
      // 資料夾連結 → 對應的參考資料庫索引頁
      const last = target.replace(/\/$/, '').split('/').pop();
      if ((target.endsWith('/') || !last.includes('.')) && DATA) {
        const sec = DATA.config.refSections.find(s => target === s.dir || target.startsWith(s.dir + '/'));
        if (sec) return `<a href="#/ref/${sec.id}"${t}>${text}</a>`;
      }
      return `<a class="ext" href="${esc(target)}"${t} target="_blank" rel="noopener">${text}</a>`;
    };
    renderer.image = (href, title, text) => {
      const src = /^https?:\/\//.test(href) ? href : resolve(href);
      return `<img src="${esc(src)}" alt="${esc(text)}"${title ? ` title="${esc(title)}"` : ''} loading="lazy">`;
    };
    return { renderer, gfm: true };
  }

  function loadMermaid() {
    if (!mermaidReady) {
      mermaidReady = new Promise((ok, err) => {
        const s = document.createElement('script');
        s.src = 'assets/vendor/mermaid.min.js';
        s.onload = () => { window.mermaid.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'strict' }); ok(); };
        s.onerror = err;
        document.head.appendChild(s);
      });
    }
    return mermaidReady;
  }
  async function renderMermaidBlocks(container) {
    const nodes = container.querySelectorAll('.mermaid-src');
    if (!nodes.length) return;
    try { await loadMermaid(); } catch { return; }
    let i = 0;
    for (const el of nodes) {
      const code = decodeURIComponent(el.dataset.code);
      try {
        const { svg } = await window.mermaid.render('mmd_' + (i++) + '_' + Math.floor(performance.now()), code);
        const fig = document.createElement('div');
        fig.className = 'mermaid-fig';
        fig.innerHTML = svg;
        el.replaceWith(fig);
      } catch (e) {
        el.outerHTML = `<div class="mermaid-fig"><pre>${esc(code)}</pre><div class="mermaid-err">（Mermaid 圖渲染失敗，以原始碼顯示）</div></div>`;
      }
    }
  }

  function sidebarHtml(ctx, path) {
    const link = (f, label) => `<a href="#/doc/${f}" class="${f === path ? 'now' : ''}">${esc(label || docTitle(f))}</a>`;
    if (ctx.kind === 'role') {
      const r = ctx.role;
      let h = `<div class="grp">${esc(r.icon)} ${esc(r.title)}</div><a href="#/role/${r.id}">📍 學習路徑總覽</a>`;
      if (r.outline) h += link(r.outline, '00 大綱');
      r.days.forEach(d => d.topics.forEach(t => { h += link(t.file, `${topicNo(t.file)} ${docTitle(t.file)}`); }));
      if (r.deep) { h += `<div class="grp">🔬 深度教材</div>`; r.deep.files.forEach(f => h += link(f)); }
      return h;
    }
    if (ctx.kind === 'roledoc') {
      let h = `<div class="grp">👥 <a href="#/roles">角色路徑</a></div>`;
      DATA.config.roles.forEach(r => {
        h += r.type === 'doc' ? link(r.doc, `${r.icon} ${r.title}`) : `<a href="#/role/${r.id}">${esc(r.icon)} ${esc(r.title)}</a>`;
      });
      return h;
    }
    if (ctx.kind === 'general') {
      let h = `<div class="grp">📚 <a href="#/general">通用核心能力</a></div>` + link(DATA.config.generalOutline, '00 大綱');
      DATA.config.generalTracks.forEach(t => {
        h += `<div class="grp">${esc(t.icon)} ${esc(t.title)}</div>`;
        t.files.forEach(f => h += link(f));
      });
      return h;
    }
    if (ctx.kind === 'ref') {
      const tree = DATA.refTrees[ctx.sec.id];
      let h = `<div class="grp">${esc(ctx.sec.icon)} <a href="#/ref/${ctx.sec.id}">${esc(ctx.sec.title)}</a></div>`;
      tree.files.forEach(f => h += link(f));
      tree.children.forEach(node => {
        h += `<div class="grp">${esc(node.label)}</div>`;
        flattenTree(node).forEach(f => h += link(f));
      });
      return h;
    }
    return `<div class="grp">📄 文件</div>` + link(path);
  }

  // 從顯示中移除 body 的維護性章節（版本歷史／文檔維護），這些資訊統一由 frontmatter 呈現。
  // 只影響渲染，md 原檔不動。跳過 code fence 內的教學範例。
  function stripMaintenance(md) {
    const lines = md.split('\n');
    const out = [];
    let inFence = false, skipHeading = 0, skipTable = false;
    for (const line of lines) {
      // skipTable 在遇到第一個非空白、非表格列的行即結束（含 code fence 行），
      // 必須在 fence 判斷之前，否則緊接表格的 fence 會被整段誤吞
      if (skipTable) {
        if (/^\s*$/.test(line) || /^\s*\|/.test(line)) continue;
        skipTable = false;
      }
      // Fence 追蹤比照 CommonMark／marked：開啟可帶語言字串，關閉只能是裸 fence
      if (inFence) {
        if (/^\s*(```+|~~~+)\s*$/.test(line)) inFence = false;
        if (!skipHeading) out.push(line);
        continue;
      }
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = true;
        if (!skipHeading) out.push(line);
        continue;
      }
      if (skipHeading) {
        const h = line.match(/^(#{1,6})\s/);
        if (h && h[1].length <= skipHeading) skipHeading = 0; // 掉出該章節，往下重新判斷
        else continue;
      }
      const mh = line.match(/^(#{1,6})\s*(?:[^#\s\p{L}\p{N}]{1,4}\s*)?(文檔維護|版本歷史)\s*$/u);
      if (mh) { skipHeading = mh[1].length; continue; }
      if (/^\*\*版本歷史\*\*\s*$/.test(line)) { skipTable = true; continue; }
      out.push(line);
    }
    // 去掉尾端殘留的分隔線與空白
    return out.join('\n').replace(/(\n\s*---+\s*)+\s*$/, '\n');
  }

  async function renderDoc(path, anchor) {
    app.innerHTML = '<div class="loading">載入中…</div>';
    let raw;
    try {
      // no-cache：向伺服器重新驗證，內容更新後普通重新整理即可生效
      const res = await fetch(path, { cache: 'no-cache' });
      if (!res.ok) throw new Error(res.status);
      raw = await res.text();
    } catch (e) {
      return renderError('讀不到這篇文件', path);
    }
    let body = raw.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, '');
    const meta = DATA.docs[path] || {};

    // 抽出文件尾部的 **key**: value meta 行（最後一條 --- 之後）
    const extraLines = [];
    const footMatch = body.match(/\n---+\s*\n((?:\s*\*\*[^*\n]+\*\*\s*[:：][^\n]*\n?)+)\s*$/);
    if (footMatch) {
      footMatch[1].trim().split('\n').forEach(l => {
        l = l.trim();
        if (l) extraLines.push(l.replace(/^\*\*([^*]+)\*\*\s*[:：]\s*/, '$1：'));
      });
      body = body.slice(0, footMatch.index);
    }
    body = stripMaintenance(body);

    // 底部 meta 區統一由 frontmatter 呈現；body 抽出的行只保留 frontmatter 沒有的資訊
    const footLines = [];
    if (meta.author) footLines.push('作者：' + meta.author);
    if (meta.version) footLines.push('版本：' + meta.version);
    if (meta.updated) footLines.push('最後更新：' + meta.updated);
    const dupKey = /^(作者|版本|文件版本|最後更新|更新日期)：/;
    extraLines.filter(l => !dupKey.test(l)).forEach(l => footLines.push(l));
    const ctx = findContext(path);
    const seq = ctx.seq;
    const idx = seq.indexOf(path);
    const prev = idx > 0 ? seq[idx - 1] : null;
    const next = idx >= 0 && idx < seq.length - 1 ? seq[idx + 1] : null;

    const fmChips = [meta.type, meta.status].filter(Boolean).map(x => `<span>${esc(x)}</span>`).join('')
      + (meta.tags || []).slice(0, 6).map(t => `<span class="tag">${esc(t)}</span>`).join('');

    const crumbCtx = ctx.kind === 'role' ? `<a href="#/roles">角色路徑</a> / <a href="#/role/${ctx.role.id}">${esc(ctx.role.title)}</a> / `
      : ctx.kind === 'roledoc' ? `<a href="#/roles">角色路徑</a> / `
      : ctx.kind === 'ref' ? `<a href="#/">參考資料庫</a> / <a href="#/ref/${ctx.sec.id}">${esc(ctx.sec.title)}</a> / `
      : ctx.kind === 'general' ? `<a href="#/general">通用核心能力</a> / ` : '';

    let html;
    try { html = marked.parse(body, markedFor(path)); }
    catch (e) { html = `<pre>${esc(body)}</pre>`; }

    app.innerHTML = `
      <div class="read">
        <nav class="side">${sidebarHtml(ctx, path)}</nav>
        <article class="art">
          <div class="crumb"><a href="#/">首頁</a> / ${crumbCtx}${esc(docTitle(path))}</div>
          <h1 class="art-h1">${esc(docTitle(path))}</h1>
          <div class="fm">${fmChips}</div>
          <div class="md" id="md-body">${html}</div>
          ${footLines.length ? `<div class="doc-meta">${footLines.map(l => `<div>${esc(l)}</div>`).join('')}</div>` : ''}
          <div class="pn">
            ${prev ? `<a href="#/doc/${prev}"><small>← 上一篇</small>${esc(docTitle(prev))}</a>` : '<span style="flex:1"></span>'}
            ${next ? `<a class="next" href="#/doc/${next}"><small>下一篇 →</small>${esc(docTitle(next))}</a>` : '<span style="flex:1"></span>'}
          </div>
        </article>
        <aside class="toc" id="toc"></aside>
      </div>`;
    document.title = `${docTitle(path)}｜${DATA.config.siteName}`;

    // 首個 H1 與頁面標題重複時隱藏（含「標題 v1.2」這類帶版號變體）
    const mdBody = document.getElementById('md-body');
    const h1 = mdBody.querySelector('h1');
    if (h1) {
      const a = slugify(h1.textContent), b = slugify(docTitle(path));
      if (a === b || a.startsWith(b) || b.startsWith(a)) h1.remove();
    }

    buildToc(mdBody);
    mdBody.addEventListener('click', e => {
      const a = e.target.closest('a[data-anchor]');
      if (a) { e.preventDefault(); const el = document.getElementById(a.dataset.anchor); if (el) el.scrollIntoView({ behavior: 'smooth' }); }
    });

    await renderMermaidBlocks(mdBody);
    if (anchor) {
      const el = document.getElementById(slugify(safeDecode(anchor)));
      if (el) el.scrollIntoView();
    } else window.scrollTo(0, 0);
  }

  function buildToc(mdBody) {
    const toc = document.getElementById('toc');
    const heads = [...mdBody.querySelectorAll('h2, h3')];
    if (!heads.length) { toc.innerHTML = ''; return; }
    toc.innerHTML = `<div class="t">本頁目錄</div>` + heads.map(h =>
      `<a href="#" data-anchor="${h.id}" class="${h.tagName === 'H3' ? 'lv3' : ''}">${esc(h.textContent)}</a>`).join('');
    toc.querySelectorAll('a').forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      const el = document.getElementById(a.dataset.anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }));
    const links = new Map(heads.map(h => [h.id, toc.querySelector(`a[data-anchor="${h.id}"]`)]));
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          toc.querySelectorAll('a').forEach(x => x.classList.remove('now'));
          const l = links.get(en.target.id);
          if (l) l.classList.add('now');
        }
      });
    }, { rootMargin: '0px 0px -70% 0px' });
    heads.forEach(h => spy.observe(h));
  }

  // ---------- 搜尋 ----------
  const searchInput = document.getElementById('search');
  const searchResults = document.getElementById('search-results');
  let searchTimer = null;

  function closeSearch() { searchResults.hidden = true; }

  async function ensureSearchIndex() {
    if (!SEARCH) SEARCH = await fetch('search.json', { cache: 'no-cache' }).then(r => r.json()).catch(() => ({}));
    return SEARCH;
  }
  function snippet(text, q) {
    const i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0) return '';
    const start = Math.max(0, i - 30);
    const s = (start > 0 ? '…' : '') + text.slice(start, i + q.length + 50) + '…';
    return esc(s).replace(new RegExp(esc(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), m => `<mark>${m}</mark>`);
  }
  async function doSearch(q) {
    q = q.trim();
    if (q.length < 1) { closeSearch(); return; }
    await ensureSearchIndex();
    const ql = q.toLowerCase();
    const hits = [];
    for (const [path, meta] of Object.entries(DATA.docs)) {
      const inTitle = meta.title.toLowerCase().includes(ql);
      const inTags = (meta.tags || []).some(t => String(t).toLowerCase().includes(ql));
      const text = SEARCH[path] || '';
      const inText = text.toLowerCase().includes(ql);
      if (inTitle || inTags || inText) {
        hits.push({ path, score: (inTitle ? 2 : 0) + (inTags ? 1 : 0) + (inText ? 1 : 0), text });
      }
      if (hits.length > 200) break;
    }
    hits.sort((a, b) => b.score - a.score);
    const top = hits.slice(0, 12);
    searchResults.innerHTML = top.length
      ? top.map(h => `<a href="#/doc/${h.path}"><b>${esc(docTitle(h.path))}</b><small>${h.path.split('/')[0]}｜${snippet(h.text, q) || esc((DATA.docs[h.path].summary || '').slice(0, 70))}</small></a>`).join('')
      : `<div class="none">找不到「${esc(q)}」相關內容</div>`;
    searchResults.hidden = false;
  }
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => doSearch(searchInput.value), 180);
  });
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeSearch(); searchInput.blur(); }
    if (e.key === 'Enter') {
      const first = searchResults.querySelector('a');
      if (first && !searchResults.hidden) { location.hash = first.getAttribute('href'); closeSearch(); }
    }
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.searchbox')) closeSearch();
    if (e.target.closest('.search-results a')) closeSearch();
  });

  // ---------- 啟動 ----------
  window.addEventListener('hashchange', route);
  fetch('data.json', { cache: 'no-cache' }).then(r => r.json()).then(d => { DATA = d; route(); })
    .catch(() => renderError('資料載入失敗', '請確認 data.json 是否存在（需先執行 build）'));
})();
