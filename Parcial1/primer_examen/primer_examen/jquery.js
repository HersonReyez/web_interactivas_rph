$(document).ready(function () {
    console.log('JQuery IMDb Ready! 🔥🔥🔥');

    var $container = $('#resultadoAjax');
    $container.html('<div class="text-center p-5"><div class="spinner-border text-primary"></div><p class="text-muted mt-2">Cargando cartelera...</p></div>');

    // Consumir PELICULAS.json con AJAX
    function mostrarPeliculas(peliculas) {
        let html = '<div class="row">';
        peliculas.forEach(function (data) {
            let titulo = data.primaryTitle || data.title || 'Título desconocido';
            let imagen = data.primaryImage || data.image || 'https://via.placeholder.com/300x450?text=Sin+Imagen';
            let anio = data.startYear || data.year || 'N/D';
            let rating = data.averageRating || data.rating || '0.0';

            // Agregamos la tarjeta HTML al grid
            html += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card h-100 shadow-sm border-0">
                    <img src="${imagen}" class="card-img-top" alt="${titulo}" style="object-fit: cover; height: 350px; border-radius: 8px 8px 0 0;">
                    <div class="card-body d-flex flex-column p-3">
                        <h6 class="card-title fw-bold text-truncate mb-1" title="${titulo}">${titulo}</h6>
                        <div class="d-flex justify-content-between align-items-center mt-auto mb-3">
                            <small class="text-muted">${anio}</small>
                            <span class="text-warning fw-bold">${rating} <i class="bi bi-star-fill"></i></span>
                        </div>
                        <a href="resena.html?titulo=${encodeURIComponent(titulo)}" class="btn btn-primary w-100 rounded-pill py-1">
                            <i class="bi bi-eye"></i> Ver reseña
                        </a>    
                    </div>
                </div>
            </div>`;
        });
        html += '</div>';
        $container.html(html);
    }

    $.ajax({
        url: 'PELICULAS.json',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log("Películas cargadas con éxito:", data);
            let peliculas = Array.isArray(data) ? data : [data];
            mostrarPeliculas(peliculas);
        },
        error: function (xhr) {
            $container.html('<div class="text-danger text-center p-3"><i class="bi bi-exclamation-triangle-fill"></i> Error al cargar las películas: ' + xhr.status + '</div>');
        }
    });


    // BUSCADOR DE PELICULAS//
    $('#inputKeyup').on('keyup', function () {
        var texto = $(this).val().toLowerCase();
        $('.card-title').each(function () {
            var contenido = $(this).text().toLowerCase();
            if (contenido.includes(texto)) {
                $(this).closest('.col-12').show();
            } else {
                $(this).closest('.col-12').hide();
            }
        });
    });

    // FILTRO DE PELICULAS POR AÑO
    $('.btnFiltro').on('click', function () {
        // 1. Cambiar el color del botón activo
        $('.btnFiltro').removeClass('active');
        $(this).addClass('active');

        // 2. Obtener el texto del botón presionado (ej. "1990-1999" o "Todos")
        var rango = $(this).text().trim();

        // 3. Recorrer cada columna que contiene una película
        $('.col-12').each(function () {
            // Extraer el año de la etiqueta <small>
            var anioTexto = $(this).find('.text-muted').text().trim();
            var anio = parseInt(anioTexto, 10);
            var mostrar = false;

            if (rango === "Todos") {
                mostrar = true;
            } else {
                // Separar el string "1990-1999" en un arreglo ["1990", "1999"]
                var limites = rango.split('-');
                var min = parseInt(limites[0], 10);
                var max = parseInt(limites[1], 10);

                // Validar si el año entra en el rango numérico
                if (anio >= min && anio <= max) {
                    mostrar = true;
                }
            }

            // Mostrar u ocultar la tarjeta entera
            if (mostrar) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });


    // PAGINA RESEÑA
    
});