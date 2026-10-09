/* IDRS shared logic for the result card, the PDF and report.html.
   Scoring and wording match the live healthprevention.in registry (src/lib/assessments/registry.ts). */
(function (g) {
  var Q = [
    { id: 'age', t: 'Age', o: [['<35 years', 0], ['35-49 years', 20], ['50+ years', 30]] },
    { id: 'sex', t: 'Sex', o: [['Male', 1], ['Female', 0]], noScore: true },
    { id: 'waist', t: 'Waist circumference', men: [['<90 cm', 0], ['90-99 cm', 10], ['>=100 cm', 20]], women: [['<80 cm', 0], ['80-89 cm', 10], ['>=90 cm', 20]] },
    { id: 'pa', t: 'Physical activity', o: [['Vigorous exercise daily', 0], ['Moderate exercise OR strenuous work', 10], ['Mild exercise', 20], ['Sedentary (no exercise)', 30]] },
    { id: 'fh', t: 'Family history of diabetes', o: [['No', 0], ['One parent', 10], ['Both parents', 20]] }
  ];
  var BANDS = {
    low:      { key: 'low', label: 'Low risk', range: 'Below 30', rgb: [42, 186, 117], text: [23, 107, 67],
                next: 'Continue healthy eating and regular activity, and recheck periodically.' },
    moderate: { key: 'moderate', label: 'Moderate risk', range: '30-50', rgb: [221, 133, 9], text: [138, 75, 6],
                next: 'A fasting blood glucose test is worth doing, along with diet and activity changes.' },
    high:     { key: 'high', label: 'High risk', range: '60 and above', rgb: [210, 34, 34], text: [178, 31, 31],
                next: 'Ask your doctor about HbA1c and fasting glucose testing without delay.' }
  };
  var CITATION = 'Mohan V, Deepa R, Deepa M, Somannavar S, Datta M. A simplified Indian Diabetes Risk Score for screening for undiagnosed diabetic subjects. J Assoc Physicians India. 2005;53:759-63. PMID: 16334618.';
  var ABOUT = 'The Indian Diabetes Risk Score (IDRS) was developed from the Chennai Urban Rural Epidemiology Study (CURES) for use in Indian populations. It uses four items only - age, waist circumference, physical activity and family history of diabetes - and needs no blood test. It estimates risk and suggests whether testing is worthwhile; it cannot tell whether the person has diabetes.';
  var DISCLAIMER = 'Screening tool, not a diagnosis. A high IDRS means the risk profile warrants a blood test. Only a laboratory glucose or HbA1c test, interpreted by a doctor, can confirm diabetes. This tool is for health awareness only and does not replace professional medical advice.';

  function optionsFor(q, isMale) { return q.id === 'waist' ? (isMale ? q.men : q.women) : q.o; }
  function band(total) { return total >= 60 ? BANDS.high : total >= 30 ? BANDS.moderate : BANDS.low; }

  /* answers = option indices {age, sex(0=Male,1=Female), waist, pa, fh} */
  function score(ix) {
    var isMale = ix.sex === 0, rows = [], total = 0;
    Q.forEach(function (q) {
      var o = optionsFor(q, isMale)[ix[q.id]];
      if (!o) throw new Error('bad answer ' + q.id);
      var pts = q.noScore ? null : o[1];
      if (pts !== null) total += pts;
      rows.push({ id: q.id, question: q.t + (q.id === 'waist' ? (isMale ? ' (men)' : ' (women)') : ''), answer: o[0].replace('>=', '≥'), answerAscii: o[0], points: pts });
    });
    return { rows: rows, total: total, band: band(total), isMale: isMale };
  }
  /* convert point values (as used by the quiz) to option indices */
  function indicesFromPoints(A) {
    var isMale = A.sex === 1, ix = {};
    Q.forEach(function (q) {
      var opts = optionsFor(q, isMale), want = A[q.id];
      ix[q.id] = opts.findIndex(function (o) { return o[1] === want; });
    });
    return ix;
  }
  function stamp(d) {
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return '' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + p(d.getHours()) + p(d.getMinutes());
  }
  function fmtStamp(s) {
    var M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return +s.slice(6, 8) + ' ' + M[+s.slice(4, 6) - 1] + ' ' + s.slice(0, 4) + ', ' + s.slice(8, 10) + ':' + s.slice(10, 12);
  }
  /* compact, name-free payload for the URL fragment: v1-<stamp>-<age>-<M|F>-<waist>-<pa>-<fh>-<total> */
  function encode(ix, when) {
    var r = score(ix);
    return ['1', stamp(when || new Date()), ix.age, ix.sex === 0 ? 'M' : 'F', ix.waist, ix.pa, ix.fh, r.total].join('-');
  }
  function decode(s) {
    var m = /^1-(\d{12})-([0-2])-([MF])-([0-2])-([0-3])-([0-2])-(\d{1,3})$/.exec(s || '');
    if (!m) return null;
    var ix = { age: +m[2], sex: m[3] === 'M' ? 0 : 1, waist: +m[4], pa: +m[5], fh: +m[6] };
    var r = score(ix);
    return { ix: ix, stamp: m[1], when: fmtStamp(m[1]), claimed: +m[7], result: r, consistent: +m[7] === r.total };
  }
  g.IDRS = { Q: Q, BANDS: BANDS, CITATION: CITATION, ABOUT: ABOUT, DISCLAIMER: DISCLAIMER, score: score, band: band,
    indicesFromPoints: indicesFromPoints, encode: encode, decode: decode, stamp: stamp, fmtStamp: fmtStamp, optionsFor: optionsFor };
})(window);
