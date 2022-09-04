


// add-book handlbars 

//   <div> 
//     <form id="new-book-form">
//         <h1>Add A Book...</h1>

//         <div>
//             <label for="book-image">Book Cover:</label>
//             <input type="image" id="book-cover" name="cover"/>
//         </div>

//         <div>
//             <textarea id="book-review">
//                 Book Review:
//             </textarea>
//         </div>

//         <div>
//             <button type="submit">Add Book</button>
//         </div>
//     </form>
// </div>

// partial book handlebars =====================

// {/<article class="book"></article>
// <div class="book-title">
// {{title}}
// </div>

// <div class="user-info">
// created by {{user.username}} on {{created_at}}
//  </div>
//  |
// <a href="/book/{{id}}">{{reviews.length}} review(s)</a>
// </article> }

// addpost in mod 

// async function newFormHandler(event) {
//     event.preventDefault();
  
//     const title = document.querySelector('input[name="post-title"]').value;
//     const post_url = document.querySelector('input[name="post-url"]').value;
  
//     const response = await fetch(`/api/posts`, {
//       method: 'POST',
//       body: JSON.stringify({
//         title,
//         post_url
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
  
//     if (response.ok) {
//       document.location.replace('/dashboard');
//     } else {
//       alert(response.statusText);
//     }
//   }
  
//   document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

async function bookFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="book-title"]').value;

    const response = await fetch("/api/books", {
        method: 'POST',
        body: JSON.stringify({
            title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    }
}

document.querySelector(".new-book-form").addEventListener('submit', bookFormHandler);

