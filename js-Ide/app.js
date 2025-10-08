document.addEventListener("DOMContentLoaded", () => {
  const runBtn = document.getElementById("run-btn");
  const clearBtn = document.getElementById("clear-btn");
  const outputEl = document.getElementById("output");
  const toggleBtn = document.getElementById("toggle-theme");
  const langButtons = document.querySelectorAll(".lang-btn");

  // Monaco Editor setup
  require.config({
    paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.34.1/min/vs" },
  });

  require(["vs/editor/editor.main"], function () {
    window.editor = monaco.editor.create(document.getElementById("editor"), {
      value: `// Write JavaScript code here\nconsole.log("Hello from SuperIDE!");`,
      language: "javascript",
      theme: "vs-dark",
      fontSize: 14,
      automaticLayout: true,
    });

    // Safari fix: force re-layout when window resizes
    window.addEventListener("resize", () => {
      if (window.editor) {
        window.editor.layout();
      }
    });

    // Enable buttons
    runBtn.disabled = false;
    clearBtn.disabled = false;

    // Run JS code safely in Worker with loop protection
    runBtn.addEventListener("click", () => {
      outputEl.textContent = "";
      const code = window.editor.getValue();

      const worker = new Worker("worker.js");
      worker.postMessage({ code });

      worker.onmessage = (e) => {
        const { log, error } = e.data;
        if (error) {
          outputEl.textContent = error;
        } else {
          outputEl.textContent = (log || []).join("\n");
        }
        worker.terminate(); // cleanup after execution
      };

      worker.onerror = (err) => {
        outputEl.textContent = "Runtime Error: " + err.message;
        worker.terminate();
      };
    });

    // Clear output
    clearBtn.addEventListener("click", () => {
      outputEl.textContent = "";
    });

    // Handle language selection
    langButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        langButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const lang = btn.dataset.lang;

        if (lang === "js") {
          runBtn.disabled = false;
          clearBtn.disabled = false;
          window.editor.updateOptions({ readOnly: false });
          window.editor.setValue(
            `// Write JavaScript code here\nconsole.log("Hello from SuperIDE!");`
          );
          outputEl.textContent =
            "✅ JavaScript selected. Write your code and hit Run!";
        } else {
          runBtn.disabled = true;
          clearBtn.disabled = true;
          window.editor.updateOptions({ readOnly: true });
          window.editor.setValue(`// Feature Coming Soon`);
          outputEl.textContent = "⚠️ This feature is Coming Soon!";
        }
      });
    });
  });

  // Toggle theme with icon change
  toggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");
    if (window.editor) {
      monaco.editor.setTheme(isLight ? "vs" : "vs-dark");
    }
    toggleBtn.textContent = isLight ? "🌞" : "🌙";
  });
});
