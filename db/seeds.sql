INSERT INTO books(id,title)
VALUES
    (1, "Thomas the Train"),
    (2, "What We do in the shadows");


INSERT INTO reviews(review_text, user_id, book_id) 
VALUES
   ("great book", 1, 1),
   ("didnt like it", 2, 2);

INSERT INTO users( username, email, password)  
VALUES 
   ("John", "john@email.com", "password1" ),
   ("Jane", "jane@email.com", "password2");     

