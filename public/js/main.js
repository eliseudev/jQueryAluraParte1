var tempoInicial = $("#tempoDigitacao").text();
var campo = $(".campoDigitacao");

$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#btnReiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    $("#tamanhoFrase").text(numPalavras);
}

function inicializaContadores() {
    campo.on("input", function () {
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contadorPalavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contatorCaracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempoDigitacao").text();
    campo.one("focus", function () {
        var cronometroID = setInterval(function () {
            tempoRestante--;
            $("#tempoDigitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}
function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campoDesativado");
    inserePlacar();
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function () {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        if (digitado == comparavel) {
            campo.addClass("bordaVerde");
            campo.removeClass("bordaVermelha");
        } else {
            campo.addClass("bordaVermelha");
            campo.removeClass("bordaVerde")
        }
    });
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contadorPalavras").text("0")
    $("#contatorCaracteres").text("0");
    $("#tempoDigitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campoDesativado");
    campo.removeClass("bordaVerde");
    campo.removeClass("bordaVermelha");
}