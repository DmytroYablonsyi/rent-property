import { TelegramShareButton, FacebookShareButton, LinkedinShareButton, EmailShareButton, TelegramIcon, FacebookIcon, LinkedinIcon, EmailIcon, WhatsappShareButton, WhatsappIcon } from "react-share"

const ShareButtons = ({property}) => {
    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`
  return (
     <>
        <h3 className="text-xl font-bold text-center pt-2">
            Share this property
        </h3>
        <div className="flex gap-3 justify-center pb-5">
            <TelegramShareButton
                url={shareUrl}
                title={property.name}
                hashtag={ `#${property.type}ForRent` }
            >
                <TelegramIcon size={40} round={true}/>
            </TelegramShareButton>
            <FacebookShareButton
                url={shareUrl}
                quote={property.name}
                hashtag={ `#${property.type}ForRent` }
            >
                <FacebookIcon size={40} round={true}/>
            </FacebookShareButton>
            <LinkedinShareButton
                url={shareUrl}
                title={property.name}
                hashtag={ `#${property.type}ForRent` }
            >
                <LinkedinIcon size={40} round={true}/>
            </LinkedinShareButton>
            <EmailShareButton
                subject={property.name}
                url={shareUrl}
                body={`Check out this property listing: ${shareUrl}`}
            >
                <EmailIcon size={40} round={true}/>
            </EmailShareButton>
            <WhatsappShareButton
              url={shareUrl}
              title={property.name}
              separator=":: "
            >
                <WhatsappIcon size={40} round={true}/>
            </WhatsappShareButton>
        </div>

     </>
  )
}

export default ShareButtons