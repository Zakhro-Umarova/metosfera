function passwordShowOrHide(){
	var x = document.getElementById("wlpeUserRegisterPassword");
	if (x.type==="password"){
		x.type="text";
		document.getElementById("fa-eye").style.color="#8D00A8";
	} else {
		x.type="password";
		document.getElementById("fa-eye").style.color="#120F39";
	}
}
// function ConfpasswordShowOrHide(){
// 	var x = document.getElementById("confirmPassword");
// 	if (x.type==="password"){
// 		x.type="text";
// 		document.getElementById("fa-eye2").style.color="#8D00A8";
// 	} else {
// 		x.type="password";
// 		document.getElementById("fa-eye2").style.color="#120F39";
// 	}
// }

//  3colored(blue, green, red) stickers

// $("#tabs").on("click", "a", function(){
//   var me = $(this);

//   $(".active").removeClass("active");
//   me.addClass("active");

//   $("#" + me.attr("id").replace("tab", "container")).addClass("active");
//   return false;
// });   

// $("#tabs").on("click", ".blueBox", function(){
// 	document.getElementById("blueBox-content").style.display = "block";
// 	document.getElementById("greenBox-content").style.display = "none";
// });
// $("#tabs").on("click", ".greenBox", function(){
// 	document.getElementById("greenBox-content").style.display = "block";
// 	document.getElementById("blueBox-content").style.display = "none";
// });
          //  3step registration form JS code: 
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Keyingi";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("form-container").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";  
      
      // and set the current valid status to false:
      valid = false;
      
     }

  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  	
  }
  return valid;// return the valid status
}
}
function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

// test
// input.onblur = function() {
//   if (!input.value.includes('@')) { // не email
//     input.classList.add('invalid');
//     error.innerHTML = 'Пожалуйста, введите правильный email.'
//   }
// };
// input.onfocus = function() {
//   if (this.classList.contains('invalid')) {
//     // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
//     this.classList.remove('invalid');
//     error.innerHTML = "";
//   }
// };


// test
   /****Avatar script****/
function readURL(input){
	if(input.files && input.files[0]){
		var reader = new FileReader();
		reader.onload=function(e)
		{
			var fileurl=e.target.result;
			$(".profile-pic").attr('src', fileurl);
		}
		reader.readAsDataURL(input.files[0]);
	}
}

$(".file-upload").on('change', function(){
readURL(this);
});
$(".upload-button").on('click', function(){
$(".file-upload").click();
});

    /****Avatar script****/
function readFullname(){
	var firstName=document.getElementsByTagName("input")[0].value;
	var lastName=document.getElementsByTagName("input")[1].value;
	document.querySelector('.name-title').innerHTML ="                        " +firstName+"  "+lastName;
};
$(".firstName" && ".lastName").on('change', function(){
readFullname();
});
