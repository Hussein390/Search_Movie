import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Request } from './data';
import Landing from "./components/langing";
// import AddMovies from "./components/AddMovies";
import Movie from "./components/Movie";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ListOfMovies from "./components/ListOfMovies";
import Second from "./components/Second";



// Define interfaces for API response and basic movie info
export interface BasicMovieInfo {
  id: number;
  release_date: string;
  backdrop_path: string;
  poster_path: string;
  title: string;
  vote_average: number;
  overview: string;
}

// Use BasicMovieInfo in ApiResponse definition to avoid repetition
export interface ApiResponse {
  results: BasicMovieInfo[];
}

// Extend BasicMovieInfo for Movie, adding the 'type' property
export interface Movie extends BasicMovieInfo {
  type: string;
  color: string
}

function App() {
  const [allData, setAllData] = useState<Movie[]>([]);

  const fetchAndCombineData = useCallback(async () => {
    try {
      const types = ['Popular', 'Horror', 'Trending', 'Upcoming'];
      const colors = [ 'blue', 'red', 'purple', 'yellow'];
      const responses = await Promise.all(
        types.map(type => axios.get((Request as any)[`request${type}`]))
      );

      const combinedData = responses.flatMap((response, index) =>
        response.data.results.map((item: BasicMovieInfo) => ({
          ...item,
          type: types[index].toLowerCase(),
          color: colors[index],
          
        }))
      );

      setAllData(combinedData);
    } catch (error) {
      console.error('There was an error fetching the data:', error);
    }
  }, []); // Empty dependency array ensures that this function is memoized
  
  useEffect(() => {
    fetchAndCombineData(); // Call the memoized function
  }, [fetchAndCombineData]); // Add the memoized function as a dependency

  
  return (
    <div className="min-h-screen bg-black  pb-5">
      

      <div className='m-0 p-0 relative'>
        <Header data={allData} />
        <Routes>
          <Route path='/' element={
            <>
              <Landing data={allData.filter(movie => movie.type === 'upcoming')} />
              {['popular', 'horror', 'trending', 'upcoming'].map(type => (
                <Second  key={type} data={allData.filter(movie => movie.type === type)} />
              ))}

            </>
          } />
          {['popular', 'horror', 'trending', 'upcoming'].map(type => (
            <Route key={type} path={`/movie/${type}/:id`} element={<Movie data={allData.filter(movie => movie.type === type)} />} />
          ))}
          {['popular', 'horror', 'trending', 'upcoming'].map(type => (
            <Route key={type} path={`/movie/${type}`} element={<ListOfMovies data={allData.filter(movie => movie.type === type)} />} />
          ))}
        </Routes>
      </div>
      
      
    </div>
  );
}

export default App;
// function LandingRoute({ allData }: { allData: Movie[] }) {
//   return (
//     <Route element={
//       <>
//         <Landing data={allData.filter(movie => movie.type === 'upcoming')} />
//         <Routes>
//           {['popular', 'horror', 'trending', 'upcoming'].map(type => (
//             <Route key={type} path={`/movie/${type}`} element={<Second data={allData.filter(movie => movie.type === type)} />} />
//           ))}
//         </Routes>
//       </>
//     } />
//   );
// }