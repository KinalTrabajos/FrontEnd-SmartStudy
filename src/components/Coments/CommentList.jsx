import { useViewComentId } from "../../shared/hooks/coments/useViewComentId";

export const CommentList = ({ publicationId }) => {
  const { comments, loadingComments } = useViewComentId(publicationId);

  if (loadingComments) {
    return <p className="text-gray-500">Cargando comentarios...</p>;
  }

  if (comments.length === 0) {
    return <p className="text-gray-400 italic">No hay comentarios aún.</p>;
  }

  return (
    <div className="space-y-2 mt-2">
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="bg-gray-100 p-3 rounded-lg text-sm text-gray-800"
        >
          {comment.content}
        </div>
      ))}
    </div>
  );
};
