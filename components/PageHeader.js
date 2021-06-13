import Link from 'next/link';

const PageHeader = ({ title, buttonText, buttonURL }) => {
  return (
    <div className="flex items-center justify-between py-6 md:py-8">
      <div className="flex items-baseline space-x-3">
        <h1 className="text-3xl font-extrabold leading-normal">{title}</h1>
      </div>
      {buttonText && buttonURL ? (
        <div>
          <Link href={buttonURL}>
            <a className="btn btn--primary">
              <span>{buttonText}</span>
            </a>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default PageHeader;
