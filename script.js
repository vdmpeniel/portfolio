
function GSAP_Animation(e, time, key){
	      // window.alert(" hola ");
        var target;
        if(e.target){
            target = e.target;
        }else target = e;
        var Anim = new TweenLite.to(target, time, key);
        Anim.play();    
}



function rotateItX(e){
	
	    var key = {
            transformOrigin: 50% 50% 0,               
            transformPerspective: 600,
            rotationY:30, 
            ease:Power1.easeOut,
            paused: true
		};
	    var time = 0.6;
	    GSAP_Animation(e, time,key);
}

function rotateItX_Rev(e){
	    var key = {   
            rotationY: "0deg",
            ease:Bounce.easeOut,
            paused: true
		};
	    var time = 0.6;
	    GSAP_Animation(e, time, key);
	
}

function fadeItOut(e){
      var key = {   
            opacity: "0",
            ease:Power1.easeOut,
            paused: true
      };	     
      GSAP_Animation(e, 0.7, key);
	
} 

function fadeItIn(e){
      var key = {   
          opacity: "1",
          ease:Power1.easeOut,
          paused: true
      };	
    
      GSAP_Animation(e, 0.7, key);
	
}


function menuEnter(e){
    if (!e.hasClass("active")){
        //alert("active");
    
        var x = e.offset().left;
        var width = e.css("width");
        
        $("#MENU_CURSOR").css("visibility","visible");
        $("#MENU_CURSOR").css("left",x);
        $("#MENU_CURSOR").css("width",width);
        $("#MENU_CURSOR").css("height","0");
        
        TweenLite.to($("#MENU_CURSOR"), 0.5, {
            height: "85%",
            ease: Bounce.easeOut
        });
    }
}


function menuLeave(e){
    if (!e.hasClass("active")){
        
        TweenLite.to($("#MENU_CURSOR"), 0.5, {
            height: "0%",
            ease: Power1.easeOut
        });
        
    }
}

function autoScroll(e, id){
    var $elem = $(e.target);
        
    if (id === "") {
        id = $elem.text();
    }
    
    var scrollYPos = $("#" + id).offset().top
    e.preventDefault();//Sin esto vuelve al inicio cada vez
    var time = 0.7;    
    var key = {
                scrollTo: {y:scrollYPos, x:0}, 
                ease: Power1.easeOut
              };
    TweenLite.to(window, time, key);
    
    
    
    
    
    //asi se usa animate pero animate no tiene mas que dos easings
    //$("body").animate({scrollTop: scrollYPos}, 500,"swing"); 
    
    /* el tiempo se podria calcular basado en la distancia,
    para mantener una velocidad constante
    */ 
    
     //otra forma
     //var key = {scrollTop: scrollYPos, ease:Power1.easeOut}
     //TweenLite.to($("body"), time, key);
}





var menuChange = 0;

function selectNav(){
    
    var sections = ["LANDING", "ABOUT", "SERVICES", "PORTFOLIO", "CONTACT", "END"];
    var sectionStarts = [];
    for (var i = 0; i < sections.length; i++){
        sectionStarts[i] = $("#" + sections[i]).offset().top;
        
    }
    
    var scroll = window.scrollY + 300;
    //console.log(scroll);
    var currentPos = 0;
    
    for (var i = 1; i < sections.length; i++){
        //console.log(sectionStarts[i-1] + " : " + sectionStarts[i] + " || " + scroll + "||" + (scroll < sectionStarts[i]))
        if((scroll > sectionStarts[i-1]) && (scroll < sectionStarts[i])){            
            currentPos = i; 
        }
        
    }
    
    
    if ((menuChange !== currentPos) && (currentPos !== 0)){
        menuChange = currentPos;
        
        $(".active").removeClass("active");
        $(".altActive").removeClass("altActive");
        if (menuChange > 1) {
            var id = "#nav" + String(menuChange - 2);
            var a_id ="#a_nav" + String(menuChange - 2);
            //console.log(id);
            $(id).addClass("active");
            $(a_id).addClass("altActive");
        }
    }
}









function menuClick(e){
   //convertir un objeto javaScript en JQuery
    /*var $elem = $(e.target);
    if (!$elem.hasClass("active")){
        $(".active").removeClass("active"); 
        $elem.addClass("active");
        
    }*/
    autoScroll(e,"");   
}

function altMenuClick(e){
    e.stopPropagation;//para que no seleccione nada detras
    autoScroll(e,""); 
    
    //toggleAltNavBar();
}





function centralButtonClick(e){
    var $elem = $(e.target);
    var sections = ["ABOUT","PORTFOLIO", "CONTACT", "LANDING"];    
    // get the last character
    var sectionIndex = $elem.attr('id').slice( $elem.attr('id').length - 1, $elem.attr('id').length );
    //alert(sections[Number(sectionIndex)]);
    autoScroll(e,sections[Number(sectionIndex)]);
}



function refreshPage(){
    window.location.reload();   
}  




var toggle = true;
function toggleAltNavBar(){
    if(toggle){
        var key = {
            right: "0px",
            ease: Bounce.easeOut
        };
        //console.log(e.attr("id"));
        selectNav();
        $("#ALT_NAVBAR").focus();
        
    }else{
        var key = {
            right: "-200px",
            ease: Bounce.easeOut
            
        };        
    }
    TweenLite.to($("#ALT_NAVBAR"), 1, key);
    toggle = !toggle;
    
}




function events(){ 
         /*LOGO*/
         $("#LOGO").click(refreshPage);
         /*LOGO END*/
         
    
    
         /*CENTRAL BUTTONS*/
         $(".boton").click(function(e){centralButtonClick(e)});         
         /*CENTRAL BUTTONS END*/
    
         /*NAVBAR*/     
         $("#NAVBAR a").mouseover(function(){menuEnter($(this))});
         $("#NAVBAR a").mouseleave(function(){menuLeave($(this))});
         $("#NAVBAR a").click(function(e){menuClick(e)});
         /*NAVBAR END*/
    
    
    
         /*ALT_NAVBAR*/
         $("#COLLAPSED").click(toggleAltNavBar);
         $("#ALT_NAVBAR a").click(function(e){altMenuClick(e)});
         $("#ALT_NAVBAR").mouseleave(toggleAltNavBar);
    
    
    
         /*CENTRAL BUTTONS*/
         $(".boton").click(function(e){centralButtonClick(e)});         
         /*CENTRAL BUTTONS END*/
    
    
	     /*GALLERY*/
         // buscar por que Animate.css me desabilita los eventos         
	     $(".box").mouseenter(function(){rotateItX($(this))});        
         $(".box").mouseleave(function(){rotateItX_Rev($(this))});
    
         // si paso evento en vez de $(this) se queda invisible despues de repetidas veces
         $(".galleryFocus").mouseenter(function(){fadeItIn($(this))});   
         $(".galleryFocus").mouseleave(function(){fadeItOut($(this))});
         /*GALLERY END*/
    
    
    
         /* WINDOW */
         $(window).scroll(selectNav);
			      $(window).load(function(){
                $("#LOADING").fadeOut();
                $("#LOADING").remove();
         });
         /* WINDOW END*/
    
						
}






function wow(){
    /*WOW SETTINGS*/
    wow = new WOW(
          {
          boxClass:     'wow',      // default
          animateClass: 'animated', // default
          offset:       300,        // default
          mobile:       true,       // default
          live:         true        // default
        });
    
    /*INICIATE WOW*/
    new WOW().init();
}






function scrollMagicAnim(){
    var key = {
        top: "0",
        ease: Power1.easeOut
    };
    
    /*PARALLAX*/
    var controller = new ScrollMagic.Controller();
    
    var tween1 = TweenLite.to($(".far"),1,key);
    var scene = new ScrollMagic.Scene({triggerElement: "#PARALLAX", duration: 4000})//debiera ser una variable con la altura del documento
											.setTween(tween1) // trigger a TweenMax.to tween
                                            .triggerHook(0.0)
											//.addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
											.addTo(controller);
    


}








$(document).ready(function() {
        //fadeItIn( $(".galleryContainer"));
        //$(".column").addClass("animated bounceIn");
        
        events();        
        wow(); 
        scrollMagicAnim();
        
    
/*

    TODO LIST

    X terminar las seccion de servicios
    
    X auto scroll  
    
    X Hacer un parallax poniendo un div fijo con el martillo y otro transparente con 
    manchas delante del mismo.
    estos dos pueden estar detras de toda la pagina y moverse a diferentes velocidades
    con el scroll.
    
    X Botones se ponen amarillos al darle scroll     
    
    X botones centrales
    
    mapa y contacto
    
    Loader
    
    barra de navegacion colapsada
    
    media queries
        
    cambiar class por id donde sea pertinente
*/
						
});