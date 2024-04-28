import { useEffect, useState } from 'react'
import {Movie} from '../App'
import { useNavigate } from 'react-router-dom'

type ListOfMoviesProps = {
  data: Movie[] | null
}
export default function ListOfMovies({ data }: ListOfMoviesProps) {
  const navigate = useNavigate()
  const [items, setItems] = useState<Movie[]>([])
  useEffect(() => {
    const uniqueItems = data!.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.id === item.id
      ))
    );
    setItems(uniqueItems)
  }, [data])
  return (
  
    <div className='pt-14 relative px-4 container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
      {items?.map(item => {
        return ( 
          <div onClick={() => {
            navigate(`/movie/${item.type}/${item?.id}`)
          }} className="flex p-3 rounded text-slate-50 my-3 outline-2 cursor-pointer" key={item.id}>
            <div className="w-40  rounded shadow shadow-lime-50 mr-5">
              <img className='object-cover ' src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} alt="" />
            </div>
            <div className="">
              <h2 className='font-bold mb-2'>{item.title}</h2>
              <small className='font-bold mr-3 mb-1 text-sm text-slate-400'>{item.release_date.slice(0, 4)}</small>
              <small className='font-bold text-sm mb-1 text-slate-400'>{item.vote_average.toString().slice(0, 3)}</small>
                <span className='bg-slate-50  font-bold ml-2 text-xs text-slate-600 rounded p-[2px]'>IMDB</span>
            </div>
        </div>
        )
      })}
      <button onClick={() => navigate(`/`)} className='fixed bottom-5 right-5 bg-blue-500 hover:shadow-xl mt-4 hover:bg-blue-600 rounded float-end p-2 font-bold text-slate-50'>Home</button>
    </div>
  )
}
