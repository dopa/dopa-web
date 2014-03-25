(function($){

  var smokeInterval = "";


  function init() {

    // Scroll URL bar out of the way automatically in mobile Safari
    if( navigator.userAgent.match(/(iPod|iPhone|iPad)/) ) {
      window.addEventListener("load",function() {
      	// Set a timeout...
      	setTimeout(function(){
      		// Hide the address bar!
      		window.scrollTo(0, 1);
      	}, 0);
      });
    }


    /* Button Spy - Page */
    $('#nav').onePageNav({
      currentClass: 'selected',
      changeHash: false,
      scrollSpeed: 500,
      scrollOffset: 35,
      scrollThreshold: 0.5,
      filter: '',
      easing: 'easeOutQuint',
      begin: function() {
          //I get fired when the animation is starting

      // iOS Hack so you can click other menu items after the initial click
      $('body').append('<div id="device-dummy" style="height: 1px;"></div>');
      },
      end: function() {
          //I get fired when the animation is ending

      // iOS Hack
      $('#device-dummy').remove();
      },
      scrollChange: function($currentListItem) {
        //I get fired when you enter a section and I pass the list item of the section
        //console.log($currentListItem);
        $currentListItem.trigger('entered');
      }
    });

    /* Button Spy - Next Button */
    $('.bsnext a').on('click', function(e){
    	e.preventDefault();
    	$next = $('#nav .selected').next('.btn-spy');
    	if( !$next.length ) {
    		$next = $('#nav .btn-spy:first');
    	}
    	$nexta = $next.find('a');
    	$nexta.click();
    });


    /* FitText */
    $('h1.fit').fitText(0.55);
    $('h2.fit').fitText(1);




    //$('#pDopa .icon-dopa-molecule-02').slabText();
    //$('#pDopa .icon-dopa-molecule-02').fitText(0.2);
    //$('.fit-molecule').fitText(1.2, { minFontSize: '100px', maxFontSize: '580px' });

    /* remember detail on/off */
    var cookie_detail = $.cookie('detail');
    if( typeof cookie_detail !== 'undefined' ) {
      if( cookie_detail === 'true' ) {
        expandDetail();
      }
    }
  }

  function expandDetail() {
    $('.indicator-toggle.toggle-off').click();
  }

  function resizeText() {
    // temp!!
    //document.title = $(window).width();

    massiveText('#pDNA .icon-dna-01',17,13.6);
    massiveText('#pDopa .icon-dopa-molecule-02',17,13.6);
  }

  function shuffle(array) {
    var p, n, tmp;
    for (p = array.length; p;) {
        n = Math.random() * p-- | 0;
        tmp = array[n];
        array[n] = array[p];
        array[p] = tmp;
    }
  }

  function listen() {

    var colors = ['white','fuchsia','orange','blue','green','aqua','purple','yellow','aquaBright']
       ,colorCount = colors.length;

    /* detail toggle */
    $('.indicator-toggle').on('click',function(e){
      e.preventDefault();

      //console.log(e);

      var $this = $(this)
        .toggleClass('active',false)
        .siblings()
        .toggleClass('active',true)
        .end();

      var pubevent = $this.parent().data('pubevent');
      var tog = $this.data('toggle');
      $('[data-subevent="'+ pubevent +'"]').trigger('toggle',tog);
      $.cookie('detail', tog, { expires: 7 });
    });

    $('[data-subevent="detail"]').on('toggle', function(e,toggle){
      $(this).toggleClass('detail', toggle);
    });

    $('.flow > li').on('click', function(e){
      e.preventDefault();
      var $this = $(this);

      $('#nav-pProc').click();

      if( !$this.hasClass('detail') ) { expandDetail(); }

/*
      setTimeout(function(){
        $('body').scrollTo($this);
      },600);
*/

      animateFlow();
    });

    $('.photo-founder .photo').on('click', function(e){
      e.preventDefault();

      var $photo = $(this).toggleClass('surprise');
    });

    $('.photo-founder h5').on('click', function(){
      expandDetail();
    });


    $('.btn-start-bubbles').on('click', function(e){
      e.preventDefault();

      var $panel = $('#pLabs')
         ,$bubbles = $('.bubble')
         ,isOn = $panel.hasClass('anime')
         ,clickCount = 0;

      if( !isOn ) {
        $panel.toggleClass('anime', true).data('clickcount',clickCount);
      } else {
        clickCount = $panel.data('clickcount');
      }

      // remove color classes
      $bubbles.each(function(){
        var colorToRemove = $(this).data('colorclass');
        if( typeof colorToRemove !== 'undefined' && colorToRemove !== '' ) {
          $(this).toggleClass(colorToRemove,false);
        }
        $(this).data('colorclass','');
      });

      if( clickCount >= colorCount ) { // go crazy honey
        var i, arr = [];
        for (i = 0; i < colorCount; i++) {
            arr[i] = i;
        }
        arr.sort(function () {
            return Math.random() - 0.5;
        });

        $bubbles.each(function(i,v){
          //console.log(colors[arr[i]]);
          $(this).toggleClass(colors[arr[i]],true).data('colorclass',colors[arr[i]]);
        });

      } else {
        //console.log(clickCount);
        $bubbles.toggleClass(colors[clickCount],true).data('colorclass',colors[clickCount]);

      }

      $panel.data('clickcount',clickCount+1);
    });


    $('.icon-rocket').on('click',function(){
      if( $(this).hasClass('engines-started')) {
        killEngines();
      } else {
        startYourEngines();
      }
    });

    // Load surprise founder images when user scrolls into founder area
    $('#bs6').on('entered',function(){
      preload([
        'http://dii.cdn.dopa.mn/gabe-360-surprise-03@2x.jpg'
       ,'http://dii.cdn.dopa.mn/justin-360-surprise-02@2x.jpg'
       ,'http://dii.cdn.dopa.mn/mike-360-surprise-02@2x.jpg'
      ]);
    });




    $(window).smartresize(resizeText);

  }

  function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
  }

  function massiveText(selector,width,fontSizeOrig,boost) {
    boost = boost || 1;
    var $text             = $(selector);
    var width             = width || $text.width();
    var multiplier        = ( $text.parent().width() / width ) * boost;
    var fontSizeOrig      = fontSizeOrig || parseFloat($text.css('fontSize'));
    var fontSizeNew       = parseInt(fontSizeOrig * multiplier,10);

    $text.css('fontSize',fontSizeNew);
  }

  function animateFlow() {
    var $procs = $('.flow li')
       ,delayTime = 10
       ,incrementTime = 100
       ,glowTime = 1500;
    $procs.each(function(i,e){
      var $li = $(e);
      setTimeout(function(){
        $li.toggleClass('anime',true);
        setTimeout(function(){
          $li.toggleClass('anime',false);
        },glowTime);
      },delayTime);
      delayTime += incrementTime;
    });
  }

  /*
function sizeMolecule() {
    var $molecule = $('#pDopa .icon-dopa-molecule-02');
    //console.log("molecule",$molecule);
    //console.log("width",$molecule.width());
    //console.log("parent width",$molecule.parent().width());

    var multiplier = $molecule.parent().width() / 17;
    //console.log("multiplier",multiplier);

    var fontSize = 13.6;
    //console.log("fontSize",fontSize);

    var fontSizeNew = parseInt(fontSize * multiplier,10);
    //console.log("fontSizeNew",fontSizeNew);

    $molecule.css('fontSize',fontSizeNew);
  }
*/

  function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function igniteEngines() {
    var left = getRandomInt(-100,140);
    var top = getRandomInt(400,540);
    var size = getRandomInt(40,120);
    var op = getRandomInt(1,3);
    var opClass = 'smoke'+op;
    var color = getRandomInt(1,4);
    var colorClass = 'color'+color;

    var $smoke = $('<span aria-hidden="true" class="icon-cloud-08 smoke"></span>').addClass(opClass).addClass(colorClass);
    $smoke.css({left: left, top: top, fontSize: size});

    $smoke.appendTo('#pCli .blast');
    setTimeout(function(){
      $smoke.toggleClass(opClass,false);
    },10);
  }

  function killEngines() {
    var smokeInterval = $('.engines-started').toggleClass('engines-started',false).data('smokeInterval');

    if( smokeInterval === null ) { return; }

    $('.blast').empty();
    clearInterval(smokeInterval);
  }

  function startYourEngines() {

    var smokeInterval = setInterval(igniteEngines, 40);

    $('.icon-rocket').toggleClass('engines-started',true).data('smokeInterval',smokeInterval);

    // stop after 10 seconds, so browser doesn't freak out
    setTimeout(function(){
      killEngines();
    },10000);
  }

  $(function(){
    init();
    listen();

    resizeText();
  });

})(jQuery);
