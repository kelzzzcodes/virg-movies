import { useGlobalState } from '../store'
import Image from '../asset/heroimage.jpg'
import { Link } from 'react-router-dom'

const BrowsePage = () => {
  const [movies] = useGlobalState('movies')

  return (
    <div className="flex flex-col w-full p-4">
      <div
        style={{ backgroundImage: 'url(' + Image + ')' }}
        className="w-full h-full rounded-3xl bg-no-repeat bg-cover bg-center mb-4 flex flex-col"
      >
        <div className="text-white p-8 space-y-8">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold">AVATAR</h3>
            <p className="text-xl font-medium">THE WAY OF THE WATER</p>
          </div>
          <div>
            <button className="bg-transparent font-bold border-2 border-red-600 py-2 px-8 text-black hover:bg-gradient-to-r from-cyan-500 to-red-500  rounded-full hover:border-white hover:text-white ">
              WATCH
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold p-4">Movies</h2>

          {movies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {movies.map((movie, i) => (
                <MovieCard key={i} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="mt-10">No movies yet</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BrowsePage

const MovieCard = ({ movie }) => {
  return (
    <div className="flex justify-start flex-row space-x-8  sm:space-x-0  sm:flex-col p-3 space-y-2 shadow-lg w-auto rounded-lg border-2 border-gray-200">
      <div className="flex h-full w-auto">
        <Link to={`/movie/${movie.id}`}>
          <img
            src={movie.imageUrl}
            className="rounded-lg object-cover h-64 w-full"
          />
        </Link>
      </div>
      <div className="flex flex-col">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="font-bold md:text-lg my-2">{movie.name}</h3>
        </Link>
        <div className="md:text-gray-500 font-normal md:text-base flex space-x-2">
          {movie.genre.split(',').map((genre, i) => (
            <span
              key={i}
              className="inline-block px-4 py-2 rounded-full bg-cyan-500 text-white
              text-sm font-medium shadow-md transition-colors duration-300
              hover:bg-cyan-600 cursor-pointer"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
