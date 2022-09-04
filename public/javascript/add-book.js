async function bookFormHandler(event) {
    event.preventDefaul();

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