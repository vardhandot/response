import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import ThemeAndVideoContext from '../../context/Themeandvideocontext'
import {
  VideoPlayer,
  PlayVideoTitle,
  PlayVideoStatus,
  PlayVideoStatusContainer,
  PlayVideoDot,
  PlaySocialButtonsContainer,
  SocialButton,
  ButtonText,
  HrLine,
  ChannelImage,
  ChannelContainer,
  ChannelInfo,
  ChannelName,
  ChannelSubscribers,
  ChannelDescription,
  BtnContainer,
} from './styledComponents'

const PlayVideoView = props => {
  const {videoDetails, isLiked, isDisLiked, clickLiked, clickDisLiked} = props
  // console.log(videoDetails)
  const publishedTimeToNow = formatDistanceToNow(
    new Date(videoDetails.publishedAt),
  )

  const onClickLike = () => {
    clickLiked()
  }

  const onClickDislike = () => {
    clickDisLiked()
  }

  return (
    <ThemeAndVideoContext.Consumer>
      {value => {
        const {isDarkTheme, addVideo, savedVideos} = value
        //const bgColor = isDarkTheme ? '#181818' : '#f9f9f9'
        const textColor = isDarkTheme ? '#64748b' : '#231f20'
        const likeIconColor = isLiked ? '#2563eb' : '#64748b'
        const dislikeIconColor = isDisLiked ? '#2563eb' : '#64748b'

        const isSaved = savedVideos.some(
          eachVideo => eachVideo.id === videoDetails.id,
        )

        const saveIconColor = isSaved ? '#2563eb' : textColor

        const onClickSave = () => {
          addVideo(videoDetails)
        }

        return (
          <VideoPlayer>
            <ReactPlayer url={videoDetails.videoUrl} controls width="100%" />
            <PlayVideoTitle color={textColor}>
              {videoDetails.title}
            </PlayVideoTitle>
            <PlayVideoStatusContainer>
              <PlayVideoStatus color={textColor}>
                {videoDetails.viewCount} views
                <PlayVideoDot> &#8226; </PlayVideoDot>
                {publishedTimeToNow}
              </PlayVideoStatus>
              <PlaySocialButtonsContainer>
                <BtnContainer>
                  <SocialButton
                    type="button"
                    color={likeIconColor}
                    onClick={onClickLike}
                  >
                    <AiOutlineLike size={25} />
                    Like
                  </SocialButton>
                </BtnContainer>
                <BtnContainer>
                  <SocialButton
                    type="button"
                    color={dislikeIconColor}
                    onClick={onClickDislike}
                  >
                    <AiOutlineDislike size={25} />
                    Dislike
                  </SocialButton>
                </BtnContainer>
                <BtnContainer>
                  <SocialButton
                    type="button"
                    color={saveIconColor}
                    onClick={onClickSave}
                  >
                    <BiListPlus size={25} /> {isSaved ? 'Saved' : 'Save'}
                  </SocialButton>
                </BtnContainer>
              </PlaySocialButtonsContainer>
            </PlayVideoStatusContainer>
            <HrLine />
            <ChannelContainer>
              <ChannelImage
                src={videoDetails.profileImageUrl}
                alt="channel logo"
              />
              <ChannelInfo>
                <ChannelName color={textColor}>{videoDetails.name}</ChannelName>
                <ChannelSubscribers color={textColor}>
                  {videoDetails.subscriberCount} Subscribers
                </ChannelSubscribers>
                <ChannelDescription color={textColor}>
                  {videoDetails.description}
                </ChannelDescription>
              </ChannelInfo>
            </ChannelContainer>
          </VideoPlayer>
        )
      }}
    </ThemeAndVideoContext.Consumer>
  )
}

export default PlayVideoView
