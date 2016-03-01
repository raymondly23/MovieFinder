$(document).ready(init);

var $page = 1;
function init(){
	$('#next').click(pages)
	$('#search').click(getMovie)
}


function getMovie(){
	var $movie = $('#movie').val().toLowerCase().trim();
	var $year = $('#year').val();
	var $type = $('#type').val();
	var $plot = $('#plot').val();
	$.get(`http://www.omdbapi.com/?s=${$movie}&y=${$year}&type=${$type}&page=${$page}&r=json`)
	.done (function(data){
		for(i=0;i<10;i++){
			var $title = data.Search[i].Title;
			$year = data.Search[i].Year;
			$type = data.Search[i].Type;
			$.get(`http://www.omdbapi.com/?t=${$title}&y=${$year}&type=${$type}&plot=${$plot}&r=json`)
			.done(function(data){
				var $poster = makeCard(data);
				var $plot = $('<p>').text(data.Plot).append('<br>');
				$('#container').append($poster)
				$('#container').append($plot);
				$page++
			})
		};
	});
}


function makeCard(data){
	var $imdbID = data.imdbID
	var $imdb = `http://www.imdb.com//title/${$imdbID}`;
	var $title = $('<a>').text(data.Title).attr('href', $imdb);
	var $img = $('<img>');
	var $year = $('<h4>').text(data.Year);
	$img.attr('src', data.Poster);
	var $div = $('<div>').append($title).append($year).append('<br>').append($img).append('<br>');
	$('#container').append($div);
}


function pages(){
	$('#container').remove('div');
		getMovie();
}
