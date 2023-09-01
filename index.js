var data, error;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("name")
        .addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                document.querySelector("#button").click()
            }
        });
});

async function Gerar() {
    document.querySelector("#button").innerHTML = ""
    document.querySelector("#button").innerHTML = `
        <div class="loading"></div>
    `

    let foto = document.querySelector("#name").value;
    let fotoDiv = document.querySelector("#foto");

    if (foto === "") {
        document.querySelector("#button").innerHTML = `
            Gerar Foto
        `
        return
    } else {
        const api_key = "vVkbJlFQZzcJc5HiqIwWxicbgnbYjsldUN6xN7NLRPnAlDW2eFCyPAtv";
        const api_url = `https://api.pexels.com/v1/search?query=${foto}&per_page=16`;

        fetch(api_url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${api_key}`,

            }
        })
            .then(response => response.json())
            .then(res => {
                data = res
                console.log(res);
                document.querySelector("#button").innerHTML = `
            Gerar Foto
        `
                fotoDiv.innerHTML = '';

                data.photos.forEach((item, key) => {
                    const linkElement = document.createElement('a');
                    linkElement.href = item.url; // Defina o link para o URL da imagem
                    linkElement.target = "_blank"
                    linkElement.className = "img_a"

                    // Crie o elemento <img> e configure o atributo src
                    const imgElement = document.createElement('img');
                    imgElement.src = item.src.medium;

                    // Anexe a imagem ao link
                    linkElement.appendChild(imgElement);

                    // Anexe o link (com a imagem dentro) à fotoDiv
                    fotoDiv.appendChild(linkElement);
                });

            })
            .catch(erro => {
                console.error('Erro na solicitação:', erro);
                document.querySelector("#button").innerHTML = `
                    Gerar Foto
                `

                const toast = document.getElementById("toast")
            
                toast.style.display = "block"
                toast.innerHTML = `
                    <p class="toast-p">Descuple, houve um erro indesejado!<i class="fa fa-close" onclick="
                        toast.style.display = 'none'
                    "></i></p>
                    <div class="progress-bar"></div>
                `

                setTimeout(() => {
                    toast.style.display = "none"
                }, 5000)

            })
    }

}
