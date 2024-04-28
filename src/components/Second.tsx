import { useNavigate } from 'react-router-dom';
import { Movie } from '../App';
import { Link } from 'react-router-dom';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

type SecondProps = {
  data: Movie[] | null,
}

export default function Second({ data }: SecondProps) {
  const navigate = useNavigate();
  const sideLeft = () => {
    const slide = document.getElementById('slide' + 2)
    slide!.scrollLeft -= 230
  }
  const sideRight = () => {
    const slide = document.getElementById('slide' + 2)
    slide!.scrollLeft += 230
  }
  function onClick() {
    data?.map(item => {
      navigate(`/movie/${item.type}`)
    })
  }

  return (
    <div className='mx-auto px-2 mt-6 lg:w-[1280px] container relative group '>
      <MdChevronLeft onClick={sideLeft} className='bg-slate-50 cursor-pointer z-50 select-none top-[50%] left-0 rounded-full absolute opacity-50 hover:opacity-100 hidden hover:drop-shadow-xl duration-300 group-hover:block' size={40} />
      <div className='flex justify-between'>
        <h1 className={`font-bold text-2xl pb-1 border-b-4 border-slate-400  text-${data?.map(c => c.color).slice(0, 1)}-400  capitalize`}>{data?.map(item => item.type).slice(0,1).join(' ')}</h1>
        <button onClick={onClick} className={`p-1 bg-transparent border hover:border-red-400 rounded-sm font-bold text-slate-400`}>More..</button>
      </div>
      <div id={`slide${2}`} className='flex gap-x-2 my-5 bg-slate-800 w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth   relative' style={{scrollbarWidth: 'none'}}>
        {data?.map(itme => {
          return (
            <Link key={itme.id} to={`/movie/${itme.type}/${itme.id}`}>
            <div   className='w-44 cursor-pointer rounded-tr rounded-tl border border-slate-500 group:'>
              <img className='object-cover rounded w-[180px] h-[180px]'
                src={`https://image.tmdb.org/t/p/original/${itme.poster_path}`} alt={itme.title} />
              <h1 className='font-bold m-2 text-slate-100'>{itme.title.length > 17 ? `${itme.title.slice(0, 17)}..` : itme.title}</h1>
              <div className='flex  justify-between px-2'>
                <small className='font-bold mr-2 mb-1 text-slate-400'>{itme.release_date.slice(0, 4)}</small>
                <small className='font-bold  mb-1 text-slate-400'>{itme.vote_average.toString().slice(0, 3)}
                  <span className='bg-slate-50  font-bold ml-1 text-[11px] text-slate-600 rounded p-[1px]'>IMDB</span></small>
              </div>
            </div>
            </Link>
          )
        })}
      </div>
      <MdChevronRight onClick={sideRight} className='bg-slate-50 cursor-pointer z-50 select-none top-[50%] right-0 rounded-full absolute opacity-50 hover:opacity-100 hidden hover:drop-shadow-xl duration-300 group-hover:block' size={40} />
    </div>
  )
}
