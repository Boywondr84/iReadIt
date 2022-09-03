// reviews instead of comments, this is from mod

// async function commentFormHandler(event) {
//     event.preventDefault();
  
//     const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
//     const post_id = window.location.toString().split('/')[
//       window.location.toString().split('/').length - 1
//     ];
  
//     if (comment_text) {
//       const response = await fetch('/api/review', {
//         method: 'POST',
//         body: JSON.stringify({
//           post_id,
//           comment_text
//         }),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
  
//       if (response.ok) {
//         document.location.reload();
//       } else {
//         alert(response.statusText);
//       }
//     }
//   }
  
//   document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);


// review handlebars 
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