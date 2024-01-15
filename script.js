const html = document.querySelector("html")

const botaoFoco = document.querySelector(".app__card-button--foco")
const botaoCurto = document.querySelector(".app__card-button--curto")
const botaoLongo = document.querySelector(".app__card-button--longo")
const botoes = document.querySelectorAll(".app__card-button")
const botaoStart = document.querySelector(".app__card-primary-button")
const startPauseText = document.querySelector(".app__card-primary-button span")
const startPauseImage = document.querySelector(".app__card-primary-button img")

const titulo = document.querySelector(".app__title")
const banner = document.querySelector(".app__image")
const tempoNaTela = document.querySelector(".app__card-timer")

const musicaFocoInput = document.querySelector(".toggle-checkbox")
const musica = new Audio("./sons/luna-rise-part-one.mp3")
const playAudio = new Audio("./sons/play.wav")
const pauseAudio = new Audio("./sons/pause.mp3")
const finalAudio = new Audio("./sons/beep.mp3")

let tempoDecorrido = 1800 
let intervaloId = null

function apagaAtiva() {
    botoes.forEach((botao) => {
        botao.classList.remove("active")
    })
}

function alteraContexto(contexto) {
    apagaAtiva()
    mostrarTempo()
    html.setAttribute("data-contexto", contexto)
    banner.setAttribute("src", `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = ` Otimize sua produtividade,<br>
             <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break

        case "descanso-curto":
            titulo.innerHTML = ` Que tal dar uma respirada?<br>
             <strong class="app__title-strong">Faça uma pausa curta.</strong>`
            break

        case "descanso-longo":
            titulo.innerHTML = ` Hora de voltar a superfície<br>
                 <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break

        default:
            break
    }
}

function iniciar () {
    if(intervaloId){
        pauseAudio.play()
        zerar()
        startPauseText.textContent = "Iniciar"
        startPauseImage.setAttribute("src", "./imagens/play_arrow.png")
        return
    }
    playAudio.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    startPauseText.textContent = "Pausar"
    startPauseImage.setAttribute("src", "./imagens/pause.png")
}

function zerar () {
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorrido*1000)
    const tempoFormatado = tempo.toLocaleTimeString("pt-br", {minute: "2-digit", second:"2-digit"})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

const contagemRegressiva = () => {
    if(tempoDecorrido <= 0) {
        zerar()
        // finalAudio.play()
        return
    }
    tempoDecorrido -= 1
    mostrarTempo()
}

musicaFocoInput.addEventListener("change", () => {
    if (musica.paused) {
        musica.loop = true;
        musica.play();
    } else {
        musica.pause()
    }
})
botaoFoco.addEventListener("click", () => {
    tempoDecorrido = 1800;
    alteraContexto("foco");
    botaoFoco.classList.add("active")
})

botaoCurto.addEventListener("click", () => {
    tempoDecorrido = 300;
    alteraContexto("descanso-curto");
    botaoCurto.classList.add("active")
})

botaoLongo.addEventListener("click", () => {
    tempoDecorrido = 900;
    alteraContexto("descanso-longo");
    botaoLongo.classList.add("active")
})

botaoStart.addEventListener("click", iniciar)


mostrarTempo()