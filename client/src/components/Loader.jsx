import PropagateLoader from 'react-spinners/PropagateLoader'

export default function Loader() {
  return (
    <div className='flex items-center justify-center mt-4 text-gray-300'>
      <PropagateLoader color="rgb(209 213 219)" />
    </div>
  )
}
