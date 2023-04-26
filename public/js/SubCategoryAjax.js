$(document).on('submit','#subCategorySubmit' ,function (event) {
       
    event.preventDefault();
 
 var formData = new FormData($(this)[0]);

 $.ajax({
     url:'/SubCategorySubmit',
     type: 'POST',
     data: formData,
     async: false,
     success: function (data) {
       console.log(data)
         if(data=="success")
         {
          swal(`Added ${data}`)
          .then((data) => {
            window.location.href="/getShowSubCategorypage";
          });

          
         }
         else{

          swal("Error!", `${data}`);
         }
     },
     cache: false,
     contentType: false,
     processData: false
 });
 });
    



 //update

 $(document).on('submit','#subCategoryUpdate' ,function (event) {    
    event.preventDefault();
 var formData = new FormData($(this)[0]);

 $.ajax({
     url:'/subcategoryUpdate',
     type: 'POST',
     data: formData,
     async: false,
     success: function (data) {
       console.log(data)
         if(data)
         {
          $("#showSubCategory").append("sub category have updated")
         window.location.href="/getShowSubCategorypage";
         }
         else{
          $("#showSubCategory").append("something is wrong!")
         }
     },
     cache: false,
     contentType: false,
     processData: false
 });
 });
    


 //delete
 //document.getElementById("deleteCategory").addEventListener("click")  

 $(".deleteSubCategory").click(function(){
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      //ajax

          
 $.ajax({
     
  url: "/deleteSubCategory?subcategoryId=" +$(this).val(),
   type: 'GET',
  // data: formData,
   async: false,
   success: function (data) {
    swal("Poof! Your imaginary file has been deleted!", {
      icon: "success",

    })
    .then(()=>{
      window.location.reload()

    })     
   },
   cache: false,
   contentType: false,
   processData: false
});

    }
  });
});


//status
$(".subC").click(function(event){
    event.preventDefault()
   


    //swal method

    swal({
      title: "Are you sure?",
      text: "you want to update to status!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        
             
$.ajax({
  type: 'GET',
  url:"/SubCategoryStatus?subcategoryId="+$(this).val(),
   async: false,
   success: function (data) {

    swal("Poof! Your status has been updated!", {
      icon: "success",

    })
    .then(()=>{
      window.location.reload()

    })         


     
   },
   cache: false,
   contentType: false,
   processData: false
});

      }     

 }) })
     
  

  
       
      
  
