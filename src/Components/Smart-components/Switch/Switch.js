import React from "react";
import Switch from "react-switch";

const Checked = ({label, setValue, buttonclass, labelclass}) => {
  const [checked, setChecked] = React.useState(false);

  function handleChange() {
    setChecked(!checked);
    setValue(!checked)
  }

  return (
    <>
      <label className={labelclass}>
        {label}
        <Switch onChange={handleChange} checked={checked} className={buttonclass} />
      </label>
    </>
  );
};

export default Checked;
