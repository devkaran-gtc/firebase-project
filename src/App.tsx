import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Login } from "./components/login";
import { auth, fireStoreDB, storage } from "./config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
  const [newMovieWonOscar, setNewMovieWonOscar] = useState(false);
  const [updatedMovieTitle, setUpdatedMovieTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const moviesCollectionRef = collection(fireStoreDB, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filteredData);
        // console.log(filterData);
      } catch (err) {
        console.error(err);
      }
    };
    getMovieList();
  }, []);

  const onSubmitNewMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newMovieReleaseDate,
        wonOscar: newMovieWonOscar,
        userID: auth?.currentUser?.uid,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitUpdateMovie = async (id) => {
    try {
      const movieDoc = doc(fireStoreDB, "movies", id);
      await updateDoc(movieDoc, { title: updatedMovieTitle });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(fireStoreDB, "movies", id);
      await deleteDoc(movieDoc);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return;
    const fileFolderRef = ref(storage, `projectFiles/${selectedFile.name}`);
    try {
      await uploadBytes(fileFolderRef, selectedFile);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Login />
      <div>
        <input
          placeholder="Movie title"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date"
          type="number"
          onChange={(e) => setNewMovieReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={newMovieWonOscar}
          onChange={(e) => setNewMovieWonOscar(e.target.checked)}
        />
        <label>Won Oscar?</label>
      </div>
      <button onClick={onSubmitNewMovie}>Add new movie</button>
      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.wonOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>{movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete movie</button>
            <div>
              <input
                type="text"
                placeholder="update Title"
                onChange={(e) => setUpdatedMovieTitle(e.target.value)}
              />
              <button onClick={() => onSubmitUpdateMovie(movie.id)}>
                Update title
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <input
          type="file"
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
          }}
        />
        <button onClick={uploadFile}>Upload a file </button>
      </div>
    </div>
  );
}

export default App;
