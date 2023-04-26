
      $(document).on('submit','form#ChildCategory' ,function (event) {
       
        event.preventDefault();
       
 
 
     var formData = new FormData($(this)[0]);
 
     $.ajax({
         url: '/ChildCategory',
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

 //update

 $(document).on('submit','form#updateChildSubmit' ,function (event) {
       
    event.preventDefault();
    
 var formData = new FormData($(this)[0]);

 $.ajax({
     url: '/updateChildData',
     type: 'POST',
     data: formData,
     async: false,
     success: function (data) {
        
           window.location.reload();
        
     },
     cache: false,
     contentType: false,
     processData: false
 });
 
})
    
   
   //delete
   
  