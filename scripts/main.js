
// Wait for Apache Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
function onDeviceReady() {

    
}

var airlinesApp = function(){}

airlinesApp.prototype = function() {
    var _flightForCheckin = null,
    _flightForDetails=null,
    _ffNum = null, 
    _customerData = null,
    _login = false,

    
    run = function(){
        var that = this,
        $seatPicker=$('#seatPicker');
        //$('#tripDetail').on('pagebeforeshow',$.proxy(_initTripDetail,that));
       // $('#boardingPass').on('pageshow',$.proxy(_initBoardingPass,that));
        $('#home').on('pagebeforecreate',$.proxy(_initHome,that));
       // $('#checkIn').on('pageshow', $.proxy(_initCheckIn,that));
        /**
        $('#myTripsListView').on('click', 'li', function () {
        	var item = $(this);
        	_flightForCheckin = item.data('flight');
            _flightForDetails = item.data('flight');
        });
        
        $seatPicker.on('pageshow', function (event) {
        	var el = $('#seatMapPickerContainer', this),
        	seat = _flightForCheckin.segments[_flightForCheckin.currentSegment].seat;
        	seatMapDrawing.drawSeatMap(el, seat);
        
        });
        
        $seatPicker.on('pagebeforehide', function (event) {
        	_flightForCheckin.segments[_flightForCheckin.currentSegment].seat = seatMapDrawing.getselectedSeat();
        });
        */
    },
    /**
    _initTripDetail = function(){
        var seg = _flightForDetails.segments[0];
	    $('#tripDetail-title').text(seg.from + ' to ' + seg.to);
	    $('#tripDetail-flightNum').text(seg.flightNum);
	    $('#tripDetail-depart').text(seg.departDate + ' at ' + seg.time);
	    $('#tripDetail-seat').text(seg.seat);
	    seg = _flightForDetails.segments[1];
	    $('#tripDetail-return-title').text(seg.from + ' to ' + seg.to);
	    $('#tripDetail-return-flightNum').text(seg.flightNum);
	    $('#tripDetail-return-depart').text(seg.departDate + ' at ' + seg.time);
        $('#tripDetail-return-seat').text(seg.seat);
    },
    
    _initBoardingPass = function(){
        currentseg = _flightForCheckin.segments[_flightForCheckin.currentSegment];

	    $('#boardingpass-cnum').text(_flightForCheckin.cNum);
	    $('#boardingpass-passenger').text(_customerData.firstName + ' ' + _customerData.lastName);
	    $('#boardingpass-seat').text(currentseg.seat);
	    $('#boardingpass-gate').text(currentseg.gate);
	    $('#boardingpass-depart').text(currentseg.time);
	    var flight = currentseg.flightNum + ':' + currentseg.from + ' to ' + currentseg.to;
	    $('#boardingpass-flight').text(flight);
    },
    */
    _initHome = function(){
    	console.log("locastorage="+localStorage.username);
    	///if(localStorage.username=='user1') { $.mobile.changePage("#allproducts", { transition: "flip" }); }
        
    	$("#ad6").click(function(){ localStorage.cart = localStorage.cart+","+"p1"; });
    	$("#ad7").click(function(){ localStorage.cart = localStorage.cart+","+"p2"; });
    	$("#ad8").click(function(){ localStorage.cart = localStorage.cart+","+"p3"; });
    	$("#ad9").click(function(){ localStorage.cart = localStorage.cart+","+"p4"; });
    	$("#ad10").click(function(){ localStorage.cart = localStorage.cart+","+"p5"; });
    	$("#ad11").click(function(){ localStorage.cart = localStorage.cart+","+"p6"; });
    	$("#ad12").click(function(){ localStorage.cart = localStorage.cart+","+"p7"; });
    	$("#ad13").click(function(){ localStorage.cart = localStorage.cart+","+"p8"; });
    	$("#ad14").click(function(){ localStorage.cart = localStorage.cart+","+"p9"; });
    	$("#ad15").click(function(){ localStorage.cart = localStorage.cart+","+"p10"; });
    	$("#ad16").click(function(){ localStorage.cart = localStorage.cart+","+"p11"; });
    	$("#ad17").click(function(){ localStorage.cart = localStorage.cart+","+"p12"; });
    	$("#ad18").click(function(){ localStorage.cart = localStorage.cart+","+"p13"; });
    	$("#ad19").click(function(){ localStorage.cart = localStorage.cart+","+"p14"; });
    	$("#ad20").click(function(){ localStorage.cart = localStorage.cart+","+"p15"; });
    	$("#ad21").click(function(){ localStorage.cart = localStorage.cart+","+"p16"; });
    	$("#ad22").click(function(){ localStorage.cart = localStorage.cart+","+"p17"; });
    	$("#ad23").click(function(){ localStorage.cart = localStorage.cart+","+"p18"; });
    	$("#ad24").click(function(){ localStorage.cart = localStorage.cart+","+"p19"; });
    	$("#ad25").click(function(){ localStorage.cart = localStorage.cart+","+"p20"; });
    	$("#clearcart").click(function(){ localStorage.cart = ""; });
    	
    	//console.log(p[0][0]);
    	
    	$.mobile.changePage("#logon", { transition: "flip" });
    	console.log(localStorage.cart);
        
        if (!_login) {
        	//TODO DEFUALT HOME PAGE
        	//$('#username2').text("Mannir");
        	/////////////////////////////////////////
        	//$('#username2').text("Username here");
        	//$('#password2').text("Username here");
        	//$('#role2').text("Username here");
	    	//$.mobile.changePage("#home", { transition: "flip" });
	    	$('#loginbtn').submit(function () { alert("login clicked");
	    		
	    		$(this).hide();
	    		_login = true;
	    		///airData.logOn($('#userName').val(), $('#pwd').val(),_handleLogOn);
	    		console.log("set value here");
	    		return false;
	    	});
	    }
    };
    /**
    _initCheckIn = function(){
        var currentseg = _flightForCheckin.segments[_flightForCheckin.currentSegment],
	    seat = currentseg.seat,
	    flight = currentseg.from + ' to ' + currentseg.to;
	    $('#checkIn-flight-number').text(currentseg.flightNum);
	    $('#checkIn-flight-destination').text(flight);
        
	    $('#checkIn-seat').text(seat);
    },
    
    _handleLogOn = function (ff, success) {
		if (success) {
			_ffNum = ff;
			airData.getDataforFF(_ffNum,_handleDataForFF);
		}
	},
    
    _handleDataForFF = function (data) {
        $flightList = $('#myTripsListView');
		_customerData = data;
		$('#ffname').text(data.firstName);
		$('#ffnum').text(data.ffNum);
		$('#currentStatus').text(data.status);
		$('#miles').text(data.miles);
		$('#numberOfFlights').text(data.flights.length);
		for (var i in data.flights) {
			var flight = data.flights[i],
            currentSegment = flight.segments[flight.currentSegment];
			$flightList.append('<li id="' + flight.id + '"><a href="#tripDetail" data-transition="slide">' + currentSegment.from + ' to ' + currentSegment.to + '</a></li>');
			var item = $('#' + flight.id, $flightList);
			item.data('flight', flight);
			if (flight.timeToCheckIn) {

				item.addClass('checkIn');
				$('a', item).attr('href', '#checkIn');
			}
			else {
				item.addClass('tripDetail');
			}
		}
		$.mobile.changePage('#home', { transition: 'flip' });

	};
   */ 
    return {
        run:run,
    };
}();