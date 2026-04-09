import "./ProjectDetailsModal.scss"
import React from 'react'
import {Modal, ModalWindow, ModalHeader, ModalBody, ModalFooter} from "./Modal.jsx"
import Tags from "/src/components/generic/Tags.jsx"
import InfoBadge from "/src/components/generic/InfoBadge.jsx"

function ProjectDetailsModal({displayingDetails, hideProjectDetails}) {
    if(!displayingDetails)
        return <></>

    const {title, subtitle, info, text, details, tags} = displayingDetails

    return (
        <Modal visible={true} className={`project-details-modal`}>
            <ModalWindow>
                <ModalHeader title={title} onClose={hideProjectDetails} />
                <ModalBody>
                    <div className={`project-details-container p-2 p-md-3`}>
                        <div className={`d-flex flex-wrap align-items-center mb-4 gap-3`}>
                            <InfoBadge iconName={`fa-solid fa-layer-group`} text={subtitle} className={`bg-theme-soft`} />
                            {info && <InfoBadge iconName={`fa-solid fa-calendar-day`} text={info} className={`bg-theme-soft`} />}
                        </div>

                        <div className={`lead-2 fw-bold mb-4 text-highlight`}>
                            <p dangerouslySetInnerHTML={{__html: text}} />
                        </div>

                        <div className={`project-full-details mb-4`}>
                            <div className={`text-muted details-content`} dangerouslySetInnerHTML={{__html: details}} />
                        </div>

                        {tags && tags.length > 0 && (
                            <div className={`mt-5 pt-3 border-top`}>
                                <h6 className={`fw-bold text-uppercase text-3 tracking-wider mb-3`}>Tech Stack:</h6>
                                <Tags strings={tags} />
                            </div>
                        )}
                    </div>
                </ModalBody>
            </ModalWindow>
        </Modal>
    )
}

export default ProjectDetailsModal
