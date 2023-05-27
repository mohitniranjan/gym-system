

///////////////////////////////////////////////////////////////////////////////


// local storage  
$(document).ready(function () {
  // Retrieve data from local storage if available
  var formData = JSON.parse(localStorage.getItem('formData')) || [];
  //   var formData = [];

  // Display existing data in the table
  // displayData();

  // Form submit event handler
  $('#myForm').submit(function (event) {
    event.preventDefault();

    // Get form values

    var name = $('input[name="name"]').val();
    var email = $('input[name="email"]').val();
    var password = $('input[name="password"]').val();
    var rpassword = $('input[name="rpassword"]').val();

    // Create an object with the form data
    var data = {

      name: name,
      email: email,
      password: password,
      rpassword: rpassword
    };

    // Add data to the array

    formData.push(data);

    // Save data to local storage
    localStorage.setItem('formData', JSON.stringify(formData));


    // Reset the form
    $('#myForm')[0].reset();
  });
});


/////////////////////////////////////////////////////////////////////////////////////

//sidebar 
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");


closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange();//calling the function(optional)
});
// Sidebar open when you click on the search iocn
sidebar.classList.toggle("open");
menuBtnChange(); //calling the function(optional)
;

// following are the code to change sidebar button(optional)
function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");//replacing the iocns class
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");//replacing the iocns class
  }


}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// function of update modal
// function onedit(){
//   myModal4.style.display = "block";
// }
function show5() {
  myModal4.style.display = "none";

}
// Add New Course
function addCourse() {
  /*  alert($("#courseID").val() + $("#courseName").val() + $("#courseFee").val() + $("#duration").val()); */

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    // "id": $("#id").val(),
    "name": $("#name").val(),
    "height": $("#height").val(),
    "weight": $("#weight").val(),
    "fee": $("#fee").val(),
    "address": $("#address").val(),
    "cont": $("#cont").val(),

  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/student", requestOptions)

  // $("#id").val("");
  $("#name").val("");
  $("#height").val("");
  $("#weight").val("");
  $("#fee").val("");
  $("#address").val("");
  $("#cont").val("");
  showData();
};



// Course Details Display Function
function showData() {

  var settings = {
    "url": "http://localhost:3000/student",
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {


    if ((response.length) > 0) {
      var html = "";
      document.getElementById('tblBody').innerHTML = "";
      for (let i = 0; i < response.length; i++) {
        html += "<tr><td>" + response[i].id + "</td><td>" + response[i].name + "</td><td>" + response[i].height +
          "</td><td>" + response[i].weight + "</td><td>" + response[i].fee +
          "</td><td>" + response[i].address + "</td><td>" + response[i].cont + "</td><td>" + '<button onclick=" onedit(' + response[i].id + ')">edit</button>' + "&nbsp" + "&nbsp" + '<button onclick="del(' + response[i].id + ')">Delete</button>' + "</td></tr > ";

      }
      document.getElementById('tblBody').innerHTML += html;
    };
  });

  $.ajax(settings).done(function (dropdown) {
    let option1 = "";
    for (i = 0; i < dropdown.length; i++) {
      option1 += "<option>" + dropdown[i].name + "</option>"
    }
    document.getElementById("Sel").innerHTML = option1;
  });

};
// end of add course
// delete function

function del(i) {
  var settings = {
    "url": "http://localhost:3000/student/" + i,
    "method": "DELETE",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
  $("#name").val("");
  $("#height").val("");
  $("#weight").val("");
  $("#fee").val("");
  $("#address").val("");
  $("#cont").val("");
  showData();

  // alert(i)

}
// end of delete function
// start of edit function

let myModal4 = document.getElementById("myModal4");
let p;

function onedit(i) {
  var settings = {
    "url": "http://localhost:3000/student/" + i,
    "method": "GET",
    "timeout": 0,
  };

  myModal4.style.display = "block";

  $.ajax(settings).done(function (response) {
    $("#name4").val(response.name);
    $("#height4").val(response.height);
    $("#weight4").val(response.weight);
    $("#fee4").val(response.fee);
    $("#address4").val(response.address);
    $("#cont4").val(response.cont);


  });
  p = i
}

// function CloseEdit() {
//   EditModal.style.display = "none";
// }
//////////////////////////////////////////////////////////////////////////////////////////

function update() {
  var settings = {
    "url": "http://localhost:3000/student/" + p,
    "method": "PUT",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json"
    },
    "data": JSON.stringify({
      "name": $("#name4").val(),
      "height": $("#height4").val(),
      "weight": $("#weight4").val(),
      "fee": $("#fee4").val(),
      "address": $("#address4").val(),
      "cont": $("#cont4").val()
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });

  $("#name4").val("");
  $("#height4").val("");
  $("#weight4").val("");
  $("#fee4").val("");
  $("#address4").val("");
  $("#cont4").val("");
  showData();
}



// end of edit function

// Get the modal
var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
var btn2 = document.getElementById("myBtn2");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks on the button, open the modal
btn2.onclick = function () {
  modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function () {
  modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal2) {
    modal2 = style.display = "none";
  }
}

const showStudent = () => {
  s2.style.display = "none";
  s1.style.display = "block";
  s3.style.display = "none";
};

const showmoney = () => {
  s1.style.display = "none";
  s2.style.display = "block";
  s3.style.display = "none";
};
const showfee = () => {
  s1.style.display = "none";
  s2.style.display = "none";
  s3.style.display = "block";
};
// bind data


// Add New Course
function addCourse2() {
  /*  alert($("#courseID").val() + $("#courseName").val() + $("#courseFee").val() + $("#duration").val()); */

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    // "id": $("#id").val(),
    "mrno": $("#mrno").val(),
    "date": $("#date").val(),
    "Sel": $("#Sel").val(),
    "add": $("#add").val(),
    "cont1": $("#cont1").val(),
    "amount": $("#amount").val(),
    "month": $("#month").val(),

  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/money", requestOptions)

  // $("#id").val("");
  $("#mrno").val("");
  $("#date").val("");
  $("#Sel").val("");
  $("#add").val("");
  $("#cont1").val("");
  $("#amount").val("");
  $("#month").val("");
  showData2();
};



// Course Details Display Function
function showData2() {

  var settings = {
    "url": "http://localhost:3000/money",
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {


    if ((response.length) > 0) {
      var html = "";
      document.getElementById('tblBody2').innerHTML = "";
      for (let i = 0; i < response.length; i++) {
        html += "<tr><td>" + response[i].id + "</td><td>" + response[i].mrno + "</td><td>" + response[i].date +
          "</td><td>" + response[i].Sel + "</td><td>" + response[i].add + "</td><td>" + response[i].cont1 + "</td><td>" + response[i].amount + "</td><td>" + response[i].month +
          "</td><td>" + '<button onclick=" onshow2(' + response[i].id + ')">edit</button>' + "&nbsp" + "&nbsp" + '<button onclick="del2(' + response[i].id + ')">Delete</button>' + "</td></tr > ";

      }
      document.getElementById('tblBody2').innerHTML += html;
    };
  });
  $.ajax(settings).done(function (dropdown) {
    let option2 = "";
    for (i = 0; i < dropdown.length; i++) {
      option2 += "<option>" + dropdown[i].Sel + "</option>"
    }
    document.getElementById("editSel").innerHTML = option2;
  });
}

// bind of amount
function ShowAmt() {
  var settings2 = {
    "url": "http://localhost:3000/money",
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings2).done(function (response2) {
    let a = document.getElementById("Sel1").value;

    for (i = 0; i < response2.length; i++) {
      if (response2[i].Sel === a) {
        document.getElementById("amounts").value = response2[i].amount;
      }
    }

  });

}

// end of bind 


// // Get the modal
// var modal3 = document.getElementById("myModal3");


// // Get the button that opens the modal
// var btn3 = document.getElementById("myBtn3");

// // Get the <span> element that closes the modal
// var span3 = document.getElementsByClassName("close3")[0];

// // When the user clicks on the button, open the modal
// btn3.onclick = function () {
//   modal3.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span3.onclick = function () {
//   modal3.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal3) {
//     modal3 = style.display = "none";
//   }
// }

// Add New Course
function addCourse3() {
  /*  alert($("#courseID").val() + $("#courseName").val() + $("#courseFee").val() + $("#duration").val()); */

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    // "id": $("#id").val(),
    "date1": $("#date1").val(),
    "date2": $("#date2").val(),
    "Sel1": $("#Sel1").val(),
    "amounts": $("#amounts").val(),


  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/fee", requestOptions)

  // $("#id").val("");
  $("#date1").val("");
  $("#date2").val("");
  $("#Sel1").val("");
  $("amounts").val("");

  showData3();
};



// Course Details Display Function
function showData3() {

  var settings = {
    "url": "http://localhost:3000/fee",
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {


    if ((response.length) > 0) {
      var html = "";
      document.getElementById('tblBody3').innerHTML = "";
      for (let i = 0; i < response.length; i++) {
        html += "<tr><td>" + response[i].id + "</td><td>" + response[i].date1 +
          "</td><td>" + response[i].date2 + "</td><td>" + response[i].Sel1 + "</td><td>" + response[i].amounts + "</td><td>" + "</td></tr > ";


      }
      document.getElementById('tblBody3').innerHTML += html;


    };
  });
}


function otp() {
  const characters =
    "1234567890";
  let ot = "";
  for (let i = 0; i < 6; i++) {
    ot += characters[Math.floor(Math.random() * characters.length)];
  }
  return ot;
};
var ooo;
function sendEmail() {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "mohitniranjan31@elasticmail.com",
    Password: "73F4A381BF76C28237A30FC5661FB6051635",
    To: 'mohitniranjan31@gmail.com',
    From: "mohitniranjan31@gmail.com",
    Subject: "This is the subject",
    Body: `${otp()}`
  }).then(
    message => alert(message)
  );
  s5.style.display = "block";
  s4.style.display = "none";
  ooo = otp();
  console.log(ooo)


}
function verify() {

  const inputotp = document.getElementById('otpinput').value;

  console.log(inputotp, "AAAAAAAAAA");
  console.log(ooo, "BBBBBBBB");

  if (inputotp === ooo) {
    alert("Email address verified...");
    window.location.href = "index.html";
  }
  else {
    alert("Invalid OTP");
    window.location.replace("singup.html");
  }
}




function addCourse4() {
  /*  alert($("#courseID").val() + $("#courseName").val() + $("#courseFee").val() + $("#duration").val()); */

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    // "id": $("#id").val(),
    "name": $("#name").val(),
    "email": $("#email").val(),
    "password": $("#password").val(),
    "rpassword": $("#rpassword").val(),

  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("http://localhost:3000/sdata", requestOptions)

  // $("#id").val("");
  $("#name").val("");
  $("#email").val("");
  $("#password").val("");
  $("#rpassword").val("");

};

// ..............

// part 2 bind
function ShowAmt1() {
  var settings3 = {
    "url": "http://localhost:3000/student",
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings3).done(function (response3) {
    let b = document.getElementById("Sel").value;

    for (i = 0; i < response3.length; i++) {
      if (response3[i].name === b) {
        document.getElementById("address").value = response3[i].address;
        document.getElementById("cont").value = response3[i].cont;

      }
    }

  });

}
// end of part 2

// function to show hide and display
function show6() {
  myModal5.style.display = "none";

}
// end

// // start of edit function

// // let myModal5 = document.getElementById("myModal5");
// // let q;

// function onedit1(i) {
//   var settings = {
//     "url": "http://localhost:3000/money" + i,
//     "method": "GET",
//     "timeout": 0,
//   };

//   myModal5.style.display = "block";

//   $.ajax(settings).done(function (response) {
//     $("#mrno2").val(response.mrno);
//     $("#date2").val(response.date);
//     $("#Sel2").val(response.Sel);
//     $("#add2").val(response.add);
//     $("#cont2").val(response.cont1);
//     $("#amount2").val(response.amount);
//     $("#month2").val(response.month);


//   });
//   //  q= i
// }

// // function CloseEdit() {
// //   EditModal.style.display = "none";
// // }
// //////////////////////////////////////////////////////////////////////////////////////////

// // function update1() {
// //   var settings = {
// //     "url": "http://localhost:3000/money/" + q,
// //     "method": "PUT",
// //     "timeout": 0,
// //     "headers": {
// //       "Content-Type": "application/json"
// //     },
// //     "data": JSON.stringify({
// //       "mrno": $("#mrno2").val(),
// //       "date": $("#date2").val(),
// //       "Sel": $("#Sel2").val(),
// //       "add": $("#add2").val(),
// //       "contact": $("#cont2").val(),
// //       "amount": $("#amount2").val(),
// //       "month": $("#month2").val(),
// //     }),
// //   };

// //   $.ajax(settings).done(function (response) {
// //     console.log(response);
// //   });

// //   $("#mrno2").val("");
// //   $("#date2").val("");
// //   $("#Sel2").val("");
// //   $("#add2").val("");
// //   $("#cont2").val("");
// //   $("#amount2").val("");
// //   $("#month2").val("");
// //   showData2();
// // }



// // end of edit function


let editmyModal = document.getElementById("editmyModal");
        let q;
        
        function onshow2(i) {
          var settings = {
            "url": "http://localhost:3000/money/" + i,
            "method": "GET",
            "timeout": 0,
          };
        
           editmyModal.style.display = "block";
        
          $.ajax(settings).done(function (response) {
            $("#editmr").val(response.mr);
            $("#editdate").val(response.date);
            $("#editSel").val(response.Sel);
            $("#editaddress").val(response.address);
            $("#editcontact").val(response.contact);
            $("#editamount").val(response.amount);
            $("#editmonth").val(response.month);
        
        
          });
          q = i
        }
        
         function editclose() {
           editmyModal.style.display = "none";
         }
        //////////////////////////////////////////////////////////////////////////////////////////
        
        function update1() {
          var settings = {
            "url": "http://localhost:3000/money/" + q,
            "method": "PUT",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json"
            },
            "data": JSON.stringify({
              "mr": $("#editmr").val(),
              "date": $("#editdate").val(),
              "Sel": $("#editSel").val(),
              "address": $("#editaddress").val(),
              "contact": $("#editcontact").val(),
              "amount": $("#editamount").val(),
              "month": $("#editmonth").val(),
            }),
          };
        
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
        
          $("#editmr").val("");
          $("#editdate").val("");
          $("#editSel").val("");
          $("#editaddress").val("");
          $("#editcontact").val("");
          $("#editamount").val("");
          $("#editmonth").val("");
          showData2();
        }

        // delete function

function del2(i) {
  var settings = {
    "url": "http://localhost:3000/money/" + i,
    "method": "DELETE",
    "timeout": 0,
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
  $("#mr").val("");
  $("#date").val("");
  $("#Sel").val("");
  $("#address").val("");
  $("#contact").val("");
  $("#amount").val("");
  $("#month").val("");
  showData2();

  // alert(i)

}

// end of delete function

function ShowAmt() {
  var settings2 = {
    "url": "http://localhost:3000/money",
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings2).done(function (dropdown) {
    let option2 = '<option value="" selected>Select Student</option>';
    for (i = 0; i < dropdown.length; i++) {
      option2 += '<option>' + dropdown[i].Sel + '</option>'
    }
    document.getElementById("Sel3").innerHTML = option2;
  });

};

function ShowAmt() {
  var settings2 = {
    "url": "http://localhost:3000/money",
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings2).done(function (dropdown) {
    let option2 = '<option value="" selected>Select Student</option>';
    for (i = 0; i < dropdown.length; i++) {
      option2 += '<option>' + dropdown[i].Sel + '</option>'
    }
    document.getElementById("Sel3").innerHTML = option2;
  });

};

function ShowAmt() {
  var settings2 = {
    "url": "http://localhost:3000/money",
    "method": "GET",
    "timeout": 0,
  };

  $.ajax(settings2).done(function (dropdown) {
    let option2 = '<option value="" selected>Select Student</option>';
    for (i = 0; i < dropdown.length; i++) {
      option2 += '<option>' + dropdown[i].Sel + '</option>'
    }
    document.getElementById("Sel3").innerHTML = option2;
  });

};

function ShowFee() {
  var settings2 = {
    "url": "http://localhost:3000/money",
    "method": "GET",
    "timeout": 0,
  };

   document.getElementById("total").value="";

  $.ajax(settings2).done(function (response2) {

    let a = document.getElementById("Sel3").value;

    for (i = 0; i < response2.length; i++) {
      if (response2[i].Sel === a) {
        document.getElementById("amounts").value = response2[i].amount;
      }
    }

  });
}

function showtotal() {
  var settings2 = {
    "url": "http://localhost:3000/money",
    "method": "GET",
    "timeout": 0,
  };

  let sum2 = 0;

  let amm = [];
  $.ajax(settings2).done(function (response2) {
    amm.push(...response2)

    amm.filter(k => {
      let am = parseInt(k.amount)
      sum2 += am
    })
    console.log(sum2)
    document.getElementById("total").value=sum2;
  });

}