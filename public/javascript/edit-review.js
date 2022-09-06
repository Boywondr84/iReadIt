
async function editFormHandler(event) {
    event.preventDefault();
  
    const review_text = document.querySelector('input[name="review_text"]').value.trim();
    const book_id = document.querySelector('#save-btn').dataset.book;
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/reviews/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
       review_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace(`/book/${book_id}`);
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.edit-review-form').addEventListener('submit', editFormHandler);
