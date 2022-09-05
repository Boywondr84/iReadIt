async function reviewFormHandler(event) {
  event.preventDefault();
  const review_text = document
    .querySelector('textarea[name="review-body"]')
    .value.trim();
  const book_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (review_text) {
    const response = await fetch("/api/reviews", {
      method: "post",
      body: JSON.stringify({
        book_id,
        review_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".review-form")
  .addEventListener("submit", reviewFormHandler);
