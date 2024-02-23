import { FaGoogle } from "react-icons/fa"

export default function OAuth() {
  return (
    <div>
        <button
            type="submit"
            className="flex w-full items-center gap-1 justify-center rounded-md bg-transparent px-3 py-1.5 text-sm font-semibold leading-6 text-blue-600 shadow-sm hover:bg-blue-600 hover:text-white border border-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            <FaGoogle />
            <span>Se connecter avec google</span>
        </button>
    </div>
  )
}
