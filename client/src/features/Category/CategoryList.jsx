import { useSelector } from "react-redux"

import Loader from '../../components/Loader'

import { GoKebabHorizontal } from "react-icons/go"

export default function CategoryList() {

    const { categories } = useSelector((state) => state.categories)

  return (
    <div className='my-6 px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {categories.length && categories.map((category, index) => (
        <div key={index} className='border border-gray-300 rounded-md flex flex-col'>
            <div className='bg-gray-200 p-4 flex items-center justify-between'>
                <div className="flex items-center gap-4">
                    <span className="border border-gray-300 rounded-md p-1 bg-white w-8 h-8">
                        <img src={category.picture} className="w-full h-full" />
                    </span>
                    <p className="text-md font-medium">{category.name}</p>
                </div>
                <div className="cursor-pointer border border-transparent rounded-full p-2 hover:border-gray-400 bg-transparent hover:bg-white">
                    <GoKebabHorizontal />
                </div>
            </div>
            <div className="p-4 flex items-center justify-between text-gray-500">
                <p>Nombre d'items</p>
                <p>6</p>
            </div>
        </div>
        ))}
    </div>
  ) 
}
