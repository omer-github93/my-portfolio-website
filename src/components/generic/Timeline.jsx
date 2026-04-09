import "./Timeline.scss"
import React, { useEffect, useRef } from 'react'
import { useUtils } from "/src/helpers/utils.js"
import CircleAvatar from "/src/components/generic/CircleAvatar.jsx"
import InfoBadge from "/src/components/generic/InfoBadge.jsx"
import { useLanguage } from "/src/providers/LanguageProvider.jsx"
import Tags from "/src/components/generic/Tags.jsx"
import FaIcon from "/src/components/generic/FaIcon.jsx"

const utils = useUtils()

function Timeline({ items }) {
    if (!items) return <></>

    return (
        <div className={`timeline-wrapper`}>
            <ul className={`timeline`}>
                {items.map((item, key) => (
                    <TimelineItem item={item} key={key} />
                ))}
                <TimelineTrailer />
            </ul>
        </div>
    )
}

function TimelineItem({ item }) {
    const { getSelectedLanguage, getString } = useLanguage()
    const itemRef = useRef(null)

    // Scroll animation logic
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible')
                    observer.unobserve(entry.target)
                }
            },
            { threshold: 0.1 }
        )

        if (itemRef.current) {
            observer.observe(itemRef.current)
        }

        return () => observer.disconnect()
    }, [])

    let dateEnded = item.dateEnded
    if (dateEnded === 'now') dateEnded = getString('now')

    const dateDisplay = utils.formatDateInterval(
        item.dateStarted,
        dateEnded,
        getSelectedLanguage().id,
        true,
        true
    )

    return (
        <li className={`timeline-item`} ref={itemRef}>
            <div className={`timeline-avatar-wrapper`}>
                <CircleAvatar img={item.img}
                    alt={`timeline-item`}
                    fallbackIcon={item.faIcon}
                    fallbackIconColors={item.faIconColors} />
            </div>

            <div className={`timeline-content-wrapper`}>
                <header className={`timeline-content-header mb-3`}>
                    <div className={`timeline-content-header-left w-100`}>
                        <h5 className={`title fw-bold mb-2`} dangerouslySetInnerHTML={{ __html: utils.parseJsonText(item.title) }} />
                        <div className={`info text-muted font-family-subheadings fw-bold text-2 d-flex align-items-center`}>
                            <FaIcon iconName={'fa-solid fa-building'} className={`me-2 opacity-75`} />
                            <span dangerouslySetInnerHTML={{ __html: item.info }} />
                        </div>
                    </div>
                </header>

                <div className={`timeline-content-body mb-1 mb-md-2`}>
                    <div className={`mb-3`}>
                        <InfoBadge iconName={`fa-solid fa-calendar-days`} text={dateDisplay} className={`opacity-75`} />
                    </div>
                    <div className={`text`} dangerouslySetInnerHTML={{ __html: utils.parseJsonText(item.text) }} />
                    {item.tags && item.tags.length > 0 && (
                        <Tags strings={item.tags} className={`text-2 mt-4 pt-0 pt-md-1`} />
                    )}
                </div>
            </div>

            {/* Empty space for alternating layout */}
            <div className={`timeline-empty-space d-none d-lg-block`} style={{ width: 'calc(50% - (var(--circle-size) / 2) - 40px)' }}></div>
        </li>
    )
}

function TimelineTrailer() {
    return (
        <li className={`timeline-item timeline-item-trailer is-visible`}>
            <div className={`timeline-avatar-wrapper`}>
                <CircleAvatar />
            </div>
        </li>
    )
}

export default Timeline