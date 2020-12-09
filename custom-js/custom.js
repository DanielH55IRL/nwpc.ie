  $(document).ready(function(){
      
    // set the checkout figure
    if (localStorage.getItem('checkout') == null) {  
        localStorage.setItem('checkout',0);
    }
    $("#checkout" ).html(localStorage.getItem('checkout'));

    // check if user is logged in or logged out..
    var loggedin=localStorage.getItem('loggedIn'); 

    if (loggedin==1) {
        // change the text from Login to Logout
        $("#loginlogout" ).html("Logout" );
        // hide User details nav item by applying bootstrap d-none which hides the nav item
        $( "#accountdetails" ).removeClass( "d-none" );            
    } else{
        // use addCass to hide the display of User Details
        $( "#accountdetails" ).addClass( "d-none" );
        // change the text from Logout to Login
        $( "#loginlogout" ).html("Login" );
        // set the href propery to point to login.html if user clicks on it
        $("#loginlogout" ).prop("href", "login.html");
    } 

    // wait for loginlogout button to be clicked - a click here means the user has chosen to logout
    $("#loginlogout").button().click(function(){
        if (loggedin==1) {
            // set the flag so that user is not logged in
            localStorage.setItem('loggedIn',0);
            window.location.href = "login.html";
        }  else 
            window.location.href = "login.html";

    });       


    // Once Registered then logged in
    $("#checkout_log").button().click(function(){
        if (loggedin==0) {
            // set the flag so that user is not logged in
            localStorage.setItem('loggedIn',0);
            window.location.href = "login.html";
        }  else 
            window.location.href = "checkout.html";
    });       


    //Prevent checkout without logging in
    $("#register_login").button().click(function(){
       if (loggedin==0) {
            //set the flag so that user is not logged in
          localStorage.setItem('loggedIn',1);
         window.location.href = "shop.html";
        }  else 
           window.location.href = "register.html";
    });       

    // wait for submit button to be clicked on login form - this code only invoked if login form submit button clicked
    $('form[name="login"]' ).submit(function( event ) {
        var email=$('input[name="email"]').val();
        var password =$('input[name="password"]').val();
        if (email=="danielhalpin@mail.itsligo.ie" && password=="password1")  {   
            // successful login, user redirected to shop.html
            localStorage.setItem('loggedIn',1);    
            window.location.href = "shop.html";
        }
        else {
            // login unsuccessful, error message appears
            localStorage.setItem('loggedIn',0);
            $( "#loginerror" ).addClass( "d-block" );
        }
        return false;
    });     


    // this code is run everytime this js file is loaded.   
    if (localStorage.getItem('userdetails') === null) {  
        // if userdetails is null, that means it has not been loaded before. we not initialise userdetails object
        var userDetails = {firstName:"Daniel", lastName:"Halpin", dob:"2000-10-17",address1:"IT Sligo", address2:"Ash Lane", address3:"Co. Sligo"};
        // now we store the userdetails object as a localstorage object but localstore only stores text and userdetails is a javascript object
        // we convert a javascript object ot a string using JSON.stringify - we are being expedient!
        localStorage.setItem('userdetails',JSON.stringify(userDetails));
    } else {
        // if localstorage variable userdetails is already created - load it to javascript oject. JSON.parse turns it back into an javascript object
        userDetails=JSON.parse(localStorage.getItem('userdetails'));
    }

    // we only run this code if an id of udetails is on the html page we are currently on - makes the code a little bit more efficient
    // if the length > 0 it means we are on the right page - and we can populdate the form fields!!!
    if ($('#udetails').length > 0) {
        console.log(userDetails);
        $('input[name="firstname"]').val(userDetails.firstName);         
        $('input[name="lastname"]').val(userDetails.lastName);
        $('input[name="dob"]').val(userDetails.dob);
        $('input[name="address1"]').val(userDetails.address1);
        $('input[name="address2"]').val(userDetails.address2);
        $('input[name="address3"]').val(userDetails.address3);
    }
}); 
      


    // wait for submit button to be clicked on userdetails update form
    $('form[name="userdetails"]' ).submit(function( event ) {
        // if the user updates the user details - we update the userDetails javascript object
        userDetails.firstName=$('input[name="firstname"]').val();
        userDetails.lastName=$('input[name="lastname"]').val();
        userDetails.address1=$('input[name="address1"]').val(); 
        userDetails.address2=$('input[name="address2"]').val();   
        userDetails.address3=$('input[name="address3"]').val();    
        // finally we convert the javascript object to a string with JSON.stringify and save it to localstorage
        localStorage.setItem('userdetails',JSON.stringify(userDetails));
        return false;
    }); 

      // wait for submit button to be clicked on userdetails update form
    $('form[name="paymentdetails"]' ).submit(function( event ) {
        var cardnumber=$('input[name="cardnumber"]').val();
         //added CVC number check & Name check
        var cardname=$('input[name="cardname"]').val();
        var cvcnumber=$('input[name="cvcnumber"]').val();
        if (cardnumber =="4319123456789012" && cvcnumber =="123" && cardname=="MR DANIEL HALPIN") {
            $( "#payment-failure" ).addClass( "d-none" );
            $( "#payment-success" ).removeClass( "d-none" );
            $( "#buy-button" ).addClass( "d-none" );
            $( "#checkout" ).html("0" );
            localStorage.setItem('checkout',0)
            //5 second delay for confirmation then back to index.html
            setTimeout(function() {
                window.location.href = "index.html";
            }, 5000);

            
            
        } else {
            $( "#payment-failure" ).removeClass( "d-none" );
        }
        return false;
    }); 
      

    $(".addtocart").click(function(){
        var total=localStorage.getItem('checkout');
        total++;
        localStorage.setItem('checkout',total);
        $("#checkout" ).html(total );
    });


$(".removefromcart").click(function(){
    var total=localStorage.getItem('checkout');
    total--;
    localStorage.setItem('checkout',total);
    $("#checkout" ).html(total );
});






//contact.html 
if (localStorage.getItem('contactus') === null) {  
  
    var contactUs = {name:"Daniel Halpin", email:"s00199340@mail.itsligo.ie", subject:"RTX 3000 Stock", message:"Hi, wondering the availibility of the RTX 3000 Series GPU's. Thanks."};
    
    localStorage.setItem('contactus',JSON.stringify(contactUs));
} else {
   
    contactUs=JSON.parse(localStorage.getItem('contactus'));
}


if ($('#cntctus').length > 0) {
    console.log(contactUs);
    $('input[name="name"]').val(contactUs.name);         
    $('input[name="email"]').val(contactUs.email);
    $('input[name="subject"]').val(contactUs.subject);
    $('input[name="message"]').val(contactUs.message);
}
  



$('form[name="contactus"]' ).submit(function( event ) {
   
    contactUs.name=$('input[name="name"]').val();
    contactUs.email=$('input[name="email"]').val();
    contactUs.subject=$('input[name="subject"]').val(); 
    contactUs.message=$('input[name="message"]').val();   
  
    localStorage.setItem('contactus',JSON.stringify(contactUs));
    return false;
}); 






//register.html 
if (localStorage.getItem('register') === null) {  
  
    var register = {email:"s00199340@mail.itsligo.ie", password:"password1"};
    
    localStorage.setItem('register',JSON.stringify(register));
} else {
   
    register=JSON.parse(localStorage.getItem('register'));
}


if ($('#rgstr').length > 0) {
    console.log(register);
    $('input[name="email"]').val(register.email);         
    $('input[name="password"]').val(register.password);
}
  


$('form[name="register"]' ).submit(function( event ) {
   
    register.email=$('input[name="email"]').val();
    register.password=$('input[name="password"]').val();

    localStorage.setItem('register',JSON.stringify(register));
    window.location.href = "shop.html";
    return false;
}); 


