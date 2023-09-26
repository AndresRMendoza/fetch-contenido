//Se almacena un elemento del DOM en la variable correspondiente para poder hacer uso de ella.
const $body = document.querySelector(".main-container");

const request = () => {
    /*Mediante la técnica de la delegación de eventos le asigno un evento "click" al documento completo.
    La callback que se utiliza es una arrow function asincrona, porque en esta callback se realizarán las 
    peticiones al resto de archivos HTML para hacer el cambio de vista del sitio web.*/
    document.addEventListener("click", async e => {
        //Si el elemento que origina el evento es igual al selector CSS indicado, entonces, realiza la siguiente programación.
        if(e.target.matches(".header-container__a")) {

            e.preventDefault();//Se cancela el evento que tiene por default el elemento que origina el envento.
            
            try{//Try que evalúa la parte verdadera del manejo de la petición. 
                let request = await fetch(e.target.getAttribute("href"));//Se realiza la petición HTTP GET a los archivos HTML correspondientes.
                let data = await request.text();//El contenido de la petición se convierte a texto.

                //Si la petición falla, entonces, pasa al catch.
                if(!request.ok) throw {status: request.status, statusText: request.statusText};

                $body.innerHTML = data;//Al elemento del DOM almacenado en la variable "$body" se le añade como HTML el contenido de la petición.

                /*En base al contenido mostrado cambia las clases de la etiqueta main 
                para poder hacer el cambio de color del background y el texto mostrado.*/
                if(e.target.getAttribute("href") === "html.html") {
                    $body.parentElement.setAttribute("class", "main html");

                }else if(e.target.getAttribute("href") === "css.html") {
                    $body.parentElement.setAttribute("class", "main css");

                }else if(e.target.getAttribute("href") === "js.html") {
                    $body.parentElement.setAttribute("class", "main js")

                }else if(e.target.getAttribute("href") === "sql.html") {
                    $body.parentElement.setAttribute("class", "main sql");
                    const $h1 = document.querySelector(".main-container__h1");
                    $h1.classList.add("main-container__h1--color");

                }else if(e.target.getAttribute("href") === "node.html") {
                    $body.parentElement.setAttribute("class", "main node");
                    const $h1 = document.querySelector(".main-container__h1");
                    $h1.classList.add("main-container__h1--color");

                }else if(e.target.getAttribute("href") === "end.html") {
                    $body.parentElement.setAttribute("class", "main end");

                }else if(e.target.getAttribute("href") === "home.html") {
                    $body.parentElement.setAttribute("class", "main home");

                }
            
            }catch(err) {//Si la petición falla, entonces, en el catch se maneja el error.
                let message = err.statusText || `Ocurrió un error ${err.status} :c`;
                const $h1 = document.createElement("h1");
                $h1.setAttribute("class", "main-container__h1 main-container__h1--color");
                $h1.textContent = message;
                $body.appendChild($h1);
            }
        }
    });
}

export default request;//Se exporta por default la función request.