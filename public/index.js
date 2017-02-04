$('#red_btn').mousedown(function() {
  $( this ).css("background-color", "#ffb900");
});

$('#red_btn').mouseup(function() {
  $( this ).css("background-color", "#fc1a1a");
});


$(document).ready(function(){
  $.ajax({
    url:"http://localhost:3000/cctvData",
    method:"GET",
    success:function(data){
      var studentData = "";
      for(var i = 0; i<data.length; i++){
        studentData += "<tr>"
        studentData += "<td>"+data[i]["class"]+"</td>"
        studentData += "<td>"+data[i]["username"]+"</td>"
        studentData += "<td>"+data[i]["num"]+"</td>"
        studentData +="</tr>"

      }
      console.log(data[0]["username"])
      $("#student").html(studentData);
    },
    error:function(){
      alert("Server Error")
    }
  })
});
