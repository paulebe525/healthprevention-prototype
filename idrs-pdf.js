/* Doctor-ready IDRS PDF, generated entirely on the device with jsPDF + qrcode-generator (both vendored in /vendor).
   Nothing is uploaded. The QR links to report.html with a name-free summary in the URL fragment (#d=...),
   which browsers never send to the server. */
(function (g) {
  var PREVIEW_BASE = 'https://paulebe525.github.io/healthprevention-prototype/';
  var C = { navy: [30, 78, 107], heading: [17, 53, 75], text: [24, 42, 57], muted: [83, 105, 125], teal: [42, 115, 98],
            border: [221, 227, 233], accent: [226, 237, 243], page: [245, 247, 249] };

  function baseUrl() {
    if (/^https?:$/.test(location.protocol)) return location.href.replace(/[#?].*$/, '').replace(/[^/]*$/, '');
    return PREVIEW_BASE; // file:// previews and headless tests
  }
  function reportUrl(ix, when) { return baseUrl() + 'report.html#d=' + IDRS.encode(ix, when); }

  function logoCanvas() {
    var s = 160, c = document.createElement('canvas'); c.width = c.height = s;
    var x = c.getContext('2d'), r = 36;
    x.fillStyle = 'rgb(30,78,107)';
    x.beginPath(); x.moveTo(r, 0); x.lineTo(s - r, 0); x.quadraticCurveTo(s, 0, s, r); x.lineTo(s, s - r); x.quadraticCurveTo(s, s, s - r, s);
    x.lineTo(r, s); x.quadraticCurveTo(0, s, 0, s - r); x.lineTo(0, r); x.quadraticCurveTo(0, 0, r, 0); x.fill();
    x.save(); x.translate(s * 0.18, s * 0.18); x.scale(s * 0.64 / 24, s * 0.64 / 24);
    x.strokeStyle = '#fff'; x.lineWidth = 2; x.lineCap = 'round'; x.lineJoin = 'round';
    x.stroke(new Path2D('M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z'));
    x.stroke(new Path2D('m9 12 2 2 4-4')); x.restore();
    return c;
  }
  function tint(rgb, a) { return rgb.map(function (v) { return Math.round(v * a + 255 * (1 - a)); }); }

  function build(opts) {
    var jsPDF = g.jspdf.jsPDF;
    var ix = opts.ix, when = opts.when || new Date();
    var r = IDRS.score(ix), b = r.band, url = reportUrl(ix, when);
    var doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
    var W = 210, M = 16, CW = W - 2 * M;
    doc.setProperties({ title: 'IDRS screening report', subject: 'Indian Diabetes Risk Score', creator: 'healthprevention.in (on-device)' });
    function col(c) { doc.setTextColor(c[0], c[1], c[2]); }
    function fill(c) { doc.setFillColor(c[0], c[1], c[2]); }
    function stroke(c) { doc.setDrawColor(c[0], c[1], c[2]); }
    function font(style, size) { doc.setFont('helvetica', style); doc.setFontSize(size); }

    // header
    try { doc.addImage(logoCanvas(), 'PNG', M, 13, 12, 12); } catch (e) { fill(C.navy); doc.roundedRect(M, 13, 12, 12, 2.5, 2.5, 'F'); }
    font('bold', 13); col(C.heading); doc.text('Health Prevention', M + 15, 18.5);
    font('normal', 9); col(C.muted); doc.text('healthprevention.in', M + 15, 23.2);
    var stampTxt = IDRS.fmtStamp(IDRS.stamp(when));
    font('bold', 9); col(C.heading); doc.text('Screening report', W - M, 18.5, { align: 'right' });
    font('normal', 9); col(C.muted); doc.text('Generated ' + stampTxt + ' (device time)', W - M, 23.2, { align: 'right' });
    stroke(C.teal); doc.setLineWidth(0.7); doc.line(M, 29, W - M, 29);

    // title
    var y = 39;
    font('bold', 16.5); col(C.heading); doc.text('Indian Diabetes Risk Score (IDRS) \u2013 screening report', M, y);
    font('normal', 9.5); col(C.muted); doc.text('Validated for Indian populations (CURES). Four risk factors, no blood test.', M, y + 6);

    // patient box
    y = 50; fill(C.accent); doc.roundedRect(M, y, CW, 17, 3, 3, 'F');
    var pf = [['Name', opts.name], ['Age', opts.age ? opts.age + ' years' : ''], ['Sex', opts.sex]];
    var colW = [92, 40, 46];
    var px = M + 5;
    pf.forEach(function (f, k) {
      font('normal', 8); col(C.muted); doc.text(f[0].toUpperCase(), px, y + 6);
      font('bold', 11.5); col(f[1] ? C.text : C.muted);
      var v = f[1] ? String(f[1]) : 'Not given';
      doc.text(doc.splitTextToSize(v, colW[k] - 6)[0], px, y + 12.5);
      px += colW[k];
    });
    font('italic', 7.5); col(C.muted); doc.text('Optional details typed by the user on their own device; not verified.', M, y + 21.5);

    // answers table (left) + score box (right)
    y = 83;
    var TW = 120, c1 = M, c2 = M + 52, c3 = M + TW - 3;
    font('bold', 8.5); col(C.muted);
    doc.text('QUESTION', c1 + 3, y); doc.text('ANSWER', c2, y); doc.text('POINTS', c3, y, { align: 'right' });
    y += 2.5; stroke(C.border); doc.setLineWidth(0.3); doc.line(M, y, M + TW, y);
    r.rows.forEach(function (row) {
      font('bold', 9.8); var al = doc.splitTextToSize(row.answerAscii, 46);
      y += 6.6;
      font('normal', 9.8); col(C.text); doc.text(row.question, c1 + 3, y);
      font('bold', 9.8); col(C.heading); doc.text(al, c2, y);
      col(row.points === null ? C.muted : C.heading); font(row.points === null ? 'normal' : 'bold', 9.8);
      doc.text(row.points === null ? 'not scored' : String(row.points), c3, y, { align: 'right' });
      y += (al.length - 1) * 4.3;
      doc.line(M, y + 2.8, M + TW, y + 2.8);
    });
    y += 9.5; font('bold', 11); col(C.heading); doc.text('Total IDRS score', c1 + 3, y); doc.text(r.total + ' / 100', c3, y, { align: 'right' });

    var bx = M + TW + 8, bw = CW - TW - 8, by = 78, bh = 56;
    fill([255, 255, 255]); stroke(C.border); doc.setLineWidth(0.3); doc.roundedRect(bx, by, bw, bh, 3, 3, 'FD');
    fill(b.rgb); doc.rect(bx, by, bw, 2.2, 'F');
    font('bold', 8); col(C.muted); doc.text('IDRS SCORE', bx + 5, by + 10);
    font('bold', 34); col(C.heading); doc.text(String(r.total), bx + 5, by + 26);
    var sw = doc.getTextWidth(String(r.total));
    font('normal', 11); col(C.muted); doc.text('/ 100', bx + 7 + sw, by + 26);
    fill(tint(b.rgb, 0.16)); doc.roundedRect(bx + 5, by + 32, bw - 10, 9, 4.5, 4.5, 'F');
    font('bold', 11); col(b.text); doc.text(b.label, bx + bw / 2, by + 38, { align: 'center' });
    font('normal', 8.5); col(C.muted); doc.text('Band: ' + b.range + ' points', bx + bw / 2, by + 48, { align: 'center' });

    // scale
    y = 145; var sx = M, sl = CW, sh = 3.6;
    fill(IDRS.BANDS.low.rgb); doc.rect(sx, y, sl * 0.30, sh, 'F');
    fill(IDRS.BANDS.moderate.rgb); doc.rect(sx + sl * 0.30, y, sl * 0.29, sh, 'F');
    fill(IDRS.BANDS.high.rgb); doc.rect(sx + sl * 0.59, y, sl * 0.41, sh, 'F');
    var mx = sx + sl * Math.min(r.total, 100) / 100;
    fill([255, 255, 255]); stroke(C.heading); doc.setLineWidth(1); doc.circle(mx, y + sh / 2, 2.6, 'FD');
    font('normal', 8); col(C.muted);
    doc.text('0', sx, y + 9); doc.text('Low (<30)', sx + sl * 0.15, y + 9, { align: 'center' });
    doc.text('Moderate (30-50)', sx + sl * 0.445, y + 9, { align: 'center' });
    doc.text('High (>=60)', sx + sl * 0.795, y + 9, { align: 'center' }); doc.text('100', sx + sl, y + 9, { align: 'right' });

    // next step
    y = 160; var nextLines; font('normal', 10.5); nextLines = doc.splitTextToSize(b.next, CW - 10);
    var nh = 12 + nextLines.length * 5;
    fill(tint(b.rgb, 0.12)); doc.roundedRect(M, y, CW, nh, 3, 3, 'F');
    fill(b.rgb); doc.rect(M, y, 1.6, nh, 'F');
    font('bold', 10.5); col(b.text); doc.text('Recommended next step (' + b.label.toLowerCase() + ')', M + 6, y + 7);
    font('normal', 10.5); col(C.text); doc.text(nextLines, M + 6, y + 13);

    // for the doctor + QR
    y = y + nh + 6;
    var qrS = 38, tw = CW - qrS - 14;
    font('normal', 8.6);
    var about = doc.splitTextToSize(IDRS.ABOUT, tw);
    var scoring = doc.splitTextToSize('Scoring: age <35 / 35-49 / 50+ = 0 / 20 / 30; waist (men <90 / 90-99 / >=100 cm, women <80 / 80-89 / >=90 cm) = 0 / 10 / 20; physical activity vigorous / moderate or strenuous work / mild / sedentary = 0 / 10 / 20 / 30; family history none / one parent / both = 0 / 10 / 20. Totals are multiples of 10, so 51-59 cannot occur.', tw);
    font('italic', 8.2);
    var cite = doc.splitTextToSize('Source: ' + IDRS.CITATION, tw);
    var dh = 12 + about.length * 3.9 + 2 + scoring.length * 3.9 + 2 + cite.length * 3.7 + 4;
    dh = Math.max(dh, qrS + 22);
    fill([255, 255, 255]); stroke(C.border); doc.setLineWidth(0.3); doc.roundedRect(M, y, CW, dh, 3, 3, 'FD');
    font('bold', 11); col(C.heading); doc.text('For the doctor', M + 5, y + 8);
    var ty = y + 14;
    font('normal', 8.6); col(C.text); doc.text(about, M + 5, ty); ty += about.length * 3.9 + 2;
    doc.text(scoring, M + 5, ty); ty += scoring.length * 3.9 + 2;
    font('italic', 8.2); col(C.muted); doc.text(cite, M + 5, ty);

    var qr = g.qrcode(0, 'M'); qr.addData(url); qr.make();
    var n = qr.getModuleCount(), qx = W - M - qrS - 5, qy = y + 6, cell = qrS / n;
    fill([255, 255, 255]); doc.rect(qx - 1, qy - 1, qrS + 2, qrS + 2, 'F');
    fill([17, 33, 45]);
    for (var rr = 0; rr < n; rr++) for (var cc = 0; cc < n; cc++) if (qr.isDark(rr, cc)) doc.rect(qx + cc * cell, qy + rr * cell, cell + 0.02, cell + 0.02, 'F');
    font('bold', 7.8); col(C.heading); doc.text('Scan to view this result', qx + qrS / 2, qy + qrS + 4.5, { align: 'center' });
    font('normal', 6.8); col(C.muted);
    doc.text(doc.splitTextToSize('Link holds score, answers, date and age band only - no name. Nothing is stored on a server.', qrS + 6), qx + qrS / 2, qy + qrS + 8.2, { align: 'center' });

    // disclaimer
    y = y + dh + 6; font('normal', 8.8);
    var disc = doc.splitTextToSize(IDRS.DISCLAIMER.replace(/^Screening tool, not a diagnosis\. /, ''), CW - 10);
    var hh = 9 + disc.length * 4.1;
    fill([253, 244, 231]); doc.roundedRect(M, y, CW, hh, 3, 3, 'F');
    font('bold', 9.5); col([107, 58, 5]); doc.text('Important: screening tool, not a diagnosis', M + 5, y + 6.5);
    font('normal', 8.8); col([90, 50, 8]); doc.text(disc, M + 5, y + 11.5);

    // footer
    stroke(C.border); doc.setLineWidth(0.3); doc.line(M, 282, W - M, 282);
    font('normal', 7.8); col(C.muted);
    doc.text('healthprevention.in  |  Generated on the user\'s device; no data was sent to any server.  |  Prototype preview', M, 287);
    doc.text('Page 1 of 1', W - M, 287, { align: 'right' });
    return { doc: doc, url: url, result: r };
  }

  function isIOS() { return /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }

  /* Called from the click handler. iOS Safari ignores <a download> for blobs in some versions, so we open the PDF
     in a tab (pre-opened synchronously to dodge pop-up blockers); elsewhere we trigger a normal download. */
  function download(opts, fallbackLink) {
    var iosWin = isIOS() ? window.open('', '_blank') : null;
    var out = build(opts);
    var fname = 'IDRS-report-' + IDRS.stamp(opts.when || new Date()) + '.pdf';
    var blob = out.doc.output('blob');
    var href = URL.createObjectURL(blob);
    if (fallbackLink) { fallbackLink.href = href; fallbackLink.download = fname; fallbackLink.hidden = false; }
    if (iosWin) { iosWin.location.href = href; }
    else {
      var a = document.createElement('a'); a.href = href; a.download = fname; a.rel = 'noopener';
      document.body.appendChild(a); a.click(); a.remove();
    }
    setTimeout(function () { /* keep URL alive for the fallback link */ }, 0);
    return out;
  }
  g.IDRSPDF = { build: build, download: download, reportUrl: reportUrl };
})(window);
