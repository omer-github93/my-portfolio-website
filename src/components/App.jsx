import "/src/styles/app.scss"
import React, { useEffect, useState } from 'react'
import { useData } from "/src/providers/DataProvider.jsx"
import Portfolio from "/src/components/Portfolio.jsx"
import { AnimatedCursor } from "/src/components/feedbacks/AnimatedCursor"
import ActivitySpinner from "/src/components/feedbacks/ActivitySpinner.jsx"
import ImageCache from "/src/components/generic/ImageCache.jsx"
import YoutubeModal from "/src/components/modals/YoutubeModal.jsx"
import GalleryModal from "/src/components/modals/GalleryModal.jsx"
import Notifications from "/src/components/feedbacks/Notifications.jsx"
import ConfirmationWindow from "/src/components/modals/ConfirmationWindow.jsx"
import ProjectDetailsModal from "/src/components/modals/ProjectDetailsModal.jsx"
import { useFeedbacks } from "/src/providers/FeedbacksProvider.jsx"
import { useLanguage } from "/src/providers/LanguageProvider.jsx"
import { useUtils } from "/src/helpers/utils.js"

function App() {
    const { listImagesForCache } = useData()
    const { selectedLanguageId } = useLanguage()

    const imageList = listImagesForCache()
    const utils = useUtils()

    return (
        <div className={`app-wrapper ${selectedLanguageId === 'ar' || selectedLanguageId === 'ku' ? 'is-rtl' : ''}`}>
            <AppFeedbacks />
            <ImageCache urls={imageList} />
            <Portfolio />
        </div>
    )
}

function AppFeedbacks() {
    const {
        listSpinnerActivities,
        isAnimatedCursorEnabled,
        isAnimatedCursorActive,
        isModalOpen,
        displayingNotification,
        killNotification,
        displayingYoutubeVideo,
        hideYoutubeVideo,
        displayingGallery,
        hideGallery,
        displayingDetails,
        hideProjectDetails,
        pendingConfirmation,
        hideConfirmationDialog
    } = useFeedbacks()


    const spinnerActivities = listSpinnerActivities()
    const animatedCursorEnabled = isAnimatedCursorEnabled()
    const animatedCursorActive = isAnimatedCursorActive()
    const modalOpen = isModalOpen()

    return (
        <>
            {spinnerActivities && (
                <ActivitySpinner activities={spinnerActivities} />
            )}

            {isAnimatedCursorEnabled() && (
                <AnimatedCursor enabled={animatedCursorEnabled}
                    active={animatedCursorActive}
                    modalOpen={modalOpen} />
            )}

            {displayingNotification && (
                <Notifications displayingNotification={displayingNotification}
                    killNotification={killNotification} />
            )}


            <YoutubeModal displayingYoutubeVideo={displayingYoutubeVideo}
                hideYoutubeVideo={hideYoutubeVideo} />



            <GalleryModal displayingGallery={displayingGallery}
                hideGallery={hideGallery} />



            <ConfirmationWindow pendingConfirmation={pendingConfirmation}
                hideConfirmationDialog={hideConfirmationDialog} />

            <ProjectDetailsModal displayingDetails={displayingDetails}
                hideProjectDetails={hideProjectDetails} />
        </>
    )
}

export default App
