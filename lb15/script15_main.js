function loadScript(fileName) {
    const scriptElement = document.createElement("script");
    scriptElement.src = fileName;
    document.body.appendChild(scriptElement);
}

function initApplication() {
    const userInput = prompt("Оберіть номер завдання (1-6): ");

    switch (userInput) {
        case "1":
            loadScript("script15_1.js");
            break;
        case "2":
            loadScript("script15_2.js");
            break;
        case "3":
            loadScript("script15_3.js");
            break;
        case "4":
            loadScript("script15_4.js");
            break;
        case "5":
            loadScript("script15_5.js");
            break;
        case "6":
            loadScript("script15_6.js");
            break;
        default:
            initApplication();
            break;
    }
}

initApplication();