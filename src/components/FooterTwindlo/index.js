import {useEffect,useRef} from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { LiaCopyrightSolid } from "react-icons/lia";
import { FaHeart } from "react-icons/fa";
import Styles from './index.module.css'

const FooterTwindlo = () => {


     const footerLogoRef = useRef('')
     useEffect(()=>{
        const footerHeading = document.querySelectorAll(`.${Styles.footerElement}`)
        const linkBgBoxes = document.querySelectorAll(`.${Styles.linkChildBg}`)
        const footerLogoEle= footerLogoRef.current

        const observerForHeading = new IntersectionObserver( (entries)=>{
             entries.forEach(eachEle=>{
                if (eachEle.isIntersecting){
                    eachEle.target.classList.add(Styles.showFooterElement)
                }
             })
        },{threshold:0.2})
        
        footerHeading.forEach(eachEle=>{
            observerForHeading.observe(eachEle)
        })
        

        const observerForLinkBgs= new IntersectionObserver((entries)=>{
            entries.forEach((eachEle)=>{
                if (eachEle.isIntersecting){
                    eachEle.target.classList.add(Styles.showLinkBg)
                }
            })
        },{threshold:0.5})

        linkBgBoxes.forEach((eachLinkBg=>{
            observerForLinkBgs.observe(eachLinkBg)
        }))
        

        const observerForLogo = new IntersectionObserver((entries)=>{
            entries.forEach(eachEle=>{
                if (eachEle.isIntersecting){
                  if (eachEle.target===footerLogoEle){
                     footerLogoEle.classList.add(Styles.showLogo)
                  }
                }
            })
            
        },{threshold:0.1})

         if (footerLogoEle){
            observerForLogo.observe(footerLogoEle)
         }


        return ()=>{
            footerHeading.forEach(eachEle=>{
                observerForHeading.unobserve(eachEle)
            })

            linkBgBoxes.forEach(eachLinkBg=>{
                observerForLinkBgs.unobserve(eachLinkBg)
            })
            
            if(footerLogoEle){
                observerForLogo.unobserve(footerLogoEle)
            }
        }
    },[])


    return (
        <div className={Styles.footerBg}>
           <div className={Styles.footerHeadingBg}>
               <h1 className={`${Styles.footerElement} ${Styles.footerHeading}`}>So, you can make it.</h1>
           </div>
           <div className={Styles.footerLinksBg}>
               <ul className={Styles.linkChildBg}>
                  <h1>Product</h1>
                  <li>Home</li>
                  <li>Features</li>
                  <li>Pricing</li>
                  <li>BLong</li>
               </ul>

               <ul className={Styles.linkChildBg}>
                  <h1>Company</h1>
                  <li>About us</li>
                  <li>Contact us</li>
                  <li>Careers</li>
                  <li>Press</li>
               </ul>
               
                <ul className={Styles.linkChildBg}>
                  <h1>Resources</h1>
                  <li>Support</li>
                  <li>Tutorials</li>
                  <li>FAQ</li>
                  <li>Community</li>
                </ul>

               <ul className={Styles.linkChildBg}>
                  <h1>Legal & Account</h1>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Signup</li>
                  <li>Login</li>
               </ul>
           </div>
           <div className={Styles.footerSocialBg}> 
                 <div className={Styles.contactBox}>
                    <h1>Kaviprakash V</h1>
                    <p >+91 6374802067</p>
                 </div>

                 <div className={Styles.logoBox}>
                     <img  ref={footerLogoRef} src='https://res.cloudinary.com/djtbynnte/image/upload/v1752215015/twindlo_logo_all_device_p5x0pi.png' alt='twindlo logo'/>
                 </div>

                 <div className={Styles.mediaBox}>
                     <FaInstagram/>
                     <FaFacebookF/>
                     <FaTwitter/>
                     <FaLinkedinIn/>
                 </div>
           </div>
            <div className={Styles.copyrightBar}>
               <h1> <LiaCopyrightSolid/> 2025 Twindlo. All rights reserved</h1>
               <p className={Styles.copyRightPara}> <FaHeart/> Made with love </p>
            </div>
       </div>
    )
   
}


export default FooterTwindlo