// Массив прогнозов роста (в %)
const prognozRosta = [12, 35, 8, 45, 3, 22, 55];

// Функция поиска максимума
function findMax(tableau) {
    let max = tableau[0];
    for (let i = 1; i < tableau.length; i++) {
        if (tableau[i] > max) {
            max = tableau[i];
        }
    }
    return max;
}

// Функция фильтрации — только прогнозы выше 20%
function filterHighGrowth(tableau) {
    const resultat = [];
    for (let i = 0; i < tableau.length; i++) {
        if (tableau[i] > 20) {
            resultat.push(tableau[i]);
        }
    }
    return resultat;
}

// Функция суммы
function calculateSum(tableau) {
    let somme = 0;
    for (let i = 0; i < tableau.length; i++) {
        somme += tableau[i];
    }
    return somme;
}

// Функция подсчёта низких прогнозов (<= 5%)
function countLowGrowth(tableau) {
    let count = 0;
    for (let i = 0; i < tableau.length; i++) {
        if (tableau[i] <= 5) {
            count++;
        }
    }
    const percent = (count / tableau.length) * 100;
    return { count, percent };
}

// --- Логика программы ---

const imya = prompt("Введите ваше имя:");

const max = findMax(prognozRosta);
const highGrowth = filterHighGrowth(prognozRosta);
const sum = calculateSum(prognozRosta);
const average = sum / prognozRosta.length;

alert("Привет, " + imya + "! Средний прогнозируемый рост – " + average.toFixed(1) + "%, " + highGrowth.length + " прогнозов – высокие.");

const lowGrowth = countLowGrowth(prognozRosta);

console.log("Доля низких прогнозов: " + lowGrowth.percent.toFixed(1) + "%");
console.log("Количество низких прогнозов: " + lowGrowth.count);

// Дополнительно: предупреждение если максимум > 50%
if (max > 50) {
    console.log("Некоторые прогнозы выглядят очень амбициозно!");
}

const btnAjouter = document.getElementById("btn-ajouter-prognoz");
const btnCacher = document.getElementById("btn-cacher-prognoz");
const listeProgn = document.getElementById("liste-prognozov");

console.log(btnAjouter, btnCacher, listeProgn);


let prognozyListe = [];

function sauvegarderPrognozy() {
    localStorage.setItem("prognozy", JSON.stringify(prognozyListe));
}

function creerCarteProgn(prognoz) {
    const carte = document.createElement("div");
    carte.classList.add("carte-prognoz");

    const texteDescription = document.createElement("p");
    texteDescription.textContent = prognoz.description;

    const texteProbabilite = document.createElement("p");
    texteProbabilite.classList.add("probabilite");
    texteProbabilite.textContent = "Вероятность: " + prognoz.probabilite + "%";

    carte.appendChild(texteDescription);
    carte.appendChild(texteProbabilite);

    const btnSupprimer = document.createElement("button");
    btnSupprimer.textContent = "Удалить";
    btnSupprimer.addEventListener("click", function() {
        carte.remove();
        const index = prognozyListe.indexOf(prognoz);
        if (index !== -1) {
            prognozyListe.splice(index, 1);
        }
        sauvegarderPrognozy();
    });
    carte.appendChild(btnSupprimer);

    return carte;
}

if (btnAjouter && btnCacher && listeProgn) {
    btnAjouter.addEventListener("click", function() {
        const description = prompt("Введите описание прогноза:");
        const probabilite = prompt("Введите вероятность (в %):");

        const prognoz = { description: description, probabilite: probabilite };
        prognozyListe.push(prognoz);

        const carte = creerCarteProgn(prognoz);
        listeProgn.appendChild(carte);

        sauvegarderPrognozy();
    });

    btnCacher.addEventListener("click", function() {
        listeProgn.classList.toggle("hidden");
    });

    const prognozySauvegardes = localStorage.getItem("prognozy");
    if (prognozySauvegardes) {
        prognozyListe = JSON.parse(prognozySauvegardes);
        for (let i = 0; i < prognozyListe.length; i++) {
            const carte = creerCarteProgn(prognozyListe[i]);
            listeProgn.appendChild(carte);
        }
    }
} else {
    console.log("Ошибка: не найдены элементы для секции прогнозов с вероятностью");
}

const btnTheme = document.getElementById("btn-theme");

if (btnTheme) {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("theme-light");
    }

    btnTheme.addEventListener("click", function() {
        document.body.classList.toggle("theme-light");

        if (document.body.classList.contains("theme-light")) {
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
        }
    });
} else {
    console.log("Ошибка: кнопка переключения темы не найдена");
}