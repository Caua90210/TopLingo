const traduzirTexto = document.querySelector("#traduzirTexto")
const traducaoTexto = document.querySelector("#traducaoTexto")
const btnTradutor = document.querySelector("#btnTradutor")
const selects = document.querySelectorAll("select")
const btnToggleTheme = document.getElementById('btnToggleTheme');

const chk = document.getElementById('chk')

chk.addEventListener('change', () => {
  document.body.classList.toggle('dark')
})


//Países disponíveis para tradução
const paises = {
    "pt-BR": "Português",
    "en-US": "Inglês"
}

selects.forEach((tag) => {

    for (let pais in paises) {

        let selected = ""

        if(tag.classList.contains("selectFrom") && pais === "pt-BR") {
            selected = "selected"

        }else if(tag.classList.contains("selectTo") && pais === "en-US") {
            selected = "selected"
        }

        const option = `<option value="${pais}"${selected}>${paises[pais]}</option>`

        tag.insertAdjacentHTML("beforeend", option)
    }
})

btnTradutor.addEventListener("click", () => {
    
    if(traduzirTexto.value) {
        loadTranslation()
    }else {
        traducaoTexto.value = ""
    }
})

function loadTranslation() {

    fetch(
        `https://api.mymemory.translated.net/get?q=${traduzirTexto.value}&langpair=${selects[0].value}|${selects[1].value}`
    )

    .then((res) => res.json())
    .then((data) => {
        traducaoTexto.value = data.responseData.translatedText
    })
}