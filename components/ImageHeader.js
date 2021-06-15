export default function ImageHeader({ loading, title, description }) {
  return (
    <div className="relative">
      <img
        src="https://images.pexels.com/photos/4676441/pexels-photo-4676441.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        className="absolute object-cover w-full h-full"
      />
      <div className="relative flex bg-black bg-opacity-60 h-96">
        <Container>
          <div className="flex flex-col justify-between h-full pt-8 pb-10">
            <div className="flex items-center justify-between">
              <Link href="/recipes">
                <a className="flex items-center p-3 leading-snug bg-white rounded-full hover:bg-gray-200">
                  <ArrowLeft size={20} />
                </a>
              </Link>
              <div className="flex space-x-4">
                <Link href={`/recipes/${recipe.slug}/edit`}>
                  <a className="flex items-center p-3 leading-snug bg-white rounded-full hover:bg-gray-200">
                    <Edit size={20} />
                  </a>
                </Link>
                <button className="flex items-center p-3 leading-snug bg-white rounded-full hover:bg-gray-200">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
            <div className="max-w-3xl">
              <div className="flex items-center space-x-1.5 text-sm font-medium text-white">
                <Bookmark size={16} />
                <span>Varmrätt</span>
              </div>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <h1 className="my-2 text-4xl font-extrabold leading-tight text-white line-clamp-2">
                  {recipe?.name}
                </h1>
              )}
              {recipe?.description ? (
                <div>
                  <p className="font-medium text-white line-clamp-3">
                    {recipe?.description}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
