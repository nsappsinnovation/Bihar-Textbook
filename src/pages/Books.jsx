import { useParams } from "react-router-dom";
import data from "./Book.json";

const Books = () => {
  const { classId } = useParams();

  const classData = data.classes.find(
    cls => cls.id === Number(classId)
  );

  if (!classData) {
    return <p>Invalid class</p>;
  }

  return (
   <div style={{ padding: "20px" }}>
  <h2>{classData.name}</h2>

  {classData.books.length > 0 ? (
    <ul>
      {classData.books.map(book => (
        <li key={book.id} style={{ marginBottom: "20px" }}>
          <img
            src={book.image}
            alt={book.title}
            style={{ width: "250px", display: "block" }}
          />
          <span>{book.title}</span>
        </li>
      ))}
    </ul>
  ) : (
    <p>No books available</p>
  )}
</div>

  );
};

export default Books;
