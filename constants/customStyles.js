const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "#fff",
    borderColor: "#D3D4D7",
    minHeight: "45px",
    borderRadius: "8px",
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: "45px",
    padding: "0 6px",
    borderRadius: "8px",
  }),
  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "45px",
    opacity: ".5",
  }),
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: "#F57C2B",
      borderRadius: "27px",
      padding: "4px 8px",
      color: "#fff",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "#fff",
  }),
};

export default customStyles;
