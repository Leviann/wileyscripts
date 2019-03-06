function init(settings) {
    testing_linkForAccess = settings.linkForAccess+'?u=';
    testing_googlePageId = settings.pageId;
    testing_googleSpreadsheetToken = settings.token;
    testing_login = settings.login;
    testing_password = settings.password;
    /*ACCESS START DATE AND END DATE. YOU CAN CHANGE IT BUT FORMAT SHOULD BE YYYY-MM-DD*/
    date_begin = settings.date_begin;
    date_end = settings.date_end;
    /*DO NOT CHANGE ANYTHING BELOW*/
    address = settings.address;
    testing_action_pointer = 0;
    accessGroupID = settings.accessGroupID;
    delay = settings.delay;
    googleWriteData = settings.googleWriteData;
    settings.email == null ? testing_getLastEmail() : doAfterEmailIsReceived(settings.email);
}

function doAfterEmailIsReceived(email) {
    emailChangeed = createNewEmailBasedOnThePrevious(email);
    createNewUser(emailChangeed.replace("+", "%2B").replace("@", "%40"), "Anykey","Thompson");

}


function afterEmailCreation(xhr, email)
{
    var oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.open("get", address + "filter.jsp?new_constraint=HandleService%3A%3Aemail&filter_type=any&HandleService%3A%3Aemail%3A%3Aoption=starts+with&HandleService%3A%3Aemail%3A%3Avalue=" + email + "&source_type=EBP&task=Quick+Search", true, testing_login, testing_password);
    oReq.setRequestHeader("Content-Type", "text/html; charset=ISO-8859-1");
    oReq.send();
}

function reqListener() {
    var expr = /\d{6}/;
    var EBPnumber = expr.exec(this.responseText);
    console.log(EBPnumber[0]);
    setAccess(EBPnumber[0], accessGroupID);
}


function createNewUser(email, name, lastName){

    var oReq = new XMLHttpRequest();
    oReq.onload = function(event){ afterEmailCreation(event, email) };
    var body = "first_name="+name+"&last_name="+lastName+"&email="+email+"&task=Add";
    oReq.open("post", address+"import_add.jsp", true, testing_login, testing_password);
    oReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded", "charset=ISO-8859-1");
    oReq.send(body);

}

function setAccess(EBPnumber, ids) {
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {



        if (xmlHttpRequest.readyState == 4) {
            console.log(ids.toString() + " have been included");
            var oReq = new XMLHttpRequest();
            oReq.onload = function(event){
            getAddedProductsFromEBP(event, EBPnumber, emailChangeed);
}
            oReq.open("get", address + "edit_user.jsp?view=accesscontrolpv5&ebp_handle=" + EBPnumber, true, testing_login, testing_password);
            oReq.setRequestHeader("Content-Type", "text/html; charset=ISO-8859-1");
            oReq.send();


    }


};
var accessGroupString = "";
ids.forEach(id => {accessGroupString = accessGroupString+"&accessGroupIDs="+id });
xmlHttpRequest.open("POST", address + "edit_user.jsp", true, testing_login, testing_password);
xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xmlHttpRequest.send("view=accesscontrolpv5&letter=D&ebp_handle=" + EBPnumber + accessGroupString + "&accessGroupIDInstructor=-1&date_begin=" + date_begin + "&date_end=" + date_end + "&task=Add+Access");
testing_action_pointer++;
}



function getAddedProductsFromEBP(event, EBPnumber, email){
    var expr = /[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;
    var htmlText = $.parseHTML(event.target.responseText)[12];
    var arr = Array.from(htmlText.querySelectorAll("table tr td:nth-child(2)"));
    htmlText =  expr.exec(htmlText.innerHTML);
    var products="";
    arr.splice(0,2);
    arr.splice(arr.length-9,9);
    arr.forEach(item => { products = products + item.textContent+"|"});
    writeNewAccountToGoogle(email, products, htmlText[0]);
}



function writeNewAccountToGoogle(email, products, guid)
{
    testing_linkForAccess = testing_linkForAccess + guid;
    console.log(guid);
    console.log(testing_linkForAccess);
    var testing_sheetName = googleWriteData.sheetName;
    var testing_lastEmail = email;
    var testing_product = products;
    var testing_googleWriteScriptURL = "https://script.google.com/macros/s/AKfycbyu8nDI8jGl3Y0C1RWEsXI3r_HcSZeJSye7nTjxDYUbefspfcS_/exec";
    var testing_str = 'sheetname=' + testing_sheetName + '&Email=' + encodeURIComponent(testing_lastEmail) + '&Product=' + testing_product.replace(/\s*\|/g,"|") +'&Guid=' + guid + '&Link='+testing_linkForAccess;
	
	var productsArray = testing_product.split('|');
	
	var tr_line = '';
	
	for (var arr in accessGroupID) {
		tr_line += '<tr><td>' + accessGroupID[arr] + '</td><td>' + productsArray[arr] + '</td></tr>';
	}

	var email_header = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title>User has been created</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0 " /><style>body { font-family: arial, sans-serif; border-collapse: collapse;}table { border-collapse: collapse;}td, th { border: 1px solid #dddddd; text-align: left; padding: 8px;}</style></head>'
	var email_body = '<body><h3>User has been successfully created.</h3><h4>' +
					'<b>Environment:</b> '+ window.location.host +
					'.</h4><table><tr><th>Access Group ID</th><th>Access Group Name</th></tr>' +
					tr_line + 
					'</table><p>Generated link: <a href="' + testing_linkForAccess + '">' + testing_linkForAccess + '</a></p></body>';


	Email.send("faridliners@gmail.com",
	       "faridliners@gmail.com",
	       "User has been created on " + window.location.host + " environment.",
	       email_header + email_body,
	       "smtp.elasticemail.com",
	       "faridliners@gmail.com",
	       "7b1c830b-d2be-454d-ba17-b14bdd0a99f3");
	console.log("email sent: " + email_header + email_body);

    $.ajax({
        url: googleWriteData.googleWriteScriptURL,
        data: testing_str,
        type: "POST"
    }).done(function () {
        console.log("Account "+ email +" has been added to googlesheet");
    });
}


function testing_getLastEmail() {
    $.getJSON('https://spreadsheets.google.com/feeds/list/'
        + testing_googleSpreadsheetToken + '/' + testing_googlePageId + '/public/values?alt=json'
        , function (data) {
            var len = data.feed.entry.length;
            email = data.feed.entry[len - 1].gsx$email.$t;
            doAfterEmailIsReceived(email);
        });
}


function createNewEmailBasedOnThePrevious(lastEmail)
{
    var emailParts = lastEmail.split("+");
    var baseEmail = emailParts[0];
    var emailAlias = emailParts[1];
    var regex = /(\d+)/g;
    var lastEmailNumber = emailAlias.match(regex);
    var slicedEmail = emailAlias.split(lastEmailNumber);
    lastEmail = baseEmail+"+"+slicedEmail[0] + (Number(lastEmailNumber) + 1) + slicedEmail[1];
    return lastEmail;
}
