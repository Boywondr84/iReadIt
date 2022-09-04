// need to be able to edit reviews. change classes and ids 

// async function editFormHandler(event) {
//     event.preventDefault();
  
//     const title = document.querySelector('input[name="reviews"]').value.trim();
//     const id = window.location.toString().split('/')[
//       window.location.toString().split('/').length - 1
//     ];
//     const response = await fetch(`/api/reviews/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify({
//         title
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
  
//     if (response.ok) {
//       document.location.replace('/dashboard/');
//     } else {
//       alert(response.statusText);
//     }
//   }
  
//   document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);

// reviews partial 

{/* <div class="reviews">
    {{#each this}}
    <section class="review">
    <div class="meta">
      {{user.username}} on {{created_at}}
    </div>
    <div class="text">
      {{review_text}}
    </div>
  </section>
  {{/each}}
</div> */}