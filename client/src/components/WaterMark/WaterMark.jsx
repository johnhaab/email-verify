import { FaHeart } from "react-icons/fa";

/**
 * The watermark at the bottom of the screen.
 *
 * @param {string} color - Helps change the color to the color of the page the user is on.
 */

const WaterMark = () => {
  return (
    <>
      <p className="absolute bottom-2 flex justify-center items-center gap-1">
        Made with <FaHeart className="text-[#01b170]" /> by{" "}
        <a href="http:/x.com/johnlhaab" className="text-[#01b170]">
          John Haab
        </a>
      </p>
    </>
  );
};

export default WaterMark;
