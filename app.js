document.addEventListener("DOMContentLoaded", () => {
    const splashScreen = document.getElementById("splash-screen");
    const mainMenu = document.getElementById("main-menu");

    // Menunggu 2 detik lalu menghilangkan splash screen
    setTimeout(() => {
        if(splashScreen) splashScreen.classList.add("hidden");
        if(mainMenu) mainMenu.classList.remove("hidden");
    }, 2000);
});