function Comment({ comment }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded mt-2">
      <p className="font-semibold">{comment.user_name}</p>
      <p>{comment.content}</p>
      <p className="text-sm text-gray-500">
        {new Date(comment.created_at).toLocaleString()}
      </p>
    </div>
  );
}

export default Comment;
