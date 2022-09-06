// need to delete review change classes and ids

async function deleteFormHandler(event) {
  event.preventDefault();
  const book_id = document.querySelector("#save-btn").dataset.book;
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace(`/book/${book_id}`);
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteFormHandler);
