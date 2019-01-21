// ==UserScript==
// @name        Add Product
// @namespace    http://your.homepage/
// @version      0.1
// @description  Script adds products to account.
// @author       Ilya Popovich
// @grant unsafeWindow
// @match        https://*.efficientlearning.com/pv5/v8/myaccount.html?*
// @match        http*://*.efficientlearning.com/ebpv4/admin/*
// @require https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js
// @require https://raw.githubusercontent.com/Loshadushka/jshooks/master/setAccess.js
// @require http://momentjs.com/downloads/moment.min.js
// @require http://code.jquery.com/jquery-2.2.4.min.js
// @require https://smtpjs.com/v2/smtp.js
// @grant GM_registerMenuCommand
// ==/UserScript==



lastName = "ENTER YOUR NAME HERE";
prefixDomain = window.location.protocol+"//"+window.location.host.split(".")[0];
commonURLPart = prefixDomain+".efficientlearning.com/pv5/v8/5/app/";

var settings = {
    pageId: getWorkerData(lastName),
    token: "1jQvOkBwuv4aS9BeE-2blQV-41UgaHOVcUFS2LATR_dU",
    date_begin: moment().format('YYYY-MM-DD'),
    date_end: moment().add(365, 'days').format('YYYY-MM-DD'),
    accessGroupID: null,
    address: prefixDomain+".efficientlearning.com/ebpv4/admin/",
    delay: 10,
    email: null,
    login: "devmonkey",
    password :"d3Vm0nK3y",
    linkForAccess: null,
    googleWriteData: {
        sheetName: lastName,
        googleWriteScriptURL: "https://script.google.com/macros/s/AKfycbyu8nDI8jGl3Y0C1RWEsXI3r_HcSZeJSye7nTjxDYUbefspfcS_/exec"
    }
};

//This function is used, because for UAT3 instanse access groups Ids are different from the other
function isUAT3(){
return prefixDomain.includes("uat3");

}

function getWorkerData(lastName)
{
    var pageId = null;
    switch(lastName)
    {
        case "Popovich":
            pageId = "od6";
            break;
        case "Semin":
            pageId = "ohvk5k2";
            break;
        case "Rajshree":
            pageId = "ot4aplz";
            break;
        case "Malinin":
            pageId = "o40axe7";
            break;
        case "Urusov":
            pageId = "ojepyjk";
            break;
        case "Efremova":
            pageId = "o52ziuv";
            break;
        case "Ismailov":
            pageId = "oxzrvwq";
            break;
        case "Simanovich":
            pageId = "o5e7pgx";
            break;
        case "Potapov":
            pageId = "o7fj1n3";
            break;
        case "Zakharova":
            pageId = "oqxqb03";
            break;
        case "Ermolaev":
            pageId = "o298bkz";
            break;
        case "Ermakova":
            pageId = "opixlev";
            break;
        case "Zarubina":
            pageId = "ool7cya";
            break;
        case "Krasteleva":
            pageId = "oo1871o";
            break;
        case "Kovina":
            pageId = "o54rk5b";
            break;
    }
    return pageId;
}

GM_registerMenuCommand("CPA 2018/2019 Course with Export", function(){
    settings.accessGroupID = ["338426","338427","338428","338429","338430","338432","338431","338433","338434","338435","338436","338437","338438","338439","338440","338441","361142","361143","361144","361145","288594","288595","288596","288597"];
    settings.linkForAccess = commonURLPart+"cpa/far.html";
    init(settings);});

GM_registerMenuCommand("CFA 2018 Course with Export", function(){
    settings.accessGroupID = ["271425","271426","271427","361146","361147","361148","271436","282597","273566","271437","282598","273567","271438","282599","273568","271430","271441","271447","379016","271433","271444","271429","271440","271446","271435","271432","271443","271428","271439","271445","271434","271431","271442"];
    settings.linkForAccess = commonURLPart+"cfa/level1_2018.html";
    init(settings);});

GM_registerMenuCommand("CIA 2019 Course with Export", function(){
    settings.accessGroupID = ["413501","413502","413503","413504","413505","413506","413507","413508","413509"];
    settings.linkForAccess = commonURLPart+"cia/part1_2019.html";
    init(settings);});

GM_registerMenuCommand("CMA 2019 Course with Export", function(){
    settings.accessGroupID = ["412156","412157","412161","412158","412159","412160","412162","412163","412164","412165","412166","412167"];
    settings.linkForAccess = commonURLPart+"cma/part1_2019.html";
    init(settings);});

GM_registerMenuCommand("PMP 2018 Course with Export", function(){
    settings.accessGroupID = ["375004","375010","375005","375009","375007","375006","375008"];
    settings.linkForAccess = commonURLPart+"pmp/pmp_2018.html";
    init(settings);});

GM_registerMenuCommand("CMT 2018 Test Bank with Export", function(){
    settings.accessGroupID = ["225636","225635","225634","225633"];
    settings.linkForAccess = commonURLPart+"cmt/level1.html";
    init(settings);});

GM_registerMenuCommand("GMAT 2019 Test Bank with Export", function(){
    settings.accessGroupID = ["410950","411381","410949","410952","411382","410951","410954","411383","410953"];
    settings.linkForAccess = commonURLPart+"gmat/gmat_2019.html";
    init(settings);});

GM_registerMenuCommand("FRM 2018 Course with Export", function(){
    settings.accessGroupID = ["332489","332497","332491","332495","332502","332500","332499","332493","332490","332498","332492","332496","332503","332501","332494","414318"];
    settings.linkForAccess = commonURLPart+"frm/part1_2018.html";
    init(settings);});

GM_registerMenuCommand("Security Study Test Bank", function(){
    settings.accessGroupID = ["411140"];
    settings.linkForAccess = commonURLPart+"comptia/security_study.html";
    init(settings);});

GM_registerMenuCommand("Security Practice Test Bank", function(){
    settings.accessGroupID = ["411142"];
    settings.linkForAccess = commonURLPart+"comptia/security_practice.html";
    init(settings);});

GM_registerMenuCommand("Security Deluxe Test Bank", function(){
    settings.accessGroupID = ["411139"];
    settings.linkForAccess = commonURLPart+"comptia/security_deluxe.html";
    init(settings);});

GM_registerMenuCommand("Security Review Test Bank", function(){
    settings.accessGroupID = ["411141"];
    settings.linkForAccess = commonURLPart+"comptia/security_review.html";
    init(settings);});

GM_registerMenuCommand("Security Full Course", function(){
    settings.accessGroupID = ["411445", "411447", "411527", "411449", "411448", "411446", "412036"];
    settings.linkForAccess = commonURLPart+"comptia/security.html";
    init(settings);});

GM_registerMenuCommand("2018 Investment Banking", function(){
    settings.accessGroupID = ["412909","412910","412911","412673","412912","411602","411614","411611","412670","170903","411605","411613","411612","412669","411606","411608","411615","411609","412671","411610","411603","411616","411607","412672","411604"];
    settings.linkForAccess = commonURLPart+"ib/course1.html";
    init(settings);});

GM_registerMenuCommand("Network+ Review Guide Test Bank", function(){
    settings.accessGroupID = ["414316"];
    settings.linkForAccess = commonURLPart+"comptia/network_review.html";
    init(settings);});

GM_registerMenuCommand("Network+ Practice Tests Test Bank", function(){
    settings.accessGroupID = ["414315"];
    settings.linkForAccess = commonURLPart+"comptia/network_practice.html";
    init(settings);});

GM_registerMenuCommand("Network+ Deluxe Study Guide Test Bank", function(){
    settings.accessGroupID = ["414314"];
    settings.linkForAccess = commonURLPart+"comptia/network_deluxe.html";
    init(settings);});

GM_registerMenuCommand("Network+ Study Guide Test Bank", function(){
    settings.accessGroupID = ["414317"];
    settings.linkForAccess = commonURLPart+"comptia/network_study.html";
    init(settings);});

GM_registerMenuCommand("CIMA 2019 Course with Export", function(){
    settings.accessGroupID = ["410943","410944","410947","410945","410946"];
    settings.linkForAccess = commonURLPart+"cima/cima.html";
    init(settings);});

GM_registerMenuCommand("CFP Course with Export", function(){
    settings.accessGroupID = ["327358","327362","361160","327363","327364","327359","327361","327360"];
    settings.linkForAccess = commonURLPart+"cfp/level1.html";
    init(settings);});

GM_registerMenuCommand("ACT Test Bank with Export", function(){
    settings.accessGroupID = ["410453","410454"];
    settings.linkForAccess = commonURLPart+"act/act.html";
    init(settings);});


GM_registerMenuCommand("COPY", function(){
    var testing_Selection =  document.getSelection();
    settings.email = testing_Selection.toString();
    console.log(testing_Selection.toString());
});

Mousetrap.bind('ctrl+alt+up', function() {
    //var testing_Selection =  document.getSelection();
    console.log("MouseTrap");
    var testing_Selection =  window.getSelection();
    console.log(testing_Selection.toString());
});