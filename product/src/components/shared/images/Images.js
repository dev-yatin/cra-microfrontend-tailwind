
/**
 * Generic image - Generic component for images
 * @Author - Ravi Kumar
 * @Created Date - 6/12/2022
*/

import NoImg from 'assets/no-photo.png';

const Images = (props) => {
    return (
        <img src={props.src ? props.src : NoImg} alt={props.alt ? props.alt : ""} width={props.width ? props.width : ''} height={props.height ? props.height : ""} style={props.style ? props.style : ""} />
    )
}

export default Images;