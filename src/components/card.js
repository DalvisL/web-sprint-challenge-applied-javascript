import axios from "axios";
import { tabsAppender } from "./tabs";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  // creating elements
  const card = document.createElement('div');
  const headline = document.createElement('div');
  const author = document.createElement('div');
  const imgContainer = document.createElement('div');
  const authorPhoto = document.createElement('img');
  const authorName = document.createElement('span');

  // adding classes, src, and textContent
  card.classList.add('card');
  headline.classList.add('headline');
  headline.textContent = article.headline;
  author.classList.add('author');
  imgContainer.classList.add('img-container');
  authorPhoto.src = article.authorPhoto;
  authorName.textContent = `By ${article.authorName}`;

  // creating heirarchy
  card.appendChild(headline);
  card.appendChild(author);
  author.appendChild(imgContainer);
  imgContainer.appendChild(authorPhoto);
  author.appendChild(authorName);

  // click event
  card.addEventListener('click', () => {
    console.log(headline.textContent);
  })

  // returning card element
  return card;
  
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  let topics = [];
  const parentElement = document.querySelector(selector);
  axios.get(`http://localhost:5001/api/articles`)
    .then(res => {
      const data = res.data.articles;
      topics = Object.keys(data);
      console.log(topics);
      topics.forEach(topic => {
        console.log(`this is a topic: ${data[topic]}`)
        data[topic].forEach(el => {
          parentElement.appendChild(Card(el));
        })
      })

  })
    .catch(err => {
      console.error(err);
    })
  }

export { Card, cardAppender }
