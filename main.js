$(document).ready(function() {
    //array with photos
    //var images = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.jpg", "img/7.jpg", "img/8.jpg", "img/9.jpg", "img/10.jpg"];
    var cont_pos = $("#swipe_container").position();
    var item_width = $("#swipe_container img").width();
    var cont_post_temp;
    var currentImage = 0;
    var moveLeft;
    var activeIndicator = $("#indicator span");
    $(activeIndicator[currentImage]).addClass("indicatorActive");
    $("#back").click(function() {
		activeIndicator = $("#indicator span");
        if (currentImage != 0) {
            $(activeIndicator[currentImage]).removeClass("indicatorActive");// delete previous active indicator
            currentImage--;
            $(activeIndicator[currentImage]).addClass("indicatorActive");
            moveLeft = item_width;
            $("#swipe_container").animate({
                left: '+=' + moveLeft
            }, 500, function () {
                moveLeft = null;
                cont_pos = $("#swipe_container").position();
            })
        }
    });
    $("#forward").click(function() {
        activeIndicator = $("#indicator span");
		if (currentImage != $("#swipe_container img").length - 1) {
            $(activeIndicator[currentImage]).removeClass("indicatorActive");
            currentImage++;
            $(activeIndicator[currentImage]).addClass("indicatorActive");
            moveLeft = item_width;
            $("#swipe_container").animate({
                left: '-=' + moveLeft
            }, 500, function () {
                moveLeft = null;
                cont_pos = $("#swipe_container").position();
            })
        }
    });	
    //////////////////////////////////////////

    $("#swipe_container").draggable({ axis: "x", revert: true });

    function bindMouseUp() {
        $("#swipe_container").unbind('mouseup');
        cont_post_temp = $("#swipe_container").position().left;
		activeIndicator = $("#indicator span");
        if (cont_pos.left > cont_post_temp && currentImage != $("#swipe_container img").length-1) {
            // next page
            $("#swipe_container").draggable("option", "revert", false);
            moveLeft = cont_pos.left - cont_post_temp;
            moveLeft = Math.abs(item_width - moveLeft);
            $("#swipe_container").animate({
                left: '-=' + moveLeft
            }, 500, function() {
                $("#swipe_container").draggable("option", "revert", true);
                cont_pos = $("#swipe_container").position();
                $("#swipe_container").bind('mouseup', function() {
                    bindMouseUp();
                });
            });
            $(activeIndicator[currentImage]).removeClass("indicatorActive");
            currentImage++;
            $(activeIndicator[currentImage]).addClass("indicatorActive");
        } else if (cont_pos.left < cont_post_temp && currentImage != 0) {
            // previous page
            $("#swipe_container").draggable("option", "revert", false);
            moveLeft = cont_post_temp - cont_pos.left;
            moveLeft = Math.abs(item_width - moveLeft);
            $("#swipe_container").animate({
                left: '+=' + moveLeft
            }, 500, function() {
                $("#swipe_container").draggable("option", "revert", true);
                cont_pos = $("#swipe_container").position();
                $("#swipe_container").bind('mouseup', function() {
                    bindMouseUp();
                });
            });
            $(activeIndicator[currentImage]).removeClass("indicatorActive");
            currentImage--;
            $(activeIndicator[currentImage]).addClass("indicatorActive");
        } else {
            // At start or at end flipped image 
            $("#swipe_container").draggable( "option", "revert", true );
            $("#swipe_container").bind('mouseup', function() {
                bindMouseUp();
            });
        }
    }

    $("#swipe_container").mouseup(function() {
        bindMouseUp();
    });
});

//////////methods 
function addPage(elem){ // elem - must to be string in " "
	$('#swipe_container').append('<div class="item"><img /></div>');
	$('#swipe_container').children().last().find('img').attr({src: elem, alt: "picture", width: "1268px"});
	var width = $('#swipe_container').width();
	$('#swipe_container').width(width+1268);
	$('#indicator').append('<span class="indicator"></span>');
	return 	$('#swipe_container').children().last().find('img');
}
	
function insertPage(pageNum, elem){ // elem - must to be string in " "
	$($('#swipe_container div')[pageNum]).before('<div class="item"><img /></div>')
	$($('#swipe_container div')[pageNum]).find('img').attr({src: elem, alt: "picture", width: "1268px"});
	var width = $('#swipe_container').width();
	$('#swipe_container').width(width+1268);
	$('#indicator').append('<span class="indicator"></span>');
	return $($('#swipe_container div')[pageNum]).find('img');	
}
	
function removePage(pageNum){
	var allImages = $("#swipe_container img");
	var removeElem = allImages.splice(pageNum, 1);
	$($('#swipe_container div')[pageNum]).remove();
	var width = $('#swipe_container').width();
	$('#swipe_container').width(width-1268);
	if ($($('#indicator span')[pageNum]).hasClass('indicatorActive')) {	//if removed active image	
		$($('#indicator span')[pageNum+1]).addClass('indicatorActive');
	}
	$($('#indicator span')[pageNum]).remove();
	return removeElem;
}	

function getPages(){
	return $("#swipe_container img")	
}

function getPage(i){ // i - number of images
	return $("#swipe_container img")[i]	
}