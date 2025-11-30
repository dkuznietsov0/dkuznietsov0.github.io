$(function () {

    let words = [
        { en: "dog", ua: "собака" },
        { en: "cat", ua: "кіт" },
        { en: "sun", ua: "сонце" },
        { en: "book", ua: "книга" },
        { en: "water", ua: "вода" },
        { en: "tree", ua: "дерево" },
        { en: "city", ua: "місто" },
        { en: "friend", ua: "друг" },
        { en: "day", ua: "день" },
        { en: "name", ua: "ім'я" }
    ];

    words.sort(() => Math.random() - 0.5);

    let index = 0;
    let correct = 0;
    let wrong = 0;

    function loadWord() {
        $("#wordCard").text(words[index].en);
        $("#progress").text(`${index + 1}/${words.length}`);
        $("#answerInput").val("");
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

    $("#wordCard").click(checkAnswer);

    $("#answerInput").on("keypress", e => {
        if (e.key === "Enter") checkAnswer();
    });

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

    $("#closeModal").click(() => $("#modal").hide());

    loadWord();
});
