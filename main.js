

var urlAPI = "https://api.pexels.com/v1";
var default_key = "563492ad6f91700001000001eb1f4c748fc648e0a5a191ceefb62d85";
var page = 1;
var total_results = 0;
var current_page = 1;
var pages = 0;
var fullscreen = false;

$("#submit").click(function(){
    var query = $("#query").val();
    var duration = Number($("#duration").val());
    if(duration < 5){
        duration = 5
    }
    var interval = duration  * 60 * 1000;
    var per_page = 3600000 / interval;
    var new_page = per_page * interval;

    $("#form_div").css('display', 'none');
    $("#pexel").css('display', 'block');

    $.ajaxSetup({
        headers:{
            'Authorization': default_key
        }
    });

    (function pexel() {
        $.get(urlAPI + "/search?query=" + query + "&per_page=" + per_page + "&page=" + page, function(data, status) {
            if (status == 'success' && data) {
            total_results = data.total_results;
            current_page = data.page;
            pages = Math.floor(total_results / per_page);
            var i=0;
            console.log(data.photos[i].src.landscape);
            $('#pexel').attr('src', data.photos[i].src.landscape);
            setInterval(function(){
                i++;
                console.log(data.photos[i].src.original);
                $('#pexel').attr('src', data.photos[i].src.landscape);
            }, interval);
            }

        }, 'json');
        if(!pages < current_page ){
            page++;
        }
        else {
            page = 1;
        }

    setTimeout(pexel, new_page);
    })();

    var timer;
    $(window).on('mousemove', function(e) {
        $("#toggle").show();
        clearInterval(timer);
        timer = setTimeout(function(){
            $("#toggle").hide();
        }, 3000);
    });

    $("#toggle").on('click', function(e) {
        var element = 'box';
        if(fullscreen){
            exitFullScreen(element);
            fullscreen = false;
            $(this).html('Fullscreen');
        } else {
            goFullScreen(element);
            fullscreen = true;
            $(this).html('Exit');
        }
    });
});

function goFullScreen(element){
    var elem = document.getElementById(element);
    if(elem.requestFullscreen){
        elem.requestFullscreen();
    } else if(elem.mozRequestFullScreen){
        elem.mozRequestFullScreen();
    } else if(elem.webkitRequestFullscreen){
        elem.webkitRequestFullscreen();
    } else if(elem.msRequestFullscreen){
        elem.msRequestFullscreen();
    }
}

function exitFullScreen(){
    if(document.exitFullscreen){
        document.exitFullscreen();
    } else if(document.mozCancelFullScreen){
        document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen){
        document.webkitExitFullscreen();
    } else if(document.msExitFullscreen){
        document.msExitFullscreen();
    }
}

$(document).ready(function(){
    $('input[type="number"]').on('keyup',function(){
        v = parseInt($(this).val());
        min = parseInt($(this).attr('min'));
        max = parseInt($(this).attr('max'));

        if (v < min){
            $(this).val(min);
        } else
        if (v > max){
            $(this).val(max);
        }
    });
});
