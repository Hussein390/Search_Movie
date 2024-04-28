import { useNavigate } from 'react-router-dom';
import { Movie } from '../App';

interface LandingProps {
  data: Movie[] | null;
}

export default function Landing({ data }: LandingProps) {
  const navigate = useNavigate();
  
  if (!data || data.length === 0) {
    return null; 
  }

  const randomImg: number = Math.floor(Math.random() * data.length);
  const randomResult = data[randomImg];

  const Img = (index: number) => {
    const resultIndex =  randomImg + index;
    const randomResult =  data[resultIndex];
    if (!randomResult) {
      return null; 
    }
    if (resultIndex >= 0 && resultIndex <= data.length) {
      return (
        <div  className='relative'>
          <div onClick={() => navigate(`/movie/upcoming/${randomResult?.id}`)} className='absolute flex justify-between p-2 top-0 left-0 opacity-0 hover:bg-black/80 cursor-pointer hover:opacity-65 w-full h-full'>
            <small className='font-bold mr-2 mb-1 z-50 text-slate-200'>{randomResult?.release_date.slice(0, 4)}</small>
            <small className='font-bold z-40 mb-1 text-slate-200'>{randomResult?.vote_average.toString().slice(0, 3)}
              <span className='bg-slate-50 font-bold ml-1 text-[11px] text-slate-600 rounded p-[1px]'>IMDB</span></small>
          </div>
          <img
            key={randomResult.id}
            className="object-cover w-[240px]"
            src={`https://image.tmdb.org/t/p/original/${randomResult?.backdrop_path}`}
            alt={randomResult?.title}
          />
        </div>
      );
    }
    return null; 
  };

  if (!randomResult.backdrop_path || !randomResult.id) {
    return null;
  }

  return (
    <div key={randomResult.id} className='flex h-screen relative bg-black '>
      <div className='hidden lg:flex justify-end flex-col '>
        {Img(1)}
        {Img(2)}
        {Img(3)}
      </div>
      <div onClick={() => navigate(`/movie/upcoming/${randomResult?.id}`)} className=' w-[900px] cursor-pointer relative flex-grow h-screen'>
        <div className='absolute w-full bg-gradient-to-r from-black h-full'></div>

        <div className='flex items-center cursor-pointer bottom-20 absolute translate-x-[-50%] left-[50%]'>
          <h1 className=' font-bold text-3xl p-1 pb-2 border-b-[3px] border-dashed border-slate-400 text-slate-100'>{randomResult.title}</h1>
          <small className='font-bold text-xl ml-5 text-blue-400'>{randomResult.vote_average.toString().slice(0, 3)}
            <span className='bg-slate-50 font-bold ml-3 text-[15px] text-slate-600 rounded p-1'>IMDB</span></small>
        </div>
        <img className="rounded  flex-grow h-screen object-cover" src={`https://image.tmdb.org/t/p/original/${randomResult.backdrop_path}`} alt={randomResult.title} />
      </div>
      <div className='hidden lg:flex justify-end flex-col '>
        {Img(4)}
        {Img(5)}
        {Img(6)}
      </div>
    </div>
  );
}
