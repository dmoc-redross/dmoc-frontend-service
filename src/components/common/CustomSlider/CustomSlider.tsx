import { useEffect, useState } from "react";
import { Range, getTrackBackground } from "react-range";
import styles from "./CustomSlider.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/types";

const CustomSlider = (props: any) => {
  const STEP = 1;
  const MIN = 0;
  const MAX = 100;
  const { progress } = useSelector((state: RootState) => state?.user);

  const [values, setValues] = useState<any>([progress]);

  useEffect(() => {
    setValues([progress]);
  }, [progress]);

  return (
    <>
      <div className={styles.slider}>
        <Range
          values={values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => setValues(values)}
          disabled={true}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,

                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "10px",
                  width: "100%",
                  borderRadius: "25px",
                  background: getTrackBackground({
                    values,
                    colors: ["#F5DA76", "#13429D"],
                    min: MIN,
                    max: MAX,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div {...props} className={styles.slider_thumb}>
              <div className={styles.slider_tooltip} title={progress}>
                {values}%
              </div>
            </div>
          )}
        />
      </div>
    </>
  );
};

export default CustomSlider;
