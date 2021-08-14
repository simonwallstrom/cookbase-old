import Link from 'next/link';

const PageHeader = ({ title, buttonText, buttonURL, handleClick }) => {
  return (
    <div className="py-6 md:py-8">
      <div className="flex items-center justify-between">
        <div className="flex">
          <h1 className="text-3xl font-extrabold leading-normal">{title}</h1>
        </div>
        {buttonURL ? (
          <div>
            <Link href={buttonURL}>
              <a className="btn btn--black">{buttonText}</a>
            </Link>
          </div>
        ) : null}
        {handleClick ? (
          <div>
            <button className="btn btn--black" onClick={handleClick}>
              {buttonText}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PageHeader;
