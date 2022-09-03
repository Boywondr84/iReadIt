// need to delete review change classes and ids 

// async function deleteFormHandler(event) {
//     event.preventDefault();
  
//     const id = window.location.toString().split('/')[
//       window.location.toString().split('/').length - 1
//     ];
//     const response = await fetch(`/api/reviews/${id}`, {
//       method: 'DELETE'
//     });
  
//     if (response.ok) {
//       document.location.replace('/dashboard/');
//     } else {
//       alert(response.statusText);
//     }
//   }
  
//   document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);

// review partial 

// <div class="reviews">
//     {{#each this}}
//     <section class="review">
//     <div class="meta">
//       {{user.username}} on {{created_at}}
//     </div>
//     <div class="text">
//       {{review_text}}
//     </div>
//   </section>
//   {{/each}}
// </div>