function exitDescGame() {
    const descGame = document.querySelector('.desc-game-main');
    descGame.style.display = 'none';
}

function loadTablesCards() {
    const cardsContainer = document.querySelector('.cards-container-main');
    let htmlCards = '';
    for (let i = 1; i <= 10; i++) {
        htmlCards += `
            <div class="card-main">
                <p class="titulo-card-main">
                    Tabla del <span class="numero-tabla">${i}</span>
                </p>
                <table class="table-main">
                    <tbody>
                        <!-- Aquí generamos las filas de la tabla -->
                        <!-- Cambiamos el multiplicador en cada iteración -->
                        ${generateTableRows(i)}
                    </tbody>
                </table>
                <div class="btn-table-container">
                    <!-- Pasamos el número actual como parámetro a la función play -->
                    <button class="btn-play-card-main" onclick="play(${i})"><i class="fas fa-play"></i> Play</button>
                </div>
            </div>
        `;
    }
    cardsContainer.innerHTML = htmlCards;
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
                <td class="producto-table-main"><b>${multiplicador * j}</b></td>
            </tr>
        `;
    }
    return rows;
}

function play(n) {
    console.log(n);
    // Navega hacia la página del juego
    window.location.href = `../game/?table=${n}`;
}