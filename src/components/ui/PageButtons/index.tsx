import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

interface IPageButtonsProps {
    prev: () => void;
    next: () => void;
};

const PageButtons = ({ next, prev }: IPageButtonsProps) => {
    return (
        <div
            className={'page-buttons-container'}
        >
            <button
                onClick={prev}
            >
                <FaArrowAltCircleLeft />
            </button>
            <button
                onClick={next}
            >
                <FaArrowAltCircleRight />
            </button>
        </div>
    );
};

export default PageButtons;
