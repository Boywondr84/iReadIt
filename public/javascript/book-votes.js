async function upvoteHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch("/api/books/upvote", {
    method: "PUT",
    body: JSON.stringify({
      book_id: id
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
    const resp = await response.json()
    console.log(resp)
  }
}

document.querySelector("#upvote-btn").addEventListener("click", upvoteHandler);
