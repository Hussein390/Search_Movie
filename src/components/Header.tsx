import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import SearchRsualts from "./SearchRsualts";
import { Movie } from '../App';

interface HeaderProps {
  data: Movie[];
}


export default function Header({ data }: HeaderProps) {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState<Movie[]>([])
  

  useEffect(() => {
    const results = data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    setResult(results)
  },[data, search])
  return (
    <div className="absolute w-full p-2 px-4 z-50 top-1 left-0 flex justify-between">
      <div className="flex relative items-center">
        <h1 className="font-bold text-lg lg:text-3xl text-red-600 mr-3">Movies</h1>
        <div className="flex border-b-2 ml-4 pb-1 border-slate-200 px-1 py-[2px] ">
          <input value={search} onChange={e => setSearch(e.target.value)} type="text" className="outline-none w-20 text-slate-50 bg-transparent rounded" />
          <IoIosSearch className="text-red-500 cursor-pointer hover:text-blue-500 text-lg"/>
        </div>
        <SearchRsualts data={result} value={search} setSearch={setSearch} />
      </div>
      <div className="">
        <button className="text-slate-50 rounded border hover:text-slate-300 hover:border-slate-400 py-1 px-2">Login</button>
      </div>
    </div>
  )
}
