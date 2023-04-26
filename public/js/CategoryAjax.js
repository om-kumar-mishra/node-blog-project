
  
    
      $(document).on('submit','form#categorySubmit' ,function (event) {
       
       event.preventDefault();
      


    var formData = new FormData($(this)[0]);

    $.ajax({
        url: '/CategorySubmit',
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
          console.log(data)
          if(data=="success")
          {
           
            swal("Added!", `${data}`, "success")
            .then(()=>{
                window.location.reload()
            });
            
           
          } 
          else{
            swal("error!", `${data}`, "success");
            
          }   
        },
        cache: false,
        contentType: false,
        processData: false
    });
    
          })
       


   //upadate
   $(document).on('submit','form#updateSubmit' ,function (event) {
       
    event.preventDefault();
    
 var formData = new FormData($(this)[0]);

 $.ajax({
     url: '/CategoryUpdate',
     type: 'POST',
     data: formData,
     async: false,
     success: function (data) {
         console.log(data)
         //redirect("/getShowCategory")
         if(data)
         {
           window.location.href="/getShowCategory";
         }
         else{
           console.log(data)
         }
     },
     cache: false,
     contentType: false,
     processData: false
 });
 
})
    
   


   //delete
   
   $(".deleteCategory").click(function(){
              
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
              
     $.ajax({
       
      url: "/deleteCategory?categoryId=" +$(this).val(),
       type: 'GET',
      // data: formData,
       async: false,
       success: function (data) {   
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
  
        }).then(()=>{
          window.location.reload()
        });
        
              
       },
       cache: false,
       contentType: false,
       processData: false
   }); 
    }
  });
});


//status
$(".categoryStatusInactive").click(function(event){
  swal({
    title: "Are you sure?",
    text: "you want to upadate status!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {

               

 $.ajax({
  type: 'GET',
  url: "/CategoryStatus?categoryId="+$(this).val(),
   
  // data: formData,
   async: false,
   success: function (data) {
    swal("Poof! Your status has been updated!", {
      icon: "success",

    }).then(()=>{
      window.location.reload()
    })
             
  }
      
   ,
   cache: false,
   contentType: false,
   processData: false
});   
} 
  });
})

    
$(".categoryStatusActive").click(function(event){
  console.log( $(".categoryStatusActive").val())

  $.ajax({
    type: 'GET',
    url: "/CategoryStatus?categoryId="+$(".categoryStatusActive").val(),
     
    // data: formData,
     async: false,
     success: function (data) {
        
               
         // window.location.href="/getShowCategory";
         }
        
     ,
     cache: false,
     contentType: false,
     processData: false
 });


})

    
    
  