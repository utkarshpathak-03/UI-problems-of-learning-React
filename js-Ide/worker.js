// worker.js
self.onmessage = function (e) {
  const { code } = e.data;
  try {
    const log = [];
    const customLog = (...args) => log.push(args.join(" "));

    // Loop protection injection
    let safeCode = code
      .replace(/for\s*\((.*?)\)\s*\{/g, (match, cond) => {
        return `for(${cond}){if(++__iterCount>1500) throw new RangeError("Potential infinite loop: exceeded 1500 iterations.");`;
      })
      .replace(/while\s*\((.*?)\)\s*\{/g, (match, cond) => {
        return `while(${cond}){if(++__iterCount>1500) throw new RangeError("Potential infinite loop: exceeded 1500 iterations.");`;
      })
      .replace(
        /do\s*\{/g,
        'do{if(++__iterCount>1500) throw new RangeError("Potential infinite loop: exceeded 1500 iterations.");'
      );

    const wrappedCode = `
      let __iterCount = 0;
      const console = { log: ${customLog.toString()} };
      ${safeCode}
    `;

    eval(wrappedCode); // safe inside worker
    self.postMessage({ log });
  } catch (err) {
    self.postMessage({ error: err.stack || err.message });
  }
};
