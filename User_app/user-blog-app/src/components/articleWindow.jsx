export default function articleWindow(post, loadingPost) {
  //initial check
  if (!post) return null;

  const postData = post.post;

  return (
    <>
      <p>Hello world!</p>
      {console.log("from AW: ", post, loadingPost)}

      <p id="mainDisplay">This section should contain the main article.</p>
      {loadingPost ? <>loading post...</> : <>{JSON.stringify(post)}</>}

      {loadingPost ? (
        <>loading post...</>
      ) : (
        // render post
        <>
          <h1>{postData.title}</h1>
          <p>Author: {postData.User}</p>
        </>
      )}
    </>
  );
}
