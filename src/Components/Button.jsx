const Reusablebutton = ({
  children,
  variant = "primary",
  handleonClick,
  btnclass,
  ...rest
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      type="button"
      onClick={handleonClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Reusablebutton;
