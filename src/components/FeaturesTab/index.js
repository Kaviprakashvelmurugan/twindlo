import Styles from './index.module.css'
const FeaturesTab = ({tab,changeFeatureCard,feature}) => {
    const {id,text} = tab

    const handleTab = () => {
      changeFeatureCard(id)
    }
    const buttonClass = id ===feature? 'blackBtn':'defaultbutton'
    return (
        <button onClick= {handleTab} className={Styles[buttonClass]}>
            {text}
        </button>
    )
}

export default FeaturesTab