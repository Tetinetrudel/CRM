export default function Alert({ message, type }) {
    const classes = (type) => {
        if(type === "failure") {
            return "bg-red-200 text-red-500"
        }
        if(type === "warning") {
            return "bg-orange-200 text-orange-500"
        }
        if(type === "success") {
            return "bg-green-200 text-green-500"
        }
    }
  return (
    <div className={`rounded-md font-medium text-sm py-1 px-4 text-center mt-3 ${classes(type)}`}>
        {message}
    </div>
  )
}
