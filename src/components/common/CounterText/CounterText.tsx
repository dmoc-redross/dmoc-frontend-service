import CountUp from 'react-countup'
import styles from "./CounterText.module.scss";

type propTypes = {
    value: number,
    className?: string,
}

const CounterText = (props: propTypes) => {
    return (
        <>
            <CountUp
                start={0}
                end={props.value}
                duration={2}
                delay={0}
                scrollSpyOnce
                className={`${props.className || ""} ${styles.text}`}
                enableScrollSpy
            />
        </>
    )
}

export default CounterText
