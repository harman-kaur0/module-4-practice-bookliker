import React from "react";
import {
    Container,
    Header,
    Menu,
    Button,
    List,
    Image
  } from "semantic-ui-react";

const Book = ({book, updateLikes, user}) => {
    let likeCount = book.users.length;
    return (
        <div>
            <Container text>
                <Header>{book.title}</Header>
                <Image
                    src={book.img_url}
                    size="small"
                />
                <p>{book.description}</p>
                <Button
                    color="red"
                    content="Like"
                    icon="heart"
                    label={{
                    basic: true,
                    color: "red",
                    pointing: "left",
                    content: `${likeCount}`
                    }}
                    onClick={() => updateLikes(user.id, book.id)}
                />
                <Header>Liked by</Header>
                <List>
                    {book.users.map(user => <List.Item icon="user" content={user.username} key={user.id}/>)}
                </List>
            </Container>
        </div>
    )
};

export default Book;