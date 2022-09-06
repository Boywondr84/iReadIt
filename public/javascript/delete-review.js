// need to delete review change classes and ids

async function deleteFormHandler(event) {
<<<<<<< HEAD
  event.preventDefault();
=======
    event.preventDefault();
const book_id = document.querySelector('#save-btn').dataset.book;
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/reviews/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      document.location.replace(`/book/${book_id}`);
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#delete-btn').addEventListener('click', deleteFormHandler);
>>>>>>> 327be85235299a5cf07695308da687f35222ef57

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".delete-review-btn")
  .addEventListener("click", deleteFormHandler);
