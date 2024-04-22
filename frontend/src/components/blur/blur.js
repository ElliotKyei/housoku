import './blur.scss'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
export default function Blur() {
    let blur = useSelector(state => state.blur.blurSetting);
    const [blurClass, setBlurClass] = useState("")

    useEffect(() => {
        if (blur === true) {
            setBlurClass(prev => "blurScreen")
            console.log("blur background")
        }
        else {
            setBlurClass(prev => "")
            console.log("Unblur background")

        }

    }, [blur])

    return (
        <div className={blurClass}>

        </div>
    )
}