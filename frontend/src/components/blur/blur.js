import './_blur.scss'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
export default function Blur() {
    let blur = useSelector(state => state.blur.blurSetting);
    const [blurClass, setBlurClass] = useState("")

    useEffect(() => {
        if (blur === true) {
            setBlurClass(prev => "blurScreen")
        }
        else {
            setBlurClass(prev => "")
        }

    }, [blur])

    return (
        <div className={blurClass}>

        </div>
    )
}