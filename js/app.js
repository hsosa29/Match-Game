
function numeroAleatorio(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function setColores(selector) {
	$(selector).animate({
			opacity: '1',
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
			},
			queue: true
		}, 600)
		.delay(1000)
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
				setColores('h1.main-titulo');
			},
			queue: true
		});
}

function arregloDulces(arrayType, index) {

	var dulceCol1 = $('.col-1').children();
	var dulceCol2 = $('.col-2').children();
	var dulceCol3 = $('.col-3').children();
	var dulceCol4 = $('.col-4').children();
	var dulceCol5 = $('.col-5').children();
	var dulceCol6 = $('.col-6').children();
	var dulceCol7 = $('.col-7').children();

	var columnaDulces = $([dulceCol1, dulceCol2, dulceCol3, dulceCol4,
		dulceCol5, dulceCol6, dulceCol7
	]);

	if (typeof index === 'number') {
		var dulceRow = $([dulceCol1.eq(index), dulceCol2.eq(index), dulceCol3.eq(index),
			dulceCol4.eq(index), dulceCol5.eq(index), dulceCol6.eq(index),
			dulceCol7.eq(index)
		]);
	} else {
		index = '';
	}

	if (arrayType === 'columns') {
		return columnaDulces;
	} else if (arrayType === 'rows' && index !== '') {
		return dulceRow;
	}
}

function filaDulces(index) {
	var dulceRow = arregloDulces('rows', index);
	return dulceRow;
}

function columnaDulces(index) {
	var dulceColumn = arregloDulces('columns');
	return dulceColumn[index];
}

function validacion() {
	for (var j = 0; j < 7; j++) {
		var counter = 0;
		var dulcePosition = [];
		var extradulcePosition = [];
		var dulceColumn = columnaDulces(j);
		var comparisonValue = dulceColumn.eq(0);
		var gap = false;
		for (var i = 1; i < dulceColumn.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcdulce = dulceColumn.eq(i).attr('src');

			if (srcComparison != srcdulce) {
				if (dulcePosition.length >= 3) {
					gap = true;
				} else {
					dulcePosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						dulcePosition.push(i - 1);
					} else {
						extradulcePosition.push(i - 1);
					}
				}
				if (!gap) {
					dulcePosition.push(i);
				} else {
					extradulcePosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = dulceColumn.eq(i);
		}
		if (extradulcePosition.length > 2) {
			dulcePosition = $.merge(dulcePosition, extradulcePosition);
		}
		if (dulcePosition.length <= 2) {
			dulcePosition = [];
		}
		dulceCount = dulcePosition.length;
		if (dulceCount >= 3) {
			eliminarColumna(dulcePosition, dulceColumn);
			punteo(dulceCount);
		}
	}
}

function eliminarColumna(dulcePosition, dulceColumn) {
	for (var i = 0; i < dulcePosition.length; i++) {
		dulceColumn.eq(dulcePosition[i]).addClass('delete');
	}
}

function validacionFila() {
	for (var j = 0; j < 6; j++) {
		var counter = 0;
		var dulcePosition = [];
		var extradulcePosition = [];
		var dulceRow = filaDulces(j);
		var comparisonValue = dulceRow[0];
		var gap = false;
		for (var i = 1; i < dulceRow.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcdulce = dulceRow[i].attr('src');

			if (srcComparison != srcdulce) {
				if (dulcePosition.length >= 3) {
					gap = true;
				} else {
					dulcePosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						dulcePosition.push(i - 1);
					} else {
						extradulcePosition.push(i - 1);
					}
				}
				if (!gap) {
					dulcePosition.push(i);
				} else {
					extradulcePosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = dulceRow[i];
		}
		if (extradulcePosition.length > 2) {
			dulcePosition = $.merge(dulcePosition, extradulcePosition);
		}
		if (dulcePosition.length <= 2) {
			dulcePosition = [];
		}
		dulceCount = dulcePosition.length;
		if (dulceCount >= 3) {
			eliminarFila(dulcePosition, dulceRow);
			punteo(dulceCount);
		}
	}
}
function eliminarFila(dulcePosition, dulceRow) {
	for (var i = 0; i < dulcePosition.length; i++) {
		dulceRow[dulcePosition[i]].addClass('delete');
	}
}

function punteo(dulceCount) {
	var score = Number($('#score-text').text());
	switch (dulceCount) {
		case 3:
			score += 25;
			break;
		case 4:
			score += 50;
			break;
		case 5:
			score += 75;
			break;
		case 6:
			score += 100;
			break;
		case 7:
			score += 200;
	}
	$('#score-text').text(score);
}

function tableroVerificar() {
	llenarTablero();
}

function llenarTablero() {
	var top = 6;
	var column = $('[class^="col-"]');

	column.each(function () {
		var dulces = $(this).children().length;
		var agrega = top - dulces;
		for (var i = 0; i < agrega; i++) {
			var dulceType = numeroAleatorio(1, 5);
			if (i === 0 && dulces < 1) {
				$(this).append('<img src="image/' + dulceType + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + dulceType + '.png" class="element"></img>');
			}
		}
	});
	addEvento();
	setValidaciones();
}

function setValidaciones() {
	validacion();
	validacionFila();

	if ($('img.delete').length !== 0) {
		eliminarDulcesAnimation();
	}
}

function addEvento() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: movimientoDulce
	});
	$('img').droppable({
		drop: rowDulce
	});
	activarEvento();
}

function desactivarEvento() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function activarEvento() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

function movimientoDulce(event, dulceDrag) {
	dulceDrag.position.top = Math.min(100, dulceDrag.position.top);
	dulceDrag.position.bottom = Math.min(100, dulceDrag.position.bottom);
	dulceDrag.position.left = Math.min(100, dulceDrag.position.left);
	dulceDrag.position.right = Math.min(100, dulceDrag.position.right);
}

function rowDulce(event, dulceDrag) {
	var dulceDrag = $(dulceDrag.draggable);
	var dragSrc = dulceDrag.attr('src');
	var dulceDrop = $(this);
	var dropSrc = dulceDrop.attr('src');
	dulceDrag.attr('src', dropSrc);
	dulceDrop.attr('src', dragSrc);

	setTimeout(function () {
		tableroVerificar();
		if ($('img.delete').length === 0) {
			dulceDrag.attr('src', dragSrc);
			dulceDrop.attr('src', dropSrc);
		} else {
			updateMoves();
		}
	}, 500);

}

function tableroVerificarPromise(result) {
	if (result) {
		tableroVerificar();
	}
}

function updateMoves() {
	var actualValue = Number($('#movimientos-text').text());
	var result = actualValue += 1;
	$('#movimientos-text').text(result);
}

function eliminarDulcesAnimation() {
	desactivarEvento();
	$('img.delete').effect('pulsate', 400);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				eliminarDulces()
					.then(tableroVerificarPromise);					
			},
			queue: true
		});
}

function eliminarDulces() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar dulce...');
		}
	})
}

function endGame() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Juego finalizado!');
	$('div.score, div.moves, div.panel-score').width('100%');
	
}

function init() {

	setColores('h1.main-titulo');

	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		tableroVerificar();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: endGame
		})
	});
}

// Prepara el juego
$(function() {
	init();
});

