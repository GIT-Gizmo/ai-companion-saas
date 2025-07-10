'use client'

import { cn, configureAssistant, getSubjectColor } from '@/lib/utils'
import { vapi } from '@/lib/vapi.sdk'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import soundwaves from '@/constants/soundwaves.json'

enum CallStatus {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    CONNECTING = 'CONNECTING',
    FINISHED = 'FINISHED'
}

const CompanionComponent = ({ companionId, subject, topic, name, style, voice, userName, userImage }: CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
    const [isMuted, setIsMuted] = useState<boolean>(false)
    const [messages, setMessages] = useState<SavedMessage[]>([])

    const lottieRef = useRef<LottieRefCurrentProps>(null)

    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play()
            } else {
                lottieRef.current?.stop()
            }
        }
    }, [isSpeaking, lottieRef])

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE)
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED)
        const onSpeechStart = () => setIsSpeaking(true)
        const onSpeechEnd = () => setIsSpeaking(false)
        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript }
                setMessages(prevMessages => [newMessage, ...prevMessages])
            }
        }
        const onError = (error: Error) => {
            throw new Error(`Companion error: ${error.message}`)
        }

        vapi.on('call-start', onCallStart)
        vapi.on('call-end', onCallEnd)
        vapi.on('message', onMessage)
        vapi.on('error', onError)
        vapi.on('speech-start', onSpeechStart)
        vapi.on('speech-end', onSpeechEnd)

        return () => {
            vapi.off('call-start', onCallStart)
            vapi.off('call-end', onCallEnd)
            vapi.off('speech-start', onSpeechStart)
            vapi.off('speech-end', onSpeechEnd)
            vapi.off('message', onMessage)
            vapi.off('error', onError)
        }
    }, [])

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted()
        vapi.setMuted(!isMuted)
        setIsMuted(!isMuted)
    }

    const handleCallConnect = async () => {
        try {
            setCallStatus(CallStatus.CONNECTING)

            const assistantOverrides = {
                variableValues: { subject, topic, style },
                clientMessages: ['transcript'],
                serverMessages: [],
            }

            // @ts-expect-error vapi.start is typed correctly
            vapi.start(configureAssistant(voice, style), assistantOverrides)
        } catch (error) {
            console.error('Error connecting to call:', error)
            setCallStatus(CallStatus.INACTIVE)
        }
    }

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED)
        vapi.stop()
    }

    return (
        <section className="flex flex-col h-[70vh] sm:h-[100vh]">
            <section className="flex gap-8 max-sm:flex-col">
                <div className="companion-section">
                    <div className="companion-avatar" style={{ backgroundColor: getSubjectColor(subject) }}>
                        <div className={cn(
                            'absolute transition-opacity duration-1000',
                            callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED ? 'opacity-100' : 'opacity-0',
                            callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                        )}>
                            <Image
                                src={`/icons/${subject}.svg`}
                                alt={subject}
                                width={150}
                                height={150}
                                className='max-sm:w-fit'
                            />
                        </div>
                        <div className={cn('absolute transition-opacity duration-1000',
                            callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')}>
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoplay={false}
                                className='companion-lottie'
                            />
                        </div>
                    </div>
                    <p className="font-bold text-2">{name}</p>
                </div>

                <div className="user-section">
                    <div className="user-avatar">
                        <Image
                            src={userImage || '/default-avatar.png'}
                            alt={userName}
                            width={130}
                            height={130}
                            className="rounded-lg"
                        />
                        <p className="font-bold text">{userName}</p>
                    </div>
                    <button className="btn-mic" onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
                        <Image
                            src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'}
                            alt={isMuted ? 'Muted' : 'Unmuted'}
                            width={36}
                            height={36}
                        />
                        <p className="max-sm:hidden cursor-pointer">
                            {isMuted ? 'Turn On Microphone' : 'Turn Off Microphone'}
                        </p>
                    </button>
                    <button className={cn(
                        'rounded-lg py-2 cursor-pointer transition-colors w-full text-white',
                        callStatus === CallStatus.ACTIVE ? 'bg-red-500 hover:bg-red-700' : 'bg-primary hover:bg-primary/70',
                        callStatus === CallStatus.CONNECTING && 'cursor-not-allowed opacity-50 animate-pulse')}
                        onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCallConnect}
                    >
                        {callStatus === CallStatus.ACTIVE ? "End Lesson" : callStatus === CallStatus.CONNECTING ? "Connecting..." : "Start Lesson"}
                    </button>
                </div>
            </section>

            <section className="transcript">
                <div className="transcript-message no-scrollbar">
                    {messages.map((message, index) => {
                        if (message.role === 'assistant') {
                            return (
                                <p key={index} className='max-sm:text-sm'>
                                    {name.split(' ')[0].replace('/[.,]/g, ', '')}:
                                    {message.content}
                                </p>
                            )
                        } else {
                            return (
                                <p key={index} className='text-primary max-sm:text-sm'>
                                    {message.content}
                                </p>
                            )
                        }
                    })}
                </div>
                <div className='transcript-fade' />
            </section>
        </section>
    )
}

export default CompanionComponent