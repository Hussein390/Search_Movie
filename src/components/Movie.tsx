import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { GoArrowDown, GoArrowUp } from "react-icons/go";
import {  Movie } from '../App';
type MovieProps = {
  data: Movie[] | null
}

export default function Movies({ data }: MovieProps) {
  const [hover, setHover] = useState(true)
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = data?.find(movie => movie.id.toString() === id);
  if (!movie?.overview) {
    return null
  }
  const backgroundImageUrl = movie ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` : 'none'
  return (
    <div style={{
      backgroundImage: backgroundImageUrl,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      minHeight: '100vh', // Adjust as needed
      width: '100%', // Adjust as needed
      zIndex: 30,
      color: '#fff',
      padding: '20px',
      margin: 'auto',
    }} className='container relative'>
      <div className='absolute top-0 left-0 w-full h-full bg-black/65 opacity-100'></div>
      <div className='flex flex-col sm:flex-row mt-12 mx-1 '>
        <div className='w-[240px] h-fit z-50 md:w-[300px] rounded shadow-md shadow-slate-300'>
          <img className='rounded object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} alt={movie?.release_date}/>
        </div>
        <div className='p-3 bg-gray-500 rounded mt-3 sm:ml-4 h-fit w-[250px] z-50 md:w-[300px]'>
          <h1 className='whitespace-wrap bg-slate-600 p-1 px-2 rounded font-bold text-lg '>Name:
            <span className="text-blue-400 text-xl ml-2">{movie?.title}</span></h1>
          
          <h1 className='whitespace-nowrap my-2 bg-slate-600 p-1 px-2 rounded font-bold text-lg '>Released:
            <span className="text-red-400 text-xl ml-2">{movie?.release_date}</span></h1>
          
          <h1 className='whitespace-nowrap bg-slate-600 p-1 px-2 rounded font-bold text-lg '>Vote:
            <span className="text-yellow-400 text-xl ml-2">{movie?.vote_average.toString().slice(0, 3)}</span></h1>
          
          <div style={{ display: 'grid', gridTemplateRows: hover ? '1fr' : '0fr', overflow: 'hidden', transition: '300ms', marginTop: '25px' }}>
            <div className='p-2  font-bold text-lg border-2 text-slate-300 border-slate-300 rounded'>Discription: 
            {hover ?
              <span className="pt-2 font-bold  text-slate-300 ml-1 w-full transition-all ">
                {movie!.overview.length > 60 ? `${movie!.overview.slice(0, 60)}..` : movie!.overview}</span> :
              <span className=" font-bold text-slate-300 ml-1 w-full transition-all ">{movie!.overview}</span>
              }
              <span onClick={() => setHover(prev => !prev)} className="font-bold text-blue-300 text-lg hover:text-blue-400 cursor-pointer">
                {hover ? <GoArrowDown className='inline ' /> : <GoArrowUp className='inline' />}</span>
            </div>
          </div> 
          <button onClick={() => navigate(`/`)} className='bg-blue-500 hover:shadow-xl mt-4 hover:bg-blue-600 rounded float-end p-2 font-bold text-slate-50'>Home</button>
        </div>
      </div>
    </div>
  )
}
