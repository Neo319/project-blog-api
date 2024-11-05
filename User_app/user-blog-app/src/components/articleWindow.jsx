export default function articleWindow(post, loadingPost) {
  //initial check
  if (!post) return null;

  const postData = post.post;
  const date = new Date(postData.date);
  const readableDate = date.toLocaleDateString();
  //toUTC?

  return (
    <>
      <p>Hello world!</p>
      {console.log("from AW: ", post, loadingPost)}

      <p id="mainDisplay">This section should contain the main article.</p>

      {loadingPost ? (
        <>loading post...</>
      ) : (
        // render post
        <>
          <h1>{postData.title}</h1>
          <p>
            Author: {postData.User.username}
            <br />
            <span>Created: {readableDate}</span>
          </p>

          {/* temp implementation: can only render basic text */}
          <article>
            <p>{postData.textData.article}</p>
          </article>
        </>
      )}
    </>
  );
}
