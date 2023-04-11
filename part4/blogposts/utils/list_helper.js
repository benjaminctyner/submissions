const _ = require('lodash');

const dummy = (blogs) => {
  if (Array.isArray(blogs)) {
    return 1;
  }
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => {
    acc += cur.likes;
    return acc;
  }, 0);
};

const favoriteBlog = (blogs) => {
  let objMax = blogs.reduce((max, curr) =>
    max.likes > curr.likes ? max : curr
  );
  const ans = {
    title: objMax.title,
    author: objMax.author,
    likes: objMax.likes,
  };
  return ans;
};

const mostBlogs = (blogs) => {
  //retruns the most blogs by author
  const authorArray = _.map(blogs, 'author'); //create an array of tag values from the object array
  const mostCommonAuthor = _.chain(authorArray)
    .countBy()
    .toPairs()
    .max(_.last)
    .head()
    .value(); //find the most commonly occurring tag author

  const maxNum = _.chain(authorArray).countBy().toPairs().max(_.last).value(); //find the most commonly occurring tag author, with num occurance

  return {
    author: mostCommonAuthor,
    blogs: maxNum[1],
  };
};

const mostLikes = (blogs) => {
  const output = _(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, 'likes'),
    }))
    .value();

  let objMax = output.reduce((max, curr) =>
    max.likes > curr.likes ? max : curr
  );
  const ans = {
    author: objMax.author,
    likes: objMax.likes,
  };
  return ans;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
