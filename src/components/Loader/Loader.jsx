import {ClipLoader} from 'react-spinners'

function Loader() {
  return (
    <div className="hero min-h-screen bg-white">
      <div className="hero-content text-center">
        <div className="max-w-md">
        <ClipLoader color='#0aad0a' size={70}/>
        </div>
      </div>
    </div>
  );
}

export default Loader