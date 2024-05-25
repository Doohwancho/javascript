const CFlexbox: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4">
      {/* 
        1. container mx-auto: Centers the container and applies horizontal
      margins. 
        2. flex: Applies flexbox layout. 
        3. justify-between: Spaces the
      child elements (logo and navigation links) as far apart as possible. 
        4. items-center: Centers the items vertically within the flex container.
      */}
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default CFlexbox;