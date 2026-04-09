import "./ProjectCard.scss"
import React from 'react'
import CircleAvatar from "/src/components/generic/CircleAvatar.jsx"
import {Card, CardBody} from "react-bootstrap"
import Tags from "/src/components/generic/Tags.jsx"
import CircularButtonList from "/src/components/generic/CircularButtonList.jsx"
import InfoBadge from "/src/components/generic/InfoBadge.jsx"
import {useWindow} from "/src/providers/WindowProvider.jsx"
import {useFeedbacks} from "/src/providers/FeedbacksProvider.jsx"

function ProjectCard({className, img, fallbackIcon, fallbackIconColors, title, subtitle, text, type, info, details, links, options, tags}) {
    const {displayYoutubeVideo, displayGallery, displayProjectDetails} = useFeedbacks()
    const {isBreakpoint} = useWindow()

    const hasLinks = Boolean(links && links.length)

    const _onOptionClicked = (option) => {
        switch (option.id) {
            case "youtube":
                displayYoutubeVideo(option.target, title, text)
                break

            case "gallery":
                displayGallery(option.target.images || [], option.target.aspectRatio, title, text)
                break
        }
    }

    const _onCardClicked = (e) => {
        // Don't trigger if a button or link was clicked
        if(e.target.closest('.circular-button') || e.target.closest('a'))
            return

        displayProjectDetails(title, subtitle, info, text, details, tags, type)
    }

    return (
        <Card className={`grid-item clickable ${className}`} onClick={_onCardClicked}>
            <CardBody>
                <div className={`details-hint cursor-pointer`}>
                    <i className={`fa-solid fa-circle-info`}/>
                </div>

                {info && (
                    <div className={`project-date-top`}>
                        <span className={`text-uppercase tracking-wider fw-bold text-2 opacity-50`}>{info}</span>
                    </div>
                )}
                <CircleAvatar size={isBreakpoint('xl') ? 3 : 2}
                              dynamicSize={false}
                              img={img}
                              fallbackIcon={fallbackIcon}
                              fallbackIconColors={fallbackIconColors}/>

                <div className={`title-wrapper`}>
                    <h5 className={`title fw-bold mb-0 text-highlight`}>{title}</h5>
                    <div className={`d-flex align-items-center mt-1`}>
                        <span className={`font-family-subheadings fw-bold text-muted text-1`}>{subtitle}</span>
                        {type && (
                            <span className={`ms-2 badge-type text-2`}>
                                <i className={`me-1 fa-solid ${type.toLowerCase().includes('business') ? 'fa-briefcase' : 'fa-user'}`}/>
                                {type}
                            </span>
                        )}
                    </div>
                </div>

                <div className={`tags-wrapper text-2 mt-2`}>
                    <Tags strings={tags} shorten={true}/>
                </div>



                {text && (
                    <div className={`main-content-wrapper mt-2 mb-3`}>
                        <div className={`text opacity-75`}
                             dangerouslySetInnerHTML={{__html: text}}/>
                    </div>
                )}

                <div className={`links-wrapper ${!text ? 'mt-3' : ''}`}>
                    {hasLinks && (<CircularButtonList links={links}/>)}
                    <CircularButtonList options={options} onOptionClicked={_onOptionClicked}/>
                </div>
            </CardBody>
        </Card>
    )
}

export default ProjectCard