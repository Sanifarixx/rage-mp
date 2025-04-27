$('.button-servers').click(function () {
	$('#serversmodal').addClass('in');
});
$('.closethis').click(function () {
	$('#serversmodal').removeClass('in');
});
$('.copy-server').click(function () {
	var copyvar = $(this);
	copyvar.addClass('ok')
	setTimeout(function () {
		copyvar.removeClass('ok')
	}, 2000)
});
$('.gobut').hover(function () {
	$('#man').toggleClass('in');
});
new Clipboard('.copy-server');
var heightTop;

function heighter(heightTop) {
	if (self.innerHeight) {
		heightTop = self.innerHeight;
	}
	else if (document.documentElement && document.documentElement.clientHeight) {
		heightTop = document.documentElement.clientHeight;
	}
	else if (document.body) {
		heightTop = document.body.clientHeight;
	}
	document.getElementById('content').style.height = heightTop - 300 + 'px';
}
heighter();
window.onresize = heighter;

error_show = 0;
error_head = {
	show: function(data) {
		$("#error_head").html(data);
		$("#error_head").fadeIn(100);
		if(error_show == 0) var error_hide = setInterval(function() { error_head.hide(); }, 8000);
		error_show = 1;
	},
	hide: function() {
		$("#error_head").fadeOut(150);
		clearInterval(error_hide);
	}
};

function str_replace(search, replace, subject) {
	return subject.split(search).join(replace);
}

$(document).ready(function(){
	$("body").append("<div id='error_head'></div>");
	$("#error_head").hide();

    // Donate
	
	$(document).on('input', '[name="rub"]', function() {
	var $item = $(this),
	value = $item.val();
	if(!$.isNumeric(value)) {
	 if(value != "") error_head.show('Vă rugăm să introduceți suma corectă de încărcare');
	 $('[name="rub"]').val("");
	}
	});
	
	$('#subdon').click(function(){
		var login = str_replace(" ", "", $('input[name=login]').val());
		if(login == undefined || login == null || login == "") return error_head.show('Nu ați introdus datele de autentificare pe care trebuie creditată donația.');
		var rub = str_replace(" ", "", $('input[name=rub]').val());
		if(!$.isNumeric(rub)) return error_head.show('Nu ați introdus suma de reaprovizionare, USD.');
		if(rub < 10) return error_head.show('Suma de reaprovizionare nu poate fi mai mică de 2 USD.');
		if(rub > 999999) return error_head.show('Suma de reaprovizionare nu poate depăși 999.999 de USD');
		
		var request = $.ajax({
			url: "/system/getLog.php",
			type: "POST",
			data: {"login": login},
			dataType: "text"
		});
		
		request.success(function(msg) {
			if (msg == "Success") {
			   window.location.href = '/donate?pay&login='+login+'&value='+rub;
			}else{
			   return error_head.show('Acaunt cu nickname: \''+login+'\' ne găsit');
			}
		});

		request.error(function(jqXHR, textStatus) {
			return error_head.show('A apărut o eroare, încercați să donați de pe computer în loc de telefon.');
		});
	});
	
	$('#donateGo').live("click", function() {
		$("#payment").submit();
	});
});