
var animationTimeOutDuration = 5 * 60 * 1000;
var animationTimeOut;
var rotationCountLimit = 9999999999999999999;
var rotationCount = 0;
var startCollapseId = 0;
var curentCollapseId = 0;
var collapsingMenu = false;

var iframePageLoaded = false;
var animCloseComplete = false;

var path_arr = [];
var ren_path = [];
var ren_anim = [];
//var coll_arr = ["#ef2585", "#9f217a", "#85ccd3", "#2ab6b5", "#12908f", "#bcadd2", "#a286bc", "#674994", "#7dc9ed"];
//var coll_arr = ["#85ccd3", "#2ab1b0", "#005f60", "#f7ed77", "#85c44f", "#106439", "#f8e28a", "#f18033", "#b32245", "#f6c0d4","#eb2581", "#630964", "#dad1e4", "#9f83b8", "#393189", "#b8dbf0", "#3dacdf", "#394a95"];
var menu_coll_arr = ["#ffffff", "#ffffff", "#ffffff", "#93cc57", "#00b351", "#106439", "#f5802f", "#f35231", "#b32245", "#eb2581", "#a01b8a", "#630964", "#9f83b8", "#5e55a1", "#393189",
            "#ffffff", "#ffffff", "#ffffff"]; /**/

var coll_arr = [ "#dad1e4", "#9f83b8", "#393189", "#b8dbf0", "#3dacdf", "#394a95","#c4dfe1", "#2ab1b0", "#005f60", "#f7ed77", "#85c44f", "#106439", "#f8e28a", "#f18033", "#b32245", "#f6c0d4",
            "#eb2581", "#630964"];


var ht_arr = [2, 2, 2, 2, 5, 7, 8, 9, 13, 13, 9, 8, 7, 5, 2, 2, 2, 2, 0];


//var ht_arr = [3, 3, 12, 4, 8, 12, 7, 5, 5, 3, 3, 3, 4, 8, 7, 5, 5, 3, 0];
//var ht_arr = [5.55555, 5.55555, 5.55555, 5.55555, 5.55555, 5.55555, 5.55555, 5.55555, 5.55555, 5.55555, 5.55555, 5.55555, 5.55555, 5.55555, 5.55555, 5.55555, 5.55555, 5.55555, 0];

var menu_ht_arr = [10, 9, 10, 13, 1, 0.5, 5, 1, 0.5, 5, 1, 0.5, 13, 1, 0.5, 10, 9, 10];


var num_spect = 18;
var num_menu_spect = 18;

var cx = 1220;
var cy = 950;
var menu_cx = 2000;
var menu_cy = 1220;
var radius = 1700;

var paper;

/* As pwer sectors*/
var stAngle = 45;
var ht, prevAngle;
var total_ht = 90;
/*
*/
/* As pwer sectors*/
var animend_stAngle = 0;
var animend_total_ht = 210;
/*
*/
var menustAngle = 0;
var menutotal_ht = 360;

var spectrum_creation_speed = 10;
var spectrum_rotation_speed = 350;
var spectrum_menu_speed = 2000;
var menu_collapse_time = 2000;


function initAnimation() {
    total_ht = 90;
    rotationCount = 0;
    spectrum_rotation_speed = 350;
    paper.clear();
    ren_path = paper.set();
    // paper.path(sector(500, 1000, 900, 0, 0));
    // createSpecturm();
    $("#logo").addClass('fade-in');
    //paper.renderfix();
    //paper.safari();
   
}

document.getElementById("logo").addEventListener('webkitAnimationEnd', function (e) {

    switch (e.animationName) {
        case "showLOGO":
            createSpecturm();
            $("#home-menu > div").unbind('click');
            $("#about-us").unbind('click');
            break;
        case "animLOGO":
            rotationCount = rotationCountLimit;
            $("body .container").click(function () {
                //spectrum_rotation_speed = 5000;
                //total_ht = 360;
                menuCreation();
                $("#start-journey,#touch-me").fadeOut(200);
                document.getElementById("clickSound").play();
                document.getElementById("mainSound").play();
            });
            $("#start-journey,#touch-me").fadeIn(800);
            paper.renderfix();
            break;
        case "menu-location-LOGO":
            $("body .container").unbind('click');
            $("#home-menu > div").click(MenuActions);
            $("#about-us").click(MenuActions);
            break;
        default:
    }

}, false);

function mainSoundPause(val) {
    if(val) {
        document.getElementById("mainSound").pause();
        animationTimeOutDuration = 10 * 60 * 1000;
    }else {
        document.getElementById("mainSound").play();
        animationTimeOutDuration = 5 * 60 * 1000;
    }
}

function showAnim() {
    mainSoundPause(true);
    $("#home-menu,#home-menu > div, #about-us").fadeOut(100);
    paper.clear();
    ren_path.clear();
    $("#bkg,#Animation svg,#logo").attr('class', '');
    $("#logo").attr('style', '');
    $('#pages-frame').fadeOut(1000, function () {
        $(".container").show(0);
        $('#pages-frame').css({ 'opacity': 0 });
        initAnimation();
    });
    
    /* reset vars */
    iframePageLoaded = false;
    animCloseComplete = false;
    animationTimeOutDuration = 5 * 60 * 1000;
}

function showHome() {
    createMenuScreen();
    $("#bkg").attr('class', '');
    $(".container").fadeIn(1500);
    $("#pages-frame").fadeOut(2000,function () {
        $('#pages-frame').css({ 'opacity': 0 });
    });
    $("#logo").attr('class', '').css({ left: 1370, top: 450, opacity: 1 });
    iframePageLoaded = false;
    animCloseComplete = false;
}

function resetAnimTimeOut() {
    //console.log("reset timeout");
    clearTimeout(animationTimeOut);
    animationTimeOut = setTimeout(showAnim, animationTimeOutDuration);
}

window.onload = function () {
    //paper = new Raphael(document.getElementById('Animation'), (960), (1000));
    if (isIpad()) {
        $("html").addClass("iPad");
    }
    resetAnimTimeOut();
    paper = new Raphael(document.getElementById('Animation'), (1920 + 750), (1080 + 500 + 1500));
    document.getElementById("mainSound").volume =.4;
    initAnimation();
    
};



function createSpecturm() {
    document.getElementById("animSound").play();
    var _stAngle = stAngle;
    for (var i = 0; i < num_spect; i++) {
        ht = ht_arr[i] * total_ht / 100;

        if (i > 0) {
            // ht = ht_arr[i] * total_ht / 100;
            _stAngle += (ht_arr[i - 1] * total_ht / 100);
        }

        var nex_path = sector(cx, cy, (_stAngle), (_stAngle));
        ren_path.push(paper.path(nex_path));

        ren_path[i].attr({ 'fill': coll_arr[i],
            'stroke-width': 0,
            'stroke-opacity':0
        });

        //ren_path[i].node.id = "pid" + i;
        var path = sector(cx, cy, (_stAngle), (_stAngle + ht));
        path_arr.push(path);
        var anim = Raphael.animation({ 'path': path }, spectrum_creation_speed, 'linear');
        if (i == (num_spect - 1)) {
            anim = Raphael.animation({ 'path': path }, spectrum_creation_speed, 'linear', SpecturmCreated);
        }
        ren_path[i].animate(anim.delay(spectrum_creation_speed * i));
        //ren_path[i].animate({'path':path}, 1000, 'linear'); 
    }
    
}



function SpecturmCreated() {
    animateRotation();
}

function animateRotation() {
    var _stAngle = stAngle;
    /*insert elemment in the begining*/

    ren_path.splice(0, 0, paper.path(sector(cx, cy, _stAngle, _stAngle)));
    ren_path[0].attr({ 'fill': coll_arr[(num_spect - 1)],
        'stroke-width': 0,
        'stroke-opacity':0
    });
    /* update collor array*/
    coll_arr.splice(0, 0, coll_arr.pop());

    var path;

    for (var i = 0; i < (num_spect + 1); i++) {
        ht = ht_arr[i] * total_ht / 100;
        if (i == 0) {
        } else {
            _stAngle = _stAngle + (ht_arr[i - 1] * total_ht / 100);
        }
        path = sector(cx, cy, Math.round(_stAngle), Math.round(_stAngle + ht));
        // console.log(_stAngle + " --- ");
        path_arr[i] = (path);
        var anim = Raphael.animation({ 'path': path }, spectrum_rotation_speed, 'linear');
        if (i == num_spect) {
            anim = Raphael.animation({ 'path': path }, spectrum_rotation_speed, 'linear', lastCollapsed);
        }
        ren_path[i].animate(anim);
    }


}


function menuCreation(time) {
    var _stAngle = menustAngle;
    radius = 2000;
    var path;
    var cx = menu_cx;
    var cy = menu_cy;

    for (var i = 0; i < num_spect; i++) {
        ht = menu_ht_arr[i] * menutotal_ht / 100;
        if (i > 0) {
            _stAngle = _stAngle + (menu_ht_arr[i - 1] * menutotal_ht / 100);
        }
        path = sector(cx, cy, Math.round(_stAngle), Math.round(_stAngle + ht + 1));
        // console.log(_stAngle + " --- ");
        path_arr[i] = (path);
        // console.log(i,_stAngle, _stAngle + ht, path);
        ren_path[i].data({ "i": i, "start": _stAngle, "ht": ht }).unclick(MenuActions).click(MenuActions);
        var spectrum_menu_speed_ = spectrum_menu_speed;

        if (time != undefined) {
            spectrum_menu_speed_ = 0;
        }

        if (menu_coll_arr[i] == "#ffffff") {
            //spectrum_menu_speed_ = 0;
        }

        var anim = Raphael.animation({ 'path': path, 'fill': menu_coll_arr[i] }, spectrum_menu_speed_, 'linear');
        if (i == (num_spect - 1)) {
            anim = Raphael.animation({ 'path': path, 'fill': menu_coll_arr[i] }, spectrum_menu_speed_, 'linear', showMenus);
        }
        ren_path[i].animate(anim);
    }

    $("#Animation svg").attr('class', 'animate animate-menu');
    $("#Animation #logo").attr('class', 'animate animate-menu');
    paper.renderfix();
}

function createMenuScreen() {
    rotationCount = rotationCountLimit;
    startCollapseId = 0;
    curentCollapseId = 0;
    menuCreation(10);
    $("#Animation #logo").show(0);
    $("#home-menu > div").show(0);
}

function showMenus() {
    radius = 1700;
    // console.log("called show menu");
    
    $("#home-menu,#home-menu > div").delay(0).fadeIn(1000);
    $("#about-us").delay(0).slideDown(500);
    $("#Animation").delay(0).css('background', 'transparent');
    paper.renderfix();
}

var htTimer;
function heightTimer() {
    console.log(htTimer);
    if (total_ht < animend_total_ht) {
        total_ht += 6;
    } else {
        clearInterval(htTimer);
    }
}
function lastCollapsed(e) {
    //ren_path.pop();
    ren_path[num_spect].remove();

    if (rotationCount < rotationCountLimit) {
        if (rotationCount == 4) {
            // htTimer = setInterval(heightTimer, 20);
            if (total_ht < animend_total_ht) {
                // total_ht += 15;
            }
            total_ht = 210;
            spectrum_rotation_speed = 1000;
        }
        if (rotationCount == 2) {
            $("#Animation svg").attr('class', 'animate');
            $("#Animation #logo").attr('class', 'animate');
        }
        animateRotation();
        rotationCount++;
    } else {

    }
}

function collapseTriangles(id) {
    collapsingMenu = true;
    var cx = menu_cx;
    var cy = menu_cy;
    var ht = ren_path[id].data("ht");
    var stangle = ren_path[id].data("start");
    var speed = menu_collapse_time * menu_ht_arr[id] / 100;
    var menu = getMenu(id);
    // console.log(id, ht, stangle, menu);
    path = sector(cx, cy, Math.round(stangle + ht), Math.round(stangle + ht));
    curentCollapseId = id + 1;
    var anim = Raphael.animation({ 'path': path }, speed, 'linear', function () { recall_collapseTriangles(curentCollapseId); });
    ren_path[id].animate(anim);
    $("#home-menu ." + menu).fadeOut(speed);
    
    return;
    /*
    var upLimit = num_spect;
    for (var i = 0; i < num_spect; i++) {
    var value = 0;
    if (id > 0) {
    value = num_spect - id--;
    } else {
    value = num_spect - upLimit--;
    }
    console.log(value);
    var ht = ren_path[value].data("ht");
    var stangle = ren_path[value].data("start");
    var speed = 1000;// (5000) * menu_ht_arr[value] / 100;
    var path = sector(cx, cy, Math.round(stangle + ht), Math.round(stangle + ht));
    var anim = Raphael.animation({ 'path': path }, speed, 'linear');
    ren_path[value].animate(anim.delay(speed * i));
    } */


}
function recall_collapseTriangles(id) {
    if (curentCollapseId < 19) {
        if (curentCollapseId === startCollapseId) {
            //show page here
            // window.parent.callFromIframe();
            //$(document.getElementById('pages-frame').contentWindow.document.getElementById('container')).hide();
            // $('#pages-frame').show();
            
            if(iframePageLoaded){
                document.getElementById('pages-frame').contentWindow.setThemeColor($("#bkg").attr('class'));
                $(".container").css('zIndex', 1);
                $('#pages-frame').css({ 'display': 'none', 'opacity': 1 }).fadeIn(1500, function () {
                    document.getElementById('pages-frame').contentWindow.showPageMenu();
                    collapsingMenu = false;
                    $(".container").hide();
               
                });
            }else{
                animCloseComplete = true;
            }
            return;
        }
        collapseTriangles(curentCollapseId);
        if (curentCollapseId < 18) {
            return;
        }
    }
    if (curentCollapseId == 18) {
        collapseTriangles(curentCollapseId);
        curentCollapseId = 0;
    }
}

function iframeLoaded() {
    
    iframePageLoaded = true;
    if (animCloseComplete) {
        document.getElementById('pages-frame').contentWindow.setThemeColor($("#bkg").attr('class'));
        $(".container").css('zIndex', 1);
        $('#pages-frame').css({ 'display': 'none', 'opacity': 1 }).fadeIn(1500, function () {
            document.getElementById('pages-frame').contentWindow.showPageMenu();
            collapsingMenu = false;
            $(".container").hide();

        });
    }
}

function MenuActions(e) {
   
    if (collapsingMenu == false) {
       
    }else {
        return;
    }
    
    if (e.toString() == "[object MouseEvent]") {
        startCollapseId = this.data("i");
    }else {
         startCollapseId = $(this).data("i");
    }
    
    document.getElementById("clickSound").play();

    switch (startCollapseId) {
        case 0:
            $("#bkg").attr('class', 'about');
            $("#pages-frame").attr('src', '/AboutUs');
            collapseTriangles(startCollapseId);
            break;
        case 3:
            $("#bkg").attr('class', 'green');
            $("#pages-frame").attr('src', '/PotentialTelstraCustomer');
            collapseTriangles(startCollapseId);
            break;
        case 6:
            $("#bkg").attr('class', 'orange');
             $("#pages-frame").attr('src', '/NewTelstraCustomer');
            collapseTriangles(startCollapseId);
            break;
        case 9:
            $("#bkg").attr('class', 'pink');
            $("#pages-frame").attr('src', '/CustomerReceivesFirstBill');
            collapseTriangles(startCollapseId);
            break;
        case 12:
            $("#bkg").attr('class', 'purple');
            $("#pages-frame").attr('src', '/DigitalCustomerLifeMoments');
            collapseTriangles(startCollapseId);
            break;
        default:
            return "nothing";
    }
    $('#logo').fadeOut(1000);
    $('#about-us').slideUp(1000);
   
    //collapseTriangles(startCollapseId);
   // $("#pages-frame").delay(1000).fadeIn(5000);
}


function getMenu(id) {
    switch (id) {
        case 3:
            return "menu-1";
            break;
        case 6:
            return "menu-2";
            break;
        case 9:
            return "menu-3";
            break;
        case 12:
            return "menu-4";
            break;
        default:
    }

}

function completeCircle(k) {
    var _stAngle = 0;
    var path;
    for (var i = 0; i < 9; i++) {
        if (k == i) {
            ht = 359;
        } else {
            ht = 0;
        }
        path = sector(cx, cy, Math.round(_stAngle), Math.round(_stAngle + ht), true);
        path_arr[i] = (path);
        ren_path[i].data("i", i).click(MenuActions);
        var anim = Raphael.animation({ 'path': path }, spectrum_menu_speed, 'linear');
        if (i == 8) {
            anim = Raphael.animation({ 'path': path }, spectrum_menu_speed, 'linear');
        }
        ren_path[i].animate(anim);
    }

}

function sector(cx, cy, startAngle, endAngle, rr) {
    var r = radius;
    var rad = Math.PI / 180;
    var x1 = cx + r * Math.cos(-startAngle * rad),
                x2 = cx + r * Math.cos(-endAngle * rad),
                y1 = cy + r * Math.sin(-startAngle * rad),
                y2 = cy + r * Math.sin(-endAngle * rad);
    if (rr) {
        return (["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]);
    } else {
        return (["M", cx, cy, "L", x1, y1, "L", x2, y2, "z"]);
    }
    //

}
function isIpad () {
    if ((navigator.userAgent.match(/iPad/i))) {
        return true;
    } else {
        return false;
    }
}