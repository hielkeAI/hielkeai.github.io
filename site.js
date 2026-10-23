const themeToggle = document.querySelector("#theme-toggle");
const siteLogo = document.querySelector(".site-logo");
const excuseButton = document.querySelector("#excuse-button");

function applyTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    if (themeToggle) {
        themeToggle.textContent = isDark ? "☀ light mode" : "☾ dark mode";
        themeToggle.setAttribute("aria-pressed", String(isDark));
    }
}

let savedTheme = "dark";
try {
    const storedTheme = localStorage.getItem("hielke-ai-theme");
    savedTheme = storedTheme === "light" ? "light" : "dark";
} catch (error) {
    console.warn("Theme preference could not be read from local storage.", error);
}

applyTheme(savedTheme);

themeToggle?.addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(theme);
    try {
        localStorage.setItem("hielke-ai-theme", theme);
    } catch (error) {
        console.warn("Theme preference could not be saved to local storage.", error);
    }
});

if (siteLogo) {
    const showFallback = () => {
        siteLogo.hidden = true;
        siteLogo.previousElementSibling.hidden = false;
    };
    const showLogo = () => {
        siteLogo.hidden = false;
        siteLogo.previousElementSibling.hidden = true;
    };

    if (siteLogo.complete) {
        if (siteLogo.naturalWidth > 0) {
            showLogo();
        } else {
            showFallback();
        }
    } else {
        siteLogo.addEventListener("error", showFallback, { once: true });
        siteLogo.addEventListener("load", showLogo, { once: true });
    }
}

const homeworkExcuses = [
    "The dog opened 47 browser tabs and lost my worksheet.",
    "My calculator needed a very important software update.",
    "I finished it, but the answer is currently buffering.",
    "A rogue fraction bar divided my attention.",
    "The worksheet escaped into the mysterious pile of worksheets.",
    "I was waiting for the homework to respawn."
];

excuseButton?.addEventListener("click", () => {
    const output = document.querySelector("#excuse-output");
    const currentExcuse = output.textContent;
    const choices = homeworkExcuses.filter((excuse) => excuse !== currentExcuse);
    output.textContent = choices[Math.floor(Math.random() * choices.length)];
});
