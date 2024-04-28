import { useNavigate } from 'react-router-dom';
import { Movie} from '../App';
import { useEffect, useState } from 'react';
interface SearchProps {
  data: Movie[];
  value: string
  setSearch: (vla: string) => void
}

export default function SearchRsualts({ data, value, setSearch }: SearchProps) {
  const navigate = useNavigate();
  const [items, setItems] = useState<Movie[]>([])
  useEffect(() => {   
    const uniqueItems = data.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.id === item.id
      ))
    );
    setItems(uniqueItems)
  }, [data])
  return (
    value !== '' && value !== ' '&&
    <div className='w-60 absolute top-[130%] left-[34%] sm:left-[45%] lg:w-80 overflow-y-scroll max-h-[300px] p-2 rounded shadow-md shadow-slate-50 bg-slate-700 text-slate-50'>
      {items?.map(item => {
        return (
          <div onClick={() => {
            navigate(`/movie/${item.type}/${item?.id}`)
            setSearch('')
          }
          } key={item.id} className="p-2 cursor-pointer group flex justify-between my-2 h-fit rounded bg-slate-600 outline-2 outline outline-slate-800">
            <div className="w-20 rounded"><img className='w-full rounded' src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt={item.title} /></div>
            <div className="text-end">
              <h3 className='overflow-hidden group-hover:text-slate-300 font-semibold duration-100'>{item.title.slice(0, 13)}</h3>
              <small className='font-bold mr-2 mb-1 z-50 text-gray-400'>{item?.release_date.slice(0, 4)}</small>
              <small className='font-bold z-40 mb-1 text-slate-300'>{item?.vote_average.toString().slice(0, 3)}</small>
                <span className='bg-slate-50 font-bold ml-2 text-[9px] text-slate-600 rounded p-[1px]'>IMDB</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
