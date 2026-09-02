/* =====================================================
   THEME / DARK LIGHT MODE
===================================================== */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    updateThemeIcon();
}

function updateThemeIcon() {
    if (document.body.classList.contains("light-mode")) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const isLight =
        document.body.classList.contains("light-mode");

    localStorage.setItem(
        "theme",
        isLight ? "light" : "dark"
    );

    updateThemeIcon();
});


/* =====================================================
   MUSIC PLAYER
===================================================== */

const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");

const musicText = musicToggle.querySelector("span:last-child");

music.volume = 0.25;


/*
    Update tampilan tombol musik
*/

function updateMusicButton() {

    if (!music.paused) {

        musicText.textContent = "Music: ON";

        musicToggle.classList.add("playing");

    } else {

        musicText.textContent = "Music: OFF";

        musicToggle.classList.remove("playing");
    }
}


/*
    Tombol Music
*/

musicToggle.addEventListener("click", async () => {

    if (music.paused) {

        try {

            await music.play();

            updateMusicButton();

        } catch (error) {

            console.log(
                "Browser memblokir pemutaran audio."
            );

        }

    } else {

        music.pause();

        updateMusicButton();
    }
});


/*
    Jika musik berhenti secara manual
*/

music.addEventListener("pause", updateMusicButton);
music.addEventListener("play", updateMusicButton);


/*
    Coba autoplay.

    Kalau browser memblokir autoplay,
    website tetap berjalan normal.
*/

window.addEventListener("load", async () => {

    try {

        await music.play();

        updateMusicButton();

    } catch (error) {

        console.log(
            "Autoplay diblokir browser. Klik tombol Music untuk memutar."
        );

    }

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".nav-link");


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const currentId =
                        entry.target.getAttribute("id");

                    navLinks.forEach((link) => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${currentId}`
                        ) {
                            link.classList.add("active");
                        }

                    });

                }

            });

        },
        {
            threshold: 0.35
        }
    );


sections.forEach((section) => {
    sectionObserver.observe(section);
});


/* =====================================================
   CLOSE / RESET MUSIC IF PAGE IS HIDDEN
===================================================== */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {
            // Tidak menghentikan musik.
            // Musik tetap mengikuti keadaan terakhir.
        }

    }
);