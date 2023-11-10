var nTable = 0;
function loadContentGame() {
    const titleMain = document.querySelector('.title-main');
    const numeroTablaCard = document.querySelector('.numero-tabla');
    const tableMainBody = document.querySelector('.table-main tbody');
    // Obtiene el número de la tabla seleccionada de la URL
    const urlParams = new URLSearchParams(window.location.search);
    nTable = parseInt(urlParams.get('table'));

    titleMain.innerHTML += nTable;
    numeroTablaCard.innerHTML += nTable;
    tableMainBody.innerHTML += generateTableRows(nTable);
    titleMain.style.backgroundImage = 'url("../assets/img/fondo-2.jpg")';
}

// Función para generar las filas de la tabla
function generateTableRows(multiplicador) {
    let rows = '';
    for (let j = 1; j <= 10; j++) {
        rows += `
            <tr>
                <td class="multiplicador-table-main">${multiplicador}</td>
                <td class="por-table-main">*</td>
                <td class="multiplicador-table-main">${j}</td>
                <td class="igual-table-main">=</td>
                <td class="producto-table-main">
                        <div class="input-group mb-4 respuesta-table" style="bottom:-12px; margin:0; max-width: 160px">
                            <input type="number" class="form-control" placeholder="Respuesta" aria-label="Respuesta" aria-describedby="respuesta" required>
                            <span class="input-group-text" id="respuesta"><i class="fas fa-pen-square pencil-icon"></i></span>
                        </div>
                </td>
                <!-- Espacio para mostrar la respuesta correcta y el icono -->
                <td class="respuesta-correcta" id="respuesta-correcta${j}"></td>
            </tr>
        `;
    }
    return rows;
}

function verificarRespuestas(nTable) {
    let textoVentana = '';
    let backgroundVentana = '';
    let backdropVentana = '';

    // Se obtienen todas las respuestas
    const respuestas = document.querySelectorAll('.respuesta-table input');
    let contBuenas = 0;
    let contMalas = 0;

    // Respuestas correctas 
    const respuestasCorrectas = [];
    for (let i = 1; i<=10; i++) {
        respuestasCorrectas.push(nTable * i);
    }

    // Se inicializa un arreglo para almacenar las respuestas incorrectas
    const respuestasIncorrectas = [];

    // Se recorre cada celda de respuesta
    respuestas.forEach((input, index) => {
        const respuestaUsuario = parseInt(input.value);
        const respuestaCorrecta = respuestasCorrectas[index];

        // Actualiza el contenido y el estilo de la celda de respuesta correcta
        const respuestaCorrectaElement = document.getElementById(`respuesta-correcta${index + 1}`);
        respuestaCorrectaElement.style.display = 'table-cell';
        respuestaCorrectaElement.textContent = `Respuesta correcta: ${respuestaCorrecta}`;

        if (respuestaUsuario === respuestaCorrecta) {
            // Si la respuesta es correcta, muestra un icono de check
            respuestaCorrectaElement.innerHTML += ' <i class="fas fa-check-circle text-success"></i>';
            contBuenas++;
        } else {
            // Si la respuesta es incorrecta, muestra un icono de cruz
            respuestaCorrectaElement.innerHTML += ' <i class="fas fa-times-circle text-danger"></i>';

            // Si es incorrecta, agrega el índice al arreglo de respuestas incorrectas
            respuestasIncorrectas.push(index + 1); // Sumamos 1 porque los índices comienzan desde 0

            contMalas++;
        }

    });

    // Muestra un mensaje indicando el resultado
    if (respuestasIncorrectas.length === 0) {
        textoVentana = `<b>¡Felicidades, todas las respuestas son correctas! Punteo 10/10 pts.</b>`;
        backgroundVentana = 'fondo-4.jpg';
        backdropVentana = 'm.gif';
    } else {
        textoVentana = `<b>Obtuviste ${contBuenas} respuestas buenas y ${contMalas} respuestas malas.<br><br>Tu punteo es: ${contBuenas}/10.<br><br>Las respuestas incorrectas están en las filas: ${respuestasIncorrectas.join(', ')}. Porfavor procura repasar más <a href="../index.html#table${nTable}">la tabla del ${nTable}</a> y vuelvelo a intentar 😊.</b>`;
        backgroundVentana = 'fondo-5.jpg';
        backdropVentana = 'sad.gif';
    }

    Swal.fire({
        title: textoVentana,
        width: 600,
        padding: "3em",
        color: "#ffffff",
        background: `#fff url(../assets/img/${backgroundVentana})`,
        backdrop: `
          rgba(0,0,123,0.4)
          url("../assets/img/${backdropVentana}")
          left top
          no-repeat
        `
    });
}


function exitDescGame() {
    const descGame = document.querySelector('.desc-game-main');
    descGame.style.display = 'none';
}