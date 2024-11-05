export default function articleWindow(post, loadingPost) {
  return (
    <>
      <p>Hello world!</p>

      <p id="mainDisplay">This section should contain the main article.</p>
      {loadingPost ? <>loading post...</> : JSON.stringify(post)}
    </>
  );
}
