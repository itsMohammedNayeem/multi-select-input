const Pill = ({ image, text, onClick }) => {
  return (
    <span
      className="user-pill h-[20px] flex items-center gap-[5px] bg-black text-[#fff] py-[5px] px-[10px] rounded-2xl cursor-pointer"
      onClick={onClick}
    >
      <img src={image} alt={text} className="h-full" />
      <span>{text} &times;</span>
    </span>
  );
};

export default Pill;
