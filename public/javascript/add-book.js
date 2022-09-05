

async function bookFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="book-title"]').value.trim();
  const author = document
    .querySelector('input[name="author-name"]')
    .value.trim();

  const response = await fetch("/api/books", {
    method: "POST",
    body: JSON.stringify({
      title,
      author,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-book-form")
  .addEventListener("submit", bookFormHandler);
