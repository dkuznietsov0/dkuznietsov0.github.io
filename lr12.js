$(function () {

    const allWords = [
        { en: "dog", ua: "собака" },
        { en: "cat", ua: "кіт" },
        { en: "sun", ua: "сонце" },
        { en: "book", ua: "книга" },
        { en: "water", ua: "вода" },
        { en: "tree", ua: "дерево" },
        { en: "city", ua: "місто" },
        { en: "friend", ua: "друг" },
        { en: "day", ua: "день" },
        { en: "name", ua: "ім'я" },
        { en: "house", ua: "будинок" },
        { en: "school", ua: "школа" },
        { en: "car", ua: "автомобіль" },
        { en: "flower", ua: "квітка" },
        { en: "river", ua: "річка" }
    ];

    let words = [];
    let index = 0;
    let correct = 0;
    let wrong = 0;

    function startTest() {
        const level = $("#difficulty").val();
        if (level === "easy") words = allWords.slice(0,5);
        else if (level === "medium") words = allWords.slice(0,10);
        else words = allWords.slice(0,15);

        words.sort(() => Math.random() - 0.5);
        index = 0;
        correct = 0;
        wrong = 0;

        $("#correct").text(correct);
        $("#wrong").text(wrong);

        loadWord();
    }

    function loadWord() {
        $("#wordCard").text(words[index].en);
        $("#progress").text(`${index + 1}/${words.length}`);
        $("#answerInput").val("").focus();
    }

    function checkAnswer() {
        let val = $("#answerInput").val().trim().toLowerCase();
        if (!val) return;

        let isCorrect = val === words[index].ua;
        if (isCorrect) {
            correct++;
            $("#wordCard").css("background", "#a6f3a6");
        } else {
            wrong++;
            $("#wordCard").css("background", "#f3a6a6");
        }

        $("#correct").text(correct);
        $("#wrong").text(wrong);

        setTimeout(() => {
            $("#wordCard").css("background", "#f2f2f2");
            index++;
            if (index < words.length) loadWord();
            else showResults();
        }, 400);
    }

    function showResults() {
        let score = correct / words.length * 100;
        let text =
            score === 100 ? "100% — топ!" :
            score >= 80 ? "Дуже добре" :
            score >= 50 ? "Непогано" :
            "Потрібно більше практики";

        $("#resultText").text(text);
        $("#modal").show();
    }

    $("#wordCard").click(checkAnswer);
    $("#answerInput").on("keydown", e => {
        if (e.key === "Enter") checkAnswer();
    });
    $("#closeModal").click(() => $("#modal").hide());
    $("#startBtn").click(startTest);
});
